import Constants from '../../../Utils/Constants';
export class LiferaySubProgramsPage {
  constructor(page) {
    this.page = page;
    this.subProgramWord = '//h1[normalize-space()="Sub Program"]';
    this.subProgramSearchInput = '//input[@placeholder="Search"]';
    this.searchBtn = '//div[@class="input-group-inset-item input-group-inset-item-after"]//button[@aria-label="Search" and @type="submit"]';
    this.subProgramEnLocator = "div[class='dnd-tbody'] div[class='dnd-tr'] div:nth-child(2)";
    this.actionsBtn = '//*[@class="dropdown"]//button[contains(@class,"component-action")]';
    this.viewButton = '//a[@class="dropdown-item" and normalize-space(text())="View"]';
  }

  async verifySubPrograms() {
    await this.page.waitForLoadState('networkidle');
    await this.page.locator(this.subProgramSearchInput).waitFor({ state: "visible", timeout: 40000 });
    return await this.page.locator(this.subProgramSearchInput).isVisible();
  }

  async openSubProgramDetails(subProgramData) {
    var subProgramName = subProgramData.getEnglishSubProgramName();
    await this.page.fill(this.subProgramSearchInput, subProgramName);
    await this.page.click(this.searchBtn, { force: true });
    await this.page.waitForTimeout(8000);
    await this.page.waitForSelector(this.subProgramEnLocator, { state: 'visible', timeout: 5000 });
    var actualSubProgramEnName = (await this.page.locator(this.subProgramEnLocator).first().textContent())?.trim();
    console.log('actualSubProgramEnName',actualSubProgramEnName ,'subProgramName',subProgramName )
    
    if (actualSubProgramEnName === subProgramName) {

      await this.page.click(this.actionsBtn);
      await this.page.waitForSelector(this.viewButton, { state: 'visible' });
      await this.page.click(this.viewButton);
      console.log("Sub Program Details Page in Liferay opened Successfully");
      return true;
    }
    return false;
  }
  
}
module.exports = { LiferaySubProgramsPage };
