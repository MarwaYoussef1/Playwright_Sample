//const { test, expect } = require('@playwright/test');
import { test, expect } from '../../fixtures.js';
const { LoginPage } = require('../../../src/Pages/LoginPage');
const { HomeOperationPage } = require('../../../src/Pages/OperationPortal/HomeOperationPage');
const { SimulationModelData } = require('../../../src/Models/OperationPortal/SimulationModelData');
const { SimulationModelManagementPage } = require('../../../src/Pages/OperationPortal/SimualtionModel/SimulationModelManagementPage');
const { Simulation } = require("../../../src/Apis/Business/Simulation");


let loginPage;
let homeOperationPage;
let simulationModelData;
let simulationModelManagementPage;
let simulation;


var baseUrl = global.testConfig.OPERATION_BASE_URL;
var adminusername = global.testConfig.PROGRAMS_AND_POLICIES_SPECIALIST;
var adminpassword = global.testConfig.PROGRAMS_AND_POLICIES_SPECIALIST_PASS;

test.beforeEach(async ({ page }) => {
     loginPage = new LoginPage(page);
    homeOperationPage = new HomeOperationPage(page);
    simulationModelData = new SimulationModelData();
    simulationModelManagementPage = new SimulationModelManagementPage(page);
    simulation = new Simulation(page);

    // Step0: Login 
    await test.step('Login to Operation Portal', async () => {
        await loginPage.gotoOperationPortal(baseUrl);
        var loginSuccess = await loginPage.login(adminusername, adminpassword);
        expect(loginSuccess).toBe(true);
        console.log('login done successfully');
    });
});

test('Execute Simulation Model', async ({ page }) => {
    // Step1: Create & Approve simulation model using API
    await test.step('API Create & Approve simulation model', async () => {
        await simulation.createsimulationModelAndApproveAPI(global.testConfig.ADMIN_USER, global.testConfig.ADMIN_PASS, simulationModelData);
        //await simulation.createsimulationModelAndApproveAPI(adminusername, adminpassword, simulationModelData);
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

    // Step5: Navigate to Simulation Models Managment page
    await test.step('Navigate to Simulation Models Management page', async () => {
        await homeOperationPage.navigateToSimulationModels();
        console.log('Navigate to Simulation Models Management page');
    });

    // Step6: Search & Verify Simulation Model Status changed to active
    await test.step('Search on Simulation Model Status changed to active', async () => {
        expect(await simulationModelManagementPage.checkNewSimulationModelAdded(simulationModelData, null, null, true)).toBe(true);
        console.log('New Simulation Model Status changed to active Successfully');
    });

    // Step7: Re-Execute Simulation Model
    await test.step('Re-Execute Simulation Model', async () => {
        expect(await simulationModelManagementPage.executeSimulationModel(simulationModelData, true)).toBe(true);
        console.log('Simulation Model Re-executed Successfully');
    });

    // Step8: Navigate to Simulation Models Managment page
    await test.step('Navigate to Simulation Models Management page', async () => {
        await homeOperationPage.navigateToSimulationModels();
        console.log('Navigate to Simulation Models Management page');
    });

    // Step9: Check Simulation Model Number of Executions in Managment Page
    await test.step('Check Simulation Model Number of Executions in Managment Page', async () => {
        expect(await simulationModelManagementPage.checkNumberOfExecutionsInManagmentPage(simulationModelData.getSimulationModelArName())).toBe(true);
        console.log('Simulation Model Number of Executions checked Successfully');
    });

    // Step10: Check Simulation Model Number of Executions in Simulation Model Versions Page
    await test.step('Check Simulation Model Number of Executions in Simulation Model Versions Page', async () => {
        expect(await simulationModelManagementPage.checkNumberOfExecutionsInModelVersionsPage(simulationModelData)).toBe(true);
        console.log('Simulation Model Number of Executions checked Successfully'); 
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