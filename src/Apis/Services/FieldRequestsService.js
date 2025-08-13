import { request } from "@playwright/test";
import Constants from '../../Utils/Constants';

/**
 * Service class to manage fields Requests through API endpoints, including sending for approval
 * and complete them.
 * @class
 */
export class FieldRequestsService {
  constructor(token) {
    this.baseUrl = global.testConfig.BASE_URL_API;
    this.fieldRequestsUrl = this.baseUrl + "/isr/fieldManagement/v1/requests/";
    this.searchRequestUrl = "/request-data/v1/requests/search";
    this.token = "Bearer " + token;
  }

  /**
   * Update ISR field Request status .
   * @param {object} fieldRequestBody - The data object containing fieldRequest details.
   * @param {object} requestAction - The data object containing fieldRequest details.
   * @returns {Promise<string|null>} - Returns the ids of the field, ISR request ID.
   */
  async updateFieldRequestAPI(fieldRequestBody, requestAction) {
    var requestContext = await request.newContext({ ignoreHTTPSErrors: true });
    var requestNumber = null;
    var jsonPayload = "{}";
    if (requestAction === Constants.SUBMIT_FIELDS_REQUESTS_API) {
      jsonPayload = fieldRequestBody.toJSON();
    }

    var fieldRequestId = fieldRequestBody.getRequestId();
    var baseUrl = `${this.fieldRequestsUrl}${fieldRequestId}`;
    var requestUrl = `${baseUrl}?mode=${requestAction}`;
    try {
      console.log("Start action:", requestAction);
      var response = await requestContext.put(requestUrl, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
          Authorization: this.token,
        },
        data: typeof jsonPayload === "string" ? jsonPayload : JSON.stringify(jsonPayload),
        timeout: 60000,
      });

      console.log("Response Status:", response.status());

      if (!response.ok()) {
        console.error(
          " Failed to Update Request:",
          response.status(),
          response.statusText()
        );
        console.error(" Error Response Body:", await response.text());
        return null;
      }

      var responseData = await response.json();
      if (responseData.result && responseData.result.resourceId) {
        requestNumber = responseData.result.resourceId;
        console.log("Request Number:", requestNumber);
      }
    } catch (error) {
      console.error(" Exception occurred:", error);
    }
    console.log("End action:", requestAction);
    return requestNumber;
  }


  /**
   * Update ISR field Request status .
   * @param {object} fieldRequestBody - The data object containing fieldRequest details.
   * @param {object} requestAction - The data object containing fieldRequest details.
   * @returns {Promise<string|null>} - Returns the ids of the field, ISR request ID.
   */
  async getISR_RequestIdAPI(serialRequestNumber) {
    var requestContext = await request.newContext({ ignoreHTTPSErrors: true });
    var requestID = null;


    var requestUrl = `${this.baseUrl}${this.searchRequestUrl}`;
    try {
      var response = await requestContext.post(requestUrl, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
          Authorization: this.token,
        },
        data: {
          pageSize: 10,
          type: 'ISR_SCHEMA',
          pageNum: 1
        },
        timeout: 60000,
      });

      console.log("Response Status:", response.status());
      var responseBody = await response.json();
      if (response.ok() && responseBody.result && responseBody.result.records) {
        var isrRequest = responseBody.result.records.find((record) => record.serialNumber === serialRequestNumber);

        if (isrRequest) {
          requestID = isrRequest.id;
          console.log(`Request serialNumber : ${serialRequestNumber}, request ID: ${requestID}`);
        } else {
          console.error(`Request Serial Number not found.`);
        }
      }
      else {
        var errorBody = await response.text();
        console.error("Error Response Body:", errorBody);
        console.error("Failed to retrieve Request:", response.status(), response.statusText());
      }
    } catch (error) {
      console.error(" Exception occurred:", error);
    }
    return requestID;
  }
}
