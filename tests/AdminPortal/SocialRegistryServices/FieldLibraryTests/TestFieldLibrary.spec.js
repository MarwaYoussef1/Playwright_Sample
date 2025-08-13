//const { test, expect } = require('@playwright/test');
import { test, expect } from '../../../fixtures.js';
const { LoginPage } = require('../../../../src/Pages/LoginPage');
const { HomePage } = require('../../../../src/Pages/AdminPortal/HomePage');
const { FieldLibraryManagementPage } = require('../../../../src/Pages/AdminPortal/FieldLibrary/FieldLibraryManagementPage');

let loginPage;
let homePage;
let fieldLibraryManagementPage;


test.beforeEach(async ({ page }) => {
   
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    fieldLibraryManagementPage = new FieldLibraryManagementPage(page);
    var baseUrl = global.testConfig.BASE_URL;
    var adminusername = global.testConfig.FIELD_MANAGEMENT_SPECIALIST;
    var adminpassword = global.testConfig.FIELD_MANAGEMENT_SPECIALIST_PASS;


    // Step0: Login 
    await test.step('Login to Admin Portal', async () => {
        await loginPage.gotoAdminPortal(baseUrl);
        var loginSuccess = await loginPage.login(adminusername, adminpassword);
        expect(loginSuccess).toBe(true);
        console.log('login done successfully');
    });
});

test('Activate & Deactivate Field without link to ISR schema & calculation field', async () => {
    // Step1: Navigate to Field Library Managment page
    await test.step('Navigate to Field Library Managment page', async () => {
        await homePage.navigateToFieldLibrary();
        console.log('Navigate to Field Library Managment page');
    });

    // Step2: Activate Field Library
    await test.step('Activate Field Library', async () => {
        await fieldLibraryManagementPage.navigateToApprovedFieldsTab();
        expect(await fieldLibraryManagementPage.toggleFieldLibraryEntry(global.testConfig.FieldLibrary.unlockedField, false)).toBe(true);
        console.log('Field Library Activated Successfully');
    });

    // Step3: Deactivate Field Library
    await test.step('Deactivate Field Library', async () => {
        expect(await fieldLibraryManagementPage.toggleFieldLibraryEntry(global.testConfig.FieldLibrary.unlockedField, false)).toBe(true);
        console.log('Field Library Deactivated Successfully');
    });
});

test('Deactivate Field calculated field', async () => {
    // Step1: Navigate to Field Library Managment page
    await test.step('Navigate to Field Library Managment page', async () => {
        await homePage.navigateToFieldLibrary();
        console.log('Navigate to Field Library Managment page');
    });

    // Step2: Deactivate Field Library
    await test.step('Deactivate Blocked Field Library', async () => {
        expect(await fieldLibraryManagementPage.toggleFieldLibraryEntry(global.testConfig.FieldLibrary.lockedField, true)).toBe(true);
        console.log('Field Library Deactivation Prevented Successfully');
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