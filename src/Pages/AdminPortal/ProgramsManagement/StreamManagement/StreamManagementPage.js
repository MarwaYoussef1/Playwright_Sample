const { SearchPage } = require("../../../SharedPages/SearchPage");
const { StreamPage } = require("./StreamPage");
const { StreamDetailsPage } = require("./StreamDetailsPage");

/**
 * Manages stream-related actions, such as creating new streams, searching for streams,
 * and initiating main program creation for selected streams.
 * @class
 */
export class StreamManagementPage {

  constructor(page) {
    this.page = page;
    this.search = new SearchPage(this.page);
    this.createNewStreamButton = '//button[contains(text(),"تعريف مسار")]';
    this.searchInput = '//form[@data-testid="search-input"]//descendant::input';
    this.streamsTable = "//table//tbody";
    this.tableActions='table-actions';
    this.tableThreeDots='three-dots-menu';
    this.createMainProgramOption = '//*[@data-testid="three-dots-menu-option-0"]';
    
  }

  /**
   * Clicks on the "Create New Stream" button to open the stream creation form.
   * @returns {Promise<void>} - Completes the action of opening the stream form.
   */
  async clickOnNewStream() {
    await this.page.waitForTimeout(2000);
    await this.page.waitForSelector(this.streamsTable, {
      state: "visible",
      timeout: 5000,
    });
    await this.page.click(this.createNewStreamButton);
  }

  /**
   * Creates a new stream using the provided stream data.
   * @param {object} streamData - Data required for creating a new stream.
   * @returns {Promise<boolean>} - Returns true if the stream is created successfully.
   */
  async createStream(streamData) {
    await this.clickOnNewStream();
    var streamPage = new StreamPage(this.page);
    const result = await streamPage.createNewStream(streamData);
    return result;
  }

  /**
   * Searches for a specific stream by its name.
   * @param {string} streamName - The name of the stream to search for.
   * @returns {Promise<Array|null>} - An array of row details if the stream is found, or null if no match is found.
   */
  async searchOnSpecificStream(streamName) {
    let streamRow = [];
    streamRow = await new SearchPage(this.page).searchOnUniqueRow(this.searchInput,streamName );
    if (!streamRow || streamRow.length === 0) {
      return null;
    }
    return streamRow;
  }

  /**
   * Clicks on the "Create Main Program" option for a specific stream.
   * @param {string|null} streamName - The name of the stream for which the main program should be created.
   * @param {string} backUpStream - Backup stream name to use if `streamName` is null.
   * @returns {Promise<void>} - Completes the action of clicking the "Create Main Program" option.
   */
  async clickOnCreateMainProgram(streamName, backUpStream) {
    let streamRow = [];
    if (streamName == null)
      streamRow = await this.searchOnSpecificStream(backUpStream);
    else streamRow = await this.searchOnSpecificStream(streamName);

    if (streamRow && streamRow.length > 0) {
      var threeDotsButton = "button:nth-of-type(1)";
      await this.search.clickRowAction(streamRow,this.tableThreeDots ,threeDotsButton);
      await this.page.waitForTimeout(5000);
      await this.page.waitForSelector(this.createMainProgramOption, { state: "visible", timeout: 60000 });
      await this.page.click(this.createMainProgramOption);
      console.log("Clicked the Create Main program button");
    }
  }

  /**
   * Opens the details page of a specific stream by its identifier.
   * 
   * @param {string} streamNumber - The unique identifier of the stream to view.
   * @returns {Promise<void>} - Completes the action of opening the stream details page.
   */
  async openViewStreamDetailsPage(streamNumber) {
    let viewTd;
    let streamRow = [];
    streamRow = await this.searchOnSpecificStream(streamNumber);
    if (streamRow && streamRow.length > 0) {
      var viewBtn = "button:nth-of-type(1)";
      await this.search.clickRowAction(streamRow,this.tableActions ,viewBtn);
     /* viewTd = streamRow[streamRow.length - 2].tdLocator;
      var viewBtn = viewTd.locator('div >> div >> button:nth-of-type(1)');
      await viewBtn.click();*/
      console.log("View Stream Details Page Opened.");
    }
  }

  /**
   * Verifies the details of a specific stream, ensuring the Arabic and English names match the expected values.
   * @param {object} streamData - The stream data object containing expected names and details.
   * @returns {Promise<boolean>} - Returns true if the stream details match the expected values; otherwise, false.
   */
  async checkStreamRowDetails(streamData) {
    let arabicTd;
    let englishTd;
    let arabicName;
    let englishName;
    let streamRow = [];

    streamRow = await this.searchOnSpecificStream(streamData.getstreamArabicName());

    if (streamRow && streamRow.length > 0) {
      arabicTd = streamRow[1].tdLocator;
      arabicName = arabicTd.locator("span");
      await arabicName.waitFor({ state: "visible" });
      var actualArabicName = await arabicName.textContent();

      englishTd = streamRow[2].tdLocator;
      englishName = englishTd.locator("span");
      await englishName.waitFor({ state: "visible" });
      var actualEnglishName = await englishName.textContent();
    }

    if (
      actualArabicName === streamData.getstreamArabicName() &&
      actualEnglishName === streamData.getstreamEnglishName()
    ) {
      console.log("Stream names matched successfully.");
      let streamId = await streamRow[0].tdLocator.textContent();
      streamData.setCreatedStreamId(streamId);
      console.log("Created Stream ID set in StreamData: " + streamId);
      return true;
    }
    return false;
  }
  
  async checkStreamDetials(streamNumber,streamData)
  {
    if (
      actualArabicName === streamData.getstreamArabicName() &&
      actualEnglishName === streamData.getstreamEnglishName()
    ) {
      console.log("Stream detials names matched successfully.");
      let streamId = await streamRow[0].tdLocator.textContent();
      streamData.setCreatedStreamId(streamId);
      return true;}
  }

  async validateStreamDetails(streamData, streamNumber) {
 
    await this.openViewStreamDetailsPage(streamNumber);
    var streamDetailsPage = new StreamDetailsPage(this.page);
    var streamDetails = await streamDetailsPage.compareStreamDetails(streamData, streamNumber);

    if (streamDetails) {
        // Navigate to relevant tabs if they exist
        var mainProgramTab = await streamDetailsPage.navigateToMainProgramTab();
        var subProgramTab = await streamDetailsPage.navigateToSubProgramTab();
        var benefitTab = await streamDetailsPage.navigateToBenefitsTab();
        // If all steps are successful, return true
        if (mainProgramTab && subProgramTab && benefitTab) return true;
      }
    return false;
  }

}

module.exports = { StreamManagementPage };
