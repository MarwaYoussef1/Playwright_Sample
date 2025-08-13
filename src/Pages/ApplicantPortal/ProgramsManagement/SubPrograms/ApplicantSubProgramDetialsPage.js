import { Console } from "console";
export class ApplicantSubProgramDetialsPage {
  constructor(page) {
    this.page = page;
    this.subProgramArabicName = '//div[@data-testid="details-page-layout"]//span[contains(@class,"MuiTypography-displaySm-bold")]'
    this.subProgramStreamName = '(//span[contains(@class,"MuiChip-label MuiChip-labelMedium")])[1]'
    this.subProgramMainProgramName = '(//span[contains(@class,"MuiChip-label MuiChip-labelMedium")])[2]'
    this.email = '//*[@data-testid="mailicon"]/following::span[contains(text(),"@")]';
    this.phoneNumber = '(//*[@data-testid="phoneicon"]/following-sibling::div//span)[2]';
    this.Description = '//span[@class="MuiTypography-root MuiTypography-textMd muirtl-n4jn3m"]' ; 
    this.subProgramType = '(//span[contains(@class, "MuiTypography-textMd") and contains(@class, "MuiTypography-textMd-bold")])[2]'
    this.subProgramDate = '(//*[@data-testid="calendaricon"]/following-sibling::div//span)[2]'
    this.benefitName = '(//*[contains(@class,"displaySm-bold")])[2]//following::*[contains(@class,"MuiTypography-textLg-bold")][1]';
    this.benefitStreamName ='(//*[contains(@class,"displaySm-bold")])[2]//following::*[contains(@class,"MuiChip-label")][1]';
    this.benefitMainProgramName ='(//*[contains(@class,"displaySm-bold")])[2]//following::*[contains(@class,"MuiChip-label")][2]';
    this.benefitSubProgramName ='(//*[contains(@class,"displaySm-bold")])[2]//following::*[contains(@class,"MuiChip-label")][3]';
    this.relatedPastsubPrograms='(//*[contains(@class,"displaySm-bold")])[2]//following::*[contains(@class,"MuiTypography-textLg-bold")][2]';
    this.relatedPastStream = '(//*[contains(@class,"displaySm-bold")])[3]//following::*[contains(@class,"MuiChip-label")][1]';
    this.relatedPastMainProgram = '(//*[contains(@class,"displaySm-bold")])[3]//following::*[contains(@class,"MuiChip-label")][2]';
    this.relatedsubProgramRelation= '(//*[contains(@class,"displaySm-bold")])[3]//following::*[contains(@class,"MuiChip-label")][3]';
    this.expandRisks = '//button[@data-testid="risks"]'
    this.risks= '(//div[@role="region"])[1]' 
    this.expandGoverance = '//button[@data-testid="governance"]'
    this.governace = '(//div[@role="region"])[2]'
    this.coverImage = `//img[contains(@alt,"${global.testConfig.Liferay.coverImage.split('.')[0]}")]`;
  }
async expandAndGetText(expandButtonSelector, valueSelector) {
  await this.page.locator(`xpath=${expandButtonSelector}`).click();
  var value = this.page.locator(`xpath=${valueSelector}`);
  await value.waitFor({ state: 'visible' });
  var text= await value.locator('p >> p').textContent();
  console.log("text is ",text);
  return text;
}

  async getApplicantUiSubProgramDetails() {
    let uiDetails = {};
     var getBaseImageName = async (locator) => {
      var element = this.page.locator(locator);
      var isVisible = await element.isVisible().catch(() => false);
      if (!isVisible) {
        console.log(`Image not visible`);
        return null;
      }
      var alt = await element.getAttribute("alt");
      return alt?.split('_')[0]?.trim();
       };
    
    uiDetails = {
      subProgramArabicName: await this.page.locator(this.subProgramArabicName).textContent(),
      subProgramStreamName: (await this.page.locator(this.subProgramStreamName).textContent()).trim(),
      subProgramMainProgramName: (await this.page.locator(this.subProgramMainProgramName).textContent()).trim(),
      Description: (await this.page.locator(this.Description).textContent()).trim(),
      coverImage: await getBaseImageName(this.coverImage),
      subProgramDate :  (await this.page.locator(this.subProgramDate).textContent()).trim(),
      email: (await this.page.locator(this.email).textContent()).trim(),
      phoneNumber: (await this.page.locator(this.phoneNumber).textContent()).trim(),
      relatedPastsubPrograms: (await this.page.locator(this.relatedPastsubPrograms).textContent()).trim(),
      relatedPastStream: (await this.page.locator(this.relatedPastStream).textContent()).trim(),
      relatedPastMainProgram: (await this.page.locator(this.relatedPastMainProgram).textContent()).trim(),
      relatedsubProgramRelation: (await this.page.locator(this.relatedsubProgramRelation).textContent()).trim(),
      subProgramType: (await this.page.locator(this.subProgramType).textContent()).trim(),
      benefitName: (await this.page.locator(this.benefitName).textContent()).trim(),
      benefitStreamName: (await this.page.locator(this.benefitStreamName).textContent()).trim(),
      benefitMainProgramName: (await this.page.locator(this.benefitMainProgramName).textContent()).trim(),
      benefitSubProgramName: (await this.page.locator(this.benefitSubProgramName).textContent()).trim(),
      risksText: (await this.expandAndGetText (this.expandRisks,  this.risks)),
      governanceText : (await this.expandAndGetText (this.expandGoverance, this.governace)),

    };

    return uiDetails;
  }

    async compareApplicantSubProgramDetails(subProgramData, LiferayData) {

    const uiDetails = await this.getApplicantUiSubProgramDetails();
    var expectedCoverImageBase = global.testConfig.Liferay.coverImage.split('.')[0];
    var relatedPastsubProgramsBase = global.testConfig.createSubPrograms.relatedPastsubProgramsAr;
    var relatedPastStreamBase = global.testConfig.createSubPrograms.relatedPastStream;
    var relatedPastMainProgramBase = global.testConfig.createSubPrograms.relatedPastMainProgram;
    var relatedrelatedsubProgramRelationBase = global.testConfig.createSubPrograms.relation;
    var subProgramTypeBase = global.testConfig.createSubPrograms.viewSubProgramType;

    const expectedDetails = {

      subProgramArabicName: subProgramData.getArabicSubProgramName(),
      subProgramStreamName: subProgramData.getRelatedStreamName(),
      subProgramMainProgramName: subProgramData.getRelatedMainProgramName(),
      Description: LiferayData.getDescription(),
      email: LiferayData.getEmail(),
      phoneNumber: LiferayData.getPhoneNumber(),
      coverImage: expectedCoverImageBase,
      subProgramDate: getTodayDateFormatted(),
      relatedPastsubPrograms: relatedPastsubProgramsBase,
      relatedPastStream: relatedPastStreamBase,
      relatedPastMainProgram: relatedPastMainProgramBase,
      relatedsubProgramRelation: relatedrelatedsubProgramRelationBase,
      benefitName: subProgramData.getRelatedBenefitName(),
      benefitStreamName: subProgramData.getRelatedStreamName(),
      benefitMainProgramName: subProgramData.getRelatedMainProgramName(),
      benefitSubProgramName: subProgramData.getArabicSubProgramName(),
      subProgramType: subProgramTypeBase,
      risksText: LiferayData.getRisks(),
      governanceText: LiferayData.getGovernance(),
    };

     var normalize = str => str?.replace(/\s+/g, ' ').replace(/^\d+[-٫،.]*\s*/, '').trim();

    console.log(uiDetails, expectedDetails);
    var allValid = Object.keys(expectedDetails).every(key => {
      var actual = uiDetails[key]?.trim();
      var expected = expectedDetails[key]?.trim();
      
    return normalize(actual) === normalize(expected);

    });

    return allValid;
  }
  
}

function getTodayDateFormatted() {
  var today = new Date();
  var day = String(today.getDate()).padStart(2, '0');
  var month = String(today.getMonth() + 1).padStart(2, '0');
  var year = today.getFullYear();
  return `${day}/${month}/${year}`;
}

module.exports = { ApplicantSubProgramDetialsPage };