const { SearchPage } = require("../../SharedPages/SearchPage.js");
const { FieldRequestsPage } = require("./FieldRequestsPage");
const { FieldRequestDetialsPage } = require("./FieldRequestDetialsPage");

export class FieldLibraryUpdateRequestsPage {
    constructor(page) {
        this.page = page;
        this.search = new SearchPage(this.page);
        this.fieldRequestsPage = new FieldRequestsPage(this.page);
        this.fieldRequestDetialsPage = new FieldRequestDetialsPage(this.page);

        this.fieldLibraryUpdateRequestButton = '//button[@data-testid="field-library-update-request"]';
        this.tableActions = 'table-actions';


    }

    async verifyfieldLibraryUpdateRequestButtonExists() {
        return await this.page.locator(this.fieldLibraryUpdateRequestButton).isVisible();
    }

    async navigateToFieldRequestsPage() {
        var button = this.page.locator(this.fieldLibraryUpdateRequestButton);
        await button.waitFor({ state: "visible", timeout: 15000 });
        await button.click();
        console.log("Field Requests Page Opened successfully.");
    }


    async checkFieldRowRequestStatus(ExpectedFieldStatus) {
        let requestTd, requestType;
        let fieldRow = [];
        fieldRow = await this.search.getFirstRow();

        if (fieldRow && fieldRow.length > 0) {
            requestTd = fieldRow[5].tdLocator;
            requestType = requestTd.locator("span");
            await requestType.waitFor({ state: "visible" });
            var actualRequestStatus = await requestType.textContent();
        }
        console.log("The Request status for created field is: ", actualRequestStatus);
        if (actualRequestStatus === ExpectedFieldStatus) {
            return true;
        }
        return false;
    }

    /**
     * Opens the details page of a specific field by its identifier.
     * 
     * @param {string} fieldNumber - The unique identifier of the field to view.
     * @returns {Promise<void>} - Completes the action of opening the field details page.
     */
    async openViewRequestDetailsPage(requestNumber) {
        let fieldRow = [];

        fieldRow = await this.search.getRowInTableWithSpecificText(requestNumber);
        var actionlocator = "button";
        if (fieldRow && fieldRow.length > 0) {
            await this.search.clickRowAction(fieldRow, this.tableActions, actionlocator);
            console.log("Request Details Page is opened successfully.");
        }
    }


    /**
   * Creates Complex and Input fields.*/
    async createComplexFieldRequest(complexFieldData, inputFieldData) {
        await this.navigateToFieldRequestsPage();
        var complexFieldCreated = await this.fieldRequestsPage.createField(complexFieldData);
        var inputFieldCreated = await this.fieldRequestsPage.createField(inputFieldData);
        if (complexFieldCreated && inputFieldCreated) {
            var complexFieldID = await this.fieldRequestsPage.checkFieldRowDetails(complexFieldData);
            var inputFieldID = await this.fieldRequestsPage.checkFieldRowDetails(inputFieldData);
            var RequestNumber = await this.fieldRequestsPage.sendRequestToApproval(complexFieldData);
            console.log('Fields created successfully');
            return [RequestNumber, complexFieldID, inputFieldID]
        }

    }

    /**
 * Validates field details, optionally checks field type, and makes a decision.
 * @param {Array<string>} requestChecks - The request identifiers to validate.
 * @param {string} expectedRequestStatus - The expected status of the request.
 * @param {string|null} expectedEnablementStatus - The expected enablement status after decision.
 * @param {string|null} [expectedFieldType=null] - The expected field type to check (optional).
 * @returns {Promise<boolean>} - Returns true if all validations and decisions are successful.
 */
async validateFieldDetailsAndMakeDecision(requestChecks, expectedRequestStatus, expectedEnablementStatus, expectedFieldType = null) {
  await this.openViewRequestDetailsPage(requestChecks[0]);

  await this.fieldRequestDetialsPage.checkInsideRequestStatus(expectedRequestStatus);

  let fieldTypeValid = true;
  if (expectedFieldType) {
    fieldTypeValid = await this.fieldRequestDetialsPage.checkFieldType(requestChecks, expectedFieldType);
  }

  var sendRequest = await this.fieldRequestDetialsPage.verifyFieldEnablementStatusesAndMakeDecision(requestChecks, expectedEnablementStatus);
    if (sendRequest) {
            return true;
        }
        return false;
}

    /**
     * Creates Group and Input fields.*/
    async createGroupFieldRequest(groupFieldData, inputFieldData) {
        await this.navigateToFieldRequestsPage();
        var groupFieldCreated = await this.fieldRequestsPage.createField(groupFieldData);
        if (groupFieldCreated) {
            var groupFieldID = await this.fieldRequestsPage.checkFieldRowDetails(groupFieldData);
            await this.fieldRequestsPage.addFieldFromInside(groupFieldID);
            await this.page.waitForTimeout(1000);
            var inputFieldCreated = await this.fieldRequestsPage.createField(inputFieldData);
            if (inputFieldCreated) { var inputFieldID = await this.fieldRequestsPage.checkFieldRowDetails(inputFieldData); }
            var RequestNumber = await this.fieldRequestsPage.sendRequestToApproval(groupFieldData);
            console.log('Fields created successfully');
            return [RequestNumber, groupFieldID, inputFieldID]
        }
    }

    /**
         * Creates Anther Fields (Calculated field And Integration field And Input Lookup).*/
    async createOntherFieldRequest(FieldData) {
        await this.navigateToFieldRequestsPage();
        var FieldCreated = await this.fieldRequestsPage.createField(FieldData);
        if (FieldCreated) {
            var FieldID = await this.fieldRequestsPage.checkFieldRowDetails(FieldData);
            var RequestNumber = await this.fieldRequestsPage.sendRequestToApproval(FieldData);
            return [RequestNumber, FieldID]
        }
    }

   
}
module.exports = { FieldLibraryUpdateRequestsPage };