//const { test, expect } = require('@playwright/test');
import { test, expect } from '../../fixtures.js';
const { LoginPage } = require('../../../src/Pages/LoginPage');
const { HomeOperationPage } = require('../../../src/Pages/OperationPortal/HomeOperationPage');
const { SimulationModelData } = require('../../../src/Models/OperationPortal/SimulationModelData');
const { SimulationModelManagementPage } = require('../../../src/Pages/OperationPortal/SimualtionModel/SimulationModelManagementPage');
const { TasksPage } = require('../../../src/Pages/OperationPortal/Tasks/TasksPage');
const { Simulation } = require("../../../src/Apis/Business/Simulation");
import Constants from '../../../src/Utils/Constants.js';


let loginPage;
let homeOperationPage;
let simulationModelData;
let simulationModelManagementPage;
let tasksPage;
let simulation;


var baseUrl = global.testConfig.OPERATION_BASE_URL;
var programsAndPoliciesSpecalistUsername = global.testConfig.PROGRAMS_AND_POLICIES_SPECIALIST;
var programsAndPoliciesSpecalistPassword = global.testConfig.PROGRAMS_AND_POLICIES_SPECIALIST_PASS;

var programsAndPoliciesManagerUsername = global.testConfig.PROGRAMS_AND_POLICIES_MANAGER;
var programsAndPoliciesManagerPassword = global.testConfig.PROGRAMS_AND_POLICIES_MANAGER_PASS;

test.beforeEach(async ({ page }) => {
   
    loginPage = new LoginPage(page);
    homeOperationPage = new HomeOperationPage(page);
    simulationModelData = new SimulationModelData();
    simulationModelManagementPage = new SimulationModelManagementPage(page);
    tasksPage = new TasksPage(page);
    simulation = new Simulation(page);

    // Step0: Login 
    await test.step('Login to Operation Portal', async () => {
        await loginPage.gotoOperationPortal(baseUrl);
        var loginSuccess = await loginPage.login(programsAndPoliciesSpecalistUsername, programsAndPoliciesSpecalistPassword);
        expect(loginSuccess).toBe(true);
        console.log('login done successfully');
    });
});

test('Approve Simulation Model Execution', async () => {
    // Step1: Create & Approve simulation model using API
    await test.step('API Create & Approve simulation model', async () => {
        await simulation.createsimulationModelAndApproveAPI(global.testConfig.ADMIN_USER, global.testConfig.ADMIN_PASS, simulationModelData);
    });

    // Step2: Navigate to Simulation Models Managment page
    await test.step('Navigate to Simulation Models Management page', async () => {
        await homeOperationPage.navigateToSimulationModels();
        console.log('Navigate to Simulation Models Management page');
    });

    // Step3: Search & Verify Simulation Model Status changed to active
    await test.step('Search on Simulation Model Status changed to active', async () => {
        expect(await simulationModelManagementPage.checkNewSimulationModelAdded(simulationModelData, true, null, null)).toBe(true);
        console.log('New Simulation Model Status changed to active Successfully');
    });

    // Step4:Execute Simulation Model
    await test.step('Execute Simulation Model', async () => {
        expect(await simulationModelManagementPage.executeSimulationModel(simulationModelData, true)).toBe(true);
        console.log('Simulation Model executed Successfully');
    });

    // Step5: Send Execution For Approval
    await test.step('Send Execution For Approval', async () => {
        expect(await simulationModelManagementPage.sendSimulationModelExecutionForApproval()).toBe(true);
        console.log('Simulation Model Execution sent for approval Successfully');
    });

    // Step6: Navigate to View Execution Logs Requests
    await test.step('Navigate to View Execution Logs Requests page', async () => {
        await homeOperationPage.navigateToViewExecutionLogsRequestsTab();
        console.log('Navigate to View Execution Logs Requests page');
    });

    // Step7: get Simulation Model Execution Number
    await test.step('Get Simulation Model Execution Number', async () => {
        expect(await simulationModelManagementPage.getSimulationModelExecutionNumber(simulationModelData.getSimulationModelArName(), simulationModelData)).toBe(true);
        console.log('Simulation Model Execution Number saved Successfully');
    });


    //logout
    await test.step("Logout from Operation Portal", async () => {
        await homeOperationPage.logout();
        console.log("User Logout Successfully");
    });

    //login with another user
    await test.step('Login to Operation Portal', async () => {
        await loginPage.gotoOperationPortal(baseUrl);
        var loginSuccess = await loginPage.login(programsAndPoliciesManagerUsername, programsAndPoliciesManagerPassword);
        expect(loginSuccess).toBe(true);
        console.log('login done successfully');
    });

    // Step8: Navigate to Tasks Managment page
    await test.step('Navigate to Tasks Management page', async () => {
        await homeOperationPage.navigateToTasksTab();
        console.log('Navigate to Tasks Management page');
    });

    // Step9: Approve Task
    await test.step('Approve Task', async () => {
        expect(await tasksPage.approveTask(simulationModelData.getSimulationModelExecutionNumber(), Constants.EXECUTE_SIMULATION_MODEL)).toBe(true);
        console.log('Task approved successfully');
    });

    // Step10: Navigate to View Execution Logs Requests
    await test.step('Navigate to View Execution Logs Requests page', async () => {
        await homeOperationPage.navigateToViewExecutionLogsRequestsTab();
        console.log('Navigate to View Execution Logs Requests page');
    });

    // Step11: Verify Simulation Model Execution Status in Logs Requests Page
    await test.step('Verify Simulation Model Execution Status in Logs Requests Page', async () => {
        expect(await simulationModelManagementPage.verifySimulationModelExecutionStatusInLogs(simulationModelData.getSimulationModelArName())).toBe(true);
        console.log('Simulation Model Execution Status in Logs Requests Page verifed successfully'); 
    });

    // Step12: Navigate to Approved Execution Logs Page
    await test.step('Navigate to Approved Execution Logs Page', async () => {
        await homeOperationPage.navigateToApprovedExecutionLogsTab();
        console.log('Navigate to Approved Execution Logs Page');
    });

    // Step13: Verify Simulation Model Execution Exist in Approved Logs Page
    await test.step('Verify Simulation Model Execution Exist in Approved Logs Page', async () => {
        expect(await simulationModelManagementPage.verifySimulationModelExecutionExistInApprovedLogs(simulationModelData.getSimulationModelArName())).toBe(true);
        console.log('Simulation Model Execution Exists in Approved Logs Page successfully');
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