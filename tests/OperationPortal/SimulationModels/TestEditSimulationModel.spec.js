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
var programsAndPoliciesSpecialist_UserName = global.testConfig.PROGRAMS_AND_POLICIES_SPECIALIST;
var programsAndPoliciesSpecialist_Password = global.testConfig.PROGRAMS_AND_POLICIES_SPECIALIST_PASS;

var businessRules_Username = global.testConfig.BUSSINESS_RULES_SPECIALIST;
var businessRules_Password = global.testConfig.BUSSINESS_RULES_SPECIALIST_PASS;

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
        var loginSuccess = await loginPage.login(programsAndPoliciesSpecialist_UserName, programsAndPoliciesSpecialist_Password);
        expect(loginSuccess).toBe(true);
        console.log('login done successfully');
    });
});

test('Edit New Simulation Model', async ({ page }) => {
    // Step1: Create & Approve simulation model using API
    await test.step('API -Create & Approve simulation model', async () => {
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

    // Step4: Edit Simulation Model
    await test.step('Edit Simulation Model', async () => {
        expect(await simulationModelManagementPage.editSimulationModel(simulationModelData)).toBe(true);
        console.log('Simulation Model edited Successfully');
    });

    // Step5: Search & Verify Simulation Model 
    await test.step('Search on Edited Simulation Model', async () => {
        expect(await simulationModelManagementPage.checkNewSimulationModelAdded(simulationModelData, null, true, null)).toBe(true);
        console.log('Edited Simulation Model Found Successfully');
    });


    // Step6: Search & Verify Simulation Models Active and Edited
    await test.step('Search on Active and Edited Simulation Models', async () => {
        expect(await simulationModelManagementPage.verifySimualtionModelsActiveAndEdited(simulationModelData, true, true)).toBe(true);
        console.log('Active and Edited Simulation Models Found Successfully');
    });

    // Step7: Verify Simulation Model Versions
    await test.step('Verify Simulation Model Versions', async () => {
        expect(await simulationModelManagementPage.VerifySimulationModelVersionsDetails(simulationModelData, true, true)).toBe(true);
        console.log('Active and Edited Simulation Models Version Verified Successfully');
    });

    //logout
    await test.step("Logout from Operation Portal", async () => {
        await homeOperationPage.logout();
        console.log("User Logout Successfully");
    });

    //login with another user
    await test.step('Login to Operation Portal', async () => {
        var loginSuccess = await loginPage.login(businessRules_Username, businessRules_Password);
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
        expect(await tasksPage.approveTask(simulationModelData.getCreatedSimulationModelEditedId(), Constants.EDIT_SIMULATION_MODEL)).toBe(true);
        console.log('Task approved successfully');
    });

    //logout
    await test.step("Logout from Operation Portal", async () => {
        await homeOperationPage.logout();
        console.log("User Logout Successfully");
    });

    //login with another user
    await test.step('Login to Operation Portal', async () => {
        var loginSuccess = await loginPage.login(programsAndPoliciesSpecialist_UserName, programsAndPoliciesSpecialist_Password);
        expect(loginSuccess).toBe(true);
        console.log('login done successfully');
    });

    // Step10: Navigate to Simulation Models Managment page
    await test.step('Navigate to Simulation Models Management page', async () => {
        //await page.waitForTimeout(10000);
        await homeOperationPage.navigateToSimulationModels();
        console.log('Navigate to Simulation Models Management page');
    });

    // Step11: Search & Verify Simulation Model Status changed to active
    await test.step('Search on Simulation Model Status changed to active', async () => {
        expect(await simulationModelManagementPage.checkNewSimulationModelAdded(simulationModelData, true, null, null)).toBe(true);
        console.log('New Simulation Model Status changed to active Successfully');
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