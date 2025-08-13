// TestBenefit.spec
/*import { test, expect } from '../../fixtures';

const { ApplicantLoginPage } = require('../../../src/Pages/ApplicantPortal/ApplicantLoginPage');
const { ApplicantBenefitsPage } = require("../../../src/Pages/ApplicantPortal/ProgramsManagement/Benefits/ApplicantBenefitsPage");
const { ApplicantBenefitDetialsPage } = require("../../../src/Pages/ApplicantPortal/ProgramsManagement/Benefits/ApplicantBenefitDetialsPage");

const { LiferayLoginPage } = require('../../../src/Pages/Liferay/LiferayLoginPage');
const { LiferayBenefitsPage } = require("../../../src/Pages/Liferay/Benefits/LiferayBenefitsPage");
const { LiferayBenefitDetialsPage } = require("../../../src/Pages/Liferay/Benefits/LiferayBenefitsDetialsPage");

const { LiferayBenefitData } = require("../../../src/Models/Liferay/LiferayBenefitsData");
const { StreamData } = require("../../../src/Models/AdminPortal/StreamData");
const { MainProgramData } = require('../../../src/Models/AdminPortal/MainProgramData');
const { SubProgramsData } = require('../../../src/Models/AdminPortal/SubProgramsData');
const { BenefitsData } = require('../../../src/Models/AdminPortal/BenefitsData');
const { Programs } = require("../../../src/Apis/Business/Programs");

let context, page;
let liferayUsername, liferayPassword, liferayLoginPage;
let applicantBenefitURL, applicantBenefitPage, applicantBenefitDetailsPage;
let liferayBenefitURL, liferayBenefitPage, liferayBenefitDetailsPage;
let mainProgramArName, subProgramArName, benefitArName,benefitEnName, streamArName;
let applicantLoginPage;
let relatedStreamName , relatedMainProgramName , relatedSubProgramName;
let adminusername, adminpassword;
let streamData, mainProgramData, subProgramData, benefitsData, programs, liferayBenefitData;

test.beforeEach(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();

  applicantLoginPage = new ApplicantLoginPage(page);
  liferayLoginPage = new LiferayLoginPage(page);
  applicantBenefitPage = new ApplicantBenefitsPage(page);
  applicantBenefitDetailsPage = new ApplicantBenefitDetialsPage(page);

  liferayBenefitPage = new LiferayBenefitsPage(page);
  liferayBenefitDetailsPage = new LiferayBenefitDetialsPage(page);

  streamData = new StreamData();
  mainProgramData = new MainProgramData();
  subProgramData = new SubProgramsData();
  benefitsData = new BenefitsData();
  liferayBenefitData = new LiferayBenefitData();
  programs = new Programs();

  applicantBenefitURL = global.testConfig.APPLICANT_BENEFITS_URL;
  liferayBenefitURL = global.testConfig.LIFERAY_BENEFITS_URL;

  adminusername = global.testConfig.ADMIN_USER;
  adminpassword = global.testConfig.ADMIN_PASS;
  liferayUsername = global.testConfig.LIFERAY_USER;
  liferayPassword = global.testConfig.LIFERAY_PASS;
});

test('Create and View Benefit in Applicant Portal', async () => {

  await test.step("Create And Approve Stream, Main Program, and Sub Program From API", async () => {
    const stream = await programs.createStreamAndApproveAPI(adminusername, adminpassword, streamData);
    streamArName = streamData.getstreamArabicName();
    relatedStreamName  = benefitsData.setRelatedStreamName(streamArName);
    console.log('stream', stream);
    expect(stream).not.toBeNull();

    const mainProgram = await programs.createMainProgramAndApproveAPI(adminusername, adminpassword, mainProgramData, stream[0]);
    mainProgramArName = mainProgramData.getArabicMainProgramName();
    relatedMainProgramName  = benefitsData.setRelatedMainProgramName(mainProgramArName);
    console.log('mainProgram', mainProgram);    
    expect(mainProgram).not.toBeNull();

    const subProgram = await programs.createSubProgramAndApproveAPI(adminusername, adminpassword, subProgramData, mainProgram[0]);
    subProgramArName = subProgramData.getArabicSubProgramName();
    relatedSubProgramName  = benefitsData.setRelatedSubProgramName(subProgramArName);
    console.log('subProgram', subProgram);      
    expect(subProgram).not.toBeNull();

    const benefit = await programs.createBenefitAndApproveAPI(adminusername, adminpassword, benefitsData, subProgram[0]);
    benefitArName = benefitsData.getArabicBenefitName();
    benefitEnName = benefitsData.getEnglishBenefitName();
    console.log('Benefit', subProgram);
    console.log('BenefitEnName', benefitEnName);
    expect(benefit).not.toBeNull();
  });

  await test.step("Login to Benefit Page in Liferay", async () => {
    const navigation = await liferayLoginPage.gotoLiferayBenefits(liferayBenefitURL, liferayUsername, liferayPassword);
    expect(navigation).toBe(true);
  });

  await test.step("Fill Benefit Details Page in Liferay", async () => {
    const openBenefit = await liferayBenefitPage.openBenefitDetails(benefitsData);
    expect(openBenefit).toBe(true);
    await page.waitForTimeout(6000);
    // const filled = await liferayBenefitDetailsPage.completeBenefitData(liferayBenefitData);
    // expect(filled).toBe(true);
  });

  await test.step("Login to Benefit Page in Applicant Portal", async () => {
    const navigation = await applicantLoginPage.gotoApplicantBenefits(applicantBenefitURL);
    expect(navigation).toBe(true);
  });

  await test.step("Open Benefit Details Page in Applicant Portal", async () => {
    const opened = await applicantBenefitPage.openBenefitDetails(benefitsData);
    expect(opened).toBe(true);
    // const compared = await applicantBenefitDetailsPage.compareApplicantBenefitDetails(streamArName, benefitsData, liferayBenefitData);
    // expect(compared).toBe(true);
  });

});*/
