import { test, expect } from '../../fixtures.js';

const { ApplicantLoginPage } = require('../../../src/Pages/ApplicantPortal/ApplicantLoginPage.js');
const { ApplicantStreamsPage} = require("../../../src/Pages/ApplicantPortal/ProgramsManagement/Streams/ApplicantStreamsPage.js");
const { ApplicantStreamDetialsPage} = require("../../../src/Pages/ApplicantPortal/ProgramsManagement/Streams/ApplicantStreamDetialsPage.js");

const { LiferayLoginPage } = require('../../../src/Pages/Liferay/LiferayLoginPage.js');
const { LiferayStreamsPage} = require("../../../src/Pages/Liferay/Streams/LiferayStreamsPage.js");
const { LiferayStreamsDetialsPage} = require("../../../src/Pages/Liferay/Streams/LiferayStreamsDetialsPage.js");

const { LiferayStreamData } = require("../../../src/Models/Liferay/LiferayStreamData.js");
const { StreamData } = require("../../../src/Models/AdminPortal/StreamData.js");
const { MainProgramData } = require('../../../src/Models/AdminPortal/MainProgramData.js');
const { SubProgramsData } = require('../../../src/Models/AdminPortal/SubProgramsData.js');
const { BenefitsData } = require('../../../src/Models/AdminPortal/BenefitsData.js');
const { Programs } = require("../../../src/Apis/Business/Programs.js");

let context , page;
let liferayUsername, liferaypassword , liferayLoginPage;
let applicantStreamsURL ,applicantStreamsPage ,applicantStreamDetialsPage
let liferayStreamsURL , liferayStreamsPage ,liferayStreamsDetialsPage;
let mainProgramArName , subProgramArName ,benefitArName ,streamEnName; 
let applicantLoginPage ;
let relatedMainProramName ,relatedSubProramName ,relatedBenefitName ;
let adminusername ,adminpassword ;
let streamData ,mainProgramData ,subProgramData,benefitsData, programs ,liferayStreamData;

/**
 * Test setup: Initializes all required page objects and logs into the applicant portal.
 */
test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    applicantLoginPage  = new ApplicantLoginPage(page); 
    liferayLoginPage  = new LiferayLoginPage(page); 
    applicantStreamsPage = new ApplicantStreamsPage(page);
    applicantStreamDetialsPage = new ApplicantStreamDetialsPage(page);

    liferayStreamsPage = new LiferayStreamsPage(page);
    liferayStreamsDetialsPage = new LiferayStreamsDetialsPage(page);

    streamData = new StreamData();
    mainProgramData = new MainProgramData();
    subProgramData = new SubProgramsData();
    benefitsData = new BenefitsData();
    liferayStreamData = new LiferayStreamData();
    programs = new Programs();
    
    applicantStreamsURL = global.testConfig.APPLICANT_STREAMS_URL;
    liferayStreamsURL = global.testConfig.LIFERAY_STREAMS_URL

    adminusername = global.testConfig.ADMIN_USER;
    adminpassword = global.testConfig.ADMIN_PASS;

    liferayUsername = global.testConfig.LIFERAY_USER;
    liferaypassword = global.testConfig.LIFERAY_PASS;
});

test('Create and View Streams in Applicant Portal', async () => {
  
    // Step1: Create And Appove Stream From API 
      await test.step("Create And Appove Stream From API", async () => {
      var stream = await programs.createStreamAndApproveAPI(adminusername, adminpassword, streamData) 
      streamEnName = streamData.getstreamEnglishName();
      console.log('stream', stream);
      console.log('stream', streamEnName);
      expect(stream).not.toBeNull();

      var mainProgram = await programs.createMainProgramAndApproveAPI(adminusername, adminpassword, mainProgramData, stream[0]);
      mainProgramArName = mainProgramData.getArabicMainProgramName();
      relatedMainProramName  = streamData.setRelatedMainProgramName(mainProgramArName);
      
      console.log('mainProgram', mainProgram);
      expect(mainProgram).not.toBeNull();

      var subProgram = await programs.createSubProgramAndApproveAPI(adminusername, adminpassword, subProgramData, mainProgram[0]);
      subProgramArName = subProgramData.getArabicSubProgramName();
      relatedSubProramName  = streamData.setRelatedSubProgramName(subProgramArName);

      console.log('subProgram', subProgram);
      expect(subProgram).not.toBeNull();

      var benefit = await programs.createBenefitAndApproveAPI(adminusername, adminpassword, benefitsData,subProgram[0]);
      benefitArName = benefitsData.getArabicBenefitName();
      relatedBenefitName  = streamData.setRelatedBenefitName(benefitArName);

      console.log('Benefit', benefit);
      expect(benefit).not.toBeNull();
      });

      // Step2: Open Streams Page in Liferay
      await test.step("Login to Streams Page in Liferay", async () => {
        var stramNavigation = await liferayLoginPage.gotoLiferayStreams(liferayStreamsURL , liferayUsername, liferaypassword);
        expect(stramNavigation).toBe(true);
        console.log("Liferay Streams Page open Successfully");
      });

        // Step3: Fill Stream Detials Page in Liferay
      await test.step("Fill Stream Detials Page in Liferay", async () => {
          // streamEnName ="Family Support and Social Care StreamZgbLy Auto";
        var openStream = await liferayStreamsPage.openStreamDetials(streamData);
        expect(openStream).toBe(true);
        await page.waitForTimeout(6000); 
        var fillStreamData = await liferayStreamsDetialsPage.completeStreamData(liferayStreamData);
        expect(fillStreamData).toBe(true);
        console.log(`Liferay Stream data completed successfully.`);
      });

      // Step2: Open Streams Page in Applicant Portal
      await test.step("Login to Streams Page in Applicant Portal", async () => {
        var stramNavigation = await applicantLoginPage.gotoApplicantStreams(applicantStreamsURL);
        expect(stramNavigation).toBe(true);
        console.log("Applicant Streams Page open Successfully");
      });
  
      // Step3: Open Stream Detials Page in Applicant Portal
      await test.step("Open Stream Detials Page in Applicant Portal", async () => {
// streamEnName ="Family Support and Social Care StreamZgbLy Auto";

        var Navigation = await applicantStreamsPage.openStreamDetials(streamData);
        expect(Navigation).toBe(true);
        var streamDetails = await applicantStreamDetialsPage.compareApplicantStreamDetails(streamData, liferayStreamData );
        expect(streamDetails).toBe(true);
        console.log("Stream Details Checked Successfully");
      });
        
  });
  
  
