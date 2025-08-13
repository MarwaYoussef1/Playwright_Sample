const { SearchPage } = require("../../../SharedPages/SearchPage");
const { FilterPrograms } = require("../FilterPrograms");
const { BenefitsDetailsPage } = require("./BenefitsDetailsPage");


/**
 * Represents the Benefits Management page and provides methods for searching,
 * validating, and managing benefits.
 * @class
 */
export class BenefitsManagmentPage {
  constructor(page) {
    this.page = page;
    this.search = new SearchPage(this.page);
    this.searchInput = '//form[@data-testid="search-input"]//descendant::input';
    this.tableActions='table-actions';
    this.tableThreeDots='three-dots-menu';
    this.benefitsTable = "//table//tbody";
    this.filterButton = '//button[@data-testid="toolbar-filter-button"]';;
    this.benefitTypeFilter = '//div[@id="mui-component-select-benefitType"]';
    this.benefitProvidingEntityFilter = '//div[@id="mui-component-select-responsibleCode"]';
    this.searchButton = '//button[@type="submit"]';
    this.dotsLocator;
  }

  /**
   * Searches for a specific benefit by its data.
   * @param {string} benefitsData - The benefit data to search for.
   * @returns {Promise<Array|null>} - An array containing row details if found, or null if not found.
   */
  async searchOnSpecificBenefits(benefitsData) {
    let BenefitsRow = [];
    BenefitsRow = await new SearchPage(this.page).searchOnUniqueRow(
      this.searchInput,
      benefitsData,
    );
    if (!BenefitsRow || BenefitsRow.length === 0) {
      return null;
    }
    return BenefitsRow;
  }

  /**
   * Validates that the benefit details match the expected data.
   * @param {object} benefitsData - The data object containing the expected benefit details.
   * @returns {Promise<boolean>} - Returns true if the benefit details match; otherwise, false.
   */
  async checkBenefitsRowDetails(benefitsData) {
    let arabicTd;
    let englishTd;
    let arabicName;
    let englishName;
    let benefitsRow = [];

    // Search for the specific benefit
    benefitsRow = await this.searchOnSpecificBenefits(benefitsData.getArabicBenefitName());

    if (benefitsRow && benefitsRow.length > 0) {
      // Validate Arabic benefit name
      arabicTd = benefitsRow[1].tdLocator;
      arabicName = arabicTd.locator("span");
      await arabicName.waitFor({ state: "visible" });
      var actualArabicName = await arabicName.textContent();

      // Validate English benefit name
      englishTd = benefitsRow[2].tdLocator;
      englishName = englishTd.locator("span");
      await englishName.waitFor({ state: "visible" });
      var actualEnglishName = await englishName.textContent();
    }
    if (
      actualArabicName === benefitsData.getArabicBenefitName() &&
      actualEnglishName === benefitsData.getEnglishBenefitName()
    ) {
      // Set the created benefit ID in the benefit data object
      console.log("Sub Program names matched successfully.");
      let benefitId = await benefitsRow[0].tdLocator.textContent();
      benefitsData.setCreatedBenefitId(benefitId);
      console.log("Created Benefits ID set in Benefits Data: " + benefitId);
      return true;
    }
    return false;
  }

  /**
     * Filter Benefits using provided data.
     * @param {object} benefitsData - The data object containing benefits details.
     * @returns {Promise<boolean>} - Returns true if the sub program filtered successfully.
     */
  async filterBenefit(location, data, type, streamData, mainProgramData, subProgramData, benefitsData) {
    await this.page.waitForSelector(this.benefitsTable, {
      state: "visible",
      timeout: 5000,
    });
    var filterPrograms = new FilterPrograms(this.page);
    const filterResult = await filterPrograms.filterBenefit(location, data, type, streamData, mainProgramData, subProgramData, benefitsData);
    return filterResult;
  }

  /**
 * Opens the details page of a specific benefit by its identifier.
 * 
 * @param {string} benefitNumber - The unique identifier of the benefit to view.
 * @returns {Promise<void>} - Completes the action of opening the benefit details page.
 */
async openViewBenefitDetailsPage(benefitNumber) {
  let benefitRow = [];
  benefitRow = await this.searchOnSpecificBenefit(benefitNumber);
  if (benefitRow && benefitRow.length > 0) {
    var viewBtn = "button:nth-of-type(1)";
    await this.search.clickRowAction(benefitRow, this.tableActions, viewBtn);
    console.log("View Benefit Details Page Opened.");
  } else {
    console.error("Benefit not found: Unable to open Benefit Details Page.");
  }
}

/**
 * Searches for a specific benefit by name.
 * @param {string} benefitName - The name of the benefit to search for.
 * @returns {Promise<Array|null>} - An array containing row details if found, or null if not found.
 */
async searchOnSpecificBenefit(benefitName) {
  let benefitRow = [];
  benefitRow = await new SearchPage(this.page).searchOnUniqueRow(this.searchInput, benefitName);
  if (!benefitRow || benefitRow.length === 0) {
    return null;
  }
  return benefitRow;
}


  /**
 * Validates the benefit details by comparing UI and expected data, then navigates to the Benefits tab.
 * @param {object} benefitData - The expected benefit details.
 * @param {string} createdStreamName - The expected stream name.
 * @param {string} createdMainProgramName - The expected main program name.
 * @param {string} createdSubProgramName - The expected Sub program name.
 * @returns {Promise<boolean>} - Returns true if all details match and navigation to Benefits tab is successful.
 */
async validateBenefitDetails(benefitData,benefitNumber, createdStreamName, createdMainProgramName , createdSubProgramName) {
  await this.openViewBenefitDetailsPage(benefitNumber);
  var benefitsDetailsPage = new BenefitsDetailsPage(this.page);
  var benefitDetails = await benefitsDetailsPage.compareBenefitDetails(benefitData, createdStreamName, createdMainProgramName,createdSubProgramName);
  if (benefitDetails)  return true;
}

  
}

module.exports = { BenefitsManagmentPage };
