const { StreamManagementPage } = require("./StreamManagementPage");
const { MainProgramManagementPage } = require("../../ProgramsManagement/MainProgramManagement/MainProgramManagementPage");
const { SubProgramsManagementPage } = require("../../ProgramsManagement/SubProgramsManagement/SubProgramsManagmentPage");
const { BenefitsManagmentPage } = require("../../ProgramsManagement/BenefitsManagement/BenefitsManagementPage");

/**
 * Represents the Stream Details page and provides methods for interacting
 * with the stream details, such as navigating to and creating main programs.
 * @class
 */
export class StreamDetailsPage {
  constructor(page) {
    this.page = page;

    // Selectors for stream details elements
    this.mainProgramTab = '//button[@data-testid="tab-2"]';
    this.subProgramTab = '//button[@data-testid="tab-3"]';
    this.benefitsTab = '//button[@data-testid="tab-4"]';
    this.createMainProgramBtn = '//button[@data-testid="tooltip-button"]';
    this.searchInput = '//form[@data-testid="search-input"]';


    this.streamId = '//span[@data-testid="value_stream-serial-number"]';
    this.streamArabicName = '//span[@data-testid="value_stream-arabic-name"]';
    this.streamEnglishName = '//span[@data-testid="value_stream-english-name"]';
    this.streamArabicDescription = '//span[@data-testid="value_stream-arabic-description"]';
    this.streamEnglishDescription = '//span[@data-testid="value_stream-english-description"]';
    this.streamArabicGoal = '//span[@data-testid="value_stream-goal-ar"]';
    this.streamEnglishGoal = '//span[@data-testid="value_stream-goal-en"]';
    this.createdBy = '//span[@data-testid="value_stream-creator-name"]';
    this.enablementStatus = '//span[@data-testid="value_streams-management-stream-enablement-status"]';
  
  }

 /**
 * Navigates to the "Main Program" tab and clicks the "Create Main Program" button.
 * @returns {Promise<void>} - Completes the action of initiating main program creation.
 */
  async InsideCreateMainProgram() {
    await this.page.click(this.mainProgramTab);
    await this.page.waitForTimeout(2000);
    //await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    await this.page.waitForSelector(this.createMainProgramBtn, {state: "visible"});
    await this.page.click(this.createMainProgramBtn);
    //await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    await this.page.waitForTimeout(3000);
    console.log("Clicked the Create Main program button");  
    }

  async navigateToMainProgramTab() {
    await this.page.click(this.mainProgramTab);
    var searchField = await this.page.locator(this.searchInput).isVisible();
      return searchField
  }
  async navigateToSubProgramTab() {
    await this.page.click(this.subProgramTab);
    var searchField = await this.page.locator(this.searchInput).isVisible();
      return searchField
  }
  async navigateToBenefitsTab() {
    await this.page.click(this.benefitsTab);
    var searchField = await this.page.locator(this.searchInput).isVisible();
      return searchField
  }

  /**
  * Filter main programs using provided data.
  * @param {object} mainProgramData - The data object containing main program details.
  * @returns {Promise<boolean>} - Returns true if the main program filtered successfully.
  */
  async filterMainProgram(location, data, type, streamData, mainProgramData) {
    await this.navigateToMainProgramTab();
    var mainProgramManagementPage = new MainProgramManagementPage(this.page);
    const filterResult = await mainProgramManagementPage.filterMainProgram(location, data, type, streamData, mainProgramData);
    return filterResult;
  }

  /**
* Filter main programs using provided data.
* @param {object} subProgramData - The data object containing sub program details.
* @returns {Promise<boolean>} - Returns true if the sub program filtered successfully.
*/
  async filterSubProgram(location, data, type, streamData, mainProgramData, subProgramsData) {
    await this.navigateToSubProgramTab();
    var subProgramsManagementPage = new SubProgramsManagementPage(this.page);
    const filterResult = await subProgramsManagementPage.filterSubProgram(location, data, type, streamData, mainProgramData, subProgramsData);
    return filterResult;
  }

  /**
* Filter main programs using provided data.
* @param {object} benefitsData - The data object containing benefits details.
* @returns {Promise<boolean>} - Returns true if the benefits filtered successfully.
*/
  async filterBenefit(location, data, type, streamData, mainProgramData, subProgramData, benefitsData) {
    await this.navigateToBenefitsTab();
    var benefitsManagmentPage = new BenefitsManagmentPage(this.page);
    const filterResult = await benefitsManagmentPage.filterBenefit(location, data, type, streamData, mainProgramData, subProgramData, benefitsData);
    return filterResult;
  }


/**
   * Retrieves all stream details displayed on the UI dynamically.
   * @returns {Promise<object>} - Object containing all stream details.
   */
  async getUiStreamDetails() {
  return {
    streamId: (await this.page.locator(this.streamId).textContent()).trim(),
    streamArabicName: (await this.page.locator(this.streamArabicName).textContent()).trim(),
    streamEnglishName: (await this.page.locator(this.streamEnglishName).textContent()).trim(),
    streamArabicDescription: (await this.page.locator(this.streamArabicDescription).textContent()).trim(),
    streamEnglishDescription: (await this.page.locator(this.streamEnglishDescription).textContent()).trim(),
    streamArabicGoal: (await this.page.locator(this.streamArabicGoal).textContent()).trim(),
    streamEnglishGoal: (await this.page.locator(this.streamEnglishGoal).textContent()).trim(),

  };
}

/**
 * Retrieves all stream details displayed on the UI dynamically and compares them with the expected data.
 * @param {object} createdData - The expected stream details from `StreamData.js`.
 * @param {string} streamNumber - The expected stream ID.
 * @returns {Promise<boolean>} - Returns true if all details match, otherwise false.
 */
async compareStreamDetails(createdData, streamNumber) {
  const uiDetails = await this.getUiStreamDetails();

  const expectedDetails = {
    streamId: streamNumber,
    streamArabicName: createdData.getstreamArabicName(),
    streamEnglishName: createdData.getstreamEnglishName(),
    streamArabicDescription: createdData.getstreamArabicDescription(),
    streamEnglishDescription: createdData.getstreamEnglishDescription(),
    streamArabicGoal: createdData.getarabicGoal(),
    streamEnglishGoal: createdData.getenglishGoal(),
  };

  const allValid = Object.keys(expectedDetails).every(key => uiDetails[key] === expectedDetails[key]);

  return allValid;
}

}

module.exports = { StreamDetailsPage };
