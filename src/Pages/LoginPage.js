const { HomePage } = require("./AdminPortal/HomePage");
const { ApplicantHomePage } = require("./ApplicantPortal/ApplicantHomePage");

/**
 * Manages login-related actions, including navigating to the admin portal,
 * performing user login, and ensuring the Arabic language is selected.
 * @class
 */
export class LoginPage {
  constructor(page) {
    this.page = page;

    // Selectors for login elements
    this.userNameField = '[id="username"]';
    (this.passwordField = '[id="password"]'),
      (this.remeberCheckbox = '//img[@class="check--icon"]');
    this.loginButton = '//input[@id="kc-login"]';
    this.invalidCredentialsErrorMsg = '//span[@id="input-error"]';

    // Selectors for language settings
    this.changeLangageMenu = '//a[@class="locale--btn"]';//button[@id="locale--button"]
    this.nationalField = '//span[contains(text(),"رقم الهوية")]';
  }



  /**
   * Navigates to the admin portal .
   * @param {string} baseUrl - The URL of the admin portal.
   * @returns {Promise<void>} - Completes the navigation and language setup.
   */
  async gotoAdminPortal(baseUrl) {
    await this.page.goto(baseUrl);
    await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    await this.page.waitForTimeout(3000);
   // await this.ensureArabicLanguage();
  }

  /**
   * Navigates to the admin portal .
   * @param {string} baseUrl - The URL of the admin portal.
   * @returns {Promise<void>} - Completes the navigation and language setup.
   */
  async gotoOperationPortal(baseUrl) {
    await this.page.goto(baseUrl);
    await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' ,timeout:50000});
    await this.page.waitForTimeout(5000);
    // await this.ensureArabicLanguage();
  }

   /**
   * Navigates to the Applicant portal .
   * @param {string} baseUrl - The URL of the Applicant portal.
   * @returns {Promise<void>} - Completes the navigation and language setup.
   */
  async gotoApplicantPortal(baseUrl) {
    await this.page.goto(baseUrl);
    // await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' ,timeout:50000});
    await this.page.waitForTimeout(5000);
    
    var applicantHomePage = new ApplicantHomePage(this.page);
    var verifyLoginPage =  await applicantHomePage.navigateToApplicantLogin();
    return verifyLoginPage;
  }


  /**
   * Performs user login with the provided credentials.
   * @param {string} userName - The username for login.
   * @param {string} password - The password for login.
   * @returns {Promise<boolean>} - Returns true if the user successfully logs in.
   */
  async login(userName, password) {
    await this.page.waitForSelector(this.userNameField, {state: "visible", timeout: 10000});
    await this.page.fill(this.userNameField, userName);
    await this.page.fill(this.passwordField, password);
    await this.page.click(this.loginButton);
    var homePage = new HomePage(this.page);
    var avatarVisible = await homePage.checkAvatarIsExist();

    return avatarVisible;
  }

 async loginApplicant(userName, password) {

    await this.page.fill(this.userNameField, userName);
    await this.page.fill(this.passwordField, password);
    await this.page.click(this.loginButton);
    
    var applicantHomePage = new ApplicantHomePage(this.page);
    var login =  await applicantHomePage.verifyAfterLogin();
    return login;
  }

  /**
   * Performs user login with the provided credentials.
   * @param {string} userName - The username for login.
   * @param {string} password - The password for login.
   * @returns {Promise<boolean>} - Returns true if the user successfully logs in.
   */
  async loginWithInvalidCredentials(userName, password) {
    await this.page.fill(this.userNameField, userName);
    await this.page.fill(this.passwordField, password);
    await this.page.click(this.loginButton);
    await this.page.waitForSelector(this.invalidCredentialsErrorMsg, { visible: true });
    var actuaLoginErrorMsg = await this.page.$eval(this.invalidCredentialsErrorMsg, element => element.textContent);
    console.log("Actual Login Error Message: ", actuaLoginErrorMsg);
    var expectedLoginErrorMsg = global.testConfig.Login.invalidLoginDataErrorMsg;
    if (actuaLoginErrorMsg.includes(expectedLoginErrorMsg)) {
      return true;
    }
  }


  /**
   * Ensures the Arabic language is selected on the portal.
   * If not selected, it switches the language to Arabic.
   * @returns {Promise<void>} - Completes the language selection process.
   * @throws Will throw an error if the language selection or verification fails.
   */
  async ensureArabicLanguage() {
    try {
      //await this.page.waitForLoadState("load");
      // console.log("Clicking on language menu...");
      await this.page
        .locator(this.changeLangageMenu)
        .waitFor({ state: "visible", timeout: 10000 });
      //await this.page.locator(this.changeLangageMenu).click();
      // console.log("Checking if Arabic language is selected...");
      var isArabicSelected = await this.page
        .locator(this.nationalField)
        .isVisible();
      if (isArabicSelected) {
        console.log("Arabic language is already selected.");
        return;
      }
      // console.log("Selecting Arabic language...");
      var arabicOption = this.page.locator("li.locale--list__item", {
        hasText: "عربي",
      });
      await arabicOption.waitFor({ state: "visible", timeout: 10000 });
      await arabicOption.click();
      // console.log("Waiting for Arabic language verification...");
      await this.page.waitForLoadState("networkidle");
      await this.page
        .locator(this.nationalField)
        .waitFor({ state: "visible", timeout: 10000 });
      console.log("Arabic language selected successfully.");
    } catch (error) {
      console.error(
        "Failed to select Arabic language or verify the change:",
        error
      );
      throw new Error("Language selection or verification failed.");
    }
  }

  /**
   * Handles the "Back to App" button if it exists.
   * @returns {Promise<void>} - Completes the navigation back to the application.
   */
  // async clickBackToAppButton() {
  //   var backToAppButtonExists = await this.page
  //     .locator(this.backToAppButton)
  //     .isVisible({ timeout: 3000 });
  //   if (backToAppButtonExists) {
  //     await this.page.click(this.backToAppButton);
  //     await this.page
  //       .locator(this.backToAppButton)
  //       .isVisible({ timeout: 3000 });
  //     await this.page.click(this.backToAppButton);
  //     await this.page.waitForNavigation({ waitUntil: "domcontentloaded" });
  //   }
  // }
}
module.exports = { LoginPage };
