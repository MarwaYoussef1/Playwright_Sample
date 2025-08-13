//const { test, expect } = require('@playwright/test');
import { test, expect } from '../../../fixtures.js';
import Constants from '../../../../src/Utils/Constants';

const { LoginPage } = require('../../../../src/Pages/LoginPage');
const { AxonLoginPage } = require('../../../../src/Pages/Axon/AxonLoginPage');
const { HomePage } = require('../../../../src/Pages/AdminPortal/HomePage');
const { FieldLibraryUpdateRequestsPage } = require('../../../../src/Pages/AdminPortal/FieldLibraryUpdateRequests/FieldLibraryUpdateRequestsPage');
const { FieldLibraryManagementPage } = require("../../../../src/Pages/AdminPortal/FieldLibrary/FieldLibraryManagementPage");
const { FieldsTreePage } = require('../../../../src/Pages/AdminPortal/FieldsTree/FieldsTreePage');
const { FieldData } = require("../../../../src/Models/AdminPortal/FieldData");
const { TasksPage } = require("../../../../src/Pages/AdminPortal/Tasks/TasksPage");
const { AxonHomePage } = require("../../../../src/Pages/Axon/AxonHomePage");
const { GlossaryPage } = require("../../../../src/Pages/Axon/GlossaryPage");
const { AxonSearch } = require("../../../../src/Pages/Axon/AxonSearch");
const { GlossaryViewDetials } = require("../../../../src/Pages/Axon/GlossaryViewDetials");


let loginPage,axonLoginPage, homePage, fieldLibraryUpdateRequestsPage, tasksPage , fieldsTreePage,fieldLibraryManagementPage;
let fieldManagerUserName, fieldManagerPassword ,isrManagerUsername , isrManagerPassword;
let requestChecks ,myMap;
let axonUsername ,axonPassword , AxonUrl , axonHomePage ,glossaryPage , axonSearch;
let integrationFieldData , glossaryViewDetials , adminTab;


test('Integration Field Request Flow With Axon integration', async ({ page }) => {

    const baseUrl = global.testConfig.BASE_URL;
    AxonUrl = global.testConfig.AXON_BASE_URL;

    fieldManagerUserName = global.testConfig.FIELD_MANAGEMENT_SPECIALIST;
    fieldManagerPassword = global.testConfig.FIELD_MANAGEMENT_SPECIALIST_PASS;

    isrManagerUsername = global.testConfig.ISR_MANAGER;
    isrManagerPassword = global.testConfig.ISR_MANAGER_PASS;

    axonUsername = global.testConfig.AXON_USER;
    axonPassword = global.testConfig.AXON_PASS;

    integrationFieldData = new FieldData();
    integrationFieldData.setFieldType(Constants.INTEGRATION_FIELD);

    await test.step('Create Glossary Field in Axon', async () => {

        axonLoginPage = new AxonLoginPage(page);
        axonHomePage = new AxonHomePage(page);
        glossaryPage = new GlossaryPage(page);
        glossaryViewDetials = new GlossaryViewDetials(page);
        axonSearch = new AxonSearch(page);

        await axonLoginPage.gotoAxon(AxonUrl);
        const AxonLoginSuccess = await axonLoginPage.axonLogin(axonUsername, axonPassword);
        expect(AxonLoginSuccess).toBe(true);
        console.log('Axon Login successful');

        var navigation = await axonHomePage.navigateToNewGlossaryPage();
        expect(navigation).toBe(true);

        await glossaryPage.fillNewGlossaryData(integrationFieldData);
        var result = await glossaryViewDetials.verifyCreatedGlossaryField(integrationFieldData );
        expect(result).toBe(true);
 
    });

    await test.step("Create and Approve Integration Field in Admin Portal", async () => {

         adminTab = await page.context().newPage();

        loginPage = new LoginPage(adminTab);
        homePage = new HomePage(adminTab);
        fieldLibraryUpdateRequestsPage = new FieldLibraryUpdateRequestsPage(adminTab);
        fieldsTreePage = new FieldsTreePage(adminTab);    
        tasksPage = new TasksPage(adminTab);
        
        await loginPage.gotoAdminPortal(baseUrl);
        var loginSuccess = await loginPage.login(fieldManagerUserName, fieldManagerPassword);
        expect(loginSuccess).toBe(true);
        console.log('Admin Portal Login successful');

        await homePage.navigateToFieldLibraryRequests();
        requestChecks = await fieldLibraryUpdateRequestsPage.createOntherFieldRequest(integrationFieldData);
        expect(requestChecks[0]).not.toBeNull(); 
        console.log("Integration Field Created Successfully")

        console.log("Validate Field Request Status, Details and Make a Decision")
        var processingStatus = global.testConfig.createField.requestStatusProcessing;
        var expectedRequestStatus = global.testConfig.createField.requestStatusProcessing;
        var expectedEnablementStatus = global.testConfig.createField.enableStatusHidden;
        await fieldLibraryUpdateRequestsPage.checkFieldRowRequestStatus(processingStatus);
        var sendRequest = await fieldLibraryUpdateRequestsPage.validateFieldDetailsAndMakeDecision(requestChecks,expectedRequestStatus ,expectedEnablementStatus);
        expect(sendRequest).toBe(true);

        // homePage = new HomePage(adminTab);         
        await homePage.logout();
         console.log('Logged out from FIELD MANAGEMENT User');
        var ISRlogin = await loginPage.login(isrManagerUsername, isrManagerPassword);
        expect(ISRlogin).toBe(true);
        console.log('Logged in as ISR Manager');

        console.log("Approve Integegration Field");
        await homePage.navigateToTasks();
        await tasksPage.assignTaskToMe(requestChecks[0]); 
        myMap = new Map(); 
        myMap.set(requestChecks[1], Constants.APPROVE);
        var taskManage = await tasksPage.manageRequestField(requestChecks[0],myMap , Constants.FIELDS_REQUEST);
        expect(taskManage).toBe(true);
        console.log("Field Request Done Successfully");
        await homePage.logout();
        console.log('Logged out from ISR Manager');
    });

    await test.step('Verify Glossary Field Reflected in Axon', async () => {
        await page.bringToFront();
        console.log('Back to Axon to Search on glossary Field');

        var navigation = await axonHomePage.navigateToSearchPage();
        expect(navigation).toBe(true);

        await axonSearch.searchAndClickGlossaryField(integrationFieldData); 
        var result = await glossaryViewDetials.verifyCreatedGlossaryField(integrationFieldData);
        expect(result).toBe(true);

        axonHomePage = new AxonHomePage(page);       
        await axonHomePage.logout();
        console.log('User logged out successfully From Axon');
    });

    await test.step('Deactivate Integration Field in Admin Portal', async () => {
        await adminTab.bringToFront();
        console.log('Back to Admin Portal to Deactivate Integration Field');
     
        // await loginPage.gotoAdminPortal(baseUrl);
        var Managerlogin = await loginPage.login(fieldManagerUserName, fieldManagerPassword);
        expect(Managerlogin).toBe(true);
        console.log('Logged in as FIELD MANAGEMENT User');

        await homePage.navigateToFieldLibrary();
        fieldLibraryManagementPage = new FieldLibraryManagementPage(adminTab);
        var deactivation = await fieldLibraryManagementPage.toggleFieldLibraryEntry(requestChecks[1] , false);
        expect(deactivation).toBe(true);
        console.log('Field Deactivated Successfully');
        await homePage.logout();
        console.log('Logout from Admin Portal');
    });
});

 

