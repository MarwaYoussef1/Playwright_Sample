//const { test, expect } = require("@playwright/test");
import { test, expect } from '../../fixtures.js';
const { LoginPage } = require('../../../src/Pages/LoginPage');
const { HomePage } = require("../../../src/Pages/AdminPortal/HomePage");
const { StreamData } = require("../../../src/Models/AdminPortal/StreamData");
const { StreamManagementPage } = require("../../../src/Pages/AdminPortal/ProgramsManagement/StreamManagement/StreamManagementPage");
const { MainProgramData } = require("../../../src/Models/AdminPortal/MainProgramData");
const { MainProgramManagementPage } = require("../../../src/Pages/AdminPortal/ProgramsManagement/MainProgramManagement/MainProgramManagementPage");
const { SubProgramsManagementPage } = require("../../../src/Pages/AdminPortal/ProgramsManagement/SubProgramsManagement/SubProgramsManagmentPage");
const { SubProgramsData } = require("../../../src/Models/AdminPortal/SubProgramsData");
const { BenefitsManagmentPage } = require("../../../src/Pages/AdminPortal/ProgramsManagement/BenefitsManagement/BenefitsManagementPage");
const { BenefitsData } = require("../../../src/Models/AdminPortal/BenefitsData");
const { Programs } = require("../../../src/Apis/Business/Programs");

let loginPage,homePage,adminusername ,adminpassword , programs;
let streamManagementPage,streamData ,stream , createdStreamName ;
let  mainProgramManagementPage, mainProgramData  , mainProgram , createdMainProgramName;
let subProgramsManagementPage, subProgramsData,subProgram ,createdSubProgramName;
let  benefitsManagementPage, benefitsData;
let streamNumber, benefitNumber ;


/**
 * Test setup: Initializes all required page objects and logs into the admin portal.
 */
test.beforeEach(async ({ page }) => {


  loginPage = new LoginPage(page);
  homePage = new HomePage(page);
  streamManagementPage = new StreamManagementPage(page);
  streamData = new StreamData();
  mainProgramManagementPage = new MainProgramManagementPage(page);
  mainProgramData = new MainProgramData();
  subProgramsManagementPage = new SubProgramsManagementPage(page);
  subProgramsData = new SubProgramsData();
  benefitsManagementPage = new BenefitsManagmentPage(page);
  benefitsData = new BenefitsData();
  programs = new Programs();

  var baseUrl = global.testConfig.BASE_URL;
  var deliveryManagerusername = global.testConfig.BUSINESS_DELIVERY_ADMIN;
  var deliveryManagerpassword = global.testConfig.BUSINESS_DELIVERY_ADMIN_PASS;

  adminusername = global.testConfig.ADMIN_USER;
  adminpassword = global.testConfig.ADMIN_PASS;

  await test.step("Login to Admin Portal", async () => {
  await loginPage.gotoAdminPortal(baseUrl);
  var loginSuccess = await loginPage.login(adminusername, adminpassword);
  expect(loginSuccess).toBe(true);
  console.log("login done successfully");
  });

});

/**
 * Test case: Check Created Stream Data Detials.
*/
test("Check Created Stream Data Detials", async () => {
      // Step1: Create And Appove Stream From API
      await test.step("Create And Appove Stream From API", async () => {
      streamNumber = await programs.createStreamAndApproveAPI(adminusername, adminpassword, streamData) 
      expect(streamNumber).not.toBeNull();
      console.log('API Stream', streamNumber);
      });

      // Step2: Navigate to Stream detials page
      await test.step("Navigate to StreamManagement page and Compare Data with Expected Data", async () => {
      await homePage.navigateToStreamsManagement();
      var streamMatch = await streamManagementPage.validateStreamDetails(streamData , streamNumber[1]);
      expect (streamMatch).toBe(true); 
      });
});

/**
 * Test case: Check Created Main Program Data Details.
 */
test("Check Created Main Program Data Details", async () => {

   // Step1: Create and approve stream and create New Main Program.
     await test.step("Create and Approve stream and create New Main Program from API", async () => {
        stream = await programs.createStreamAndApproveAPI(adminusername, adminpassword, streamData) 
        createdStreamName = streamData.getstreamArabicName();
        mainProgram = await programs.createMainProgramAPI(adminusername, adminpassword, mainProgramData, stream[0]);
        expect(mainProgram).not.toBeNull();
        console.log('API Main Program', mainProgram);
     });

       // Step2: Navigate to Main Program Details Page
       await test.step("Navigate to Main Program Details Page and Compare Data with Expected Data", async () => {
        await homePage.navigateToMainProgramManagement();
        var mainProgramMatch = await mainProgramManagementPage.validateMainProgramDetails(mainProgramData , mainProgram[1],createdStreamName);
        expect (mainProgramMatch).toBe(true);
    });

});

/**
 * Test case: Check Created Sub Program Data Details.
 */
/*test("Check Created Sub Program Data Details", async () => {
 // Step1: Create and approve stream ,Main Program and create New Sub Program.
   await test.step("Create and approve stream ,Main Program and create New Sub Program from API", async () => {
     stream = await programs.createStreamAndApproveAPI(adminusername, adminpassword, streamData) 
     createdStreamName = streamData.getstreamArabicName();
     mainProgram = await programs.createMainProgramAndApproveAPI(adminusername, adminpassword, mainProgramData, stream[0]);
     createdMainProgramName = mainProgramData.getArabicMainProgramName();
     subProgram = await programs.createSubProgramAPI(adminusername, adminpassword, subProgramsData, mainProgram[0]);
     expect(subProgram).not.toBeNull();
   });

  // Step2: Navigate to Sub Program Details Page
  await test.step("Navigate to Sub Program Details Page and Compare Data with Expected Data", async () => {
      await homePage.navigateToSubProgramsManagement();
      var subProgramMatch = await subProgramsManagementPage.validateSubProgramDetails(subProgramsData,subProgram[1],createdStreamName ,createdMainProgramName);
      expect(subProgramMatch).toBe(true);
  });
});

/**
 * Test case: Check Created Benefits Data Details.
 */
/*test("Check Created Benefits Data Details", async () => {
    // Step1: Create and approve stream ,Main Program and New Sub Program.
    await test.step("Create and approve stream ,Main Program and New Sub Program from API", async () => {
      stream = await programs.createStreamAndApproveAPI(adminusername, adminpassword, streamData) 
      createdStreamName = streamData.getstreamArabicName();
      mainProgram = await programs.createMainProgramAndApproveAPI(adminusername, adminpassword, mainProgramData, stream[0]);
      createdMainProgramName = mainProgramData.getArabicMainProgramName();
      subProgram = await programs.createSubProgramAndApproveAPI(adminusername, adminpassword, subProgramsData, mainProgram[0]);
      createdSubProgramName = subProgramsData.getArabicSubProgramName();
      benefitNumber = await programs.createBenefitAPI(adminusername, adminpassword, benefitsData, subProgram[0]);
      expect(benefitNumber).not.toBeNull();
      console.log('API Benefit', benefitNumber);
  });

  // Step2: Navigate to Benefits Details Page
  await test.step("Navigate to Benefits Details Page and Compare Data with Expected Data", async () => {
      await homePage.navigateToBenefitsManagement();
      var benefitMatch = await benefitsManagementPage.validateBenefitDetails(benefitsData,benefitNumber[1],createdStreamName ,createdMainProgramName ,createdSubProgramName);
      expect(benefitMatch).toBe(true);
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
