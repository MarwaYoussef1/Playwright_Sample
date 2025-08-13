//const { test, expect } = require('@playwright/test');
import { test, expect } from '../../fixtures.js';
const { LoginPage } = require('../../../src/Pages/LoginPage');
const { HomeOperationPage } = require('../../../src/Pages/OperationPortal/HomeOperationPage');
const { SimulationModelData } = require('../../../src/Models/OperationPortal/SimulationModelData');
const { SimulationModelManagementPage } = require('../../../src/Pages/OperationPortal/SimualtionModel/SimulationModelManagementPage');
const { ComponentsAuditLogsPage } = require("../../../src/Pages/ComponentsAuditLogsPage.js");

let loginPage;
let homeOperationPage;
let simulationModelData;
let simulationModelManagementPage;
let componentsAuditLogsPage;

test.beforeEach(async ({  page }) => {
    loginPage = new LoginPage(page);
    homeOperationPage = new HomeOperationPage(page);
    simulationModelData = new SimulationModelData();
    simulationModelManagementPage = new SimulationModelManagementPage(page);
    componentsAuditLogsPage = new ComponentsAuditLogsPage(page);


    var baseUrl = global.testConfig.OPERATION_BASE_URL;
   // var adminusername = global.testConfig.PROGRAMS_AND_POLICIES_SPECIALIST;
    //var adminpassword = global.testConfig.PROGRAMS_AND_POLICIES_SPECIALIST_PASS;

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

test('Define New Simulation Model', async () => {
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

    // Step4: Navigate to Components Audit Logs page
    await test.step('Navigate to Components Audit Logs page', async () => {
        await homeOperationPage.navigateToComponentsAuditLogsTab();
        console.log('Navigate to Components Audit Logs page');
    });

    // Step5: Verify Simulaion Model Created Added To Audit Logs
    await test.step('Verify Simulaion Model Created Added To Audit Logs', async () => {

        var simulationArName = simulationModelData.getSimulationModelArName();
        const simulationMap = [
            { index: 4, expected: () => global.testConfig.SimulationModels.changeCreatorSameUser },
            { index: 8, expected: () => global.testConfig.SimulationModels.changeStatusSuccess }
        ];
        var result = await componentsAuditLogsPage.checkComponentRowDetails(simulationArName ,simulationMap);
        expect(result).toBe(true);
        console.log('Simulaion Model Created Added To Audit Logs Successfully');
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