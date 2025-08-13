
const { SearchPage } = require("../../SharedPages/SearchPage");

export class MyRequestsPage {

  constructor(page) {
    this.page = page;  
    this.RequestsTitle = '(//span[contains(text(),"طلباتي")])[3]';
    this.previousRequests = '(//button[@id="tab-1"])[1]';
    this.searchInput = '//input[@name="searchKey"]';
  }

  async verifyMyRequests() {
    await this.page.waitForSelector(this.RequestsTitle, { state: "visible", timeout: 10000 });
    return await this.page.locator(this.RequestsTitle).isVisible();
  }

  async navigateToPreviousRequests() {
    
    await this.page.click(this.previousRequests);
    console.log("The User Open Previous Requests Tab")
  }

   async checkRequestTypeAndStatus(ExpectedType , ExpectedStatus) {

     await this.navigateToPreviousRequests();

        let typeTd, requestType;
        let statusTd, requestStatus;
        let requestRow = [];

        var searchPage = new SearchPage(this.page); 
        var fetchDataRequest = global.testConfig.Applicant.fetchDataRequest;
        requestRow = await searchPage.searchOnUniqueRow(this.searchInput, fetchDataRequest);

        if (requestRow && requestRow.length > 0) {
            typeTd = requestRow[1].tdLocator;
            statusTd = requestRow[7].tdLocator;
            requestType = typeTd.locator("p");
            requestStatus = statusTd.locator("p");
            await requestType.waitFor({ state: "visible" });

            var actualRequestType = await requestType.textContent();
            var actualRequestStatus = await requestStatus.textContent();
        }
        console.log("The Request Type for created field is: ", actualRequestType);
        console.log("The Request status for created field is: ", actualRequestStatus);
        
        if (actualRequestType === ExpectedType && actualRequestStatus === ExpectedStatus ) {
            return true;
        }
        return false;
    }

}
module.exports = { MyRequestsPage };
