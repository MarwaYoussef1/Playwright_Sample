const { request } = require("@playwright/test");

export class DraftsService {
  constructor(token) {
    this.baseUrl = global.testConfig.BASE_URL_API;
    this.createDraftUrl = this.baseUrl + "/request-data/v1/drafts";
    this.token = "Bearer " + token;
  }

  async createSimulationDraftAPI(simulationBody) {
    var draftId;
    var requestContext = await request.newContext({ ignoreHTTPSErrors: true }); // Ignore SSL errors for UAT environment
    // Serialize the object to JSON
    var jsonpayload = simulationBody.toDraftJSON();
    var response = await requestContext.post(this.createDraftUrl, {
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
      draftId = responseBody.result.id;
      console.log("draftId:", draftId);
    } else {
      var errorBody = await response.text();
      console.error("Error Response Body:", errorBody);
      console.error(
        "Failed to generate draft:",
        response.status(),
        response.statusText()
      );
    }

    await requestContext.dispose();
    return draftId;
    
  }

  
}
