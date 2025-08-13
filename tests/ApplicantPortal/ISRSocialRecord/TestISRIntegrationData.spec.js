import { test, expect } from '../../fixtures.js';

const { LoginPage } = require('../../../src/Pages/LoginPage.js');
const { ApplicantLoginPage } = require('../../../src/Pages/ApplicantPortal/ApplicantLoginPage.js');
const { ApplicantHomePage } = require('../../../src/Pages/ApplicantPortal/ApplicantHomePage.js');
const { DashboardPage} = require("../../../src/Pages/ApplicantPortal/Dashboard/DashboardPage.js");
const { MyRequestsPage} = require("../../../src/Pages/ApplicantPortal/Dashboard/MyRequestsPage.js");
const { UserData } = require('../../../src/Models/ApplicantPortal/UserData.js');
const { Users } = require('../../../src/Apis/Business/Users.js');

let context , page;
let loginPage , baseUrl , users ,userData , createdApplicantUserName;
let applicantLoginPage , applicantHomePage ;
let applicantUsername ,applicantPassword;
let dashboardPage , myRequestsPage ;

/**
 * Test setup: Initializes all required page objects and logs into the applicant portal.
 */
test.beforeEach(async ({ browser }) => {
  
    context = await browser.newContext();
    page = await context.newPage();

    loginPage = new LoginPage(page);
    
    applicantLoginPage  = new ApplicantLoginPage(page); 
    applicantHomePage  = new ApplicantHomePage(page); 

    dashboardPage = new DashboardPage(page);
    myRequestsPage = new MyRequestsPage(page);

    users = new Users();
    userData = new UserData();

    baseUrl = global.testConfig.APPLICANT_BASE_URL;
    applicantUsername = global.testConfig.APPLICANT_USERNAME;
    applicantPassword = global.testConfig.APPLICANT_PASSWORD; 

    await test.step("Create New User in Applicant Portal", async () => {
        var result = await users.createApplicantUser(applicantUsername, applicantPassword, userData);
        expect(result).toBe(true);
        createdApplicantUserName = userData.getUsername()
        console.log("User created:", createdApplicantUserName);
    });
});

test('Record Status And Fetch Integration Data', async () => {
  
      // Step1: Open Applicant Portal
      await test.step("Login to Applicant Portal with New User", async () => {
        await loginPage.gotoApplicantPortal(baseUrl);
        var loginSuccess =  await loginPage.loginApplicant(createdApplicantUserName, applicantPassword);
        expect(loginSuccess).toBe(true);
        console.log("login done successfully");
      });

      // Step2: ISR Intergation Data Request for New User
      await test.step("Create ISR Intergation Data Request for New User", async () => {
        var firstProgressPercentage =  await applicantHomePage.createISRIntergationData();
        expect(firstProgressPercentage).toBe(true);
      });

      // Step4: Check My Requests in Dashboard.
      await test.step("Checking My Requests in Dashboard", async () => {

        var dashboard =  await applicantHomePage.navigateToDashboard();
        expect(dashboard).toBe(true);

        var myRequests =  await dashboardPage.navigateToMyRequests();
        expect(myRequests).toBe(true);

        var ExpectedType = global.testConfig.Applicant.FetchDataRequestType
        var ExpectedStatus = global.testConfig.Applicant.FetchDataRequestStatus
        var request = await myRequestsPage.checkRequestTypeAndStatus(ExpectedType , ExpectedStatus);
        expect(request).toBe(true);

        });
  });
  
  
