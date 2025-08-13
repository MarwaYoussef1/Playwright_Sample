import Constants from '../../../Utils/Constants';

export class LiferayBenefitsPage {
  constructor(page) {
    this.page = page;
    this.benefitWord = '//h1[normalize-space()="Benefits"]';
    this.benefitSearchInput = '//input[@placeholder="Search"]';
    this.searchBtn = '//div[@class="input-group-inset-item input-group-inset-item-after"]//button[@aria-label="Search" and @type="submit"]';
    this.benefitEnLocator = "div[class='dnd-tbody'] div[class='dnd-tr'] div:nth-child(2)";
    this.actionsBtn = '(//div[contains(@class,"dnd-tr")])[2]//div[contains(@class,"item-actions")]//button[contains(@class,"dropdown-toggle")]';
    this.viewBtn = '//div[@class="dropdown-menu show"]//a[contains(text(),"View")]';
  }

  async verifyBenefits() {
    await this.page.waitForLoadState('networkidle');
    await this.page.locator(this.benefitSearchInput).waitFor({ state: "visible", timeout: 40000 });
    return await this.page.locator(this.benefitSearchInput).isVisible();
  }

  async openBenefitDetails(benefitsData) {
    var benefitName = benefitsData.getEnglishBenefitName();
    await this.page.fill(this.benefitSearchInput, benefitName);
    await this.page.click(this.searchBtn, { force: true });
    await this.page.waitForTimeout(8000);
    await this.page.waitForSelector(this.benefitEnLocator, { state: 'visible', timeout: 5000 });
    const actualBenefitEnName = (await this.page.locator(this.benefitEnLocator).first().textContent())?.trim();
    console.log(actualBenefitEnName, benefitName);
    if (actualBenefitEnName === benefitName) {
       await this.page.click(this.actionsBtn);
      await this.page.waitForSelector(this.viewBtn, { state: 'visible' });
      await this.page.click(this.viewBtn);
      console.log("Benefit Details Page in Liferay opened Successfully");
      return true;
    }
    return false;
  }
}

module.exports = { LiferayBenefitsPage };
