const { SearchPage } = require("../../SharedPages/SearchPage.js");
const {SubDomainLibraryDetailsPage} = require("../SubDomainLibrary/SubDomainLibraryDetailsPage.js");
import Constants from '../../../../src/Utils/Constants.js';



export class SubDomainLibraryManagementPage {
    constructor(page) {
        this.page = page;
        this.search = new SearchPage(this.page);
        this.subDomainLibraryDetailsPage = new SubDomainLibraryDetailsPage(this.page);

        this.tableActions = 'table-actions';
        this.allSubDomainTab = '//button[@data-testid="tab-1"]';
        this.approvedsubDomainsTab = '//button[@data-testid="tab-2"]';
        this.underReviewsubDomainsTab = '//button[@data-testid="tab-3"]';
        this.rejectedSubDomainTab = '//button[@data-testid="tab-4"]';
        this.searchInput = '//input[@data-testid="search-input-base"]';
        this.viewAction= '//span[text()="استعراض"]';


    }
 /**
    * fill Field Data Definition using the provided data.
    * @param {object} SubDomainData - The data object containing field data defination tab.
**/

async navigateToApprovedTab() {
    await this.page.click(this.approvedsubDomainsTab);
}

async navigateToRejectedTab() {
    await this.page.click(this.rejectedSubDomainTab);
}

async navigateToAllTab() {
}

async navigateToUnderReviewTab() {
}

async selectTab (tabName){
    if (tabName == Constants.SUBDOMAIN_LIB_UNDERREVIEW){
        await this.page.click(this.underReviewsubDomainsTab);
    }
       else if(tabName == Constants.SUBDOMAIN_LIB_REJECTED){
        await this.page.click(this.rejectedSubDomainTab);
    }
       else if(tabName == Constants.SUBDOMAIN_LIB_APPROVED){
        await this.page.click(this.approvedsubDomainsTab);
    }
       else{
        await this.page.click(this.allSubDomainTab);
    }
}

async checkSubDomainsListAtLibrary(subDomainsName, tabName){
    let subDomainRowInfo=[];
    let status =[];
    let nameAr;
    let subDomainName;

    console.log(`select needed subDomain library ${tabName}`);
    await this.selectTab(tabName);   

    for(let i=0;i<subDomainsName.length;i++){
   subDomainRowInfo = await this.search.searchOnUniqueRow(this.searchInput,subDomainsName[i] );
    if (subDomainRowInfo && subDomainRowInfo.length > 0) {
        nameAr = subDomainRowInfo[1].tdLocator;
        subDomainName = nameAr.locator("span");
        await subDomainName.waitFor({ state: "visible" });
        var actual = await subDomainName.textContent();
    }
    if(subDomainsName[i]==actual){
        console.log(`subDomain row found for Name: ${subDomainsName[i]}`);

        status.push(true);
        }  
      }
     let allTrue = status.every(element => element === true);

     return allTrue;
}

async checkSubDomainStatusDetails(subDomainName,tabName){
    await this.selectTab(tabName);  
    
    await this.page.waitForTimeout(3000);
    console.log(`search with subDomain: ${subDomainName}`);
    await this.search.searchOnUniqueRow(this.searchInput,subDomainName);

    await this.page.click(this.viewAction);

    console.log("check subDomain status and enability status");
    return await this.subDomainLibraryDetailsPage.checkSubDomainStatusAndEnability(tabName);
}

}