const { SearchPage } = require("../../SharedPages/SearchPage.js");
import Constants from '../../../../src/Utils/Constants.js';

export class SubDomainLibraryDetailsPage {
    constructor(page) {
        this.page = page;
        this.search = new SearchPage(this.page);

        this.subDomainStatus='(//div[@ref="value"])[1]';
        this.subDomainsEnableStatus='(//div[@ref="value"])[3]';
        this.subDomainLogTab='//button[@data-testid="tab-2"]';
        this.backBtnFromDetails='//button[@data-testid="back-to-sub-domains-library"]';
    }

    async checkSubDomainStatusAndEnability(tabName){
        let result;
        await this.page.waitForTimeout(3000);
        await this.page.waitForSelector(this.subDomainLogTab, { state: "visible", timeout: 7000 });
        await this.page.click(this.subDomainLogTab);

       let expectedSubdomainApproved=global.testConfig.createSubDomain.subDomainApprovedStatus;
       let expectedSubDomainEnable=global.testConfig.createSubDomain.subDomainEnableStatus;
       let expectedSubDomainRejected=global.testConfig.createSubDomain.subDomainRejectedStatus;
       let expectedSubDomainDisable=global.testConfig.createSubDomain.subDomainDisableStatus;

       const status = this.page.locator(this.subDomainStatus);
        await status.waitFor({ state: 'visible', timeout: 30000 });
        const actualStatus = await status.textContent();

        const subDomainIsAbleStatus = this.page.locator(this.subDomainsEnableStatus);
        await subDomainIsAbleStatus.waitFor({ state: 'visible', timeout: 30000 });
        const actualIsAbleStatus = await subDomainIsAbleStatus.textContent();

        console.log(`Actual subDomain status ${actualStatus}`);
        console.log(`Actual subDomain enability status ${actualIsAbleStatus}`);


        if(tabName == Constants.SUBDOMAIN_LIB_APPROVED){
            if(expectedSubdomainApproved==actualStatus && expectedSubDomainEnable==actualIsAbleStatus){
                result= true;
            }else{
                result= false;
            }
        }else{
            if(expectedSubDomainRejected==actualStatus && expectedSubDomainDisable==actualIsAbleStatus){
                result= true;
            }else{
                result= false;
            } 
        }
        await this.page.click(this.backBtnFromDetails);
        return result;

    }








}