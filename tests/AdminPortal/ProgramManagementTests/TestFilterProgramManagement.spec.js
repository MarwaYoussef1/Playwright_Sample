//const { test, expect } = require('@playwright/test');
import { test, expect } from '../../fixtures.js';
import Constants from '../../../src/Utils/Constants';
const { StreamData } = require('../../../src/Models/AdminPortal/StreamData');
const { MainProgramData } = require('../../../src/Models/AdminPortal/MainProgramData');
const { SubProgramsData } = require('../../../src/Models/AdminPortal/SubProgramsData');
const { Programs } = require('../../../src/Apis/Business/Programs');
const { BenefitsData } = require('../../../src/Models/AdminPortal/BenefitsData');
const { LoginPage } = require('../../../src/Pages/LoginPage');
const { HomePage } = require("../../../src/Pages/AdminPortal/HomePage");
const { StreamDetailsPage } = require("../../../src/Pages/AdminPortal/ProgramsManagement/StreamManagement/StreamDetailsPage");
const { StreamManagementPage } = require("../../../src/Pages/AdminPortal/ProgramsManagement/StreamManagement/StreamManagementPage");
const { MainProgramPage } = require("../../../src/Pages/AdminPortal/ProgramsManagement/MainProgramManagement/MainProgramPage");
const { MainProgramDetailsPage } = require("../../../src/Pages/AdminPortal/ProgramsManagement/MainProgramManagement/MainProgramDetailsPage");
const { MainProgramManagementPage } = require("../../../src/Pages/AdminPortal/ProgramsManagement/MainProgramManagement/MainProgramManagementPage");
const { SubProgramsManagementPage } = require("../../../src/Pages/AdminPortal/ProgramsManagement/SubProgramsManagement/SubProgramsManagmentPage");
const { SubProgramDetailsPage } = require("../../../src/Pages/AdminPortal/ProgramsManagement/SubProgramsManagement/SubProgramDetailsPage");
const { SubProgramsPage } = require("../../../src/Pages/AdminPortal/ProgramsManagement/SubProgramsManagement/SubProgramsPage");
const { BenefitsPage } = require("../../../src/Pages/AdminPortal/ProgramsManagement/BenefitsManagement/BenefitsPage");
const { BenefitsManagmentPage } = require("../../../src/Pages/AdminPortal/ProgramsManagement/BenefitsManagement/BenefitsManagementPage");


let loginPage, homePage, streamDetailsPage, streamManagementPage,
  mainProgramPage, mainProgramDetailsPage, mainProgramManagementPage,
  subProgramsManagementPage, subProgramDetailsPage, subProgramsPage,
  benefitsPage, benefitsManagmentPage;
let stream, streamData, streamId, streamArName;
let mainProgram1, mainProgram2, mainProgramData, mainProgramData1, mainProgramData2, mainProgram1Id;
let subProgram1, subProgram2, subProgramData, subProgramData1, subProgramData2, subProgram1Id;
let programs;
let benefit1, benefit2, benefitsData, benefitsData1, benefitsData2, benefit1Id;
let baseUrl, adminusername, adminpassword;

test.beforeAll(async () => {
  
  baseUrl = global.testConfig.BASE_URL;
   adminusername = global.testConfig.ADMIN_USER;
   adminpassword = global.testConfig.ADMIN_PASS;

  streamData = new StreamData();
  mainProgramData = new MainProgramData();
  mainProgramData1 = new MainProgramData();
  mainProgramData2 = new MainProgramData();
  subProgramData = new SubProgramsData();
  subProgramData1 = new SubProgramsData();
  subProgramData2 = new SubProgramsData();
  benefitsData = new BenefitsData();
  benefitsData1 = new BenefitsData();
  benefitsData2 = new BenefitsData();
  programs = new Programs();


  mainProgramData2.setRiskCategoryAPI(global.testConfig.createMainProgram.riskCategoryAPIYouth);
  subProgramData2.setApplicationEnablement(global.testConfig.createSubPrograms.applicationEnablementTemp);
  benefitsData2.setBenefitType(global.testConfig.createBenefits.benefitDetails.benefitTypeNonCash);

  stream = await programs.createStreamAndApproveAPI(adminusername, adminpassword, streamData);
  streamId = stream[1];
  streamData.setCreatedStreamId(streamId);
  console.log('Stream ID:', streamId);

  mainProgram1 = await programs.createMainProgramAndApproveAPI(adminusername, adminpassword, mainProgramData1, stream[0]);
  mainProgram1Id = mainProgram1[1];
  console.log('Main Program 1 ID:', mainProgram1Id);

  mainProgram2 = await programs.createMainProgramAndApproveAPI(adminusername, adminpassword, mainProgramData2, stream[0]);
  console.log('Main Program 2 ID:', mainProgram2[1]);

  /*subProgram1 = await programs.createSubProgramAndApproveAPI(adminusername, adminpassword, subProgramData1, mainProgram1[0]);
  subProgram1Id = subProgram1[1];
  console.log('Sub Program 1 ID:', subProgram1Id);

  subProgram2 = await programs.createSubProgramAndApproveAPI(adminusername, adminpassword, subProgramData2, mainProgram1[0]);
  console.log('Sub Program 2 ID:', subProgram2[1]);

  benefit1 = await programs.createBenefitAndApproveAPI(adminusername, adminpassword, benefitsData1, subProgram1[0]);
  benefit1Id = benefit1[1];
  console.log('Benefit 1 ID:', benefit1Id);

  benefit2 = await programs.createBenefitAndApproveAPI(adminusername, adminpassword, benefitsData2, subProgram1[0]);
  console.log('Benefit 2 ID:', benefit2[1]);*/
});


test.beforeEach(async ({page }) => {
 loginPage = new LoginPage(page);
  homePage = new HomePage(page);
  streamDetailsPage = new StreamDetailsPage(page);
  streamManagementPage = new StreamManagementPage(page);
  mainProgramPage = new MainProgramPage(page);
  mainProgramManagementPage = new MainProgramManagementPage(page);
  subProgramsManagementPage = new SubProgramsManagementPage(page);
  subProgramDetailsPage = new SubProgramDetailsPage(page);
  subProgramsPage = new SubProgramsPage(page);
  benefitsPage = new BenefitsPage(page);
  benefitsManagmentPage = new BenefitsManagmentPage(page);
  mainProgramDetailsPage = new MainProgramDetailsPage(page);
});

test('Filter MainProgram, SubProgram, Benefits in Stream Details', async () => {
  // Step0: Login 
  await test.step('Login to Admin Portal', async () => {
    await loginPage.gotoAdminPortal(baseUrl);
    var loginSuccess = await loginPage.login(global.testConfig.BUSINESS_DELIVERY_ADMIN, global.testConfig.BUSINESS_DELIVERY_ADMIN_PASS);
    expect(loginSuccess).toBe(true);
    console.log('login done successfully');
  });
  // Step1: Navigate to streams list page
  await test.step("Navigate to StreamManagement page", async () => {
    await homePage.navigateToStreamsManagement();
    console.log("Navigate to Streams page");
  });
  // Step2: View Stream Details Page
  await test.step("View Stream Details", async () => {
    console.log("View Stream");
    await streamManagementPage.openViewStreamDetailsPage(streamId);
    console.log("New Stream View Page opened Successfully");
  });
  // Step3: Search for Main Program
  await test.step("Search on Main program created", async () => {
    console.log("Search on Main Program created");
    expect(await streamDetailsPage.filterMainProgram(null, mainProgramData1, Constants.MAIN_PROGRAM, null, mainProgramData1)).toBe(true);
    console.log("New Main Program Details Checked Successfully");
  });
  // Step4: Search for Sub Program
  /*await test.step("Search on Sub program created", async () => {
    console.log("Search on Sub Program created");
    expect(await streamDetailsPage.filterSubProgram(Constants.FILTER_SUB_PROGRAMS_INSIDE_STREAM, subProgramData1, Constants.SUB_PROGRAM, null, mainProgramData1, subProgramData1)).toBe(true);
    console.log("New Sub Program Details Checked Successfully");
  });
  // Step5: Search for Benefits
  await test.step("Search on Benefit created", async () => {
    console.log("Search on Benefit created");
    expect(await streamDetailsPage.filterBenefit(Constants.FILTER_BENEFITS_INSIDE_STREAM, benefitsData1, Constants.BENEFIT, null, mainProgramData1, subProgramData1, benefitsData1)).toBe(true);
    console.log("New Benefit Details Checked Successfully");
  });*/
});

/*test('Filter MainProgram, SubProgram, Benefits in Main Program Details', async () => {
  // Step0: Login 
  await test.step('Login to Admin Portal', async () => {
    await loginPage.gotoAdminPortal(baseUrl);
    var loginSuccess = await loginPage.login(global.testConfig.PLATFORM_MANAGER, global.testConfig.PLATFORM_MANAGER_PASS);
    expect(loginSuccess).toBe(true);
    console.log('login done successfully');
  });
  // Step1: Navigate to Main Programs page
  await test.step("Navigate to Main Programs  page", async () => {
    await homePage.navigateToMainProgramManagement();
    console.log("Navigate to Main Program page");
  });
  // Step2: Search for Main Program
  await test.step("Search on Main program created", async () => {
    console.log("Search on Main Program created");
    expect(await mainProgramManagementPage.filterMainProgram(null, mainProgramData1,Constants.MAIN_PROGRAM, streamData, mainProgramData1)).toBe(true);
    console.log("New Main Program Details Checked Successfully");
  });
  // Step3: View Main Program Details Page
  await test.step("View Main Program Details", async () => {
    console.log("View Main Program Details");
    await mainProgramManagementPage.viewMainProgramDetailsPage();
    console.log("New Main Program Page opened Successfully");
  });
  // Step4: Search for Sub Program
  await test.step("Search on Sub program created", async () => {
    console.log("Search on Sub Program created");
    expect(await mainProgramDetailsPage.filterSubProgram(Constants.FILTER_SUB_PROGRAMS_INSIDE_MAINPROGRAM, subProgramData1, Constants.SUB_PROGRAM, null, null, subProgramData1)).toBe(true);
    console.log("New Sub Program Details Checked Successfully");
  });
  // Step5: Search for Benefits
  await test.step("Search on Benefit created", async () => {
    console.log("Search on Benefit created");
    expect(await mainProgramDetailsPage.filterBenefit(Constants.FILTER_BENEFITS_INSIDE_MAINPROGRAM, benefitsData1, Constants.BENEFIT, null, null, subProgramData1, benefitsData1)).toBe(true);
    console.log("New Benefit Details Checked Successfully");
  });
});

test('Filter SubProgram, Benefits in SubProgram Details', async () => {
  // Step0: Login 
  await test.step('Login to Admin Portal', async () => {
    await loginPage.gotoAdminPortal(baseUrl);
    var loginSuccess = await loginPage.login(global.testConfig.GENERAL_SETTING_USER, global.testConfig.GENERAL_SETTING_PASS);
    expect(loginSuccess).toBe(true);
    console.log('login done successfully');
  });
  // Step1: Navigate to Sub Programs page
  await test.step("Navigate to Sub Programs  page", async () => {
    await homePage.navigateToSubProgramsManagement();
    console.log("Navigate to Sub Program page");
  });
  // Step2: Search for Sub Program
  await test.step("Search on Sub program created", async () => {
    console.log("Search on Sub Program created");
    expect(await subProgramsManagementPage.filterSubProgram(Constants.FILTER_SUB_PROGRAMS_OUTSIDE, subProgramData1, Constants.SUB_PROGRAM, streamData, mainProgramData1, subProgramData1)).toBe(true);
    console.log("New Sub Program Details Checked Successfully");
  });
  // Step3: View Sub Program Details Page
  await test.step("View Sub Program Details", async () => {
    console.log("View Sub Program Details");
    await subProgramsManagementPage.viewSubProgramDetailsPage();
    console.log("New Sub Program Page opened Successfully");
  });
  // Step4: Search for Benefits
  await test.step("Search on Benefit created", async () => {
    console.log("Search on Benefit created");
    expect(await subProgramDetailsPage.filterBenefit(Constants.FILTER_BENEFITS_INSIDE_SUB_PROGRAM, benefitsData1, Constants.BENEFIT, null, null, null, benefitsData1)).toBe(true);
    console.log("New Benefit Details Checked Successfully");
  });
});

test('Filter Benefits in Benefits Details', async () => {
  // Step0: Login 
  await test.step('Login to Admin Portal', async () => {
    await loginPage.gotoAdminPortal(baseUrl);
    var loginSuccess = await loginPage.login(global.testConfig.GENERAL_SETTING_USER, global.testConfig.GENERAL_SETTING_PASS);
    expect(loginSuccess).toBe(true);
    console.log('login done successfully');
  });
  // Step1: Navigate to Benefits page
  await test.step("Navigate to Benefits  page", async () => {
    await homePage.navigateToBenefitsManagement();
    console.log("Navigate to Benefits page");
  });
  // Step2: Search for Benefits
  await test.step("Search on Benefits created", async () => {
    console.log("Search on Benefits created");
    expect(await benefitsManagmentPage.filterBenefit(Constants.FILTER_BENEFITS_OUTSIDE, benefitsData1, Constants.BENEFIT, streamData, mainProgramData1, subProgramData1, benefitsData1)).toBe(true);
    console.log("New Benefits Details Checked Successfully");
  });

});*/

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
