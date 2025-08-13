const { SearchPage } = require("../../../SharedPages/SearchPage");

export class ApplicantMainProgramsPage {
  constructor(page) {
    this.page = page;
    this.search = new SearchPage(this.page);
    this.mainProgramWord = '//span[@class="MuiTypography-root MuiTypography-displaySm-bold muirtl-1a6qwee"]';
    this.mainProgramSearchInput = '//div[@data-testid="Search-input"]//input';
    this.searchBtn = '//button[@data-testid="Search-submit"]';
    this.viewBtn = '//a[@data-testid="main-programs-view-button"]';
    this.mainProgramLocator = 'table[data-testid="main-programs-Table"] tbody tr td:first-child p';
  }

  async verifyMainPrograms() {
    await this.page.waitForSelector(this.mainProgramSearchInput, { state: "visible", timeout: 40000 });
    return await this.page.locator(this.mainProgramSearchInput).isVisible();
    }

  async openMainProgramDetails(mainProgramData) {
     let mainProgramTd ,mainProgramName;
     var mainProgramArName = mainProgramData.getArabicMainProgramName();    
     await this.page.waitForTimeout(5000);
     var mainProgramRow = await this.search.getRowInTableWithSpecificText(mainProgramArName);
     if (mainProgramRow && mainProgramRow.length > 0) {
     mainProgramTd = mainProgramRow[0].tdLocator;
     mainProgramName = mainProgramTd.locator("p");
     await mainProgramName.waitFor({ state: "visible" });
     var actualMainProgramArName = (await mainProgramName.textContent()).trim();
     if (actualMainProgramArName.includes(mainProgramArName)) {
        await this.page.click(this.viewBtn);
        console.log("Main Program Details Page in Applicant Portal opened Successfully");
        return true;
        }
     else  return false;
    }    
  }
}
module.exports = { ApplicantMainProgramsPage };