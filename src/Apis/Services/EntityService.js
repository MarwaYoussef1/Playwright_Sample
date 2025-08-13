const { request } = require('@playwright/test');

export class EntityService {
  constructor(token) {
    this.token = "Bearer " + token;
    this.baseUrl = global.testConfig.ENTITY_URL_API; 
    this.createEntityUrl = this.baseUrl + "/user-management/v1/organizations";
  }

  async createEntityAPI(entityBody) {
    let entityId = null;
    let entitySerialNo = null;
    let entityname = null;
    const requestContext = await request.newContext({ ignoreHTTPSErrors: true });
    const jsonPayload = entityBody.toJSON();

    const response = await requestContext.post(this.createEntityUrl, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": this.token
      },
      data: jsonPayload,
      timeout: 30000,
    });

    const responseBody = await response.json();

    if (response.ok()) {
      entityId = responseBody.result.id;
      entitySerialNo= responseBody.result.serialNumber;
      entityname = responseBody.result.name;
      // console.log("Entity created successfully with ID:", entityId);
      // console.log("Entity created successfully with ID:", entitySerialNo);
      // console.log("Entity created successfully with ID:", entityname);           
    } else {
      const errorBody = await response.text();
      console.error("Failed to create entity.");
      console.error("Status:", response.status(), response.statusText());
      console.error("Error Body:", errorBody);
    }
    await requestContext.dispose();
    return [entitySerialNo,entityname];
  }
}
