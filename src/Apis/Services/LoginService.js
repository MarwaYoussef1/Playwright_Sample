const { request } = require('@playwright/test');

export class LoginService {
  constructor(tokenUrl) {
    this.tokenUrl = tokenUrl;
  }

  async loginAdminPortal(userName, password) {
    let accessToken;
    // Create a new request context
    var requestContext = await request.newContext({
      ignoreHTTPSErrors: true // Ignore SSL errors for UAT environment
    });
     // Define the form parameters separately
     var formParams = {
      grant_type: 'password',
      username: userName,
      password: password,
      client_id: 'AdminPortal'
    };

    // Send POST request
    var response = await requestContext.post(this.tokenUrl, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      form:formParams
     
    });
    // Log response body
    var responseBody = await response.json();
    // Check if the response is OK
    if (response.ok()) {
      accessToken = responseBody.access_token;
      //console.log('Access Token:', accessToken);
    } else {
      var  errorBody = await response.text();
      console.error('Error Response Body:', errorBody);
      console.error('Failed to generate token:', response.status(), response.statusText());
    }

    // Dispose the request context
    await requestContext.dispose();
    return accessToken;
  }

  async loginOperationPortal(userName, password) {
    let accessToken;
    // Create a new request context
    var requestContext = await request.newContext({
      ignoreHTTPSErrors: true // Ignore SSL errors for UAT environment
    });
     // Define the form parameters separately
     var formParams = {
      grant_type: 'password',
      username: userName,
      password: password,
      client_id: 'OperationPortal'
    };

    // Send POST request
    var response = await requestContext.post(this.tokenUrl, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      form:formParams
     
    });
    // Log response body
    var responseBody = await response.json();
    // Check if the response is OK
    if (response.ok()) {
      accessToken = responseBody.access_token;
      //console.log('Access Token:', accessToken);
    } else {
      var  errorBody = await response.text();
      console.error('Error Response Body:', errorBody);
      console.error('Failed to generate token:', response.status(), response.statusText());
    }

    // Dispose the request context
    await requestContext.dispose();
    return accessToken;
  }

  async loginApplicantPortal(userName, password) {
    let accessToken;
    var requestContext = await request.newContext({ ignoreHTTPSErrors: true });

    var formParams = {
      grant_type: 'password',
      username: userName,
      password: password,
      client_id: 'ApplicantPortal' 
    };

    var response = await requestContext.post(this.tokenUrl, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Cookie' : 'BIGipServersso-uat.iis-ssb.com_8080_pool=34476460.36895.0000',
        // 'Accept': 'application/json'
      },
      form: formParams
    });

    var responseBody = await response.json();

    if (response.ok()) {
      accessToken = responseBody.access_token;

    } else {
      var  errorBody = await response.text();
      console.error('Error Response Body:', errorBody);
      console.error('Failed to generate token:', response.status(), response.statusText());
    }

    await requestContext.dispose();
    return accessToken;
  }


}
