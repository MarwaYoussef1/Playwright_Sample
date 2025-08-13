//const { test, expect } = require('@playwright/test');
import { test, expect } from '../../../fixtures.js';
import Constants from '../../../../src/Utils/Constants.js';
const { LoginPage } = require('../../../../src/Pages/LoginPage.js');
const { HomePage } = require('../../../../src/Pages/AdminPortal/HomePage.js');
const { SocialRecordCopiesManagementPage } = require('../../../../src/Pages/AdminPortal/SocialRecordCopies/SocialRecordCopiesManagementPage.js');
const { SocialRecordCopiesData } = require('../../../../src/Models/AdminPortal/SocialRecordCopiesData.js');
const { TasksPage } = require("../../../../src/Pages/AdminPortal/Tasks/TasksPage.js");
const { RequestUpdateSocialRecordCopiesPage } = require("../../../../src/Pages/AdminPortal/SocialRecordCopies/RequestUpdateSocialRecordCopiesPage.js");
const { FieldRequests } = require("../../../../src/Apis/Business/FieldRequests.js");
const { FieldRequestData } = require("../../../../src/Models/AdminPortal/FieldRequestData.js");
const { FieldData } = require("../../../../src/Models/AdminPortal/FieldData.js");
const { ISRRequests } = require("../../../../src/Apis/Business/ISRRequests.js");

let loginPage;
let homePage;
let socialRecordCopiesManagementPage;
let socialRecordCopiesData;
let tasksPage;
let requestUpdateSocialRecordCopiesPage;
let fieldRequests = new FieldRequests();
let fieldRequestData;
let inputFieldData;
let isrRequests;

var baseUrl = global.testConfig.BASE_URL;
var adminusername = global.testConfig.ISR_MANAGER;
var adminpassword = global.testConfig.ISR_MANAGER_PASS;

var ISR_SPECIALISTusername = global.testConfig.ISR_SPECIALIST;
var ISR_SPECIALISTpassword = global.testConfig.ISR_SPECIALIST_PASS;



test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    socialRecordCopiesManagementPage = new SocialRecordCopiesManagementPage(page);
    tasksPage = new TasksPage(page);
    requestUpdateSocialRecordCopiesPage = new RequestUpdateSocialRecordCopiesPage(page);

    socialRecordCopiesData = new SocialRecordCopiesData();
    fieldRequestData = new FieldRequestData();
    inputFieldData = new FieldData();
    isrRequests = new ISRRequests();

    await test.step('API - Create & Approve field Request', async () => {
        var fields = [];
        //create & approve input field
        inputFieldData.setFieldType(Constants.INPUT_FIELD);
        inputFieldData.setInputSource(Constants.API_Input_Source_Input);
        fields.push(inputFieldData);
        fieldRequestData.setFields(fields);
        await fieldRequests.createFieldRequestAPI(adminusername, adminpassword, fieldRequestData);
        console.log('Field Created Successfully with English Name: ', inputFieldData.getEnglishFieldName());
        socialRecordCopiesData.setFieldArName(inputFieldData.getArabicFieldName());
        console.log('Field Created Successfully with Arabic Name: ', inputFieldData.getArabicFieldName());
    });

});

test('Edit ISR Schema Field Data', async () => {
    //Login 
    await test.step('Login to Admin Portal', async () => {
        await loginPage.gotoAdminPortal(baseUrl);
        var loginSuccess = await loginPage.login(ISR_SPECIALISTusername, ISR_SPECIALISTpassword);
        expect(loginSuccess).toBe(true);
        console.log('login done successfully');
    });

    // Step1: Navigate to Social Record Managment page
    await test.step('Navigate to Social Record Managment page', async () => {
        await homePage.navigateToSocialRecordCopies();
        console.log('Navigate to Social Record Managment page');
    });

    // Step2: Add New Fields To New ISR Copy
    await test.step('Add New Fields To New ISR Copy', async () => {
        expect(await socialRecordCopiesManagementPage.addNewFieldsToISRCopy(socialRecordCopiesData, inputFieldData.getEnglishFieldName())).toBe(true);
        console.log('New Fields added To New ISR Copy Successfully');
    });

    // Step3: Get task number for ISR copy
    await test.step('Get task number for ISR Copy', async () => {
        await requestUpdateSocialRecordCopiesPage.getTaskNumberForISRCopy(socialRecordCopiesData);
        console.log('Get task number for ISR Copy successfully');
    });

    // Step4: Ensure Field Changed To Restricted
    await test.step('Ensure Field Changed To Restricted', async () => {
        expect(await requestUpdateSocialRecordCopiesPage.ensureFieldChangedInCustomizeSettings(socialRecordCopiesData)).toBe(true);
        console.log('Field Changed To Restricted successfully');
    });

    //logout
    await test.step("Logout from Admin Portal", async () => {
        await homePage.logout();
        console.log("User Logout Successfully");
    });
    //Login 
    await test.step('Login to Admin Portal', async () => {
        await loginPage.gotoAdminPortal(baseUrl);
        var loginSuccess = await loginPage.login(adminusername, adminpassword);
        expect(loginSuccess).toBe(true);
        console.log('login done successfully');
    });

    // Step5: 
    await test.step("Validate Field changed to Restricted", async () => {
        console.log("Validate Field changed to Restricted");
        await homePage.navigateToTasks();
        await tasksPage.assignTaskToMe(socialRecordCopiesData.getIsrTaskNumber());
        expect(await tasksPage.ensureFieldChangedInCustomizeSettings(socialRecordCopiesData.getIsrTaskNumber(), socialRecordCopiesData)).toBe(true);
        console.log("Validate Field changed to Restricted successfully");
    });

    //logout
    await test.step("Logout from Admin Portal", async () => {
        await homePage.logout();
        console.log("User Logout Successfully");
    });
});