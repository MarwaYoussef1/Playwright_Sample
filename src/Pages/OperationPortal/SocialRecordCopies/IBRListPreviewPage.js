const { ListFilter } = require('../SocialRecordCopies/ListFilter.js');

export class IBRListPreviewPage {
    constructor(page) {
        this.page = page;
        this.listFilter = new ListFilter(page);

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

    async filterIBRList() {
        const filterResult = await this.listFilter.filterListPreviewPage();
        if (!filterResult) {
            console.log("Filter List Preview Page failed.");
            return false;
        }

        const filteredValues = await this.listFilter.getFilteredListPreviewValues();
        if (!filteredValues) {
            console.log("Get Filtered List Preview Values failed.");
            return false;
        }

        const verificationResult = await this.listFilter.verifyISRListDetails();
        if (!verificationResult) {
            console.log("Verify ISR List Details failed.");
            return false;
        }

        return true;
    }

}


module.exports = { IBRListPreviewPage };