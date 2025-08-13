const { request } = require("@playwright/test");

export class DecisionModelService {
  constructor(token) {
    this.baseUrl = global.testConfig.BASE_URL_API;
    this.createDecisionModelUrl = this.baseUrl + "/eligibility/operation/v1/eligibility-engine/decision-models";
    this.searchDecisionModelUrl = this.baseUrl + "/eligibility/operation/v1/eligibility-engine/decision-models?pageNum=1&pageSize=10&searchKey=";
    this.token = "Bearer " + token;
  }

  async createSimulationModelAPI(DecisionModelBody) {
    var simulationModelCreated=null;
    var requestContext = await request.newContext({ ignoreHTTPSErrors: true }); // Ignore SSL errors for UAT environment
    // Serialize the object to JSON
    var jsonpayload = DecisionModelBody.toJSON();
    var response = await requestContext.post(this.createDecisionModelUrl, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: this.token,
      },
      data: jsonpayload,
      timeout: 30000,
    });

    var responseBody = await response.json();
     if (response.ok()) {
      simulationModelCreated=responseBody.result.businessKey;

      console.log("simulation model created successfully");
     
    } else {
       var errorBody = await response.text();
      console.error("Error Response Body:", errorBody);
      console.error(
        "Failed to generate simulation model:",
        response.status(),
        response.statusText()
      );

    }

    await requestContext.dispose();
    return simulationModelCreated;
    
  }

   /**
   * Retrieves the serial number of a simulation model using its business key [English name].
   * @param {string} simulationModelBusinessKey - The business key of the simulation model.
   * @returns {Promise<string|null>} - Returns the serial number of the simulationModel, or null if not found.
   */
   async getsimulationModelAPI(businessKey) {
    console.log(
      `simulationModelName :${ businessKey}`
    );
    var simulationModelNumber = null;
    var simulationRecord=null;
    var requestContext = await request.newContext({ ignoreHTTPSErrors: true });

    // Send the POST request to search for the simulation model
    var response = await requestContext.get(this.searchDecisionModelUrl, {
      headers: {"Content-Type": "application/json",Authorization: this.token,Accept: "application/json"},
      timeout: 30000,
    });
 
    var responseBody = await response.json();
    // Find the simulation model matching the provided ID
    if (response.ok() && responseBody.result && responseBody.result.records) {
      simulationRecord = responseBody.result.records.find(
        (record) => record.businessKey === businessKey);
      if (simulationRecord) {
       // Retrieve the serial number
       simulationModelNumber = simulationRecord.serialNumber;
        console.log(
          `simulationModelNumber :${ simulationModelNumber}`
        );
      } else {
        console.error(`simulationModel with key: ${businessKey} not found.`);
      }
    } else {
      // Log errors if the retrieval fails
      const errorBody = await response.text();
      console.error("Error Response Body:", errorBody);
      console.error(
        "Failed to retrieve simulation model:",
        response.status(),
        response.statusText()
      );
    }

    await requestContext.dispose();
    return simulationModelNumber;
  }

  
}



  

