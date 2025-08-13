const { SearchPage } = require("../../../SharedPages/SearchPage");
const { MainProgramPage } = require("./MainProgramPage");
const { MainProgramDetailsPage } = require("./MainProgramDetailsPage");
const { FilterPrograms } = require("../FilterPrograms");

/**
 * Represents the Main Program Management page and provides methods for managing
 * main programs, including searching, creating, and validating main programs.
 * @class
 */
export class MainProgramManagementPage {
  constructor(page) {
    this.page = page;
    this.search = new SearchPage(this.page);
    this.searchInput = '//form[@data-testid="search-input"]//descendant::input';
    this.mainProgramsTable = "//table//tbody";
    this.tableActions='table-actions';
    this.tableThreeDots='three-dots-menu';
    this.createSubProgramOption = '//*[@data-testid="three-dots-menu-option-0"]';
    this.filterButton = '//button[@data-testid="toolbar-filter-button"]';
    this.riskCategoryFilter = '//div[@id="mui-component-select-riskCategory"]';
    this.risksFilter = '//div[@id="mui-component-select-risk"]';
    this.responsibleEntityFilter = '//div[@id="mui-component-select-responsible"]';
    this.searchButton = '//button[@type="submit"]';
  }

  /**
 * Clicks the button to create a new main program and completes the form with provided data.
 * @param {object} mainProgramData - The data object containing main program details.
 * @returns {Promise<boolean>} - Returns true if the main program is created successfully.
 */
  async clickOnNewMainProgram(mainProgramData) {
    await this.page.waitForSelector(this.mainProgramsTable, { state: "visible",timeout: 5000});
    await this.page.click(this.createNewMainProgramButton);
    var mainProgramPage = new MainProgramPage(this.page);
    const result = await mainProgramPage.createNewMainProgram(mainProgramData);
    return result;
  }

/**
 * Searches for a specific main program by name.
 * @param {string} mainProgramName - The name of the main program to search for.
 * @returns {Promise<Array|null>} - An array containing row details if found, or null if not found.
 */
  async searchOnSpecificMainProgram(mainProgramName) {
    let mainProgramRow = [];
    mainProgramRow = await new SearchPage(this.page).searchOnUniqueRow(this.searchInput, mainProgramName);
    if (!mainProgramRow || mainProgramRow.length === 0) {
      return null;
    }
    return mainProgramRow;
  }

  /**
   * Clicks on the "Create Sub Program" option for a specific main program.
   * @param {string|null} mainProgramName - The name of the main program for which to create a subprogram.
   * @param {string} backUpProgram - A backup program name to use if `mainProgramName` is null.
   * @returns {Promise<void>} - Completes the action of clicking "Create Sub Program".
   */
  async clickOnCreateSubProgram(mainProgramName,backUpProgram) {
    let mainProgramRow = [];
    if (mainProgramName == null)
      mainProgramRow = await this.searchOnSpecificMainProgram(backUpProgram);
    else mainProgramRow = await this.searchOnSpecificMainProgram(mainProgramName);
    if (mainProgramRow && mainProgramRow.length > 0) {
      var threeDotsButton = "button:nth-of-type(1)";
      await this.search.clickRowAction(mainProgramRow,this.tableThreeDots ,threeDotsButton);
      await this.page.waitForTimeout(5000);
      await this.page.waitForSelector(this.createSubProgramOption, {state: "visible", timeout: 60000});
      await this.page.click(this.createSubProgramOption);
      console.log("Clicked the Create Sub Program button");
    }
  }

/**
 * Opens the details page of a specific main program by its identifier.
 * 
 * @param {string} mainProgramNumber - The unique identifier of the main program to view.
 * @returns {Promise<void>} - Completes the action of opening the main program details page.
 */
async openViewMainProgramDetailsPage(mainProgramNumber) {
  let mainProgramRow = [];
  mainProgramRow = await this.searchOnSpecificMainProgram(mainProgramNumber);
  if (mainProgramRow && mainProgramRow.length > 0) {
    var viewBtn = "button:nth-of-type(1)";
    await this.search.clickRowAction(mainProgramRow,this.tableActions ,viewBtn);
    console.log("View Main Program Details Page Opened.");
  }
}

  /**
 * Validates that the main program details match the expected data.
 * @param {object} mainProgramData - The data object containing the expected main program details.
 * @returns {Promise<boolean>} - Returns true if the main program details match; otherwise, false.
 */
  async checkMainProgramRowDetails(mainProgramData) {
    let arabicTd;
    let englishTd;
    let arabicName;
    let englishName;
    let mainProgramRow = [];

    mainProgramRow = await this.searchOnSpecificMainProgram( mainProgramData.getArabicMainProgramName());

    if (mainProgramRow && mainProgramRow.length > 0) {
      arabicTd = mainProgramRow[1].tdLocator;
      arabicName = arabicTd.locator("span");
      await arabicName.waitFor({ state: "visible" });
      var actualArabicName = await arabicName.textContent();

      englishTd = mainProgramRow[2].tdLocator;
      englishName = englishTd.locator("span");
      await englishName.waitFor({ state: "visible" });
      var actualEnglishName = await englishName.textContent();
    }

    if (
      actualArabicName === mainProgramData.getArabicMainProgramName() &&
      actualEnglishName === mainProgramData.getEnglishMainProgramName()
    ) {
      console.log("Main Program names matched successfully.");
      let mainProgramId = await mainProgramRow[0].tdLocator.textContent();
      mainProgramData.setCreatedMainProgramId(mainProgramId);
      console.log("Created Main Program ID set in MainProgramData: " + mainProgramId);
      return true;
    }
    return false;
  }

/**
 * Filter main programs using provided data.
 * @param {object} mainProgramData - The data object containing main program details.
 * @returns {Promise<boolean>} - Returns true if the main program filtered successfully.
 */
  async filterMainProgram(location, data, type, streamData, mainProgramData) {
    await this.page.waitForSelector(this.mainProgramsTable, {state: "visible",timeout: 5000});
    var filterPrograms = new FilterPrograms(this.page);
    const filterResult = await filterPrograms.filterMainProgram(location, data, type, streamData, mainProgramData);
    return filterResult;
  }

  /**
   * Opens the details page of a specific main program by its identifier.
   * @param {string} mainProgramNumber - The unique identifier of the main program to view.
   * @returns {Promise<void>} - Completes the action of opening the main program details page.
   */
  async viewMainProgramDetailsPage() {
    console.log("View Main Program Details Page.");
    var viewBtn = "td >> div >> div >> button:nth-of-type(1)";
    await this.page.click(viewBtn);
    console.log("View Main Program Details Page Opened.");
  }

/**
 * Filter main programs using provided data.
 * @param {object} mainProgramData - The data object containing main program details.
 * @returns {Promise<boolean>} - Returns true if the main program filtered successfully.
 */
    async filterMainProgram(location, data, type, streamData, mainProgramData) {
      await this.page.waitForSelector(this.mainProgramsTable, {
        state: "visible",
        timeout: 5000,
      });
      var filterPrograms = new FilterPrograms(this.page);
      const filterResult = await filterPrograms.filterMainProgram(location, data, type, streamData, mainProgramData);
      return filterResult;
    }
  
    /**
     * Opens the details page of a specific main program by its identifier.
     * 
     * @param {string} mainProgramNumber - The unique identifier of the main program to view.
     * @returns {Promise<void>} - Completes the action of opening the main program details page.
     */
    async viewMainProgramDetailsPage() {
      console.log("View Main Program Details Page.");
      var viewBtn = "td >> div >> div >> button:nth-of-type(1)";
      await this.page.click(viewBtn);
      console.log("View Main Program Details Page Opened.");
    }

    async validateMainProgramDetails(mainProgramData , mainProgramNumber,createdStreamName)
    {
      await this.openViewMainProgramDetailsPage(mainProgramNumber);
      var mainProgramDetailsPage = new MainProgramDetailsPage(this.page);
      var programDetials = await mainProgramDetailsPage.compareMainProgramDetails(mainProgramData , mainProgramNumber,createdStreamName);
      
      if (programDetials) {
        var subProgramTab =await mainProgramDetailsPage.navigateToSubProgramTab();
        var benefitsTab = await mainProgramDetailsPage.navigateToBenefitsTab(); 
        // If all steps are successful, return true
        if (subProgramTab && benefitsTab) return true;
      }
      return false;
    }
    

}

module.exports = { MainProgramManagementPage };
