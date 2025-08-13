const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../src/Pages/LoginPage');
const { HomePage } = require('../../../src/Pages/AdminPortal/HomePage');
const { FieldLibraryUpdateRequestsPage } = require('../../../src/Pages/AdminPortal/FieldLibraryUpdateRequests/FieldLibraryUpdateRequestsPage');

let loginPage;
let homePage;
let fieldLibraryUpdateRequestsPage;

let context;
let page;
test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    fieldLibraryUpdateRequestsPage = new FieldLibraryUpdateRequestsPage(page);
    var baseUrl = global.testConfig.BASE_URL;
    var adminusername = global.testConfig.BUSINESS_DELIVERY_ADMIN;
    var adminpassword = global.testConfig.BUSINESS_DELIVERY_ADMIN_PASS;


    // Step0: Login 
    await test.step('Login to Admin Portal', async () => {
        await loginPage.gotoAdminPortal(baseUrl);
        var loginSuccess = await loginPage.login(adminusername, adminpassword);
        expect(loginSuccess).toBe(true);
        console.log('login done successfully');
    });
});

test('Verify Permissions Granted to Business Delivery Admin', async () => {
    // Step1: Verify User can not Manage Social Record Managment page
    await test.step('Verify User can not manage Social Record Managment page', async () => {
        expect(await homePage.navigateToSocialRegistryServices()).toBe(false);
        console.log('Manage Social Record Managment page not allowed for User');
    });

    // Step2: Verify User can not View or Manage my Tasks page
    await test.step('Verify User can not View or Manage to My Tasks page', async () => {
        expect(await homePage.verifyTasksPage()).toBe(false);
        console.log('View and Manage My Tasks page is not allowed for User');
    });

    // Step3: Verify User can't Manage Field Library Update Requests
    await test.step('Verify User can not Manage Field Library Update Requests', async () => {
        await homePage.navigateToFieldLibraryRequests();
        expect(await fieldLibraryUpdateRequestsPage.verifyfieldLibraryUpdateRequestButtonExists()).toBe(false);
        console.log('Manage Field Library Update Requests is not allowed for User');
    });

    // Step4: Verify User can't View Field Library Requests
    await test.step('Verify User can not View Field Library Requests', async () => {
        expect(await homePage.navigateToFieldLibrary()).toBe(false);
        console.log('View Field Library Requests is not allowed for User');
    });

    // Step5: Verify User can't Manage Field Library Requests
    await test.step('Verify User can not Manage Field Library Requests', async () => {
        expect(await homePage.navigateToFieldLibrary()).toBe(false);
        console.log('Manage Field Library Requests is not allowed for User');
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
        await context.close();
    });

});