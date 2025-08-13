const { request } = require("@playwright/test");
const fs = require('fs');

export class UploadService {
  constructor(token,baseURL) {
    this.baseUrl = baseURL;
    this.uploadPdfUrl = this.baseUrl + "/files-storage/v1/buckets/eligibility-engine/attachments";
    this.uploadCsvUrl = this.baseUrl + "/files-storage/v1/buckets/sasviya/attachments?fileName=";
    this.token = "Bearer " + token;
  }

  async uploadPdfAPI(fileName) {
    var fileId;
var requestContext = await request.newContext({ ignoreHTTPSErrors: true }); // Ignore SSL errors for UAT environment
// Read the file into a Buffer
var filePath = global.testConfig.UPLOAD_PATH + fileName; // Replace with actual file path


// Make the API request
var response = await requestContext.post(this.uploadPdfUrl, {
    headers: {
        Accept: "application/json",
        Authorization: this.token
    },

    multipart: {
      file: fs.createReadStream(filePath)
  },
    timeout: 30000
});

var responseBody = await response.json();

if (response.ok()) {
    fileId = responseBody.result.id;
    console.log("fileId: ", fileId);
} else {
    var errorBody = await response.text();
    console.error("Error Response Body:", errorBody);
    console.error(
        "Failed to upload file:",
        response.status(),
        response.statusText()
    );
}

await requestContext.dispose();
return fileId;

  }
async uploadCsvAPI(fileName,paramName) {
var fileId;
var requestContext = await request.newContext({ ignoreHTTPSErrors: true }); // Ignore SSL errors for UAT environment
// Read the file into a Buffer
var filePath = global.testConfig.UPLOAD_PATH + fileName; // Replace with actual file path


// Make the API request
var response = await requestContext.post(this.uploadCsvUrl+paramName, {
    headers: {
        Accept: "application/json",
        Authorization: this.token
    },

    multipart: {
      file: fs.createReadStream(filePath)
  },
    timeout: 30000
});

var responseBody = await response.json();

if (response.ok()) {
    fileId = responseBody.result.id;
    console.log("fileId: ", fileId);
} else {
    var errorBody = await response.text();
    console.error("Error Response Body:", errorBody);
    console.error(
        "Failed to upload file:",
        response.status(),
        response.statusText()
    );
}

await requestContext.dispose();
return fileId;

  }

  
}
