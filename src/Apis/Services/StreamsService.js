const { request } = require("@playwright/test");

export class StreamsService {
  constructor(token) {
    this.baseUrl = global.testConfig.BASE_URL_API;
    this.createStreamUrl = this.baseUrl + "/pm/pim/v1/streams";
    this.getStreamsUrl = this.baseUrl + "/pm/pim/v1/streams?pageNum=1&pageSize=10";
    this.token = "Bearer " + token;
  }

  async createStreamAPI(streamBody) {
    var streamId;
    var requestContext = await request.newContext({ ignoreHTTPSErrors: true }); // Ignore SSL errors for UAT environment
    // Serialize the object to JSON
    var jsonpayload = streamBody.toJSON();
    var response = await requestContext.post(this.createStreamUrl, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: this.token,
      },
      data: jsonpayload,
      timeout: 30000,
    });

    var responseBody = await response.json();
    //console.log('Access Token:', accessToken);
    if (response.ok()) {
      streamId = responseBody.result.streamId;
      // console.log("Response Body:", responseBody);
      console.log("streamId:", streamId);
    } else {
      var errorBody = await response.text();
      console.error("Error Response Body:", errorBody);
      console.error(
        "Failed to generate token:",
        response.status(),
        response.statusText()
      );
    }

    await requestContext.dispose();
    return streamId ;
  }

  async getStreamNumberAPI(streamId) {
    let streamNumber = null;
    // Create a request context
    var requestContext = await request.newContext({ ignoreHTTPSErrors: true }); 

    // Make the GET request to fetch all streams
    var response = await requestContext.get(this.getStreamsUrl, {
      headers: {
        Authorization: this.token,
        Accept: "application/json",
      },
      timeout: 30000,
    });
    // Parse the response body
    var responseBody = await response.json();
    // Check if the response is OK and contains the required structure
    if (response.ok() && responseBody.result && responseBody.result.records) {
      // Find the stream with the specified ID
      var stream = responseBody.result.records.find(
        (record) => record.id === streamId
      );
      if (stream) {
        streamNumber = stream.serialNumber;
        console.log(`Stream ID: ${streamId}, Serial Number: ${streamNumber}`);
      } else {
        console.error(`Stream with ID: ${streamId} not found.`);
      }
    } else {
      var errorBody = await response.text();
      console.error("Error Response Body:", errorBody);
      console.error( "Failed to generate token:",response.status(),response.statusText());
    }
    // Dispose of the request context
    await requestContext.dispose();
    return streamNumber;
  }
}
