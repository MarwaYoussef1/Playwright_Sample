const { ApplicantStreamsPage } = require("./ProgramsManagement/Streams/ApplicantStreamsPage");
const { ApplicantMainProgramsPage } = require("./ProgramsManagement/MainPrograms/ApplicantMainProgramsPage");
const { ApplicantSubProgramsPage } = require("./ProgramsManagement/SubPrograms/ApplicantSubProgramsPage");
const { ApplicantBenefitsPage } = require("./ProgramsManagement/Benefits/ApplicantBenefitsPage");
const { DashboardPage } = require("./Dashboard/DashboardPage");


export class ApplicantHomePage {

  constructor(page) {
    this.page = page;
    this.profileMenu = '//button[@data-testid="user-profile-btn"]'; 
    this.logo ="//img[@alt='Aoun Logo']"
    this.login = '//button[@data-testid="logout-login-btn"]'; 
    this.nafathPlatformLoginBtn = '//div//button[@data-testid="nafath-platform-login-button"]'; 
    this.dashboard = '//button[@data-testid="dashboard-btn"]'; 
    this.loginLable = '//h2[@class="login-card-label"]';
    this.afterLogin='//button[@data-testid="user-profile-btn"]';

    this.searchIcon='//*[@data-testid="searchicon"]//ancestor::button';

    this.welcomeText  = '//span[@data-testid="modal-title"]';
    this.agreementCheckbox  = '//span[contains(@class, "MuiButtonBase-root") and .//input[@type="checkbox"]]';
    this.dismissBtn  = '//button[@data-testid="cancel-button"]';
    this.closePopUp  = '//button[@data-testid="close-button"]';
    this.noRecordWarning  = '//div[contains(@class,"MuiAlert-message")]//p';
    this.confirmBtn  = '//button[@data-testid="confirm-button"]';

    this.welcomeTitle = '//span[@data-testid="modal-title"]';
    this.fetchingMessageLine = '//span[@data-testid="modal-description"]'; 
    this.statusBar = '//div[@role="alert"]//p';
    
  }

  // /**
  //  * Navigates to the Applicant portal .
  //  * @param {string} baseUrl - The URL of the Applicant portal.
  //  * @returns {Promise<void>} - Completes the navigation and language setup.
  //  */
  // async gotoApplicantStreams(baseUrl) {
  //   await this.page.goto(baseUrl);
  //   await this.page.waitForTimeout(30000);

  //   var applicantStreamsPage = new ApplicantStreamsPage(this.page);
  //   var navigationStreams = await applicantStreamsPage.verifyStreams();
  //   return navigationStreams;  
  // }


  // /**
  //  * Navigates to the Applicant Main Programs page.
  //  * @param {string} baseUrl - The URL of the Applicant portal for Main Programs.
  //  * @returns {Promise<boolean>} - True if navigation to main programs page was successful.
  //  */
  // async gotoApplicantMainPrograms(baseUrl) {
  //   await this.page.goto(baseUrl);
  //   await this.page.waitForTimeout(30000);

  //   var applicantMainProgramsPage = new ApplicantMainProgramsPage(this.page);
  //   var navigationSuccess = await applicantMainProgramsPage.verifyMainPrograms();
  //   return navigationSuccess;
  // }
 
  //  /**
  //  * Navigates to the Applicant Sub Programs page.
  //  * @param {string} baseUrl - The URL of the Applicant portal for Sub Programs.
  //  * @returns {Promise<boolean>} - True if navigation to Sub programs page was successful.
  //  */
  // async gotoApplicantSubPrograms(baseUrl) {
  //   await this.page.goto(baseUrl);
  //   await this.page.waitForTimeout(30000);

  //   var applicantSubProgramsPage = new ApplicantSubProgramsPage(this.page);
  //   var navigationSuccess = await applicantSubProgramsPage.verifySubPrograms();
  //   return navigationSuccess;
  // }

  //  /**
  //  * Navigates to the Applicant Benefits page.
  //  * @param {string} baseUrl - The URL of the Applicant portal for Benefits.
  //  * @returns {Promise<boolean>} - True if navigation to Benefits page was successful.
  //  */
  // async gotoApplicantBenefits(baseUrl) {
  //   await this.page.goto(baseUrl);
  //   await this.page.waitForTimeout(30000);

  //   var applicantBenefitsPage = new ApplicantBenefitsPage(this.page);
  //   var navigationSuccess = await applicantBenefitsPage.verifyBenefits();
  //   return navigationSuccess;
  // }

/**
   * Navigates to the Applicant Home page.
   * @param {string} baseUrl - The URL of the Applicant portal Homw Page.
   * @returns {Promise<boolean>} - True if navigation to Home page was successful.
   */
  async navigateToApplicantLogin() {
    await this.page.locator(this.searchIcon, { state: "visible", timeout: 50000 });
    await this.page.click(this.profileMenu);
    await this.page.locator(this.login, { state: "visible", timeout: 5000 });
    await this.page.click(this.login);
    await this.page.mouse.click(0, 0);
    await this.page.locator(this.nafathPlatformLoginBtn).waitFor({ state: "visible", timeout: 5000 });
    await this.page.click(this.nafathPlatformLoginBtn);
    
    var navigationSuccess = await this.verifyLoginPage();
    return navigationSuccess;
  }

  async verifyLoginPage() {
    await this.page.waitForSelector(this.loginLable, { state: "visible", timeout: 50000 });
    return await this.page.locator(this.loginLable).isVisible();
  }

  async verifyAfterLogin() {
    await this.page.waitForSelector(this.afterLogin, { state: "visible", timeout: 50000 });
    return await this.page.locator(this.afterLogin).isVisible();
  }

  async verifyWelcomePopup() {

    await this.page.waitForTimeout(6000);
    var welcomeText = global.testConfig.Applicant.partialTitle ;

    var agreementCheckboxPopupLocator = this.page.locator(this.agreementCheckbox).nth(1);
    var agreementCheckboxPopup = await agreementCheckboxPopupLocator.isVisible();

    var dismissBtnLocator = await this.page.locator(this.dismissBtn).nth(1);
    var dismissBtn = await dismissBtnLocator.isVisible();

    var welcomePopup = await this.welcomePopUpMessage(this.closePopUp, welcomeText ,null);

     if ( welcomePopup && agreementCheckboxPopup && dismissBtn ){   
      return true;
      }
      return false;
  }
  async verfiySoicalRecordData() {
    var noRecordLocator = this.page.locator(this.noRecordWarning);
    var noRecordVisible = await noRecordLocator.isVisible();
    let checkRecordtStatus = false;
    if (noRecordVisible) {
      var warningText = await noRecordLocator.textContent();
      checkRecordtStatus = warningText?.trim() === global.testConfig.Applicant.noRecordWarning;
      console.log("The User do not have a record.")
      
       var agreementCheckboxLocator = this.page.locator(this.agreementCheckbox);
      var agreementCheckboxBack = await agreementCheckboxLocator.isVisible();
      if (agreementCheckboxBack) {
      await agreementCheckboxLocator.click();

      await this.page.waitForTimeout(2000);
      await this.page.locator(this.confirmBtn).click();
      console.log("Loading your social record data")
      }
       if ( checkRecordtStatus && agreementCheckboxBack) {    
      return true;
        }
      return false;
    }
  }
  
  

  async verifyFetchingRecordProgress() {
    await this.page.waitForTimeout(3000);
    var popUpTitle = global.testConfig.Applicant.partialTitle ;
    var processingText = global.testConfig.Applicant.fetchingMessagePart ;

    var processingPopUp  = await this.welcomePopUpMessage(this.confirmBtn, popUpTitle , processingText);

    var loadingLocator = this.page.locator(this.statusBar);
    var loadingText = await loadingLocator.nth(0).textContent();
    var loadingVisible = loadingText?.trim() === global.testConfig.Applicant.fetchingSocialDataLabel;

    var percentageText = await this.page.locator(this.statusBar).nth(1).textContent();
    var progressVisible = percentageText?.trim() === global.testConfig.Applicant.ZeroPercentage;
    console.log('The status of your data fetch request is 0%.');
    if ( processingPopUp && loadingVisible && progressVisible) {
      return true;
    }
    return false;
  }
  async verfiyCompleteISRRecord() {
    await this.navigateToDashboard();
    await this.page.locator(this.logo).click();
    await this.page.waitForTimeout(5000);

    // await this.page.reload();

    await this.page.locator(this.closePopUp).click();

    var socialRecordMsg = await this.page.locator(this.statusBar).nth(0).textContent();
    var socialRecordStatus = socialRecordMsg?.trim()===(global.testConfig.Applicant.socialRecordMsg);
    await this.page.waitForTimeout(2000);
    var completeISRTxt = await this.page.locator(this.confirmBtn).textContent();
    var completeISRBtn = completeISRTxt?.trim() === global.testConfig.Applicant.completeISRBtn;
    console.log('The User have a task to complete your social record data.');

    if ( socialRecordStatus && completeISRBtn) {
      return true;
    }
    return false;
  }


  async createISRIntergationData() {
    var welcomPopUp = await this.verifyWelcomePopup();
    var socialRecord = await this.verfiySoicalRecordData();
    var FetchProgress = await this.verifyFetchingRecordProgress();
    var IsrRecord = await this.verfiyCompleteISRRecord();

    if ( welcomPopUp && socialRecord && FetchProgress && IsrRecord) {
          return true;
        }
        return false;
  }


  async navigateToDashboard() {

        // await this.page.locator(this.closePopUp).click();

      await this.page.click(this.profileMenu);
      await this.page.locator(this.dashboard, { state: "visible", timeout: 5000 });
      await this.page.click(this.dashboard);
      
      var dashboardPage  = new DashboardPage(this.page); 
      var navigationSuccess = await dashboardPage.verifyDashboard();
      return navigationSuccess;
    }


  async welcomePopUpMessage(actionButton, partialTitle = null, partialMessage = null) {
    
    let titleMatched = partialTitle === null;
    let messageMatched = partialMessage === null;
    let titleLocator = '//span[@data-testid="modal-title"]'
    let messageLocator = '//span[@data-testid="modal-description"]';

    if (partialTitle && titleLocator ) {
      const fullTitle = await this.page.textContent(titleLocator);
      titleMatched = fullTitle?.includes(partialTitle);
    }

    if (partialMessage && messageLocator) {
      const fullMessage = await this.page.textContent(messageLocator);
      messageMatched = fullMessage?.includes(partialMessage);
    }

    if (titleMatched && messageMatched) {
      await this.page.click(actionButton);
      await this.page.locator(actionButton).waitFor({ state: "detached", timeout: 60000 });
      return true;
    }
    return false;
  }


}
module.exports = { ApplicantHomePage };
