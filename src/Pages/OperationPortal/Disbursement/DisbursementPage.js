import Constants from "../../../Utils/Constants.js";
var { expect } = require('@playwright/test');
const { PopUpPage } = require('../../SharedPages/PopUpPage');


export class DisbursementPage {
    constructor(page) {
        this.page = page;
        this.popUpMsg = new PopUpPage(this.page);
        this.filterBtn = '//*[@data-testid="toolbar-filter-button"]';
        //this.benefitNameValue = '//*[@data-value="fsscPreventiveibajjAuto"]';
        this.benefitNameValue = '//*[@data-testid="sentinelStart"]//following::ul';
        this.benefitNameBtn = '//*[@id="mui-component-select-benefitCode"]';
        this.benefitCycleNumberBtn = '//*[@id="mui-component-select-cycleNumber"]';
        this.benefitCycleNumberValue = '//*[@data-testid="sentinelStart"]//following::ul/li[2]';
        this.showResultsBtn = '//*[@data-testid="submit-button"]';
        this.startDisbursementOrderBtn = '//*[@data-testid="tooltip-button"]';
        this.calender = '//*[@aria-label="Choose date"]';
        this.date = '(//button[@aria-current="date"]//following::button)[1]';
        this.successPopupTitle = '//*[@id="modal-modal-title"]';
        this.backToHomeBtn = '//*[@data-testid="modal-primary-button"]';
        this.tasksBtn = '//*[@data-testid="menu-tasks"]';
    }

    async clickOnFilterButton() {
        await this.page.waitForSelector(this.filterBtn, { state: "visible", timeout: 20000 });
        await this.page.click(this.filterBtn);
    }

    async clickOnBenefitNameDropDownList() {
        await this.page.waitForSelector(this.benefitNameBtn, { state: "visible", timeout: 20000 });
        await this.page.click(this.benefitNameBtn); // open dropdown
        await this.scrollUntilVisible(this.page, this.benefitNameValue, 'fsscPreventiveibajjAuto');
    }

    async clickOnBenefitCycleNumber() {
        await this.page.waitForSelector(this.benefitCycleNumberBtn, { state: "visible", timeout: 20000 });
        await this.page.click(this.benefitCycleNumberBtn);
        await this.page.waitForSelector(this.benefitCycleNumberValue, { state: "visible", timeout: 20000 });
        await this.page.click(this.benefitCycleNumberValue);
    }

    async clickOnShowResults() {
        await this.page.waitForSelector(this.showResultsBtn, { state: "visible", timeout: 20000 });
        await this.page.click(this.showResultsBtn);
    }

    async clickOnStartDisbursementOrder() {
        await this.page.waitForSelector(this.startDisbursementOrderBtn, { state: "visible", timeout: 20000 });
        await this.page.click(this.startDisbursementOrderBtn);
    }

    async selectDate() {
        await this.page.waitForSelector(this.calender, { state: "visible", timeout: 20000 });
        await this.page.click(this.calender);
        await this.page.waitForSelector(this.date, { state: "visible", timeout: 20000 });
        await this.page.click(this.date);
    }

    async scrollUntilVisible(page, listSelector, targetValue) {
        const listbox = page.locator(listSelector);

        // Wait for the list to appear (in case it's opened by clicking a dropdown)
        await listbox.waitFor({ state: 'visible' });

        // Focus the listbox so keyboard events apply
        await listbox.focus();

        // Scroll down using ArrowDown key presses
        for (let i = 0; i < 200; i++) {
            // Check if the target item is visible yet
            const targetOption = page.locator(`//*[@data-value="${targetValue}"]`);
            if (await targetOption.isVisible()) {
                await targetOption.click(); // Optional: click when found
                console.log('✅ Found and clicked the target option');
                break;
            }

            // Press ArrowDown to scroll
            await page.mouse.wheel(0, 150)
            await page.waitForTimeout(3000); // give time for rendering
        }

    }

    async createDisbursement() {
        await this.clickOnFilterButton();
        console.log('click on FilterButton');
        await this.clickOnBenefitNameDropDownList();
        console.log('click on BenefiterDropDownList and select value');
        await this.clickOnBenefitCycleNumber();
        console.log('click on Benefit Cycle Number');
        await this.clickOnShowResults();
        console.log('click On Show Results');
        await this.selectDate();
        console.log('select Date');
        await this.clickOnStartDisbursementOrder();
        console.log("click On Start Disbursement Order");
        return await this.popUpMsg.popUpMessage(this.backToHomeBtn, global.testConfig.Disbursement.Disbursement_create_message);
    }
}
module.exports = { DisbursementPage };