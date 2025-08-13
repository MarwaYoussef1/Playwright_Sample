//const { test, expect } = require('@playwright/test');
import { test, expect } from '../../fixtures.js';
const { LoginPage } = require('../../../src/Pages/LoginPage.js');
const { HomePage } = require('../../../src/Pages/AdminPortal/HomePage.js');
const { LookupsManagmentPage } = require('../../../src/Pages/AdminPortal/Lookups/LookupsManagmentPage.js');
const { LookupData } = require('../../../src/Models/AdminPortal/LookupData.js');



let loginPage;
let homePage;
let lookupsManagmentPage;
let lookupData;



test('Create New Lookup Form IO', async ({page}) => {
  
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    lookupsManagmentPage = new LookupsManagmentPage(page);
    lookupData = new LookupData();
    var baseUrl = global.testConfig.BASE_URL;
    //var adminusername = global.testConfig.ADMIN_USER;
    //var adminpassword = global.testConfig.ADMIN_PASS;
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
    await test.step('Navigate to Lookup page', async () => {
        await homePage.navigateToLookupsManagment();
        console.log('Navigate to LookUps Managment page');
    });
    // Step2: Create New Lookup
    await test.step('Create New Lookup', async () => {
        await lookupsManagmentPage.createNewLookup(lookupData, true);
        console.log('New lookup Created Successfully');
    });
    // Step3: Check on Lookup in Lookups table
    await test.step('Search on Lookup created', async () => {
        expect(await lookupsManagmentPage.checkNewLookupAdded(lookupData)).toBe(true);
        console.log('New lookup Details Checked Successfully');
    });
    //Step4: Logout From Admin portal
    await test.step('Logout from Admin Portal', async () => {
        await homePage.logout();
        console.log('Logout done Successfully');
       
    });

});