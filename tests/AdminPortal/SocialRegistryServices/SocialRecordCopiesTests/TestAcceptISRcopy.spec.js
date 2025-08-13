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
let socialRecordCopiesData= new SocialRecordCopiesData();
let tasksPage;
let requestUpdateSocialRecordCopiesPage;
let fieldRequests = new FieldRequests();
let fieldRequestData;
let inputFieldData;
let isrRequests;




test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    socialRecordCopiesManagementPage = new SocialRecordCopiesManagementPage(page);
    tasksPage = new TasksPage(page);
    requestUpdateSocialRecordCopiesPage = new RequestUpdateSocialRecordCopiesPage(page);

});
test.describe('ISR Copy Acceptance Flow', () => {


    fieldRequestData = new FieldRequestData();
    inputFieldData = new FieldData();
    isrRequests = new ISRRequests();


    var baseUrl = global.testConfig.BASE_URL;
    var adminusername = global.testConfig.ISR_MANAGER;
    var adminpassword = global.testConfig.ISR_MANAGER_PASS;

    var ISR_SPECIALISTusername = global.testConfig.ISR_SPECIALIST;
    var ISR_SPECIALISTpassword = global.testConfig.ISR_SPECIALIST_PASS;

    var MetaData_SPECIALISTusername = global.testConfig.META_DATA_SPECIALIST;
    var MetaData_SPECIALISTpassword = global.testConfig.META_DATA_SPECIALIST_PASS;

    var COMPUTATIONAL_SPECIALISTusername = global.testConfig.COMPUTATIONAL_FIELD_DESIGN_SPECIALIST;
    var COMPUTATIONAL_SPECIALISTpassword = global.testConfig.COMPUTATIONAL_FIELD_DESIGN_SPECIALIST_PASS;

    var Form_SPECIALISTusername = global.testConfig.FORM_SPECIALIST;
    var Form_SPECIALISTpassword = global.testConfig.FORM_SPECIALIST_PASS;
    test('ISR Manager Accept ISR Copy', async () => {
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

        // Step2: Navigate to Social Record Managment page
        await test.step('API - Create & Approve field Request', async () => {
            var fields = [];
            //create & approve input field
            inputFieldData.setFieldType(Constants.INPUT_FIELD);
            inputFieldData.setInputSource(Constants.API_Input_Source_Input);
            fields.push(inputFieldData);
            fieldRequestData.setFields(fields);
            await fieldRequests.createFieldRequestAPI(adminusername, adminpassword, fieldRequestData);
            console.log('Field Created Successfully with English Name: ', inputFieldData.getEnglishFieldName());
        });

        // Step3: Create ISR Copy using API
        await test.step('API - Create ISR Copy', async () => {
            await isrRequests.createIsrRequest(adminusername, adminpassword, socialRecordCopiesData);
            console.log('ISR Copy Created successfully');
        });

        // // Step2: Add New Fields To New ISR Copy
        // await test.step('Add New Fields To New ISR Copy', async () => {
        //     expect(await socialRecordCopiesManagementPage.addNewFieldsToISRCopy(socialRecordCopiesData, inputFieldData.getEnglishFieldName())).toBe(true);
        //     console.log('New Fields added To New ISR Copy Successfully');
        // });

        // Step4: Get task number for ISR copy
        await test.step('Get task number for ISR Copy', async () => {
            await requestUpdateSocialRecordCopiesPage.getTaskNumberForISRCopy(socialRecordCopiesData);
            console.log('Get task number for ISR Copy successfully');
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

        // Step5: Accept ISR Task
        await test.step("Accept ISR Task", async () => {
            console.log("Navigate to MyTasks page to accept ISR task");
            await homePage.navigateToTasks();
            await tasksPage.assignTaskToMe(socialRecordCopiesData.getIsrTaskNumber());
            await fieldRequests.approveRequestFields(adminusername, adminpassword, socialRecordCopiesData.getIsrTaskNumber(), socialRecordCopiesData.getIsrBusinessKey());
            // await fieldRequests.approveRequestFields(adminusername, adminpassword, socialRecordCopiesData.getIsrTaskNumber(), socialRecordCopiesData.getVersionEnConcatenatedName());
            expect(await tasksPage.manageISRTask(Constants.ISRCOPY, Constants.APPROVE, socialRecordCopiesData.getIsrTaskNumber())).toBe(true);
            console.log("ISR copy task Accepted Successfully with id= " + socialRecordCopiesData.getIsrTaskNumber());
        });

        //logout
        await test.step("Logout from Admin Portal", async () => {
            await homePage.logout();
            console.log("User Logout Successfully");
        });
    });
   /* test('Meta Data SPECIALIST Accept ISR Copy', async () => {
        //Login 
        await test.step('Login to Admin Portal', async () => {
            await loginPage.gotoAdminPortal(baseUrl);
            var loginSuccess = await loginPage.login(MetaData_SPECIALISTusername, MetaData_SPECIALISTpassword);
            expect(loginSuccess).toBe(true);
            console.log('login done successfully');
        });
        // Step6: Accept ISR Task in Data Structuring phase
        await test.step("Accept ISR Task in Data Structuring phase", async () => {
            console.log("Navigate to MyTasks page to accept ISR task");
            await homePage.navigateToTasks();
            await tasksPage.assignTaskToMe(socialRecordCopiesData.getIsrTaskNumber());
            expect(await tasksPage.manageISRTask(Constants.ISRCOPY, Constants.COMPLETE_DATA_STRUCTURING, socialRecordCopiesData.getIsrTaskNumber())).toBe(true);
            console.log("ISR copy task in Data Structuring phase Accepted Successfully with id= " + socialRecordCopiesData.getIsrTaskNumber());
        });
        //logout
        await test.step("Logout from Admin Portal", async () => {
            await homePage.logout();
            console.log("User Logout Successfully");
        });
    });
    test('Computational Field Design Specialist Accept ISR Copy', async () => {
        //Login 
        await test.step('Login to Admin Portal', async () => {
            await loginPage.gotoAdminPortal(baseUrl);
            var loginSuccess = await loginPage.login(COMPUTATIONAL_SPECIALISTusername, COMPUTATIONAL_SPECIALISTpassword);
            expect(loginSuccess).toBe(true);
            console.log('login done successfully');
        });
        // Step6: Accept ISR Task in Computational phase
        await test.step("Accept ISR Task in Computational phase", async () => {
            console.log("Navigate to MyTasks page to accept ISR task");
            await homePage.navigateToTasks();
            await tasksPage.assignTaskToMe(socialRecordCopiesData.getIsrTaskNumber());
            expect(await tasksPage.manageISRTask(Constants.ISRCOPY, Constants.COMPUTATIONAL_FIELD_DESIGN, socialRecordCopiesData.getIsrTaskNumber())).toBe(true);
            console.log("ISR copy task in Data Computational phase Accepted Successfully with id= " + socialRecordCopiesData.getIsrTaskNumber());
        });
        //logout
        await test.step("Logout from Admin Portal", async () => {
            await homePage.logout();
            console.log("User Logout Successfully");
        });
    });
    test('Form SPECIALIST Accept ISR Copy in Applicant Portal', async () => {
        //Login 
        await test.step('Login to Admin Portal', async () => {
            await loginPage.gotoAdminPortal(baseUrl);
            var loginSuccess = await loginPage.login(Form_SPECIALISTusername, Form_SPECIALISTpassword);
            expect(loginSuccess).toBe(true);
            console.log('login done successfully');
        });
        // Step7: Accept ISR Task in Applicant Portal Record Review Form Design phase
        await test.step("Accept ISR Task in Applicant Portal Record Review Form Design phase", async () => {
            console.log("Navigate to MyTasks page to accept ISR task");
            await homePage.navigateToTasks();
            await tasksPage.assignTaskToMe(socialRecordCopiesData.getIsrTaskNumber());
            expect(await tasksPage.manageISRTask(Constants.ISRCOPY, Constants.COMPLETE_DESIGN_FORM, socialRecordCopiesData.getIsrTaskNumber(), inputFieldData.getEnglishFieldName())).toBe(true);
            console.log("ISR copy task in Applicant Portal Record Review Form Design phase Accepted Successfully with id= " + socialRecordCopiesData.getIsrTaskNumber());
        });

        //logout
        await test.step("Logout from Admin Portal", async () => {
            await homePage.logout();
            console.log("User Logout Successfully");
        });
    });
    test('Form SPECIALIST Accept ISR Copy in Operational Portal', async () => {
        //Login 
        await test.step('Login to Admin Portal', async () => {
            await loginPage.gotoAdminPortal(baseUrl);
            var loginSuccess = await loginPage.login(Form_SPECIALISTusername, Form_SPECIALISTpassword);
            expect(loginSuccess).toBe(true);
            console.log('login done successfully');
        });

        // Step8: Accept ISR Task in Operational Portal Record Review Form Design phase
        await test.step("Accept ISR Task in Operational Portal Record Review Form Design phase", async () => {
            console.log("Navigate to MyTasks page to accept ISR task");
            await homePage.navigateToTasks();
            await tasksPage.assignTaskToMe(socialRecordCopiesData.getIsrTaskNumber());
            expect(await tasksPage.manageISRTask(Constants.ISRCOPY, Constants.COMPLETE_DESIGN_FORM, socialRecordCopiesData.getIsrTaskNumber(), inputFieldData.getEnglishFieldName())).toBe(true);
            console.log("ISR copy task in Operational Portal Record Review Form Design phase Accepted Successfully with id= " + socialRecordCopiesData.getIsrTaskNumber());
        });

        //logout
        await test.step("Logout from Admin Portal", async () => {
            await homePage.logout();
            console.log("User Logout Successfully");
        });
    });
    test('Verify ISR Copy Status at ISR Specialist', async () => {
        //Login 
        await test.step('Login to Admin Portal', async () => {
            await loginPage.gotoAdminPortal(baseUrl);
            var loginSuccess = await loginPage.login(ISR_SPECIALISTusername, ISR_SPECIALISTpassword);
            expect(loginSuccess).toBe(true);
            console.log('login done successfully');
        });

        // Step9: Navigate to Request Update Social Record Copies page
        await test.step('Navigate to Request Update Social Record Copies page', async () => {
            await homePage.navigateToRequestUpdateSocialRecordCopies();
            console.log('Navigate to Request Update Social Record Copies page');
        });

        // Step10: Verify Request Status of ISR copy in Request Update Social Record Copies page
        await test.step('Navigate to Request Update Social Record Copies page', async () => {
            expect(await requestUpdateSocialRecordCopiesPage.verifyRequestStatus(socialRecordCopiesData.getIsrTaskNumber(), Constants.APPROVE)).toBe(true);
            console.log('Request Status of ISR copy in Request Update Social Record Copies page verified successfully');
        });
    });*/


});