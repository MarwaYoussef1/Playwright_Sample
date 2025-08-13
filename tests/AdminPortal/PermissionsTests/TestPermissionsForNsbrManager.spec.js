const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../src/Pages/LoginPage');
const { HomePage } = require('../../../src/Pages/AdminPortal/HomePage');
const { FieldLibraryUpdateRequestsPage } = require('../../../src/Pages/AdminPortal/FieldLibraryUpdateRequests/FieldLibraryUpdateRequestsPage');
const { FieldLibraryManagementPage } = require('../../../src/Pages/AdminPortal/FieldLibrary/FieldLibraryManagementPage');

let loginPage;
let homePage;
let fieldLibraryUpdateRequestsPage;
let fieldLibraryManagementPage;

let context;
let page;
test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    fieldLibraryUpdateRequestsPage = new FieldLibraryUpdateRequestsPage(page);
    fieldLibraryManagementPage = new FieldLibraryManagementPage(page);

    var baseUrl = global.testConfig.BASE_URL;
    var adminusername = global.testConfig.NSBR_MANAGER;
    var adminpassword = global.testConfig.NSBR_MANAGER_PASS;


    // Step0: Login 
    await test.step('Login to Admin Portal', async () => {
        await loginPage.gotoAdminPortal(baseUrl);
        var loginSuccess = await loginPage.login(adminusername, adminpassword);
        expect(loginSuccess).toBe(true);
        console.log('login done successfully');
    });
});

test('Verify Permissions Granted to NSBR Manager', async () => {
    // Step1: Verify User can Manage Social Record Managment page
    await test.step('Verify User can manage Social Record Managment page', async () => {
        expect(await homePage.navigateToSocialRecordCopies()).toBe(true);
        console.log('Manage Social Record Managment page allowed for User');
    });

    // Step2: Verify User can View or Manage my Tasks page
    await test.step('Verify User can View or Manage to My Tasks page', async () => {
        expect(await homePage.verifyTasksPage()).toBe(true);
        console.log('View and Manage My Tasks page is allowed for User');
    });

    // Step3: Verify User can Manage Field Library Update Requests
    await test.step('Verify User can Manage Field Library Update Requests', async () => {
        expect(await homePage.navigateToFieldLibraryRequests()).toBe(true);
        console.log('Manage Field Library Update Requests is allowed for User');
    });

    // Step4: Verify User can View Field Library Requests
    await test.step('Verify User can View Field Library Requests', async () => {
        expect(await homePage.navigateToFieldLibrary()).toBe(true);
        console.log('View Field Library Requests is allowed for User');
    });

    // Step5: Verify User can Manage Field Library Requests
    await test.step('Verify User can not Manage Field Library Requests', async () => {
        //expect(await homePage.navigateToFieldLibrary()).toBe(true);
        expect(await fieldLibraryManagementPage.verifyUserCanManageFieldLibrary()).toBe(false);
        console.log('Manage Field Library Requests is allowed for User');
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