const { SearchPage } = require("../../SharedPages/SearchPage.js");




export class ViewSubDomainRequestPage{
    constructor(page) {
        this.page = page;
        this.search = new SearchPage(this.page);

        this.requestStatus='(//label[text()="حالة الطلب"]//following::span)[1]';
    } 

/**
   * fill Field Data Definition using the provided data.
    * @param {object} SubDomainData - The data object containing field data defination tab.
   *
**/
    async checkSubmittedSubDomains(SubDomainData){
        let subDomainInfoRow=[];
        let expectedResults = [];
        let allTrue;
        let actualReqStatus=global.testConfig.createSubDomain.subDomainProcessingStatus;

        await this.page.waitForTimeout(3000);
        console.log("func start");

        let expectedReqStatus= await this.page.textContent(this.requestStatus);
        if(actualReqStatus== expectedReqStatus){
            expectedResults.push(true); 
            console.log("Request status "+ actualReqStatus);

        }

        for(let i=0;i<SubDomainData.getsubDomainArabicName().length;i++){
        subDomainInfoRow = await this.search.getRowInTableWithSpecificText(SubDomainData.getsubDomainArabicName()[i]);
        console.log("name "+ SubDomainData.getsubDomainArabicName()[i]);

        if(subDomainInfoRow && subDomainInfoRow.length > i){
            expectedResults.push(true);
            console.log("SubDomain "+ SubDomainData.getsubDomainArabicName()[i] + " exist");

        }   
       }
       allTrue = expectedResults.every(element => element === true);

       return allTrue;
    }





    
}