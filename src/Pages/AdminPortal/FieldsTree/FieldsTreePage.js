export class FieldsTreePage {
    
    constructor(page) {
      this.page = page;

      this.ISRBtn = '//input[@type="radio"]';
      this.parentElementBtn = `//span[contains(text(),"${global.testConfig.createField.secoundParent}")]`;
      this.fieldsSection = '//li[@id="mui-tree-view-4-personalInformation"]//ul[@role="group"]';
      this.openTree='//div[contains(@class,"MuiTreeItem-content")]';
      this.ArName='(//label[contains(@id,"arabicName")]//following::div[@ref="value"])[1]';
      this.EngName='(//label[contains(@id,"englishName")]//following::div[@ref="value"])[1]';
      this.assignedDomain='(//label[contains(@id,"assignedDomain")]//following::div[@ref="value"])[1]';
      this.acceptChildType='(//label[contains(@id,"acceptChildType")]//following::div[@ref="value"])[1]';
      this.description='(//label[contains(@id,"description")]//following::div[@ref="value"])[1]';
      this.closeButtonPop='(//*[@data-testid="modal-title"]//following::button)[1]';
      
    }
  
  

    /**
     * open Personal Information section
     */
    async openFieldsSection() {

      await this.page.waitForTimeout(3000);
      await this.page.locator(this.ISRBtn).click({ timeout: 5000 });
      await this.page.waitForSelector(this.parentElementBtn, { state: "visible", timeout: 10000 });
      await this.page.locator(this.parentElementBtn).click({ timeout: 5000 });
      await this.page.waitForTimeout(3000);
    }
  
    /**
     * Check if Arabic field name exists
     * @param {string} fieldNameArabic - The Arabic field name to search for.
     * @param {object} SubDomainData - The data object containing field data defination tab.


     * @returns {Promise<boolean>}
     */
    async checkFieldExists(fieldData) {
    await this.openFieldsSection();
    let fieldNameArabic = fieldData.getArabicFieldName();
      const fieldLocator = `//span[contains(text(),"${fieldNameArabic}")]`;
      const isFieldVisible = await this.page.locator(fieldLocator).isVisible();
      
      if (isFieldVisible) {
        console.log(`Field "${fieldNameArabic}" exists.`);
      } else {
        console.error(`Field "${fieldNameArabic}" does NOT exist.`);
      }
  
      return isFieldVisible;
    }

  async checkSubDomainsExists(subDomainName,ExpectType){
    await this.page.click(this.openTree);
    var domainChild = this.page.locator(`//span[contains(text(), "${global.testConfig.createSubDomain.assignedDomainChild}")]`);
    await domainChild.waitFor({ state: 'visible', timeout: 5000 });
    await domainChild.click();
    await this.page.waitForTimeout(1000);
    const subDomainLocator = `//span[contains(text(),"${subDomainName}")]`;
    const TypeLocator=`(//span[contains(text(),"${subDomainName}")]//following::span)[1]`;
   
   const ActualType=  await this.page.textContent(TypeLocator);

    const isSubDomainVisible = await this.page.locator(subDomainLocator).isVisible();

    if (isSubDomainVisible&&ActualType==ExpectType) {
      console.log(`Field "${subDomainName}" exists.`);
      return true;
    } else {
      console.error(`Field "${subDomainName}" does NOT exist.`);
      return false;
    }
  }

  async checkSubDomainDetails(subDomainData){
    const validations = [];
    let allTrue=[];
    const viewActionLocator=`(//span[contains(text(),"${subDomainData.getsubDomainArabicName()[0]}")]//following::span)[2]`;

    await this.page.click(viewActionLocator);

    console.log("check subDomain details");

   const ActualArName=  await this.page.textContent(this.ArName);
   const ActualEngName= await this.page.textContent(this.EngName);
   const ActualAssignedDomain= await this.page.textContent(this.assignedDomain);
   const ActualAcceptChildType= await this.page.textContent(this.acceptChildType);
   const ActualDescription= await this.page.textContent(this.description);

   validations.push(ActualArName==subDomainData.getsubDomainArabicName()[0]);
   validations.push(ActualEngName==subDomainData.getsubDomainEnglishName()[0]);
   validations.push(ActualAssignedDomain==global.testConfig.createSubDomain.assignedDomainChild);
   validations.push(ActualAcceptChildType.trim()==subDomainData.getacceptChildType());
   validations.push(ActualDescription==subDomainData.getsubDomainDescription());

   allTrue = validations.every(element => element === true);
   await this.page.click(this.closeButtonPop);
   return allTrue;
  }

  }

  module.exports = { FieldsTreePage };
  