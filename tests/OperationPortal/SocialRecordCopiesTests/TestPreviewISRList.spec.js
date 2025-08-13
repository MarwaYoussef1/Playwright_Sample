//const { test, expect } = require('@playwright/test');
import { test, expect } from '../../fixtures.js';
const { LoginPage } = require('../../../src/Pages/LoginPage.js');
const { HomeOperationPage } = require('../../../src/Pages/OperationPortal/HomeOperationPage.js');
const { ISRListPreviewPage } = require('../../../src/Pages/OperationPortal/SocialRecordCopies/ISRListPreviewPage.js');


let loginPage;
let homeOperationPage;
let isrListPreviewPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homeOperationPage = new HomeOperationPage(page);
    isrListPreviewPage = new ISRListPreviewPage(page);

    var baseUrl = global.testConfig.OPERATION_BASE_URL;
    var adminusername = global.testConfig.ISR_MANAGER;
    var adminpassword = global.testConfig.ISR_MANAGER_PASS;


    // Step0: Login 
    await test.step('Login to Operation Portal', async () => {
        await loginPage.gotoOperationPortal(baseUrl);
        var loginSuccess = await loginPage.login(adminusername, adminpassword);
        expect(loginSuccess).toBe(true);
        console.log('login done successfully');
    });
});

test('Preview ISR List', async ({ page }) => {
    // Step1: Navigate to ISR List Preview page
    await test.step('Navigate to ISR List Preview page', async () => {
        await homeOperationPage.navigateToISRListPreviewTab();
        console.log('Navigate to ISR List Preview page');
    });

    // Step2: Search ISR List Preview page by National ID
    await test.step('Search ISR List Preview page by National ID', async () => {
        expect(await isrListPreviewPage.getIsrByNationalId(global.testConfig.SocialRecordCopies.nationalId)).toBe(true);
        console.log('Search ISR List Preview page by National ID done successfully');
    });

    // Step3: Open IBR List Preview page
    await test.step('Open IBR List Preview page', async () => {
        expect(await isrListPreviewPage.openIBRListPreviewPage()).toBe(true);
        console.log('IBR List Preview page opened successfully');
    });

    // Step4: Filter IBR List
    await test.step('Filter IBR List', async () => {
        expect(await isrListPreviewPage.filterIBRList()).toBe(true);
        console.log('IBR List Filtered successfully');
    });


    // Step5: Get Back to ISR List Preview page
    await test.step('Get Back to ISR List Preview page', async () => {
        await isrListPreviewPage.backPage();
        console.log('Get Back to ISR List Preview page');
    });

    // Step6: Search ISR List Preview page by National ID
    await test.step('Search ISR List Preview page by National ID', async () => {
        expect(await isrListPreviewPage.getIsrByNationalId(global.testConfig.SocialRecordCopies.nationalId)).toBe(true);
        console.log('Search ISR List Preview page by National ID done successfully');
    });

    // Step7: Open AU List Preview page
    await test.step('Open AU List Preview page', async () => {
        expect(await isrListPreviewPage.openAUListPreviewPage()).toBe(true);
        console.log('AU List Preview page opened successfully');
    });

    // Step8: Filter AU List
    await test.step('Filter AU List', async () => {
        expect(await isrListPreviewPage.filterAUList()).toBe(true);
        console.log('AU List Filtered successfully');
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
