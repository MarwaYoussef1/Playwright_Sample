var { expect } = require('@playwright/test');
var { LoginService } = require('../Services/LoginService');
var { FieldsService } = require('../Services/FieldsService');
var { FieldRequestsService } = require('../Services/FieldRequestsService');
var { TasksService } = require('../Services/TasksService');
import Constants from '../../Utils/Constants';




/**
 * Manages the creation and approval of fields requests,
 * This class interacts with various services to handle these operations.
 * @class
 */
export class FieldRequests {

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
   * Creates a new Field using API and retrieves its ID and it's request ID.
   * @param {string} username - The admin username.
   * @param {string} password - The admin password.
   * @param {object} fieldData - Data for creating the field.
   * @returns {Promise<[string, string]>} - The field ID and fieldRequest ID.
   */
  async createField(username, password, fieldData) {
    var fieldResult = [];
    var token = await this.getToken(username, password);
    var fieldsService = new FieldsService(token, this.baseUrl);
    var fieldResult = await fieldsService.createFieldAPI(fieldData);
    expect(fieldResult).not.toBeNull();
    fieldResult.push(token);
    return fieldResult;
  }

  /**
    * Creates and approves a FieldRequest with fields.
    * @param {string} username - The  username.
    * @param {string} password - The  password.
    * @param {object} fieldRequestData - Data for creating the request including fields.
    * @returns {object} -fieldRequestData 
    */

  async createFieldRequestAPI(username, password, fieldRequestData) {
    var fields = fieldRequestData.getFields();
    var fieldsIds = [];
    var fieldRequestId, fieldResult, fieldRequestNumber;
    var token = await this.getToken(username, password);
    var fieldsService = new FieldsService(token, this.baseUrl);

    // Step 1: Create first field only
    fieldResult = await fieldsService.createFieldAPI(fields[0]);
    expect(fieldResult).not.toBeNull();
    fieldsIds.push(fieldResult[0]);
    fieldRequestId = fieldResult[1];
    fieldRequestData.setRequestId(fieldRequestId);

    // Step 3: Send request for approval  
    var fieldsRequestsService = new FieldRequestsService(token);
    fieldRequestNumber = await fieldsRequestsService.updateFieldRequestAPI(
      fieldRequestData,
      Constants.SUBMIT_FIELDS_REQUESTS_API
    );
    expect(fieldRequestNumber).not.toBeNull();

    // Step 4: Assign request to myself
    var tasksService = new TasksService(token);
    var searchNumber = await tasksService.getTaskID(fieldRequestNumber);
    expect(searchNumber).not.toBeNull();
    var assign = await tasksService.assignTask(searchNumber);
    expect(assign).not.toBeNull();

    // Step 5: Approve the only field
    var fieldAccepted = await fieldsService.approveRejectFieldAPI(
      fieldsIds[0],
      Constants.APPROVE_FIELD_API
    );
    expect(fieldAccepted).toBe(true);

    // Step 6: Complete request
    await new Promise((resolve) => setTimeout(resolve, 10000));
    fieldRequestNumber = await fieldsRequestsService.updateFieldRequestAPI(
      fieldRequestData,
      Constants.COMPLETE_FIELDS_REQUESTS_API
    );
    expect(fieldRequestNumber).not.toBeNull();

    return fieldRequestData;
  }

  /**
  * Creates a new Field using API and retrieves its ID and it's request ID.
  * @param {string} username - The admin username.
  * @param {string} password - The admin password.
  * @param {object} fieldData - Data for creating the field.
  * @returns {Promise<[string, string]>} - The field ID and fieldRequest ID.
  */
  async getISRRequestId(token, serialRequestNumber) {
    var requestID;
    var fieldsRequestsService = new FieldRequestsService(token);
    requestID = await fieldsRequestsService.getISR_RequestIdAPI(serialRequestNumber);
    expect(requestID).not.toBeNull();
    console.log("ISR Request ID: ", requestID);
    return requestID;
  }

  /**
   * Retrieves all field IDs associated with a specific ISR field English name and request ID.
   * @param {string} username - The admin username.
   * @param {string} password - The admin password.
   * @param {string} ISRFieldEnglishName - The ISR field English name.
   * @param {string} serialRequestNumber - The serial request number to fetch the request ID.
   * @returns {Promise<string[]>} - An array of field IDs.
   */
  async getFieldsIDsAPI(token, ISRFieldEnglishName, requestId) {
    var fieldsService = new FieldsService(token, this.baseUrl);

    // Step 1: Get the request ID using the serial request number
    //var requestId = await this.getISRRequestId(username, password, serialRequestNumber);
    //var requestId = "6818c5123104c5662e17a000";

    // Step 2: Retrieve all field IDs using the ISR field English name and request ID
    var fieldIds = await fieldsService.getFieldsIDsAPI(ISRFieldEnglishName, requestId);
    expect(fieldIds).not.toBeNull();
    expect(Array.isArray(fieldIds)).toBe(true);

    console.log("Field IDs: ", fieldIds);
    return fieldIds;
  }

  async approveRequestFields(username, password, serialRequestNumber, ISRFieldEnglishName) {
    var token = await this.getToken(username, password);
    var fieldsService = new FieldsService(token, this.baseUrl);
    var requestID;
    var fieldsRequestsService = new FieldRequestsService(token);
    requestID = await fieldsRequestsService.getISR_RequestIdAPI(serialRequestNumber);
    expect(requestID).not.toBeNull();

    var fieldIds = await fieldsService.getFieldsIDsAPI(ISRFieldEnglishName, requestID);
    expect(fieldIds).not.toBeNull();
    expect(Array.isArray(fieldIds)).toBe(true);
    expect(fieldIds.length).toBeGreaterThan(0); // Make sure at least 1 exists

    var fieldAccepted = await fieldsService.approveRejectISRFieldAPI(fieldIds[0],
      Constants.ACCEPT_ISR_FIELD_REQUEST,
      ISRFieldEnglishName);
    expect(fieldAccepted).toBe(true);
  }
}
