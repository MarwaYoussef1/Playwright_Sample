const { request } = require('@playwright/test');

export class UserService {
  constructor(token) {
    this.token = "Bearer " + token;
    this.baseUrl = global.testConfig.APPLICANT_URL_API;
    this.createApplicantUserUrl = this.baseUrl + "/admin/realms/iis-ssb-applicant/users";
  }

  /**
   * Sends a request to create a user via the API.
   * @param {object} userBody - Instance of UserData with user details.
   * @returns {Promise<boolean>} - True if user created successfully.
   */
  async createApplicantUserAPI(userBody) {
    let success = false;
    var userId;
    var requestContext = await request.newContext({ ignoreHTTPSErrors: true });
    var jsonpayload = userBody.toJSON();
    var response = await requestContext.post(this.createApplicantUserUrl, {
      headers: {
        "Content-Type": "application/json",
        // "Accept": "application/json",
        "Authorization": this.token
      },
      data:jsonpayload,
      // data: JSON.stringify(jsonpayload),
      timeout: 30000,
    });

    if (response.status() === 201) {
      userId = userBody.getUsername();
      console.log("User created successfully with ID :" , userId);
      success = true;
    } else {
      const errorBody = await response.text();
      console.error("Failed to create user:");
      console.error("Status:", response.status(), response.statusText());
      console.error("Error Body:", errorBody);
    }
    await requestContext.dispose();
    return success;
  }
}
