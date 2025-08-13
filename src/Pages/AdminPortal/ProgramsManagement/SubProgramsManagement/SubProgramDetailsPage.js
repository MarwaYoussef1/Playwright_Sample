const { BenefitsManagmentPage } = require("../../ProgramsManagement/BenefitsManagement/BenefitsManagementPage");

/**
 * Represents the Sub Program Details page and provides methods for interacting
 * with the sub program details, such as managing or editing sub program-related data.
 * @class
 */
export class SubProgramDetailsPage {
  constructor(page) {
    this.page = page;

    // Selectors for sub program details elements
    this.detailsTab = '//button[@id="tab-3"]';
    this.benefitsTab = '//button[@data-testid="tab-4"]';
    this.createBenefitBtn = '//button[@data-testid="create-benefit"]';

    this.searchInput = '//form[@data-testid="search-input"]';
    this.metaDataTab ='//button[@data-testid="tab-1"]';
    this.targetDataTab ='//button[@data-testid="tab-2"]';
    this.programFeaturesTab ='//button[@data-testid="tab-3"]';
    this.benefitsTab ='//button[@data-testid="tab-4"]';
    this.programLogTab ='//button[@data-testid="tab-5"]';

    //Selectors for UI Elements Detials values
    this.serialNumber = '//span[@data-testid="value_serial-number"]';
    this.stream = '//span[@data-testid="value_stream"]';
    this.mainProgram = '//span[@data-testid="value_the_main_program"]';
    this.arabicSubProgramName = '//span[@data-testid="value_sub-program-name-ar"]';
    this.englishSubProgramName = '//span[@data-testid="value_sub-program-name-en"]';
    this.subProgramType = '//span[@data-testid="value_sub-program-type"]';

    this.assistanceUnit = '//span[@data-testid="value_assistance-unit"]';
    this.targetingApproach = '//span[@data-testid="value_approach"]';
    
    this.activationDate = '//span[@data-testid="value_sub-program-activation-start-date"]';
    this.endDate = '//span[@data-testid="value_sub-program-end-date"]';
    this.programApplicationEnablement = '//span[@data-testid="value_sub-program-application-enablement"]';
    this.requiresRegistrarApplication = '//span[@data-testid="value_sub-program-require-registrar-application"]';
    this.applicationChannels = '//span[@data-testid="value_sub-program-application-channels"]';
    this.allowsReapplicationAfterExit = '//span[@data-testid="value_sub-program-re-application-after-exit-allowance"]';
    this.allowsReapplicationAfterWithdrawal = '//span[@data-testid="value_sub-program-re-application-after-withdrawal-allowance"]';

    this.enablementStatus = '//span[@data-testid="value_enablement-status"]';
    this.approvalStatus = '//span[@data-testid="value_approval-status"]';
    this.activationStatus = '//span[@data-testid="value_activation-status"]';
    this.subProgramStatus = '//span[@data-testid="value_status-state-life-cycle"]';
  }

  /**
   * Navigates to the "Details" tab and clicks the "Define Benefits" button.
   * @returns {Promise<void>} - Completes the action of initiating Benefits details creation.
   */
  async insideCreateBenefits() {
    await this.page.click(this.detailsTab);
    await this.page.waitForTimeout(2000);
   // await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    await this.page.waitForSelector(this.createBenefitBtn, {state: "visible"});
    await this.page.click(this.createBenefitBtn);
   // await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    await this.page.waitForTimeout(2000);
    console.log("Clicked the Create Benefits button");  
  }

  async navigateToBenefitsTab() {
    await this.page.click(this.benefitsTab);
    var searchField = await this.page.locator(this.searchInput).isVisible();
    return searchField
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
 * Retrieves all subprogram details displayed on the UI dynamically.
 * @returns {Promise<object>} - Object containing all subprogram details.
 */
async getUiSubProgramDetails() {
  let subProgramDetails = {};

  await this.page.click(this.metaDataTab);
  await this.page.locator(this.stream).filter({ hasText: global.testConfig.createStream.streamArabicName }).waitFor();

  subProgramDetails = {
    subProgramId: (await this.page.locator(this.serialNumber).textContent()).trim(),
    streamName: (await this.page.locator(this.stream).textContent()).trim(),
    mainProgramName: (await this.page.locator(this.mainProgram).textContent ()).trim(),
    arabicSubProgramName: (await this.page.locator(this.arabicSubProgramName).textContent()).trim(),
    englishSubProgramName: (await this.page.locator(this.englishSubProgramName).textContent()).trim(),
    subProgramType: (await this.page.locator(this.subProgramType).textContent()).trim(),
  };

  await this.page.click(this.targetDataTab);
  await this.page.waitForTimeout(2000);
  subProgramDetails = {
    ...subProgramDetails, 
    assistanceUnit: (await this.page.locator(this.assistanceUnit).textContent()).trim(),
    targetingApproach: (await this.page.locator(this.targetingApproach).textContent()).trim(),
  };

  await this.page.click(this.programFeaturesTab);
  await this.page.waitForTimeout(2000);
  subProgramDetails = {
    ...subProgramDetails, 
    programApplicationEnablement  : (await this.page.locator(this.programApplicationEnablement).textContent()).trim(),
    applicationChannels: (await this.page.locator(this.applicationChannels).textContent()).trim(),
     };

  await this.page.click(this.programLogTab);
  await this.page.waitForTimeout(2000);
  subProgramDetails = {
    ...subProgramDetails, 
    enablementStatus: (await this.page.locator(this.enablementStatus).textContent()).trim(),
    approvalStatus: (await this.page.locator(this.approvalStatus).textContent()).trim(),
    activationStatus: (await this.page.locator(this.activationStatus).textContent()).trim(),
    };
    return subProgramDetails;

}


/**
 * Retrieves subprogram details from multiple UI tabs and compares them with expected data.
 * @param {object} createdData - The expected subprogram details.
 * @param {string} subProgramNumber - The expected subprogram ID.
 * @param {string} streamNameUI - The expected stream name.
 * @param {string} mainProgramNameUI - The expected main program name.
 * @returns {Promise<boolean>} - Returns true if all details match, otherwise false.
 */
async compareSubProgramDetails(createdData, subProgramNumber, streamNameUI , mainProgramNameUI) {


  const uiDetails = await this.getUiSubProgramDetails();

  const expectedDetails = {
    subProgramId: subProgramNumber,
    streamName: streamNameUI,
    mainProgramName: mainProgramNameUI,
    arabicSubProgramName: createdData.getArabicSubProgramName(),
    englishSubProgramName: createdData.getEnglishSubProgramName(),
    subProgramType: global.testConfig.createSubPrograms.viewSubProgramType,
    assistanceUnit: global.testConfig.createSubPrograms.viewAassistanceUnit,
    targetingApproach: global.testConfig.createSubPrograms.viewTtargetingApproach,
    programApplicationEnablement  : createdData.getViewapplicationEnablementPerm(),
    applicationChannels: global.testConfig.createSubPrograms.viewApplicationChannels,
    enablementStatus: createdData.getViewEnablementStatus(),
    approvalStatus: createdData.getViewApprovalStatus(),
    activationStatus: createdData.getViewActivationStatus(),
  };

  console.log(uiDetails,expectedDetails)

  const allValid = Object.keys(expectedDetails).every(key => uiDetails[key] === expectedDetails[key]);

  if (allValid) {
    console.log("Subprogram details match expected data.");
  } else {
    console.error("Subprogram details do not match expected data.");
  }

  return allValid;
}

}

module.exports = { SubProgramDetailsPage };
