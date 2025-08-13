import Constants from '../../../Utils/Constants';

export class LiferayStreamsPage {
  
  constructor(page) {
    this.page = page;

    // Selectors for stream page
    this.streamWord = '//h1[normalize-space()="Streams"]';
    this.streamSearchInput = '//input[@placeholder="Search"]';
    this.searchBtn = '//button[@aria-label="Search" and @type="submit"]';
    this.streamEnLocator = "div[class='dnd-tbody'] div:nth-child(2)";
    this.viewBtn= '//div[@class="dnd-td item-actions"]//a[@title="View"]';
    
    this.dropInput ='//div[contains(@class,"dropzone")]//input[@type="file"]';
    this.addBtn = '//button[normalize-space()="Add"]';
  }

  async verifyStreams() {
    await this.page.waitForLoadState('networkidle');
    await this.page.locator(this.streamSearchInput).waitFor({ state: "visible", timeout: 15000 });
    return await this.page.locator(this.streamSearchInput).isVisible();
  }

  async openStreamDetials(streamData) {
    var streamEnName = streamData.getstreamEnglishName();
    await this.page.fill(this.streamSearchInput, streamEnName);
    await this.page.click(this.searchBtn);
    await this.page.waitForTimeout(8000);
    await this.page.waitForSelector(this.streamEnLocator, { state: 'visible', timeout: 5000 });
    var actualStreamEnName = (await this.page.locator(this.streamEnLocator).textContent())?.trim();
    if (actualStreamEnName === streamEnName) {
      await this.page.click(this.viewBtn);
      console.log("Streams Detials Page in Liferay open Successfully");
      return true;
      }
    return false;
  }




  }
module.exports = { LiferayStreamsPage };
