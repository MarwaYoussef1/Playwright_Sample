const { SearchPage } = require("../../../SharedPages/SearchPage");
const { SubProgramDetailsPage } = require("./SubProgramDetailsPage");
const { FilterPrograms } = require("../FilterPrograms");



/**
 * Manages subprogram-related actions like searching for specific subprograms,
 * creating benefits, and verifying subprogram details.
 * @class
 */
export class SubProgramsManagementPage {
  constructor(page) {
    this.page = page;
    this.search = new SearchPage(this.page);
    this.searchInput = '//form[@data-testid="search-input"]//descendant::input';
    this.tableActions='table-actions';
    this.tableThreeDots='three-dots-menu';
    this.createBenefitOption = '//*[@data-testid="three-dots-menu-option-0"]';
    this.subProgramsTable = "//table//tbody";
    this.benefitsTab = '//button[@data-testid="tab-4"]';
    this.filterButton = '//button[@data-testid="toolbar-filter-button"]';;
    this.designResponsibleEntityFilter = '//div[@id="mui-component-select-designResponsibleGovernance"]';
    this.responsibleEntityItem = '//li[@data-value="Responsible"]';
    this.searchButton = '//button[@type="submit"]';
  }

  /**
   * Searches for a specific subprogram by its name.
   * @param {string} subProgramsName - The name of the subprogram to search for.
   * @returns {Promise<Array|null>} - An array of row details if found, or null if no rows match.
   */
  async searchOnSpecificSubProgram(subProgramsName) {
    let subProgramRow = [];
    subProgramRow = await new SearchPage(this.page).searchOnUniqueRow(
      this.searchInput,
      subProgramsName,
    );
    if (!subProgramRow || subProgramRow.length === 0) {
      return null;
    }

    return subProgramRow;
  }


/**
 * Opens the details page of a specific subprogram by its identifier.
 * 
 * @param {string} subProgramNumber - The unique identifier of the subprogram to view.
 * @returns {Promise<void>} - Completes the action of opening the subprogram details page.
 */
async openViewSubProgramDetailsPage(subProgramNumber) {
  let viewTd;
  let subProgramRow = [];
  subProgramRow = await this.searchOnSpecificSubProgram(subProgramNumber);
  if (subProgramRow && subProgramRow.length > 0) {
    var viewBtn = "button:nth-of-type(1)";
    await this.search.clickRowAction(subProgramRow,this.tableActions ,viewBtn);
    console.log("View Sub Program Details Page Opened.");
  }
}



  /**
   * Clicks on the "Create Benefit" option for a specific subprogram.
   * @param {string|null} subProgramName - The name of the subprogram to find.
   * @param {string} backUpSubrogram - Backup subprogram name to use if `subProgramName` is null.
   * @returns {Promise<void>} - Completes the action.
   */
  async clickOnCreateBenefit(subProgramName, backUpSubrogram) {
    let lastTd;
    let subProgramRow = [];
    if (subProgramName == null)
      subProgramRow = await this.searchOnSpecificSubProgram(backUpSubrogram);
    else subProgramRow = await this.searchOnSpecificSubProgram(subProgramName);
    if (subProgramRow && subProgramRow.length > 0) {
      var threeDotsButton = "button";
      await this.search.clickRowAction(subProgramRow,this.tableThreeDots ,threeDotsButton);
      await this.page.waitForSelector(this.createBenefitOption, {
        state: "visible",
        timeout: 60000,
      });
      await this.page.click(this.createBenefitOption);
      console.log("Clicked the Create Benefit button");
    }
  }
  /**
   * Checks whether the Arabic and English names of a subprogram match the expected values.
   * @param {object} subProgramsData - The subprogram data object containing expected names.
   * @returns {Promise<boolean>} - Returns true if the names match; otherwise, false.
   */
  async checkSubProgramsRowDetails(subProgramsData) {
    let arabicTd;
    let englishTd;
    let arabicName;
    let englishName;
    let subProgramRow = [];

    subProgramRow = await this.searchOnSpecificSubProgram(
      subProgramsData.getArabicSubProgramName()
    );

    if (subProgramRow && subProgramRow.length > 0) {
      arabicTd = subProgramRow[1].tdLocator;
      arabicName = arabicTd.locator("span");
      await arabicName.waitFor({ state: "visible" });
      var actualArabicName = await arabicName.textContent();

      englishTd = subProgramRow[2].tdLocator;
      englishName = englishTd.locator("span");
      await englishName.waitFor({ state: "visible" });
      var actualEnglishName = await englishName.textContent();
    }
    if (
      actualArabicName === subProgramsData.getArabicSubProgramName() &&
      actualEnglishName === subProgramsData.getEnglishSubProgramName()
    ) {
      console.log("Sub Program names matched successfully.");
      let subProgramId = await subProgramRow[0].tdLocator.textContent();
      subProgramsData.setCreatedSubProgramId(subProgramId);
      console.log(
        "Created Sub Program ID set in SubProgramData: " + subProgramId
      );
      return true;
    }
    return false;
  }

  /**
   * Filter main programs using provided data.
   * @param {object} subProgramData - The data object containing sub program details.
   * @returns {Promise<boolean>} - Returns true if the sub program filtered successfully.
   */
  async filterSubProgram(location, data, type, streamData, mainProgramData, subProgramsData) {
    await this.page.waitForSelector(this.subProgramsTable, {
      state: "visible",
      timeout: 5000,
    });
    var filterPrograms = new FilterPrograms(this.page);
    const filterResult = await filterPrograms.filterSubProgram(location, data, type, streamData, mainProgramData, subProgramsData);
    return filterResult;
  }

  async navigateToBenefitsTab() {
    await this.page.click(this.benefitsTab);
  }

/**
 * Opens the details page of a specific subprogram by its identifier.
 * 
 * @param {string} subProgramNumber - The unique identifier of the subprogram to view.
 * @returns {Promise<void>} - Completes the action of opening the subprogram details page.
 */
  async viewSubProgramDetailsPage() {
    console.log("View Subprogram Details Page.");
    var viewBtn = "td >> div >> div >> button:nth-of-type(1)";
    await this.page.click(viewBtn);
    console.log("View SubProgram Details Page Opened.");
  }

  async validateSubProgramDetails(subProgramData,subProgramNumber,createdStreamName ,createdMainProgramName)
  {
    await this.openViewSubProgramDetailsPage(subProgramNumber);
      var subProgramDetailsPage = new SubProgramDetailsPage(this.page);
      var subProgramDetails = await subProgramDetailsPage.compareSubProgramDetails(subProgramData, subProgramNumber, createdStreamName,createdMainProgramName);
  
      if (subProgramDetails) {
          var benefitsTab = await subProgramDetailsPage.navigateToBenefitsTab();
          // If all steps are successful, return true
          if (benefitsTab) return true;
      }
      return false;
  }

}

module.exports = { SubProgramsManagementPage };
