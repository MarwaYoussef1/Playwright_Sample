const { SearchPage } = require("../../SharedPages/SearchPage.js");
const { FieldDetialsPage } = require("./FieldDetialsPage");


export class FieldRequestDetialsPage {
    constructor(page) {
        this.page = page;
        this.search = new SearchPage(this.page);
        this.fieldDetialsPage =new FieldDetialsPage(this.page);
        this.requestStatusIcon = '//span[@data-testid="status-processing"]'; 
        this.RequestStatusData = '//span[contains(text(),"معالجة")]'; 
    }   

    async checkInsideRequestStatus(ExpectedFieldRequestStatus) {
    
        // Get the actual status text for both cases
        //var requestStatusIcon = await this.page.textContent(this.requestStatusIcon);
        var RequestStatusData = await this.page.textContent( this.RequestStatusData);
    
        // Log the retrieved data
        //console.log(`Request Status Icon : ${requestStatusIcon.trim()}`);
        console.log(`Request Status Data: ${RequestStatusData.trim()}`);

        if (RequestStatusData === ExpectedFieldRequestStatus) {
            return true;
          }
          return false;
    }
    

    
    async checkFieldEnablmentStatus(requestChecks, expectedEnablementStatus) {
        let rowIds = requestChecks.slice(1); // Ignore the first element
    
        for (let rowId of rowIds) {
            let rowDetails = await this.search.getRowInTableWithSpecificText(rowId);
            let rowStatus = await rowDetails[7].tdLocator.textContent();
    
            console.log(`Row Status (ID: ${rowId}): ${rowStatus}`);
    
            if (rowStatus !== expectedEnablementStatus) {
                return false;
            }
        }
        return true;
    }

    async checkFieldType(requestChecks, expectedFieldType) {
        let rowIds = requestChecks.slice(1); // Ignore the first element
    
        for (let rowId of rowIds) {
            let rowDetails = await this.search.getRowInTableWithSpecificText(rowId);
            let rowStatus = await rowDetails[3].tdLocator.textContent();
    
            console.log(`Row Status (ID: ${rowId}): ${rowStatus}`);
    
            if (rowStatus !== expectedFieldType) {
                return false;
            }
        }
        return true;
    }



    async openFieldDetailsPage(fieldData) {

        let fieldRow = await this.search.getRowInTableWithSpecificText(fieldData);
        await fieldRow[8].tdLocator.click();
        console.log("Field Detial Page Openned Successfully")

    }


    async verifyFieldEnablementStatusesAndMakeDecision(requestChecks, expectedEnablementStatus) {
        // Check field enablement status on the request details page
        await this.checkFieldEnablmentStatus(requestChecks, expectedEnablementStatus);
        //Marwa
        /*let rowIds = requestChecks.slice(1); // Ignore the first element

        for (let i = 0; i < rowIds.length; i++) {
            await this.openFieldDetailsPage(rowIds[i]);
            await this.fieldDetialsPage.checkInsideFieldStatus(expectedEnablementStatus);
    
            // Skip back navigation for the last field
            if (i < rowIds.length - 1) {
                await this.fieldDetialsPage.backtoRequestDetialsPage();
            }
        }

        // Navigate to make a decision
        var sendRequest = await this.fieldDetialsPage.clickOnMakeDecisionNow();
        if (sendRequest) {
        return true;
        }
        return false;*/
        return true;
    }

}
module.exports = { FieldRequestDetialsPage };