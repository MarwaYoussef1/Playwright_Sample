// TestSubProgram.spec.js
import { test, expect } from '../../fixtures.js';

const { ApplicantLoginPage } = require('../../../src/Pages/ApplicantPortal/ApplicantLoginPage.js');
const { ApplicantSubProgramsPage } = require("../../../src/Pages/ApplicantPortal/ProgramsManagement/SubPrograms/ApplicantSubProgramsPage.js");
const { ApplicantSubProgramDetialsPage } = require("../../../src/Pages/ApplicantPortal/ProgramsManagement/SubPrograms/ApplicantSubProgramDetialsPage.js");

const { LiferayLoginPage } = require('../../../src/Pages/Liferay/LiferayLoginPage.js');
const { LiferaySubProgramsPage } = require("../../../src/Pages/Liferay/SubProgram/LiferaySubProgramsPage.js");
const { LiferaySubProgramDetialsPage } = require("../../../src/Pages/Liferay/SubProgram/LiferaySubProgramDetialsPage.js");

const { LiferaySubProgramData } = require("../../../src/Models/Liferay/LiferaySubProgramData.js");
const { StreamData } = require("../../../src/Models/AdminPortal/StreamData.js");
const { MainProgramData } = require('../../../src/Models/AdminPortal/MainProgramData.js');
const { SubProgramsData } = require('../../../src/Models/AdminPortal/SubProgramsData.js');
const { BenefitsData } = require('../../../src/Models/AdminPortal/BenefitsData.js');
const { Programs } = require("../../../src/Apis/Business/Programs.js");

let context, page;
let liferayUsername, liferaypassword, liferayLoginPage;
let applicantSubProgramURL, applicantSubProgramPage, applicantSubProgramDetailsPage;
let liferaySubProgramURL, liferaySubProgramPage, liferaySubProgramDetailsPage;
let subProgramArName,mainProgramArName, subProgramEnName, benefitArName, streamArName;
let applicantLoginPage;
let relatedStreamName , relatedMainProgramName , relatedBenefitName;
let adminusername, adminpassword;
let streamData, mainProgramData, subProgramData, benefitsData, programs, liferaySubProgramData;

test.beforeEach(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();

  applicantLoginPage = new ApplicantLoginPage(page);
  liferayLoginPage = new LiferayLoginPage(page);
  applicantSubProgramPage = new ApplicantSubProgramsPage(page);
  applicantSubProgramDetailsPage = new ApplicantSubProgramDetialsPage(page);

  liferaySubProgramPage = new LiferaySubProgramsPage(page);
  liferaySubProgramDetailsPage = new LiferaySubProgramDetialsPage(page);

  streamData = new StreamData();
  mainProgramData = new MainProgramData();
  subProgramData = new SubProgramsData();
  benefitsData = new BenefitsData();
  liferaySubProgramData = new LiferaySubProgramData();
  programs = new Programs();

  applicantSubProgramURL = global.testConfig.APPLICANT_SUB_PROGRAMS_URL;
  liferaySubProgramURL = global.testConfig.LIFERAY_SUB_PROGRAMS_URL;

  adminusername = global.testConfig.ADMIN_USER;
  adminpassword = global.testConfig.ADMIN_PASS;
  liferayUsername = global.testConfig.LIFERAY_USER;
  liferaypassword = global.testConfig.LIFERAY_PASS;
});

test('Create and View Sub Program in Applicant Portal', async () => {
   //Step1: Create And Appove Sub Program From API 
    await test.step("Create And Approve Stream, Main Program, Sub Program and Benefits From API", async () => {
    var stream = await programs.createStreamAndApproveAPI(adminusername, adminpassword, streamData);
    streamArName = streamData.getstreamArabicName();
    relatedStreamName  = subProgramData.setRelatedStreamName(streamArName);
    console.log('stream', stream);
    expect(stream).not.toBeNull();

    var mainProgram = await programs.createMainProgramAndApproveAPI(adminusername, adminpassword, mainProgramData, stream[0]);
    mainProgramArName = mainProgramData.getArabicMainProgramName();
    relatedMainProgramName  = subProgramData.setRelatedMainProgramName(mainProgramArName);
    console.log('mainProgram', mainProgram);
    expect(mainProgram).not.toBeNull();

    var subProgram = await programs.createSubProgramAndApproveAPI(adminusername, adminpassword, subProgramData, mainProgram[0]);
    subProgramArName = subProgramData.getArabicSubProgramName();
    subProgramEnName = subProgramData.getEnglishSubProgramName();
    console.log('subProgram', subProgram);
    console.log('subProgramEnName', subProgramEnName);
    expect(subProgram).not.toBeNull();

    var benefit = await programs.createBenefitAndApproveAPI(adminusername, adminpassword, benefitsData, subProgram[0]);
    benefitArName = benefitsData.getArabicBenefitName();
    relatedBenefitName  = subProgramData.setRelatedBenefitName(benefitArName);
    console.log('Benefit', benefit);
    expect(benefit).not.toBeNull();
    
  } 
);

  // Step2: Open Sub Program Page in Liferay
  await test.step("Login to Sub Program Page in Liferay", async () => {
    var navigation = await liferayLoginPage.gotoLiferaySubPrograms(liferaySubProgramURL, liferayUsername, liferaypassword);
    expect(navigation).toBe(true);
    console.log("Liferay Sub Program Page open Successfully");

  });

  // Step3: Fill Sub Program Detials Page in Liferay
  await test.step("Fill Sub Program Details Page in Liferay", async () => {
    //  subProgramEnName = "Awareness programs and trainings regarding drug addictionabSzf Auto";
    var openSubProgram = await liferaySubProgramPage.openSubProgramDetails(subProgramData);
    expect(openSubProgram).toBe(true);
    await page.waitForTimeout(6000);
    var filled = await liferaySubProgramDetailsPage.completeSubProgramData(liferaySubProgramData);
    expect(filled).toBe(true);
  });

  // Step4: Open Applicant Portal Page
  await test.step("Login to Sub Program Page in Applicant Portal", async () => {
    var navigation = await applicantLoginPage.gotoApplicantSubPrograms(applicantSubProgramURL);
    expect(navigation).toBe(true);
  });
  
  // Step5: Open Sub Program Details Page in Applicant and Assert on the data
  await test.step("Open Sub Program Details Page in Applicant Portal", async () => {
    var opened = await applicantSubProgramPage.openSubProgramDetails(subProgramData);
    expect(opened).toBe(true);
    var compared = await applicantSubProgramDetailsPage.compareApplicantSubProgramDetails(subProgramData, liferaySubProgramData);
    expect(compared).toBe(true);
    console.log("Sub Program in Applicant Details Checked Successfully");
      
  });

});