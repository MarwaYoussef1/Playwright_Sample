// TestMainProgram.spec.js
import { test, expect } from '../../fixtures.js';

const { ApplicantLoginPage } = require('../../../src/Pages/ApplicantPortal/ApplicantLoginPage.js');
const { ApplicantMainProgramsPage } = require("../../../src/Pages/ApplicantPortal/ProgramsManagement/MainPrograms/ApplicantMainProgramsPage.js");
const { ApplicantMainProgramDetialsPage } = require("../../../src/Pages/ApplicantPortal/ProgramsManagement/MainPrograms/ApplicantMainProgramDetialsPage.js");

const { LiferayLoginPage } = require('../../../src/Pages/Liferay/LiferayLoginPage.js');
const { LiferayMainProgramsPage } = require("../../../src/Pages/Liferay/MainProgram/LiferayMainProgramsPage.js");
const { LiferayMainProgramDetialsPage } = require("../../../src/Pages/Liferay/MainProgram/LiferayMainProgramDetialsPage.js");

const { LiferayMainProgramData } = require("../../../src/Models/Liferay/LiferayMainProgramData.js");
const { StreamData } = require("../../../src/Models/AdminPortal/StreamData.js");
const { MainProgramData } = require('../../../src/Models/AdminPortal/MainProgramData.js');
const { SubProgramsData } = require('../../../src/Models/AdminPortal/SubProgramsData.js');
const { BenefitsData } = require('../../../src/Models/AdminPortal/BenefitsData.js');
const { Programs } = require("../../../src/Apis/Business/Programs.js");

let context, page;
let liferayUsername, liferaypassword, liferayLoginPage;
let applicantMainProgramURL, applicantMainProgramPage, applicantMainProgramDetailsPage;
let liferayMainProgramURL, liferayMainProgramPage, liferayMainProgramDetailsPage;
let mainProgramArName, mainProgramEnName, subProgramArName, benefitArName, streamArName;
let applicantLoginPage;
let relatedStreamName , relatedSubProgramName , relatedBenefitName;
let adminusername, adminpassword;
let streamData, mainProgramData, subProgramData, benefitsData, programs, liferayMainProgramData;

test.beforeEach(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();

  applicantLoginPage = new ApplicantLoginPage(page);
  liferayLoginPage = new LiferayLoginPage(page);
  applicantMainProgramPage = new ApplicantMainProgramsPage(page);
  applicantMainProgramDetailsPage = new ApplicantMainProgramDetialsPage(page);

  liferayMainProgramPage = new LiferayMainProgramsPage(page);
  liferayMainProgramDetailsPage = new LiferayMainProgramDetialsPage(page);

  streamData = new StreamData();
  mainProgramData = new MainProgramData();
  subProgramData = new SubProgramsData();
  benefitsData = new BenefitsData();
  liferayMainProgramData = new LiferayMainProgramData();
  programs = new Programs();

  applicantMainProgramURL = global.testConfig.APPLICANT_MAIN_PROGRAMS_URL;
  liferayMainProgramURL = global.testConfig.LIFERAY_MAIN_PROGRAMS_URL;

  adminusername = global.testConfig.ADMIN_USER;
  adminpassword = global.testConfig.ADMIN_PASS;
  liferayUsername = global.testConfig.LIFERAY_USER;
  liferaypassword = global.testConfig.LIFERAY_PASS;
});

test('Create and View Main Program in Applicant Portal', async () => {

  // Step1: Create And Appove Stream From API 
       await test.step("Create And Appove Stream From API", async () => {
       var stream = await programs.createStreamAndApproveAPI(adminusername, adminpassword, streamData) 
       streamArName = streamData.getstreamArabicName();
       relatedStreamName  = mainProgramData.setRelatedStreamName(streamArName);

       console.log('stream', stream);
       expect(stream).not.toBeNull();
 
       var mainProgram = await programs.createMainProgramAndApproveAPI(adminusername, adminpassword, mainProgramData, stream[0]);
       mainProgramEnName = mainProgramData.getEnglishMainProgramName();
       mainProgramArName = mainProgramData.getArabicMainProgramName();
       console.log('mainProgram', mainProgram);
       console.log('mainProgramEnName', mainProgramEnName);
       expect(mainProgram).not.toBeNull();
 
       var subProgram = await programs.createSubProgramAndApproveAPI(adminusername, adminpassword, subProgramData, mainProgram[0]);
       subProgramArName = subProgramData.getArabicSubProgramName();
       relatedSubProgramName  = mainProgramData.setRelatedSubProgramName(subProgramArName);

       console.log('subProgram', subProgram);
       expect(subProgram).not.toBeNull();
 
       var benefit = await programs.createBenefitAndApproveAPI(adminusername, adminpassword, benefitsData,subProgram[0]);
       benefitArName = benefitsData.getArabicBenefitName();
       relatedBenefitName  = mainProgramData.setRelatedBenefitName(benefitArName);

       console.log('Benefit', benefit);
       expect(benefit).not.toBeNull();
       });

  await test.step("Login to Main Program Page in Liferay", async () => {
    var navigation = await liferayLoginPage.gotoLiferayMainPrograms(liferayMainProgramURL, liferayUsername, liferaypassword);
    expect(navigation).toBe(true);
  });

  await test.step("Fill Main Program Details Page in Liferay", async () => {
    // var mainProgramEnName = "FSSC preventive ProgramiETsa Auto";
    var openMainProgram = await liferayMainProgramPage.openMainProgramDetails(mainProgramData);
    expect(openMainProgram).toBe(true);
    await page.waitForTimeout(6000);
    var filled = await liferayMainProgramDetailsPage.completeMainProgramData(liferayMainProgramData);
    expect(filled).toBe(true);
  });

  await test.step("Login to Main Program Page in Applicant Portal", async () => {
    var navigation = await applicantLoginPage.gotoApplicantMainPrograms(applicantMainProgramURL);
    expect(navigation).toBe(true);
  });

  await test.step("Open Main Program Details Page in Applicant Portal", async () => {
    var opened = await applicantMainProgramPage.openMainProgramDetails(mainProgramData);
    expect(opened).toBe(true);
    var compared = await applicantMainProgramDetailsPage.compareApplicantMainProgramDetails( mainProgramData, liferayMainProgramData );
    expect(compared).toBe(true);
  });

});
