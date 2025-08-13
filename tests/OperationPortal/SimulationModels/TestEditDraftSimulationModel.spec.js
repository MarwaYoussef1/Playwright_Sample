//const { test, expect } = require('@playwright/test');
import { test, expect } from '../../fixtures.js';
const { LoginPage } = require('../../../src/Pages/LoginPage');
const { HomeOperationPage } = require('../../../src/Pages/OperationPortal/HomeOperationPage');
const { SimulationModelData } = require('../../../src/Models/OperationPortal/SimulationModelData');
const { SimulationModelManagementPage } = require('../../../src/Pages/OperationPortal/SimualtionModel/SimulationModelManagementPage');


let loginPage;
let homeOperationPage;
let simulationModelData;
let simulationModelManagementPage;


test.beforeEach(async ({page }) => {
    loginPage = new LoginPage(page);
    homeOperationPage = new HomeOperationPage(page);
    simulationModelData = new SimulationModelData();
    simulationModelManagementPage = new SimulationModelManagementPage(page);


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

test('Edit Draft Simulation Model', async ({ page }) => {
    // Step1: Navigate to Simulation Models Managment page
    await test.step('Navigate to Simulation Models Management page', async () => {
        await homeOperationPage.navigateToSimulationModels();
        console.log('Navigate to Simulation Models Management page');
    });

    // Step2: Fill Simulation Model Information
    await test.step('Fill Simulation Model First Tab then Save it as Draft', async () => {
        expect(await simulationModelManagementPage.defineSimulationModelAsDraft(simulationModelData)).toBe(true);
        console.log('Simulation Model First Tab filled and saved as Draft Successfully');
    });

    // Step3: Search & Verify Draft Simulation Model Information
    await test.step('Search on Draft Simulation Model created', async () => {
        expect(await simulationModelManagementPage.checkDraftSimulationModelCreated(simulationModelData, false)).toBe(true);
        console.log('Draft Simulation Model Details Checked Successfully');
    });

    // Step4: Edit Draft Simulation Model
    await test.step('Edit Draft Simulation Model', async () => {
        expect(await simulationModelManagementPage.editDraftSimulaionModel(simulationModelData)).toBe(true);
        console.log('Draft Simulation Model Edited Successfully');
    });

    // Step5: Search & Verify Draft Simulation Model Information after Edit
    await test.step('Search on Draft Simulation Model edited', async () => {
        expect(await simulationModelManagementPage.checkDraftSimulationModelCreated(simulationModelData, true)).toBe(true);
        console.log('Draft Simulation Model Details after edit Checked Successfully');
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