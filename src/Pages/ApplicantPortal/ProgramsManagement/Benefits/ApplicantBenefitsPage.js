const { SearchPage } = require("../../../SharedPages/SearchPage");

export class ApplicantBenefitsPage {
  constructor(page) {
    this.page = page;
    this.search = new SearchPage(this.page);
    this.benefitWord = '//span[@class="MuiTypography-root MuiTypography-displaySm-bold muirtl-1a6qwee"]';
    this.benefitSearchInput = '//div[@data-testid="Search-input"]//input';
    this.searchBtn = '//button[@data-testid="Search-submit"]';
    this.viewBtn = '//a[@data-testid="benefits-view-button"]';
    this.benefitLocator = 'table[data-testid="streams-Table"] tbody tr td:first-child p';
  }

  async verifyBenefits() {
    await this.page.waitForSelector(this.benefitSearchInput, { state: "visible", timeout: 40000 });
    return await this.page.locator(this.benefitSearchInput).isVisible();
  }

  async openBenefitDetails(benefitsData) {
    var benefitName = benefitsData.getEnglishBenefitName();
    await this.page.fill(this.benefitSearchInput, benefitName);
    await this.page.click(this.searchBtn);
    await this.page.waitForTimeout(8000);
    this.benefitNameLocator = this.page.locator(this.benefitLocator, { state: "visible", timeout: 5000 });
    await this.page.click(this.viewBtn);
    console.log("Benefit Details Page in Applicant Portal opened Successfully");
    return true;
  }
}

module.exports = { ApplicantBenefitsPage };
