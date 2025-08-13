//const { test, expect } = require('@playwright/test');
import { test, expect } from '../../../fixtures.js';
import Constants from '../../../../src/Utils/Constants';

const { LoginPage } = require('../../../../src/Pages/LoginPage');
const { HomePage } = require('../../../../src/Pages/AdminPortal/HomePage');
const { FieldLibraryUpdateRequestsPage } = require('../../../../src/Pages/AdminPortal/FieldLibraryUpdateRequests/FieldLibraryUpdateRequestsPage');
const { FieldLibraryManagementPage } = require('../../../../src/Pages/AdminPortal/FieldLibrary/FieldLibraryManagementPage');
const { FieldsTreePage } = require('../../../../src/Pages/AdminPortal/FieldsTree/FieldsTreePage');
const { FieldData } = require("../../../../src/Models/AdminPortal/FieldData");
const { TasksPage } = require("../../../../src/Pages/AdminPortal/Tasks/TasksPage");

let loginPage, homePage, fieldLibraryUpdateRequestsPage, tasksPage ,fieldsTreePage;
let calculatedFieldData;
let adminUsername, adminPassword ,isrManagerUsername , isrManagerPassword;
let requestChecks ,myMap;
let fieldLibraryManagementPage ;

test.beforeEach(async ({page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    fieldLibraryUpdateRequestsPage = new FieldLibraryUpdateRequestsPage(page);
    fieldLibraryManagementPage = new FieldLibraryManagementPage(page);
    fieldsTreePage = new FieldsTreePage(page);    
    tasksPage = new TasksPage(page);

    calculatedFieldData = new FieldData(page);
    calculatedFieldData.setFieldType(Constants.CALCULATION_FIELD);
    
    const baseUrl = global.testConfig.BASE_URL;
    adminUsername = global.testConfig.FIELD_MANAGEMENT_SPECIALIST;
    adminPassword = global.testConfig.FIELD_MANAGEMENT_SPECIALIST_PASS;
 
    await test.step('Login to Admin Portal', async () => {
        await loginPage.gotoAdminPortal(baseUrl);
        const loginSuccess = await loginPage.login(adminUsername, adminPassword);
        expect(loginSuccess).toBe(true);
        console.log('Login successful');
    });
});

test('Calculation Field Request Flow', async () => {

        await test.step("Navigate to Field Library Requests and Create Fields", async () => {
            await homePage.navigateToFieldLibraryRequests();
            requestChecks = await fieldLibraryUpdateRequestsPage.createOntherFieldRequest(calculatedFieldData);
            expect(requestChecks[0]).not.toBeNull(); 
        });

        await test.step("Validate Field Request Status, Details and Make a Decision ", async () => {
            var processingStatus = global.testConfig.createField.requestStatusProcessing;
            var expectedRequestStatus = global.testConfig.createField.requestStatusProcessing;
            var expectedEnablementStatus = global.testConfig.createField.enableStatusHidden;
            await fieldLibraryUpdateRequestsPage.checkFieldRowRequestStatus(processingStatus);
            var sendRequest = await fieldLibraryUpdateRequestsPage.validateFieldDetailsAndMakeDecision(requestChecks,expectedRequestStatus ,expectedEnablementStatus);
            expect(sendRequest).toBe(true);
            await homePage.logout();
            console.log('Logged out from FIELD MANAGEMENT User');

        });

        // Switch to ISR Manager User
        await test.step(' login as ISR Manager User', async () => {
         
            isrManagerUsername = global.testConfig.ISR_MANAGER;
            isrManagerPassword = global.testConfig.ISR_MANAGER_PASS;
            const loginSuccess = await loginPage.login(isrManagerUsername, isrManagerPassword);
            expect(loginSuccess).toBe(true);
            console.log('Logged in as ISR Manager');
        });

        await test.step("Tasks approve and reject", async () => {
            await homePage.navigateToTasks();
            await tasksPage.assignTaskToMe(requestChecks[0]); 
            myMap = new Map(); 
            myMap.set(requestChecks[1], Constants.APPROVE);
            var taskManage = await tasksPage.manageRequestField(requestChecks[0],myMap,Constants.FIELDS_REQUEST);
            expect(taskManage).toBe(true);
            console.log("Field Request Done Successfully");
        });

        await test.step("Check fields in fields Trees", async () => {
            await homePage.navigateToFieldTree();
            var fieldExist = await fieldsTreePage.checkFieldExists(calculatedFieldData); 
            expect(fieldExist).toBe(true);
            console.log("Field Exist in Fields Tree");
        });

       /* await test.step("Check fields in field Library", async () => {
            await homePage.navigateToFieldLibrary();
            // var myMap = new Map();
            // myMap.set('ISR_FLib_00001206',Constants.APPROVE); 
            var result = await fieldLibraryManagementPage.checkFieldStatusDetails(myMap);
            expect(result).toBe(true);            
            await homePage.logout();
            console.log("Field Stauts Matched Successfully");
        });*/

     // Switch to FIELD_MANAGEMENT_SPECIALIST User
        await test.step('Logout from ISR Manager User and login as FIELD MANAGEMENT User', async () => {
        await homePage.logout();
        console.log('Logged out from ISR Manager');
            var fieldspecialistUsername = global.testConfig.FIELD_MANAGEMENT_SPECIALIST;
            var fieldspecialistPassword = global.testConfig.FIELD_MANAGEMENT_SPECIALIST_PASS;
            const loginSuccess = await loginPage.login(fieldspecialistUsername, fieldspecialistPassword);
            expect(loginSuccess).toBe(true);
            console.log('Logged in as FIELD MANAGEMENT User');
        });
    
        // Deactivate Field Library
        await test.step('Deactivate Field Library', async () => {
            await homePage.navigateToFieldLibrary();
            var deactivation = await fieldLibraryManagementPage.toggleFieldLibraryEntry(requestChecks[1] , false);
            expect(deactivation).toBe(true);
            console.log('Field Deactivated Successfully');
        });
});

    test.afterEach(async () => {
        // Step 6: Logout
        await test.step('Logout from Admin Portal', async () => {
        await homePage.logout();
        console.log('User logged out successfully');
       
        });
});
