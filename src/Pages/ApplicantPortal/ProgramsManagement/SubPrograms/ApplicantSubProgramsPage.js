const { SearchPage } = require("../../../SharedPages/SearchPage");

export class ApplicantSubProgramsPage {
  constructor(page) {
    this.page = page;
    this.search = new SearchPage(this.page);
    this.subProgramWord = '//span[@class="MuiTypography-root MuiTypography-displaySm-bold muirtl-1a6qwee"]';
    this.subProgramSearchInput = '//div[@data-testid="Search-input"]//input';
    this.searchBtn = '//button[@data-testid="Search-submit"]';
    this.viewBtn = '//a[@data-testid="sub-programs-view-button"]';
    this.subProgramLocator = 'table[data-testid="streams-Table"] tbody tr td:first-child p';
  }

  async verifySubPrograms() {
    await this.page.waitForSelector(this.subProgramSearchInput, { state: "visible", timeout: 40000 });
    return await this.page.locator(this.subProgramSearchInput).isVisible();
  }

  async openSubProgramDetails(subProgramData) {
    var subProgramName = subProgramData.getEnglishSubProgramName();
    await this.page.fill(this.subProgramSearchInput, subProgramName);
    await this.page.click(this.searchBtn);
    await this.page.waitForTimeout(8000);
    this.subProgramNameLocator = this.page.locator(this.subProgramLocator, { state: "visible", timeout: 5000 });
    // var actualSubProgramEnName = (await this.subProgramNameLocator.first().textContent())?.trim();
    await this.page.click(this.viewBtn);
    console.log("Sub Program Details Page in Applicant Portal opened Successfully");
    return true;
  }
}
module.exports = { ApplicantSubProgramsPage };