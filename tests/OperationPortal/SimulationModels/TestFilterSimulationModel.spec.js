//const { test, expect } = require('@playwright/test');
import { test, expect } from '../../fixtures.js';
const { LoginPage } = require('../../../src/Pages/LoginPage.js');
const { HomeOperationPage } = require('../../../src/Pages/OperationPortal/HomeOperationPage.js');
const { SimulationModelData } = require('../../../src/Models/OperationPortal/SimulationModelData.js');
const { SimulationModelManagementPage } = require('../../../src/Pages/OperationPortal/SimualtionModel/SimulationModelManagementPage.js');
const { Simulation } = require("../../../src/Apis/Business/Simulation.js");


let loginPage;
let homeOperationPage;
let simulationModelData;
let simulationModelManagementPage;
let simulation;


test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homeOperationPage = new HomeOperationPage(page);
    simulationModelData = new SimulationModelData();
    simulationModelManagementPage = new SimulationModelManagementPage(page);
    simulation = new Simulation(page);

    var baseUrl = global.testConfig.OPERATION_BASE_URL;
    var programsAndPoliciesSpecialist_UserName = global.testConfig.PROGRAMS_AND_POLICIES_SPECIALIST;
    var programsAndPoliciesSpecialist_Password = global.testConfig.PROGRAMS_AND_POLICIES_SPECIALIST_PASS;

    // Step0: Login 
    await test.step('Login to Operation Portal', async () => {
        await loginPage.gotoOperationPortal(baseUrl);
        var loginSuccess = await loginPage.login(programsAndPoliciesSpecialist_UserName, programsAndPoliciesSpecialist_Password);
        expect(loginSuccess).toBe(true);
        console.log('login done successfully');
    });
});

test('Filter Simulation Model', async ({ page }) => {
    // Step1: Create & Approve simulation model using API
    await test.step('API -Create & Approve simulation model', async () => {
        await simulation.createsimulationModelAndApproveAPI(global.testConfig.ADMIN_USER, global.testConfig.ADMIN_PASS, simulationModelData);
    });

    // Step2: Navigate to Simulation Models Managment page
    await test.step('Navigate to Simulation Models Management page', async () => {
        await homeOperationPage.navigateToSimulationModels();
        console.log('Navigate to Simulation Models Management page');
    });

    // Step3: Filter Simulation Model
    await test.step('Filter Simulation Model', async () => {
        expect(await simulationModelManagementPage.filterNewSimulationModelAdded(simulationModelData)).toBe(true);
        console.log('Simulation Model Filtered Successfully');
    });

    // Step4: Filter Simulation Model Versions
    await test.step('Filter Simulation Model Versions', async () => {
        expect(await simulationModelManagementPage.filterSimulationModelVersions(simulationModelData)).toBe(true);
        console.log('Simulation Model Versions Filtered Successfully');
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