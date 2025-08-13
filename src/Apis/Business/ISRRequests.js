var { expect } = require('@playwright/test');
var { LoginService } = require('../Services/LoginService');
var { ISRService } = require('../Services/ISRService');
import Constants from '../../Utils/Constants';




/**
 * Manages the creation and approval of fields requests,
 * This class interacts with various services to handle these operations.
 * @class
 */
export class ISRRequests {

  constructor() {

    this.baseUrl = global.testConfig.BASE_URL_API;
  }


  /**
   * Retrieves an authentication token and initializes services.
   * @param {string} username - The  username.
   * @param {string} password - The  password.
   * @returns {Promise<void>} - Completes token retrieval and service initialization.
   */
  async getToken(username, password) {

    var tokenUrl = global.testConfig.GENERATE_TOKEN_URL_PORTAL;
    var loginService = new LoginService(tokenUrl);
    var token = await loginService.loginAdminPortal(username, password);
    expect(token).not.toBeNull();
    return this.token = token;
  }


  /**
   * Creates a new ISR using API 
   * @param {string} username - The admin username.
   * @param {string} password - The admin password.
   * @param {object} socialRecordCopiesData - Data for creating the ISR Copy.
   */
  async createIsrRequest(username, password, socialRecordCopiesData) {
    var isrResult = [];
    var token = await this.getToken(username, password);
    var isrService = new ISRService(token, this.baseUrl);
    var isrResult_BusinessKey = await isrService.createNewSechema(socialRecordCopiesData);
    expect(isrResult_BusinessKey).not.toBeNull();
    //isrResult.push(token);
    socialRecordCopiesData.setIsrBusinessKey(isrResult_BusinessKey);
    var fieldBusinessKey = await isrService.getListOfFields(socialRecordCopiesData.getIsrBusinessKey());
    expect(fieldBusinessKey).not.toBeNull();
    socialRecordCopiesData.setFieldBusinessKey(fieldBusinessKey[0]);
    var addField = await isrService.addNewFieldInISR(socialRecordCopiesData, socialRecordCopiesData.getIsrBusinessKey());
    expect(addField).not.toBeNull();

    var newIsrRequest = await isrService.createNewIsrRequest(socialRecordCopiesData);
    expect(newIsrRequest).not.toBeNull();
    socialRecordCopiesData.setVersionArabicName(newIsrRequest[1]);
    socialRecordCopiesData.setVersionEnglishName(newIsrRequest[2]);
    console.log("ISR Arabic Version Name: ", socialRecordCopiesData.getVersionArabicName());
    console.log("ISR English Version Name: ", socialRecordCopiesData.getVersionEnglishName());
    return { isrResult, fieldBusinessKey, addField, newIsrRequest };
  }

}
