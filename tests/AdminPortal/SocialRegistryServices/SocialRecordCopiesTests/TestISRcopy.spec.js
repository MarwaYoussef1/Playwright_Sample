//const { test, expect } = require('@playwright/test');
import { test, expect } from '../../../fixtures.js';
import Constants from '../../../../src/Utils/Constants.js';
const { LoginPage } = require('../../../../src/Pages/LoginPage');
const { HomePage } = require('../../../../src/Pages/AdminPortal/HomePage');
const { SocialRecordCopiesManagementPage } = require('../../../../src/Pages/AdminPortal/SocialRecordCopies/SocialRecordCopiesManagementPage');
const { SocialRecordCopiesData } = require('../../../../src/Models/AdminPortal/SocialRecordCopiesData');
const { FieldRequestData } = require("../../../../src/Models/AdminPortal/FieldRequestData.js");
const { FieldData } = require("../../../../src/Models/AdminPortal/FieldData.js");
const { FieldRequests } = require("../../../../src/Apis/Business/FieldRequests.js");

let loginPage;
let homePage;
let socialRecordCopiesManagementPage;
let socialRecordCopiesData;
let inputFieldData;
let fieldRequestData;
let fieldRequests;


test.beforeEach(async ({ page }) => {

    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    socialRecordCopiesManagementPage = new SocialRecordCopiesManagementPage(page);
    socialRecordCopiesData = new SocialRecordCopiesData();
    inputFieldData = new FieldData();
    fieldRequestData = new FieldRequestData();
    fieldRequests = new FieldRequests();
    var baseUrl = global.testConfig.BASE_URL;
    var adminusername = global.testConfig.ISR_SPECIALIST;
    var adminpassword = global.testConfig.ISR_SPECIALIST_PASS;


    // Step0: Login 
    await test.step('Login to Admin Portal', async () => {
        await loginPage.gotoAdminPortal(baseUrl);
        var loginSuccess = await loginPage.login(adminusername, adminpassword);
        expect(loginSuccess).toBe(true);
        console.log('login done successfully');
    });
});


test('Add ISR copy And Verify ISR copy details', async () => {
    // Step1: Navigate to Social Record Managment page
    await test.step('Navigate to Social Record Managment page', async () => {
        await homePage.navigateToSocialRecordCopies();
        console.log('Navigate to Social Record Managment page');
    });

    await test.step('API - Create & Approve field Request', async () => {
        var adminusername = global.testConfig.ISR_MANAGER;
        var adminpassword = global.testConfig.ISR_MANAGER_PASS;
        var fields = [];
        //create & approve input field
        inputFieldData.setFieldType(Constants.INPUT_FIELD);
        inputFieldData.setInputSource(Constants.API_Input_Source_Input);
        fields.push(inputFieldData);
        fieldRequestData.setFields(fields);
        await fieldRequests.createFieldRequestAPI(adminusername, adminpassword, fieldRequestData);
        console.log('Field Created Successfully with English Name: ', inputFieldData.getEnglishFieldName());
    });

    // Step2: Add New Fields To New ISR Copy
    await test.step('Add New Fields To New ISR Copy', async () => {
        expect(await socialRecordCopiesManagementPage.addNewFieldsToISRCopy(socialRecordCopiesData, inputFieldData.getEnglishFieldName())).toBe(true);
        console.log('New Fields added To New ISR Copy Successfully');
    });

    // Step3: Verify ISR Copy Details
    await test.step('Verify ISR Copy Details', async () => {
        expect(await socialRecordCopiesManagementPage.verifyIsrDetails(socialRecordCopiesData)).toBe(true);
        console.log('ISR Copy Details Verified Successfully');
    });
});

test('Remove ISR copy with status draft', async () => {
    // Step1: Navigate to Social Record Managment page
    await test.step('Navigate to Social Record Managment page', async () => {
        await homePage.navigateToSocialRecordCopies();
        console.log('Navigate to Social Record Managment page');
    });

    // Step2: Add a new Draft Social Record Copy
    await test.step('Add a new Draft Social Record Copy', async () => {
        expect(await socialRecordCopiesManagementPage.addDraftCopy(socialRecordCopiesData)).toBe(true);
        await homePage.navigateToSocialRecordCopies();
        console.log('New Draft Social Record Copy Added Successfully');
    });

    // Step3: Delete a Draft Social Record Copy
    await test.step('Delete a Draft Social Record Copy', async () => {
        expect(await socialRecordCopiesManagementPage.deleteDraftCopy(socialRecordCopiesData)).toBe(true);
        console.log('Draft Social Record Copy Deleted Successfully');
    });
});

test('Add ISR copy with status under Review', async () => {
    // Step1: Navigate to Social Record Managment page
    await test.step('Navigate to Social Record Managment page', async () => {
        await homePage.navigateToSocialRecordCopies();
        console.log('Navigate to Social Record Managment page');
    });

    await test.step('API - Create & Approve field Request', async () => {
        var adminusername = global.testConfig.ISR_MANAGER;
        var adminpassword = global.testConfig.ISR_MANAGER_PASS;
        var fields = [];
        //create & approve input field
        inputFieldData.setFieldType(Constants.INPUT_FIELD);
        inputFieldData.setInputSource(Constants.API_Input_Source_Input);
        fields.push(inputFieldData);
        fieldRequestData.setFields(fields);
        await fieldRequests.createFieldRequestAPI(adminusername, adminpassword, fieldRequestData);
        console.log('Field Created Successfully with English Name: ', inputFieldData.getEnglishFieldName());
    });

    // Step2: Add New Fields To New ISR Copy
    await test.step('Add New Fields To New ISR Copy', async () => {
        expect(await socialRecordCopiesManagementPage.addNewFieldsToISRCopy(socialRecordCopiesData, inputFieldData.getEnglishFieldName())).toBe(true);
        console.log('New Fields added To New ISR Copy Successfully');
    });
});



/**
 * Test teardown: Logs out of the admin portal after each test.
 */
test.afterEach(async () => {
    //logout
    await test.step("Logout from Admin Portal", async () => {
        await homePage.logout();
        console.log("User Logout Successfully");

    });

});