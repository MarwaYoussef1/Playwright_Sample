const { AxonHomePage } = require("./AxonHomePage");

export class AxonLoginPage {
  constructor(page) {
    this.page = page;

    // Selectors for login elements
    this.userNameField = '[id="username"]';
    this.passwordField = '[id="password"]',
    this.axonLoginButton= '[id="fullPageLogin"]'

  }

  /**
   * Navigates to the admin portal .
   * @param {string} baseUrl - The URL of the admin portal.
   * @returns {Promise<void>} - Completes the navigation and language setup.
   */
  async gotoAxon(baseUrl) {
    await this.page.goto(baseUrl);
    await this.page.waitForTimeout(3000);
  }

   /**
   * Performs user login with the provided credentials.
   * @param {string} userName - The username for login.
   * @param {string} password - The password for login.
   * @returns {Promise<boolean>} - Returns true if the user successfully logs in.
   */
   async axonLogin(userName, password) {
    await this.page.fill(this.userNameField, userName);
    await this.page.fill(this.passwordField, password);
    await this.page.click(this.axonLoginButton);

    var axonHomePage = new AxonHomePage(this.page);
    var loginSuccess = await axonHomePage.verifyLogin();
    return loginSuccess;  
  }
 
}
module.exports = { AxonLoginPage };
