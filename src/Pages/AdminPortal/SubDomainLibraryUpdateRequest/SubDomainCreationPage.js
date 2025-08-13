import Constants from '../../../Utils/Constants.js';

const { PopUpPage } = require("../../SharedPages/PopUpPage.js");


export class SubDomainCreationPage {
    constructor(page) {
      this.page = page;

this.subDomainArName= '//input[@data-testid="domain-arabic-name"]';
this.subDomainEngName= '//input[@data-testid="sub-domain-englishName"]';
this.acceptChildTypeField ='//input[@data-testid="childType" and @value="FIELD"]';
this.acceptChildTypeDomain='//input[@data-testid="childType" and @value="DOMAIN"]';
this.assignedDomain='//input[@data-testid="assigned-domain"]';
this.chooseAssignedDomain='(//button[contains(@class,"MuiButton-containedSizeMedium")])[2]';
this.subDomainDesc='//textarea[contains(@id,"description")]';
this.createDomainBtn='//button[@data-testid="next-button"]';
    }

 /**
   * fill Field Data Definition using the provided data.
   * @param {object} SubDomainData - The data object containing field data defination tab.
   * @returns {Promise<boolean>} - Returns true if the filed data is created successfully.
   *
**/

async createSubDomain(SubDomainData,NumOfDomains) {

    // Retrieve domain names from the provided data
   // var subDomainAr = SubDomainData.getsubDomainArabicName();

   if (!SubDomainData.arabicNames) {
    // Generate arabic names only once.
    SubDomainData.setsubDomainArabicName(NumOfDomains);
    SubDomainData.arabicNames = SubDomainData.getsubDomainArabicName();
    SubDomainData.currentIndex = 0;
  }

  if (!SubDomainData.englishNames) {
    // Generate english names only once.
    SubDomainData.setsubDomainEnglishName(NumOfDomains);
    SubDomainData.englishNames = SubDomainData.getsubDomainEnglishName();
    SubDomainData.currentIndex = 0;
  }

   const arabicNames = SubDomainData.getsubDomainArabicName();
   const englishNames = SubDomainData.getsubDomainEnglishName();
    var acceptedChildType = SubDomainData.getacceptChildType();
    var assignedDomain=SubDomainData.getassignedDomain();
    var subDomainDesc=SubDomainData.getsubDomainDescription();
    
    //enter sub domain names
    if (arabicNames && arabicNames.length > SubDomainData.currentIndex) {
      await this.page.fill(this.subDomainArName, arabicNames[SubDomainData.currentIndex]); // Fill with the name at currentIndex.
      await this.page.fill(this.subDomainEngName, englishNames[SubDomainData.currentIndex]); // Fill with the name at currentIndex.

      SubDomainData.currentIndex++; // Increment the index for the next call.
    } else {
      console.error("No more arabic names available.");
    }

    //enter sub domain english name
  /*  if (englishNames && englishNames.length > SubDomainData.currentIndex) {
      await this.page.fill(this.subDomainEngName, englishNames[SubDomainData.currentIndex]); // Fill with the name at currentIndex.
      SubDomainData.currentIndex++; // Increment the index for the next call.
    } else {
      console.error("No more english names available.");
    }*/


   //   await this.page.fill(this.subDomainEngName,subDomainEng);
    if(acceptedChildType==Constants.acceptChildTypeField){
        await this.page.click(this.acceptChildTypeField);
    }else{
        await this.page.click(this.acceptChildTypeDomain );
    }
    this.selectAssignedDomain(assignedDomain);
    await this.page.fill(this.subDomainDesc, subDomainDesc);
    await this.page.click(this.createDomainBtn);
        

      }


      async selectAssignedDomain(domainName) {
        await this.page.click(this.assignedDomain);
        var socialRecordItem = this.page.locator(`//span[contains(text(), "${domainName}")]`);
        await socialRecordItem.waitFor({ state: 'visible', timeout: 5000 });
        await socialRecordItem.click();    
        await this.page.waitForTimeout(1000);
        var domainChild = this.page.locator(`//span[contains(text(), "${global.testConfig.createSubDomain.assignedDomainChild}")]`);
        await domainChild.waitFor({ state: 'visible', timeout: 5000 });
        await domainChild.click();
        await this.page.waitForTimeout(1000);
        await this.page.click(this.chooseAssignedDomain);

        }


         
        
    


}     