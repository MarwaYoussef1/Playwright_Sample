const { SearchPage } = require("../../SharedPages/SearchPage.js");
const{SubDomainCreationPage} = require('./SubDomainCreationPage');
const{ManageSubDomainUpdateRequestsPage} = require ('./ManageSubDomainUpdateRequestsPage.js');
const{ViewSubDomainRequestPage} = require ('./ViewSubDomainRequestPage.js');
const {Utils}= require('../../../Utils/utils.js');


export class SubDomainLibraryUpdateReqPage {
    constructor(page) {
        this.page = page;
        this.utils = Utils;
        this.search = new SearchPage(this.page);
    
      
        
        this.subdomainLibraryUpdateRequest = '//button[contains(@class,"MuiButton-containedSizeLarge")]';
        this.searchField= '//input[@data-testid="search-input-base"]';
        this.tableActions='table-actions';

    }
/**
   * fill Field Data Definition using the provided data.
    * @param {object} SubDomainData - The data object containing field data defination tab.
   *
**/
    async clickOnSubDomainUpdateLibraryReqBtn() {
        await this.page.waitForSelector(this.subdomainLibraryUpdateRequest, { state: "visible", timeout: 5000 });
        await this.page.waitForTimeout(3000);
        await this.page.click(this.subdomainLibraryUpdateRequest);
        await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
        console.log("Sub domain Requests management Page Opened successfully.");   
}

    async sendSubDomainRequest(SubDomainData,NumOfDomains){
        var subDomainRequestManagement= new ManageSubDomainUpdateRequestsPage(this.page);
    
       await this.clickOnSubDomainUpdateLibraryReqBtn();
       return await subDomainRequestManagement.submitSubDomainCreateRequest(SubDomainData,NumOfDomains);
    }

    async checkSubDomainReqStatus(expectedStatus, requestID){
        let requestRowInfo=[];
        let status;
        let requestStatus;

        requestRowInfo = await this.search.searchOnUniqueRow(this.searchField, requestID);
        if (requestRowInfo && requestRowInfo.length > 0) {
            status = requestRowInfo[4].tdLocator;
            requestStatus = status.locator("span");
            await requestStatus.waitFor({ state: "visible" });
            var actual = await requestStatus.textContent();
        }
        if(actual==expectedStatus){
            return true;
        }
    }

    async checkSubDomainRequestDetails(requestID,SubDomainData){
        var viewSubDomainRequest = new ViewSubDomainRequestPage(this.page);

        let subDomainRow = [];
        var actionlocator = "button";

     console.log("search with text first "+ requestID);
     subDomainRow=await this.search.getRowInTableWithSpecificText(requestID);

        if (subDomainRow && subDomainRow.length > 0) {
            await this.search.clickRowAction(subDomainRow,this.tableActions, actionlocator);
            console.log("Request Details Page is opened successfully.");
        }
      //  await this.page.waitForTimeout(3000);
      return  await viewSubDomainRequest.checkSubmittedSubDomains(SubDomainData);
    
    }





}