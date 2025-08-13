import { test, expect } from '../../fixtures.js';
const { LoginPage } = require('../../../src/Pages/LoginPage.js');
const { HomeOperationPage } = require('../../../src/Pages/OperationPortal/HomeOperationPage.js');
const { DisbursementPage } = require('../../../src/Pages/OperationPortal/Disbursement/DisbursementPage.js');
const { TasksPage } = require('../../../src/Pages/OperationPortal/Tasks/TasksPage');
import Constants from "../../../src/Utils/Constants.js";


let loginPage;
let homeOperationPage;
let disbursementPage;
let tasksPage;
var baseUrl = global.testConfig.OPERATION_BASE_URL;
var disbursementManager = global.testConfig.DISBURSEMENT_MANAGER;
var disbursementManagerpassword = global.testConfig.DISBURSEMENT_MANAGER_PASS;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homeOperationPage = new HomeOperationPage(page);
    disbursementPage = new DisbursementPage(page);
    tasksPage = new TasksPage(page);
    var adminusername = global.testConfig.ADMIN_USER;
    var adminpassword = global.testConfig.ADMIN_PASS;

    // Step0: Login 
    await test.step('Login to Operation Portal', async () => {
        await loginPage.gotoOperationPortal(baseUrl);
        var loginSuccess = await loginPage.login(adminusername, adminpassword);
        expect(loginSuccess).toBe(true);
        console.log('login done successfully');
    });
});


test('Reject Disbursement flow', async () => {
    // Step1: Navigate to Disbursement page
    await test.step('Navigate to Disbursement page', async () => {
        await homeOperationPage.navigateToDisbursementTab();
        console.log('Navigate to Disbursement page');
    });

    // Step2: create Disbursement
    await test.step('Create Disbursement', async () => {
        expect(await disbursementPage.createDisbursement()).toBe(true);
        console.log('Create Disbursement successfully');
    });

    //Step3: logout
    // await test.step("Logout from Operation Portal", async () => {
    //     await homeOperationPage.logout();
    //     console.log("User Logout Successfully");
    // });

    // Step4: Login 
    // await test.step('Login to Operation Portal', async () => {
    //     await loginPage.gotoOperationPortal(baseUrl);
    //     var loginSuccess = await loginPage.login(disbursementManager, disbursementManagerpassword);
    //     expect(loginSuccess).toBe(true);
    //     console.log('login done successfully');
    // });

    // Step5: Navigate to Tasks page
    await test.step('Navigate to Tasks page', async () => {
        await homeOperationPage.navigateToTasksTab();
        console.log('Navigate to Tasks page');
    });

    // Step6: Reject Task
    await test.step('Reject Task', async () => {
        expect(await tasksPage.rejectTaskDisbursement(global.testConfig.Disbursement.DISBURSEMENT_APPROVE_FIRST_PHASE)).toBe(true);
        console.log('Task Rejected successfully');
    });
});


test('Accept Disbursement flow', async () => {
    // Step1: Navigate to Disbursement page
    await test.step('Navigate to Disbursement page', async () => {
        await homeOperationPage.navigateToDisbursementTab();
        console.log('Navigate to Disbursement page');
    });

    // Step2: create Disbursement
    await test.step('Create Disbursement', async () => {
        await disbursementPage.createDisbursement();
        console.log('Create Disbursement successfully');
    });

    // Step3: Navigate to Tasks page
    await test.step('Navigate to Tasks page', async () => {
        await homeOperationPage.navigateToTasksTab();
        console.log('Navigate to Tasks page');
    });

    // Step4: Accept Task First Phase
    await test.step('Approve Task', async () => {
        expect(await tasksPage.approveTaskDisbursement(global.testConfig.Disbursement.DISBURSEMENT_APPROVE_FIRST_PHASE, Constants.Disbursement)).toBe(true);
        console.log('Task Accepted successfully');
    });

    // Step5: Accept Task Second Phase
    await test.step('Approve Task', async () => {
        expect(await tasksPage.approveTaskDisbursement(global.testConfig.Disbursement.DISBURSEMENT_APPROVE_SECOND_PHASE, Constants.Disbursement)).toBe(true);
        console.log('Task Accepted successfully');
    });
});

/**
 * Test teardown: Logs out of the operation portal after each test.
 */
test.afterEach(async () => {
    //logout
    await test.step("Logout from Operation Portal", async () => {
        await homeOperationPage.logout();
        console.log("User Logout Successfully");
    });
});
