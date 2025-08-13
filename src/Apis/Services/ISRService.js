const { request } = require("@playwright/test");
//const { SocialRecordCopiesData } = require('../../../src/Models/AdminPortal/SocialRecordCopiesData.js');


//let socialRecordCopiesData = new SocialRecordCopiesData();


/**
 * Service class to manage ISR through API endpoints
 * @class
 */
export class ISRService {
  constructor(token) {
    this.baseUrl = global.testConfig.BASE_URL_API;
    this.isrUrl = this.baseUrl + "/isr/schema/v1/schemas";
    this.token = "Bearer " + token;

  }


  /**
 * Creates a new field using the provided data.
 * @param {object} createdBody - The data object containing field details.
 * @returns {Promise<string|null>} - Returns the ids of the field, ISR request ID.
 */
  async createNewSechema(createdBody) {
    let businessKey, serialNumber;
    var requestContext = await request.newContext({ ignoreHTTPSErrors: true });

    // Prepare the payload for the request
    var jsonPayload = createdBody.isrSchemaCreationToJSON();
    console.log("jsonPayload is :", JSON.stringify(jsonPayload));

    // Send the POST request to create the ISR copy
    var response = await requestContext.post(this.isrUrl, {
      headers: { "Content-Type": "application/json", Accept: "*/*", Authorization: this.token },
      data: JSON.stringify(jsonPayload),
      timeout: 30000,
    });

    var responseBody = await response.json();
    if (response.ok()) {
      businessKey = responseBody.result.businessKey;
      //serialNumber = responseBody.result.serialNumber;
      //socialRecordCopiesData.setIsrBusinessKey(businessKey);
      // Retrieve the business Key & serial Number of the created ISR
      console.log("business Key is :", businessKey);
      //console.log("serial Number is :", serialNumber);
    } else {
      // Log errors if the creation fails
      var errorBody = await response.text();
      console.error("Error Response Body:", errorBody);
      console.error("Failed to create Field:", response.status(), response.statusText());
    }

    await requestContext.dispose();
    return businessKey;
  }


  /**
   * Retrieves field IDs from the API.
   * @returns {Promise<Array<string>>} - Returns an array of field IDs.
   */
  async getListOfFields(isrBusinessKey) {
    let fieldBusinessKey = [];
    var requestContext = await request.newContext({ ignoreHTTPSErrors: true });
    var getListFieldsUrl = `${this.isrUrl}/${isrBusinessKey}/fields/available?page=1&size=10`;

    // Send the GET request to retrieve field IDs
    var response = await requestContext.get(getListFieldsUrl, {
      headers: { Accept: "application/json", Authorization: this.token },
      timeout: 30000,
    });

    if (response.ok()) {
      var responseBody = await response.json();
      //console.log("Full Response Body:", JSON.stringify(responseBody, null, 2));
      if (responseBody.result && responseBody.result.length > 0) {
        fieldBusinessKey.push(responseBody.result[0].businessKey);
        //socialRecordCopiesData.setFieldBusinessKey(fieldBusinessKey[0]);
        //console.log("Field Business Key is:", socialRecordCopiesData.getFieldBusinessKey());
      }
    } else {
      // Log errors if the retrieval fails
      var errorBody = await response.text();
      console.error("Error Response Body:", errorBody);
      console.error("Failed to retrieve Field IDs:", response.status(), response.statusText());
    }

    await requestContext.dispose();
    return fieldBusinessKey;
  }


  /**
 * Creates a new field using the provided data.
 * @param {object} createdIsrBody - The data object containing field details.
 * @returns {Promise<string|null>} - Returns the ids of the field, ISR request ID.
 */
  async addNewFieldInISR(createdBody, isrBusinessKey) {
    var requestContext = await request.newContext({ ignoreHTTPSErrors: true });

    // Prepare the payload for the request
    var jsonPayload = createdBody.addFieldInIsrToJSON();
    //console.log("jsonPayload is :", JSON.stringify(jsonPayload));

    var addFieldInIsrUrl = `${this.isrUrl}/${isrBusinessKey}/fields`;

    // Send the POST request to create the ISR copy
    var response = await requestContext.post(addFieldInIsrUrl, {
      headers: { "Content-Type": "application/json", Accept: "*/*", Authorization: this.token },
      data: JSON.stringify(jsonPayload),
      timeout: 30000,
    });

    var responseBody = await response.json();
    if (response.ok()) {
      console.log("add New Field In ISR API Passed Successfully");
      //console.log("Response Body:", JSON.stringify(responseBody, null, 2));
    } else {
      // Log errors if the creation fails
      var errorBody = await response.text();
      console.error("Error Response Body:", errorBody);
      console.error("Failed to create Field:", response.status(), response.statusText());
    }

    await requestContext.dispose();
    return responseBody;
  }


  /**
* Creates a new field using the provided data.
* @param {object} createdIsrBody - The data object containing field details.
* @returns {Promise<string|null>} - Returns the ids of the field, ISR request ID.
*/
  async createNewIsrRequest(createdBody) {
    let serialNumber, isrArabicName, isrEnglishName;
    var requestContext = await request.newContext({ ignoreHTTPSErrors: true });

    // Prepare the payload for the request
    var jsonPayload = createdBody.requestCreationToJSON();
    //console.log("jsonPayload is :", JSON.stringify(jsonPayload));

    var createIsrRequestUrl = `${this.isrUrl}/requests`;

    // Send the POST request to create the ISR copy
    var response = await requestContext.post(createIsrRequestUrl, {
      headers: { "Content-Type": "application/json", Accept: "*/*", Authorization: this.token },
      data: JSON.stringify(jsonPayload),
      timeout: 30000,
    });

    var responseBody = await response.json();
    if (response.ok()) {
      serialNumber = responseBody.result.serialNumber;
      isrArabicName = responseBody.result.schemaName.ar;
      isrEnglishName = responseBody.result.schemaName.en;
      console.log("ISR Serial Number:", serialNumber);
      console.log("ISR Schema Name (AR):", isrArabicName);
      console.log("ISR Schema Name (EN)):", isrEnglishName);
      console.log("Create New ISR Request API Passed Successfully");
      //console.log("Response Body:", JSON.stringify(responseBody, null, 2));
    } else {
      // Log errors if the creation fails
      var errorBody = await response.text();
      console.error("Error Response Body:", errorBody);
      console.error("Failed to create Field:", response.status(), response.statusText());
    }

    await requestContext.dispose();
    return [serialNumber, isrArabicName, isrEnglishName];
  }

}
