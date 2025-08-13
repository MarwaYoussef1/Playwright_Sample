const { SubProgramsManagementPage } = require("../../ProgramsManagement/SubProgramsManagement/SubProgramsManagmentPage");
const { BenefitsManagmentPage } = require("../../ProgramsManagement/BenefitsManagement/BenefitsManagementPage");


/**
 * Represents the Main Program Details page and provides methods for interacting
 * with the main program details, such as managing or editing program-related data.
 * @class
 */
export class MainProgramDetailsPage {
  constructor(page) {
    this.page = page;

    // Selectors for main program details elements
    this.subProgramTab = '//button[@data-testid="tab-2"]';
    this.benefitsTab = '//button[@data-testid="tab-3"]';
    this.createSubProgramBtn = '//button[@data-testid="create-sub-program"]'; 
    this.searchInput = '//form[@data-testid="search-input"]';
   
    this.programId = '//span[@data-testid="value_main-program-serialNumber"]'
    this.streamName = '//span[@data-testid="value_main-program-stream"]'
    this.arabicProgramName = '//span[@data-testid="value_main-program-name-ar"]'
    this.englishProgramName= '//span[@data-testid="value_main-program-name-en"]'
    this.arabicProgramDescription= '//span[@data-testid="value_main-program-description-ar"]'
    this.englishProgramDescription= '//span[@data-testid="value_main-program-description-en"]'
    this.responsibleEntity= '//span[@data-testid="value_responsible-entity"]'
    this.estimatedBudget= '//span[@data-testid="value_main-program-estimated-budget"]'
    this.year= '//span[@data-testid="value_main-program-year"]'
    this.calculationMethod= '//span[@data-testid="value_main-program-calculation-method"]'
    this.riskCategory= '//span[@data-testid="value_main-program-risk-category-0"]'
    this.risks= '//span[@data-testid="value_main-program-risk-0"]'
    this.arabicRiskDescription= '//span[@data-testid="value_main-program-risk-description-ar"]'
    this.englishRiskDescription= '//span[@data-testid="value_main-program-risk-description-en"]'

  }

  /**
  * Navigates to the "Sub Programs" tab and clicks the "Define Sub Program" button.
  * @returns {Promise<void>} - Completes the action of initiating Sub program creation.
  */
  async InsideCreateSubProgram() {
    await this.page.click(this.subProgramTab);
    //await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    await this.page.waitForTimeout(2000);
    await this.page.waitForSelector(this.createSubProgramBtn, {state: "visible"});
    //await this.page.waitForTimeout(1000);
    await this.page.click(this.createSubProgramBtn);
    //await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    await this.page.waitForTimeout(3000);
    console.log("Clicked the Create Sub program button");  
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
* Filter Benefits using provided data.
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
 * Retrieves all main program details displayed on the UI dynamically.
 * @returns {Promise<object>} - Object containing all main program details.
 */
async getUiMainProgramDetails() {

  return {
    programId: (await this.page.locator(this.programId).textContent()).trim(),
    streamName :(await this.page.locator(this.streamName).textContent()).trim(), 
    arabicProgramName: (await this.page.locator(this.arabicProgramName).textContent()).trim(),
    englishProgramName: (await this.page.locator(this.englishProgramName).textContent()).trim(),
    arabicProgramDescription: (await this.page.locator(this.arabicProgramDescription).textContent()).trim(),
    englishProgramDescription: (await this.page.locator(this.englishProgramDescription).textContent()).trim(),
    responsibleEntity: (await this.page.locator(this.responsibleEntity).textContent()).trim(),
    estimatedBudget: (await this.page.locator(this.estimatedBudget).textContent()).trim(),
    calculationMethod: (await this.page.locator(this.calculationMethod).textContent()).trim(),
    arabicRiskDescription: (await this.page.locator(this.arabicRiskDescription).textContent()).trim(),
    englishRiskDescription: (await this.page.locator(this.englishRiskDescription).textContent()).trim(),
  };
}

/**
 * Compares main program details from the UI with expected data.
 * @param {object} createdData - The expected main program details.
 * @param {string} mainProgramNumber - The expected main program ID.
 * @returns {Promise<boolean>} - Returns true if all details match, otherwise false.
 */
async compareMainProgramDetails(createdData, mainProgramNumber ,streamNameUI) {
  
  const uiDetails = await this.getUiMainProgramDetails();

  const expectedDetails = {
    programId: mainProgramNumber,
    streamName : streamNameUI,
    arabicProgramName: createdData.getArabicMainProgramName(),
    englishProgramName: createdData.getEnglishMainProgramName(),
    arabicProgramDescription: createdData.getArabicMainProgramDescription(),
    englishProgramDescription: createdData.getEnglishMainProgramDescription(),
    responsibleEntity: createdData.getResponsibleEntity(),
    estimatedBudget: createdData.getEstimatedBudget(),
    calculationMethod: createdData.getcalculationMethodAPI(),
    arabicRiskDescription: createdData.getRiskArabicDescription(),
    englishRiskDescription: createdData.getRiskEnglishDescription(),
  };

  const allValid = Object.keys(expectedDetails).every(key => uiDetails[key] === expectedDetails[key]);

  return allValid;
}


}

module.exports = { MainProgramDetailsPage };
