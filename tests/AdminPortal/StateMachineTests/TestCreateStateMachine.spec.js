//const { test, expect } = require('@playwright/test');
import { test, expect } from '../../fixtures.js';
const { LoginPage } = require('../../../src/Pages/LoginPage');
const { HomePage } = require('../../../src/Pages/AdminPortal/HomePage');
const { StateMachineManagmentPage } = require('../../../src/Pages/AdminPortal/StateMachine/StateMachineManagmentPage');
const { StateMachineData } = require('../../../src/Models/AdminPortal/StateMachineData');



let loginPage;
let homePage;
let stateMachineManagmentPage;
let stateMachineData;

test('Create and View New State Machine', async ({ page}) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    stateMachineManagmentPage = new StateMachineManagmentPage(page);
    stateMachineData = new StateMachineData();
    var baseUrl = global.testConfig.BASE_URL;
    var adminusername = global.testConfig.GENERAL_SETTING_USER;
    var adminpassword = global.testConfig.GENERAL_SETTING_PASS;
    // Step0: Login 
    await test.step('Login to Admin Portal', async () => {
        await loginPage.gotoAdminPortal(baseUrl);
        var loginSuccess = await loginPage.login(adminusername, adminpassword);
        expect(loginSuccess).toBe(true);
        console.log('login done successfully');
    });
    // Step1: Navigate to Lookup list page
    await test.step('Navigate to State Machine Managment page', async () => {
        await homePage.navigateToStateMachineManagment();
        console.log('Navigate to State Machine Managment page');
    });

    // Step2: Create New State Machine
    await test.step('Create New State Machine', async () => {
        expect(await stateMachineManagmentPage.createNewStateMachine(stateMachineData)).toBe(true);
        console.log('New State Machine Created Successfully');
    });

    // Step3: Check on State Machine in State Machines table
    await test.step('Search on State Machine created', async () => {
        var stateMachineFound = await stateMachineManagmentPage.checkNewStateMachineAdded(stateMachineData);
        expect(stateMachineFound).toBe(true);
        console.log('New State Machine Details Checked Successfully');
    });

    //Step4: Logout From Admin portal
    await test.step('Logout from Admin Portal', async () => {
        await homePage.logout();
        console.log('Logout done Successfully');
    
    });

});