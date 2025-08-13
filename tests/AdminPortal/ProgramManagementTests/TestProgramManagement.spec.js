//const { test, expect } = require("@playwright/test");
import { test, expect } from '../../fixtures.js';
import Constants from '../../../src/Utils/Constants.js';

const { LoginPage } = require('../../../src/Pages/LoginPage');
const { HomePage } = require("../../../src/Pages/AdminPortal/HomePage");
const { StreamPage} = require("../../../src/Pages/AdminPortal/ProgramsManagement/StreamManagement/StreamPage");
const { StreamData } = require("../../../src/Models/AdminPortal/StreamData");
const { StreamManagementPage} = require("../../../src/Pages/AdminPortal/ProgramsManagement/StreamManagement/StreamManagementPage");
const { MainProgramPage } = require("../../../src/Pages/AdminPortal/ProgramsManagement/MainProgramManagement/MainProgramPage");
const { MainProgramData} = require("../../../src/Models/AdminPortal/MainProgramData");
const { MainProgramManagementPage} = require("../../../src/Pages/AdminPortal/ProgramsManagement/MainProgramManagement/MainProgramManagementPage");
const { SubProgramsManagementPage} = require("../../../src/Pages/AdminPortal/ProgramsManagement/SubProgramsManagement/SubProgramsManagmentPage");
const { SubProgramsData} = require("../../../src/Models/AdminPortal/SubProgramsData");
const { SubProgramsPage} = require("../../../src/Pages/AdminPortal/ProgramsManagement/SubProgramsManagement/SubProgramsPage");
const { TaskDetailsPage} = require("../../../src/Pages/AdminPortal/Tasks/TaskDetailsPage");
const { TasksPage } = require("../../../src/Pages/AdminPortal/Tasks/TasksPage");
const { BenefitsPage} = require("../../../src/Pages/AdminPortal/ProgramsManagement/BenefitsManagement/BenefitsPage");
const { BenefitsManagmentPage} = require("../../../src/Pages/AdminPortal/ProgramsManagement/BenefitsManagement/BenefitsManagementPage");
const { BenefitsData} = require("../../../src/Models/AdminPortal/BenefitsData");

let loginPage,homePage,streamManagementPage,streamData,streamPage,tasksPage,taskDetailsPage;
let mainProgramPage, mainProgramManagementPage, mainProgramData;
let subProgramsManagementPage, subProgramsData, subProgramsPage;
let streamNumber, programNumber, subProgramNumber, benefitNumber;
let benefitsPage, benefitsManagmentPage, benefitsData;
let adminusername,adminpassword;


/**
 * Test setup: Initializes all required page objects and logs into the admin portal.
 */
test.beforeEach(async ({ page }) => {

  loginPage = new LoginPage(page);
  homePage = new HomePage(page);
  streamPage = new StreamPage(page);
  streamManagementPage = new StreamManagementPage(page);
  streamData = new StreamData();
  tasksPage = new TasksPage(page);
  taskDetailsPage = new TaskDetailsPage(page);
  mainProgramPage = new MainProgramPage(page);
  mainProgramManagementPage = new MainProgramManagementPage(page);
  mainProgramData = new MainProgramData();
  subProgramsManagementPage = new SubProgramsManagementPage(page);
  subProgramsPage = new SubProgramsPage(page);
  subProgramsData = new SubProgramsData();
  benefitsPage = new BenefitsPage(page);
  benefitsManagmentPage = new BenefitsManagmentPage(page);
  benefitsData = new BenefitsData();

  var baseUrl = global.testConfig.BASE_URL;
   adminusername = global.testConfig.ADMIN_USER;
   adminpassword = global.testConfig.ADMIN_PASS;  ;
  var generalSettingUser = global.testConfig.GENERAL_SETTING_USER;
  var generalSettingPass = global.testConfig.GENERAL_SETTING_PASS;

  await test.step("Login to Admin Portal", async () => {
    await loginPage.gotoAdminPortal(baseUrl);
    var loginSuccess = await loginPage.login(generalSettingUser, generalSettingPass);
    expect(loginSuccess).toBe(true);

    console.log("login done successfully");
  });
});

test('Add and Approve New Stream', async () => {
  // Step1: Navigate to streams list page
  await test.step("Navigate to StreamManagement page", async () => {
    await homePage.navigateToStreamsManagement();
    console.log("Navigate to Streams page");
  });
  // Step2: Create New stream
  await test.step("Create New Stream Task", async () => {
    console.log("Navigate to Create Streams page");
    var result = await streamManagementPage.createStream(streamData);
    expect(result).toBe(true);
    console.log("New Stream Created Successfully");
  });
  // Step3: Search on new stream created
  await test.step("Search on Stream", async () => {
    console.log("Search on Stream");
    expect(await streamManagementPage.checkStreamRowDetails(streamData)).toBe(true);
    streamNumber = streamData.getCreatedStreamId();
    console.log("New Stream Details Checked Successfully");
    await homePage.logout();
    console.log("Logout  from admin portal");
  });
  // Step4: Approve new created
  await test.step("Approve Stream Task", async () => {
    var loginSuccess = await loginPage.login(adminusername, adminpassword);
    expect(loginSuccess).toBe(true);
    console.log("login to admin portal by admin user");
    console.log("Navigate to MyTasks page to approve stream Request");
    await homePage.navigateToTasks();
    await tasksPage.assignTaskToMe(streamNumber);
    var confirmMsg = global.testConfig.taskDetails.confirmStreamMsg
    var taskManage =await tasksPage.manageTask(Constants.STREAM, Constants.APPROVE,streamNumber,confirmMsg);
    expect(taskManage).toBe(true);
    console.log("New Stream Approved Successfully with id= " + streamNumber);
  });
});

/**
 * Test case: Adds and approves a new main program.
 */
test("Add and Approve New Main Program", async () => {
  // Step1: Navigate to Programs list page
  await test.step("Navigate to StreamManagement page", async () => {
    await homePage.navigateToStreamsManagement();
    console.log("Click on Define New Main Program from stream");
    await streamManagementPage.clickOnCreateMainProgram(streamNumber,global.testConfig.createMainProgram.backUpStreamNumber );
  });
  // Step2: Create New Program
  await test.step("Create New Program Task", async () => {
    console.log("Navigate to Programs page");
    var result = await mainProgramPage.createNewMainProgram(mainProgramData);
    expect(result).toBe(true);
    console.log("New Main Program Created Successfully");
    
  });
  // Step3: Search on new Program
  await test.step("Search on program created", async () => {
    console.log("Search on Program created");
    expect(await mainProgramManagementPage.checkMainProgramRowDetails( mainProgramData) ).toBe(true);
    programNumber = mainProgramData.getCreatedMainProgramId();
    console.log("New Main Program Details Checked Successfully");
    await homePage.logout();
    console.log("Logout  from admin portal");
  });
  // Step4: Approve new Program
  await test.step("Approve Program Task", async () => {
    var loginSuccess = await loginPage.login(adminusername, adminpassword);
    expect(loginSuccess).toBe(true);
    console.log("Navigate to MyTasks page to approve Program Request");
    await homePage.navigateToTasks();
    await tasksPage.assignTaskToMe(programNumber);
    var confirmMsg = global.testConfig.taskDetails.confirmMainProgramMsg;
    expect(await tasksPage.manageTask(Constants.MAIN_PROGRAM, Constants.APPROVE,programNumber,confirmMsg)).toBe(true);
    console.log("New Main Program Approved Successfully with id= " + programNumber);
  });
});

/**
 * Test case: Adds and approves a new subprogram.
 */
/*test("Add and Approve Test Sub Programs", async () => {
  // Step1: Navigate to Main Programs page
  await test.step("Navigate to Main Programs  page", async () => {
    console.log("Navigate to Main Program page");
    await homePage.navigateToMainProgramManagement();
    console.log("Click on Define New SubProgram");
    await mainProgramManagementPage.clickOnCreateSubProgram(programNumber, global.testConfig.createSubPrograms.backUpProgramNumber);
  });
  // Step2: Create new Sub Program page
  await test.step("Create New SubProgram Task", async () => {
    console.log("Navigate to SubProgram page");
    var result = await subProgramsPage.createNewSubPrograms(subProgramsData);
    expect(result).toBe(true);
    console.log("New SubProgram Created Successfully ");
  });
  // Step3: Search on subprogram created
  await test.step("Search on subprogram created", async () => {
    console.log("Search on SubProgram");
    expect(await subProgramsManagementPage.checkSubProgramsRowDetails(subProgramsData)).toBe(true);
    subProgramNumber = subProgramsData.getCreatedSubProgramId();
    console.log("New SubProgram Details Checked Successfully");
    await homePage.logout();
    console.log("Logout from admin portal");
  });
  // Step4: Approve Sub program
  await test.step("Approve  Sub Program Task", async () => {
    var loginSuccess = await loginPage.login(adminusername, adminpassword);
    expect(loginSuccess).toBe(true);
    console.log("Navigate to MyTasks page to approve SubProgram Request");
    await homePage.navigateToTasks();
    await tasksPage.assignTaskToMe(subProgramNumber);
    var confirmMsg = global.testConfig.taskDetails.confirmSubProgramsMsg;
    expect(await tasksPage.manageTask(Constants.SUB_PROGRAM, Constants.APPROVE,subProgramNumber , confirmMsg)).toBe(true);
    console.log("New Sub Program Approved Successfully with id= " + subProgramNumber);
  });
});

/**
 * Test case: Adds and approves a new benefit.
 */
/*test("Add and Approve Test Benefits", async () => {
  // Step1: Navigate to Main Programs page
  await test.step("Navigate to Sub Programs page", async () => {
    console.log("Navigate to Sub Program page");
    await homePage.navigateToSubProgramsManagement();
    console.log("Click on Define New Benefit");
    await subProgramsManagementPage.clickOnCreateBenefit(subProgramNumber,global.testConfig.createBenefits.backUpSubProgramNumber);
  });

  // Step2: Create new Benefit task
  await test.step("Create New Benefit Task", async () => {
    console.log("Navigate to Benefits page");
    var result = await benefitsPage.createNewBenefits(benefitsData);
    expect(result).toBe(true);
    console.log("New Benefit Created Successfully");
  });

  // Step3: Search for the benefit created
  await test.step("Search for the benefit created", async () => {
    console.log("Search for Benefit");
    expect( await benefitsManagmentPage.checkBenefitsRowDetails(benefitsData)).toBe(true);
    benefitNumber = benefitsData.getCreatedBenefitId();
    console.log("New Benefit Details Checked Successfully");
    await homePage.logout();
    console.log("Logout from admin portal");
  });

  // Step4: Approve Benefit
  await test.step("Approve Benefit Task", async () => {
    var loginSuccess = await loginPage.login(adminusername, adminpassword);
    expect(loginSuccess).toBe(true);
    console.log("Navigate to MyTasks page to approve Benefit Request");
    await homePage.navigateToTasks();
    await tasksPage.assignTaskToMe(benefitNumber);
    var confirmMsg = global.testConfig.taskDetails.confirmBenefitsMsg;
    expect(await tasksPage.manageTask(Constants.BENEFIT, Constants.APPROVE,benefitNumber,confirmMsg)).toBe(true);
    console.log("New Benefit Approved Successfully with id= " + benefitNumber);
  });
});*/

test.afterEach(async () => {
  //logout
  await test.step('Logout from Admin Portal', async () => {
    await homePage.logout();
    console.log('User Logout Successfully');
   
  });

});



