//const { test, expect } = require('@playwright/test');
import { test, expect } from '../../../fixtures.js';
import Constants from '../../../../src/Utils/Constants.js';
const { LoginPage } = require('../../../../src/Pages/LoginPage');
const { HomePage } = require('../../../../src/Pages/AdminPortal/HomePage');
const { SocialRecordCopiesManagementPage } = require('../../../../src/Pages/AdminPortal/SocialRecordCopies/SocialRecordCopiesManagementPage');
const { SocialRecordCopiesData } = require('../../../../src/Models/AdminPortal/SocialRecordCopiesData');
const { TasksPage } = require("../../../../src/Pages/AdminPortal/Tasks/TasksPage.js");
const { RequestUpdateSocialRecordCopiesPage } = require("../../../../src/Pages/AdminPortal/SocialRecordCopies/RequestUpdateSocialRecordCopiesPage.js");
const { ISRRequests } = require("../../../../src/Apis/Business/ISRRequests.js");

let loginPage;
let homePage;
let socialRecordCopiesManagementPage;
let socialRecordCopiesData;
let tasksPage;
let requestUpdateSocialRecordCopiesPage;
let isrRequests;


test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    socialRecordCopiesManagementPage = new SocialRecordCopiesManagementPage(page);
    socialRecordCopiesData = new SocialRecordCopiesData();
    tasksPage = new TasksPage(page);
    requestUpdateSocialRecordCopiesPage = new RequestUpdateSocialRecordCopiesPage(page);
    isrRequests = new ISRRequests();

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

test('ISR Manager Rejects ISR Copy', async () => {
    var baseUrl = global.testConfig.BASE_URL;
    var adminusername = global.testConfig.ISR_MANAGER;
    var adminpassword = global.testConfig.ISR_MANAGER_PASS;

    var ISR_SPECIALISTusername = global.testConfig.ISR_SPECIALIST;
    var ISR_SPECIALISTpassword = global.testConfig.ISR_SPECIALIST_PASS;

    // Step1: Navigate to Social Record Managment page
    await test.step('Navigate to Social Record Managment page', async () => {
        await homePage.navigateToSocialRecordCopies();
        console.log('Navigate to Social Record Managment page');
    });

    // // Step2: Add New Fields To New ISR Copy
    // await test.step('Add New Fields To New ISR Copy', async () => {
    //     expect(await socialRecordCopiesManagementPage.addNewFieldsToISRCopy(socialRecordCopiesData)).toBe(true);
    //     console.log('New Fields added To New ISR Copy Successfully');
    // });

    // Step2: Create ISR Copy using API
    await test.step('API - Create ISR Copy', async () => {
        await isrRequests.createIsrRequest(adminusername, adminpassword, socialRecordCopiesData);
        console.log('ISR Copy Created successfully');
    });

    // Step3: Get task number for ISR copy
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

    // Step4: Reject ISR Task
    await test.step("Reject ISR Task", async () => {
        console.log("Navigate to MyTasks page to reject ISR task");
        await homePage.navigateToTasks();
        await tasksPage.assignTaskToMe(socialRecordCopiesData.getIsrTaskNumber());
        expect(await tasksPage.manageISRTask(Constants.ISRCOPY, Constants.REJECT, socialRecordCopiesData.getIsrTaskNumber())).toBe(true);
        console.log("ISR copy task Rejected Successfully with id= " + socialRecordCopiesData.getIsrTaskNumber());
    });

    //logout
    await test.step("Logout from Admin Portal", async () => {
        await homePage.logout();
        console.log("User Logout Successfully");
    });
    //Login 
    await test.step('Login to Admin Portal', async () => {
        await loginPage.gotoAdminPortal(baseUrl);
        var loginSuccess = await loginPage.login(ISR_SPECIALISTusername, ISR_SPECIALISTpassword);
        expect(loginSuccess).toBe(true);
        console.log('login done successfully');
    });

    // Step5: Navigate to Request Update Social Record Copies page
    await test.step('Navigate to Request Update Social Record Copies page', async () => {
        await homePage.navigateToRequestUpdateSocialRecordCopies();
        console.log('Navigate to Request Update Social Record Copies page');
    });

    // Step6: Verify Request Status of ISR copy in Request Update Social Record Copies page
    await test.step('Navigate to Request Update Social Record Copies page', async () => {
        expect(await requestUpdateSocialRecordCopiesPage.verifyRequestStatus(socialRecordCopiesData.getIsrTaskNumber(), Constants.REJECT)).toBe(true);
        console.log('Request Status of ISR copy in Request Update Social Record Copies page verified successfully');
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