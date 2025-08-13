const { request } = require("@playwright/test");

/**
 * Service class to manage main programs through API endpoints, including creating main programs
 * and retrieving their details.
 * @class
 */
export class MainProgramService {
  constructor(token) {
    this.baseUrl = global.testConfig.BASE_URL_API;
    this.createMainProgramUrl = this.baseUrl + "/pm/pim/v1/programs";
    this.getMainProgramsUrl = this.baseUrl + "/pm/pim/v1/programs/search";
    this.token = "Bearer " + token;
  }

   /**
   * Creates a new main program using the provided data and stream ID.
   * @param {object} mainProgramBody - The data object containing main program details.
   * @param {string} streamID - The ID of the associated stream.
   * @returns {Promise<string|null>} - Returns the ID of the created main program, or null if creation fails.
   */
  async createMainProgramAPI(mainProgramBody, streamID) {
    let mainProgramId;
    var requestContext = await request.newContext({ ignoreHTTPSErrors: true });

    var jsonPayload = {...mainProgramBody.toJSON(), streamId: streamID};   
    // console.log("Payload to be sent:", jsonPayload);

    // Send the POST request to create the main program
      var response = await requestContext.post(this.createMainProgramUrl, {
      headers: {"Content-Type": "application/json",Accept: "application/json", Authorization: this.token},
      data: JSON.stringify(jsonPayload), 
     timeout: 30000});

    var responseBody = await response.json();
    // Retrieve the main program ID from the response
    if (response.ok()) { mainProgramId = responseBody.result.programBusinessKey;
      console.log("Main Program ID:", mainProgramId);
    } else {
      // Log errors if the creation fails
      var errorBody = await response.text();
      console.error("Error Response Body:", errorBody);
      console.error( "Failed to create Main Program:",response.status(), response.statusText() );
    }

    await requestContext.dispose();
    return mainProgramId;
  }


  /**
   * Retrieves the serial number of a main program using its ID.
   * @param {string} mainProgramId - The ID of the main program.
   * @returns {Promise<string|null>} - Returns the serial number of the main program, or null if not found.
   */
  async getMainProgramNumberAPI(mainProgramId) {
    let mainProgramNumber = null;
    var requestContext = await request.newContext({ ignoreHTTPSErrors: true });

    // Send the POST request to search for the main program
    var response = await requestContext.post(this.getMainProgramsUrl, {
      headers: {"Content-Type": "application/json",Authorization: this.token,Accept: "application/json"},
      data: JSON.stringify({ pageSize: 10,pageNum: 1,retrievalType: "GRID"}),
      timeout: 30000,
    });

    var responseBody = await response.json();
    // Find the main program matching the provided ID
    if (response.ok() && responseBody.result && responseBody.result.records) {
        var mainProgram = responseBody.result.records.find(
        (record) => record.id === mainProgramId
      );
      if (mainProgram) {
       // Retrieve the serial number
        mainProgramNumber = mainProgram.serialNumber;
        console.log(
          `Main Program ID: ${mainProgramId}, Serial Number: ${mainProgramNumber}`
        );
      } else {
        console.error(`Main Program with ID: ${mainProgramId} not found.`);
      }
    } else {
      // Log errors if the retrieval fails
      const errorBody = await response.text();
      console.error("Error Response Body:", errorBody);
      console.error(
        "Failed to retrieve Main Programs:",
        response.status(),
        response.statusText()
      );
    }

    await requestContext.dispose();
    return mainProgramNumber;
  }

  
}