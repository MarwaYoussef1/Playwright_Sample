const { ApplicantStreamsPage } = require("./ProgramsManagement/Streams/ApplicantStreamsPage");
const { ApplicantMainProgramsPage } = require("./ProgramsManagement/MainPrograms/ApplicantMainProgramsPage");
const { ApplicantSubProgramsPage } = require("./ProgramsManagement/SubPrograms/ApplicantSubProgramsPage");


export class ApplicantLoginPage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigates to the Applicant portal .
   * @param {string} baseUrl - The URL of the Applicant portal.
   * @returns {Promise<void>} - Completes the navigation and language setup.
   */
  async gotoApplicantStreams(baseUrl) {
    await this.page.goto(baseUrl);
    await this.page.waitForTimeout(30000);

    var applicantStreamsPage = new ApplicantStreamsPage(this.page);
    var navigationStreams = await applicantStreamsPage.verifyStreams();
    return navigationStreams;  
  }


  /**
   * Navigates to the Applicant Main Programs page.
   * @param {string} baseUrl - The URL of the Applicant portal for Main Programs.
   * @returns {Promise<boolean>} - True if navigation to main programs page was successful.
   */
  async gotoApplicantMainPrograms(baseUrl) {
    await this.page.goto(baseUrl);
    await this.page.waitForTimeout(30000);

    var applicantMainProgramsPage = new ApplicantMainProgramsPage(this.page);
    var navigationSuccess = await applicantMainProgramsPage.verifyMainPrograms();
    return navigationSuccess;
  }
 
   /**
   * Navigates to the Applicant Sub Programs page.
   * @param {string} baseUrl - The URL of the Applicant portal for Sub Programs.
   * @returns {Promise<boolean>} - True if navigation to Sub programs page was successful.
   */
  async gotoApplicantSubPrograms(baseUrl) {
    await this.page.goto(baseUrl);
    await this.page.waitForTimeout(30000);

    var applicantSubProgramsPage = new ApplicantSubProgramsPage(this.page);
    var navigationSuccess = await applicantSubProgramsPage.verifySubPrograms();
    return navigationSuccess;
  }

   /**
   * Navigates to the Applicant Benefits page.
   * @param {string} baseUrl - The URL of the Applicant portal for Benefits.
   * @returns {Promise<boolean>} - True if navigation to Benefits page was successful.
   */
  async gotoApplicantBenefits(baseUrl) {
    await this.page.goto(baseUrl);
    await this.page.waitForTimeout(30000);

    var applicantBenefitsPage = new ApplicantBenefitsPage(this.page);
    var navigationSuccess = await applicantBenefitsPage.verifyBenefits();
    return navigationSuccess;
  }
}
module.exports = { ApplicantLoginPage };
