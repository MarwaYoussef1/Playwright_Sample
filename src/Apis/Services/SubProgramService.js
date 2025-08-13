const { request } = require("@playwright/test");

/**
 * Service class to manage subprograms through API endpoints, including creating subprograms
 * and retrieving their details.
 * @class
 */
export class SubProgramService {
  constructor(token) {
    this.baseUrl = global.testConfig.BASE_URL_API;
    this.createSubProgramUrl = this.baseUrl + "/pm/pim/v1/subPrograms?isDraft=false";
    this.getSubProgramsUrl = this.baseUrl + "/pm/pim/v1/subPrograms/search";
    this.token = "Bearer " + token;
  }


  /**
   * Creates a new subprogram using the provided data and main program ID.
   * @param {object} subProgramBody - The data object containing subprogram details.
   * @param {string} mainProgramID - The ID of the associated main program.
   * @returns {Promise<string|null>} - Returns the business key of the created subprogram, or null if creation fails.
   */
  async createSubProgramAPI(subProgramBody, mainProgramID) {
    let businessKey;
    var requestContext = await request.newContext({ ignoreHTTPSErrors: true });

    // Prepare the payload with subprogram details and associated main program ID
    var jsonPayload = subProgramBody.toJSON(mainProgramID);    

    // Send the POST request to create the subprogram
    var response = await requestContext.post(this.createSubProgramUrl, {
      headers: { "Content-Type": "application/json",Accept: "application/json",Authorization: this.token},
      data: JSON.stringify(jsonPayload), 
      timeout: 30000,
    });

    var responseBody = await response.json();
    if (response.ok()) {
      // Retrieve the business key of the created subprogram
      businessKey = responseBody.result.businessKey;
      console.log("Sub Program businessKey:", businessKey);
    } else {
     // Log errors if the creation fails
      var errorBody = await response.text();
      console.error("Error Response Body:", errorBody);
      console.error(
        "Failed to create Sub Program:",
        response.status(),
        response.statusText()
      );
    }

    await requestContext.dispose();
    return businessKey;
  }


  /**
   * Retrieves the serial number of a subprogram using its business key.
   * @param {string} businessKey - The business key of the subprogram.
   * @returns {Promise<string|null>} - Returns the serial number of the subprogram, or null if not found.
   */
  async getSubProgramNumberAPI(businessKey) {
    let subProgramNumber = null;
    var requestContext = await request.newContext({ ignoreHTTPSErrors: true });

    // Send the POST request to search for the subprogram
    var response = await requestContext.post(this.getSubProgramsUrl, {
      headers: {"Content-Type": "application/json",Authorization: this.token, Accept: "application/json"},
      data: JSON.stringify({ pageSize: 10,pageNum: 1,retrievalType: "GRID" }),
      timeout: 30000,
    });
    var responseBody = await response.json();
    if (response.ok() && responseBody.result && responseBody.result.records) {
      var subProgram = responseBody.result.records.find(
        (record) => record.businessKey === businessKey
      );
      if (subProgram) {
        subProgramNumber = subProgram.serialNumber;
        console.log(
          `Sub Program Serial Number: ${subProgramNumber}`
        );
      } else {
        console.error(`Sub Program Serial Number not found.`);
      }
    } else {
      var errorBody = await response.text();
      console.error("Error Response Body:", errorBody);
      console.error(
        "Failed to retrieve Sub Programs:",
        response.status(),
        response.statusText()
      );
    }

    await requestContext.dispose();
    return subProgramNumber;
  }
}
