const { request } = require("@playwright/test");


/**
 * Service class to manage benefits through API endpoints, including creating benefits
 * and retrieving their details.
 * @class
 */
export class BenefitsService {
  constructor(token) {
    this.baseUrl = global.testConfig.BASE_URL_API;
    this.createBenefitUrl = this.baseUrl + "/pm/pim/v1/benefits";
    this.getBenefitsUrl = this.baseUrl + "/pm/pim/v1/benefits/search";
    this.token = "Bearer " + token;
  }

    /**
   * Creates a new benefit using the provided data and subprogram ID.
   * @param {object} benefitBody - The data object containing benefit details.
   * @param {string} subProgramID - The ID of the associated subprogram.
   * @returns {Promise<string|null>} - Returns the business key of the created benefit, or null if creation fails.
   */
  async createBenefitAPI(benefitBody, subProgramID) {
    let businessKey;
    var requestContext = await request.newContext({ ignoreHTTPSErrors: true });

    // Prepare the payload for the request
    var jsonPayload = benefitBody.toJSON(subProgramID);    
    
    // Send the POST request to create the benefit
    var response = await requestContext.post(this.createBenefitUrl, {
      headers: { "Content-Type": "application/json",Accept: "application/json",Authorization: this.token },
      data: JSON.stringify(jsonPayload), 
      timeout: 30000,
    });

    var responseBody = await response.json();
    if (response.ok()) { businessKey = responseBody.result.businessKey;
    // Retrieve the business key of the created benefit
      console.log("Benefits businessKey:", businessKey);
    } else {
          // Log errors if the creation fails
          var errorBody = await response.text();
          console.error("Error Response Body:", errorBody);
          console.error("Failed to create Benefit:",response.status(),response.statusText());
           }

    await requestContext.dispose();
    return businessKey;
  }

  /**
   * Retrieves the serial number of a benefit using its business key.
   * @param {string} businessKey - The business key of the benefit.
   * @returns {Promise<string|null>} - Returns the serial number of the benefit, or null if not found.
   */
  async getBenefitNumberAPI(businessKey) {
    let benefitsNumber = null;
    var requestContext = await request.newContext({ ignoreHTTPSErrors: true });

    // Send the POST request to search for the benefit
    var response = await requestContext.post(this.getBenefitsUrl, {
      headers: {"Content-Type": "application/json",Authorization: this.token, Accept: "application/json"},
      data: JSON.stringify({pageSize: 10,pageNum: 1,retrievalType: "GRID"}),
      timeout: 30000,
    });

    var responseBody = await response.json();
    // Find the benefit matching the provided business key
    if (response.ok() && responseBody.result && responseBody.result.records) {
      var benefits = responseBody.result.records.find(
        (record) => record.businessKey === businessKey);
      if (benefits) {
        // Retrieve the serial number
        benefitsNumber = benefits.serialNumber;
        console.log(`Benefits Serial Number: ${benefitsNumber}`);
        } else {
          console.error(`Benefits Serial Number not found.`);
        }
    } else {
          var errorBody = await response.text();
          console.error("Error Response Body:", errorBody);
          console.error("Failed to retrieve Benefits:",response.status(),response.statusText());
        }
    await requestContext.dispose();
    return benefitsNumber;
  }
}
