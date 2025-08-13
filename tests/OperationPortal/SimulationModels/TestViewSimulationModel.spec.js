//const { test, expect } = require('@playwright/test');
import { test, expect } from '../../fixtures.js';
const { LoginPage } = require('../../../src/Pages/LoginPage');
const { HomeOperationPage } = require('../../../src/Pages/OperationPortal/HomeOperationPage');
const { SimulationModelData } = require('../../../src/Models/OperationPortal/SimulationModelData');
const { SimulationModelManagementPage } = require('../../../src/Pages/OperationPortal/SimualtionModel/SimulationModelManagementPage');
const { TasksPage } = require('../../../src/Pages/OperationPortal/Tasks/TasksPage');


let loginPage;
let homeOperationPage;
let simulationModelData;
let simulationModelManagementPage;
let tasksPage;

test.beforeEach(async ({ page}) => {
    loginPage = new LoginPage(page);
    homeOperationPage = new HomeOperationPage(page);
    simulationModelData = new SimulationModelData();
    simulationModelManagementPage = new SimulationModelManagementPage(page);
    tasksPage = new TasksPage(page);
    var baseUrl = global.testConfig.OPERATION_BASE_URL;
    var adminusername = global.testConfig.PROGRAMS_AND_POLICIES_SPECIALIST;
    var adminpassword = global.testConfig.PROGRAMS_AND_POLICIES_SPECIALIST_PASS;


    // Step0: Login 
    await test.step('Login to Operation Portal', async () => {
        await loginPage.gotoOperationPortal(baseUrl);
        var loginSuccess = await loginPage.login(adminusername, adminpassword);
        expect(loginSuccess).toBe(true);
        console.log('login done successfully');
    });
});

test('View New Simulation Model Details', async ({ page }) => {
    // Step1: Navigate to Simulation Models Managment page
    await test.step('Navigate to Simulation Models Management page', async () => {
        await homeOperationPage.navigateToSimulationModels();
        console.log('Navigate to Simulation Models Management page');
    });

    // Step2: Fill Simulation Model Information
    await test.step('Fill Simulation Model Information', async () => {
        expect(await simulationModelManagementPage.defineSimulationModel(simulationModelData)).toBe(true);
        console.log('Simulation Model Information filled Successfully');
    });

    // Step3: Search & Verify Simulation Model Information
    await test.step('Search on Simulation Model created', async () => {
        expect(await simulationModelManagementPage.checkNewSimulationModelAdded(simulationModelData, null, null, null)).toBe(true);
        console.log('New Simulation Model Details Checked Successfully');
    });

    // Step4: View Simulation Model page After adding
    await test.step('View Simulation Model Details After adding', async () => {
        expect(await simulationModelManagementPage.viewSimulationModelDetails(simulationModelData)).toBe(true);
        console.log('View Simulation Model Details validated Successfully');
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
