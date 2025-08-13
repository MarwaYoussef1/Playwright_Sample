import Constants from '../../../Utils/Constants';
export class LiferayMainProgramsPage {
  constructor(page) {
    this.page = page;
    this.mainProgramWord = '//h1[normalize-space()="Main Programs"]';
    this.mainProgramSearchInput = '//input[@placeholder="Search"]';
    this.searchBtn = '//div[@class="input-group-inset-item input-group-inset-item-after"]//button[@aria-label="Search" and @type="submit"]';
    this.mainProgramEnLocator = "div[class='dnd-tbody'] div[class='dnd-tr'] div:nth-child(1)";
    this.viewBtn = '//div[@class="dnd-td item-actions"]//a[@title="View"]';
  }

  async verifyMainPrograms() {
    await this.page.waitForLoadState('networkidle');
    await this.page.locator(this.mainProgramSearchInput).waitFor({ state: "visible", timeout: 40000 });
    return await this.page.locator(this.mainProgramSearchInput).isVisible();
  }

  async openMainProgramDetails(mainProgramData) {
    var mainProgramName = mainProgramData.getEnglishMainProgramName();
    await this.page.fill(this.mainProgramSearchInput, mainProgramName);
    await this.page.click(this.searchBtn, { force: true });
    await this.page.waitForTimeout(8000);
    await this.page.waitForSelector(this.mainProgramEnLocator, { state: 'visible', timeout: 5000 });
    var actualMainProgramEnName = (await this.page.locator(this.mainProgramEnLocator).first().textContent())?.trim();
    console.log(actualMainProgramEnName ,mainProgramName )
    if (actualMainProgramEnName === mainProgramName) {
      await this.page.click(this.viewBtn);
      console.log("Main Program Details Page in Liferay opened Successfully");
      return true;
    }
    return false;
  }
}
module.exports = { LiferayMainProgramsPage };
