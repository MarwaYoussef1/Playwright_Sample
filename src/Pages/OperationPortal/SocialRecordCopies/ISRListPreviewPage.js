const { SearchPage } = require("../../SharedPages/SearchPage");
const { IBRListPreviewPage } = require('../SocialRecordCopies/IBRListPreviewPage.js');
const { AUListPreviewPage } = require('../SocialRecordCopies/AUListPreviewPage.js');

export class ISRListPreviewPage {
    constructor(page) {
        this.page = page;
        this.search = new SearchPage(this.page);
        this.ibrListPreviewPagae = new IBRListPreviewPage(this.page);
        this.auListPreviewPage = new AUListPreviewPage(this.page);

        this.nameFilter = '//input[@data-testid="text-input-name"]';
        this.idFilter = '//input[@data-testid="text-input-nationalId"]';
        this.mobileNumberFilter = '//input[@data-testid="text-input-phoneNumber"]';
        this.filterButton = `//button[contains(text(),"عرض النتائج")]`;
        this.nationailIDField = `//tr//td[3]//span`;
        this.threeDotsButton = `//button[@data-testid="three-dots-menu"]`;
        this.ibrListPreviewOption = `//span[@data-testid="three-dots-menu-item-1"]`;
        this.auListPreviewOption = `//span[@data-testid="three-dots-menu-item-2"]`;
        this.getBackButton = `(//li[@class="MuiBreadcrumbs-li"])[2]`;


        this.benefitCycleMonth = `//div[@id="mui-component-select-programCycleMonth"]`;
        this.monthOption = `//li[@data-testid="option-2"]`;
        this.benefitCycleYear = `//div[@id="mui-component-select-programCycleYear"]`;
        this.yearOption = `//li[@data-testid="option-55"]`;
        this.stream = `//div[@id="mui-component-select-stream"]`;
        this.streamOption = `//li[@data-value="Social Benefits"]`;
        this.mainProgram = `//div[@id="mui-component-select-mainProgram"]`;
        this.mainProgramOption = `//li[@data-value="socialInsurance"]`;
        this.subProgram = `//div[@id="mui-component-select-subProgram"]`;
        this.subProgramOption = `//li[@data-value="socialInsurance"]`;
        this.benefitResponsibilityEntity = `//div[@id="mui-component-select-benefitResponsibleEntity"]`;
        this.benefitResponsibilityEntityOption = `//li[@data-value="Execution"]`;
        this.benefit = `//div[@id="mui-component-select-benefit"]`;
        this.benefitOption = `//li[@data-value="mainBenefitFlow"]`;

        this.showResultsButton = `//button[@data-testid="submit-button"]`;

        //filtered list preview Values
        this.benefitCycleMonthValue = `//div[@data-testid="select-box-programCycleMonth-selected-values-0"]//span`;
        this.benefitCycleYearValue = `//div[@data-testid="select-box-programCycleYear-selected-values-0"]//span`;
        this.subProgramValue = `//div[@id="mui-component-select-subProgram"]`;
        this.benefitResponsibilityEntityValue = `//div[@id="mui-component-select-benefitResponsibleEntity"]`;
        this.benefitValue = `//div[@id="mui-component-select-benefit"]`;


        this.benefitTd = `//tr//td[1]//span`;
        this.responsibleEntityTd = `//tr//td[2]//span`;
        this.benefitCycleDateTd = `//tr//td[3]//span`;
        this.subProgramTd = `//tr//td[4]//span`;
    }

    async getIsrByNationalId(nationalId) {
        await this.page.fill(this.idFilter, nationalId);
        await this.page.click(this.filterButton);
        await this.page.waitForTimeout(5000);
        await this.page.waitForSelector(this.nationailIDField, { state: "visible", timeout: 20000 });
        const nationalIdText = await this.page.textContent(this.nationailIDField);
        console.log("National ID Text: ", nationalIdText);
        if (nationalIdText === nationalId) {
            console.log("National ID found in the list.");
            return true;
        } else {
            console.log("National ID not found in the list.");
            return false;
        }
    }

    async openIBRListPreviewPage() {
        await this.page.click(this.threeDotsButton);
        await this.page.waitForSelector(this.ibrListPreviewOption, { state: "visible", timeout: 20000 });
        await this.page.click(this.ibrListPreviewOption);
        let result = await this.page.waitForSelector(this.showResultsButton, { state: "visible", timeout: 20000 })
        if (result) {
            console.log("IBR List Preview page opened successfully.");
            return true;
        }
        else
            return false;
    }

    async openAUListPreviewPage() {
        await this.page.click(this.threeDotsButton);
        await this.page.waitForSelector(this.auListPreviewOption, { state: "visible", timeout: 20000 });
        await this.page.click(this.auListPreviewOption);
        let result = await this.page.waitForSelector(this.showResultsButton, { state: "visible", timeout: 20000 })
        if (result) {
            console.log("AU List Preview page opened successfully.");
            return true;
        }
        else
            return false;
    }

    async filterIBRList() {
        const filterResult = await this.ibrListPreviewPagae.filterIBRList();
        if (!filterResult) {
            console.log("Filter IBR List Preview Page failed.");
            return false;
        }
        return true;
    }

    async filterAUList() {
        const filterResult = await this.auListPreviewPage.filterAUList();
        if (!filterResult) {
            console.log("Filter AU List Preview Page failed.");
            return false;
        }
        return true;
    }

    async backPage() {
        await this.page.click(this.getBackButton);
        await this.page.waitForTimeout(5000);
    }



}


module.exports = { ISRListPreviewPage };