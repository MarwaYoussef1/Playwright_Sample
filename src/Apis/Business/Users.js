const { expect } = require('@playwright/test');
const { LoginService } = require('../Services/LoginService');
const { UserService } = require('../Services/UserService');

export class Users {
  constructor() {
    this.token = null;
  }

  async getApplicantToken(userName, password) {
    var tokenUrl = global.testConfig.APPLICANT_TOKEN_URL_PORTAL;
    var loginService = new LoginService(tokenUrl);
    var token = await loginService.loginApplicantPortal(userName, password);
    expect(token).not.toBeNull();
    return this.token = token;
  }

  async createApplicantUser(userName, password, userData) {
    var token = await this.getApplicantToken(userName, password);
    var userService = new UserService(token);
    var result = await userService.createApplicantUserAPI(userData);
    expect(result).toBe(true);
    return result;
  }

}
