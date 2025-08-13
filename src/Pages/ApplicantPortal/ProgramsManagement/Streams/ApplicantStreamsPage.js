const { SearchPage } = require("../../../SharedPages/SearchPage");

export class ApplicantStreamsPage {
  constructor(page) {
    this.page = page;
    this.search = new SearchPage(this.page);

    // Selectors for stream page
    this.streamWord = '//span[@class="MuiTypography-root MuiTypography-displaySm-bold muirtl-1a6qwee"]';
    this.streamSearchInput = '//div[@data-testid="Search-input"]//input';
    // this.streamViewBtn = '//a[@data-testid="streamsViewButton"][1]';
    this.streamViewBtn = '//*[@data-testid="eyeicon"]';
    this.tableActions = 'streams-Table' ;

    this.searchBtn ='//button[@data-testid="Search-submit"]';
    // this.viewBtn = '//a[@data-testid="streamsViewButton"]';

    this.viewBtn = '//*[@data-testid="eyeicon"]';

    this.streamLocator ='table[data-testid="streams-Table"] tbody tr td:first-child p';
  }

  async verifyStreams() {
    await this.page.waitForSelector(this.streamSearchInput, { state: "visible",timeout: 40000});
    return await this.page.locator(this.streamSearchInput).isVisible();
  }

  
async openStreamDetials(streamData) {
    let streamTd ,streamName;
      var streamArName = streamData.getstreamArabicName();    
      await this.page.waitForTimeout(5000);
      var streamRow = await this.search.getRowInTableWithSpecificText(streamArName);
        if (streamRow && streamRow.length > 0) {
          streamTd = streamRow[0].tdLocator;
          streamName = streamTd.locator("p");
          await streamName.waitFor({ state: "visible" });
          var actualStreamArName = (await streamName.textContent()).trim();
      if (actualStreamArName.includes(streamArName)) {
        await this.page.click(this.viewBtn);
        console.log("Stream Details Page in Applicant Portal opened Successfully");
        return true;
      }
    else  return false;
  }
}


}
module.exports = { ApplicantStreamsPage };
