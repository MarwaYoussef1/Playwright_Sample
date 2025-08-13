import { Console } from "console";

function getTodayDateFormatted() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
}
export class ApplicantMainProgramDetialsPage {
  constructor(page) {
    this.page = page;
    this.mainProgramArabicName = '(//span[contains(@class,"MuiTypography-displaySm-bold")])[1]';
    this.mainProgramStreamName = '(//span[contains(@class,"MuiChip-label MuiChip-labelMedium")])[1]'
    this.mainProgramArabicDescription = '(//div[@class="MuiBox-root muirtl-0"]//span[contains(@class," MuiTypography-textMd")])[1]';
    this.faqLabel='(//svg[@data-testid="linksquareicon"]/preceding-sibling::span[1])';
    this.email='//*[@data-testid="mailicon"]/following::span[contains(text(),"@")]';
    this.phoneNumber='(//*[@data-testid="phoneicon"]/following-sibling::div//span)[2]';
    this.cmsDescription = '//span[@class="MuiTypography-root MuiTypography-textMd muirtl-n4jn3m"]';

    this.mainProgramDate= '(//*[@data-testid="calendaricon"]/following-sibling::div//span)[2]';
    this.responsibleEntity= '(//*[@data-testid="responsibleentityicon"]/following-sibling::div//span)[2]';

    this.secoundTab = '//button[@id="tab-1"]';
    this.arabicGoal = '//div[@data-testid="main-program-details"]/following-sibling::div[@role="tabpanel" and @id="tabpanel-1"]//p[contains(@class, "MuiTypography-body1")]';
    // this.arabicMainProgramGoal = '//p[@class="MuiTypography-root MuiTypography-body1 MuiTypography-gutterBottom muirtl-1nro4e3"]';
    
    this.subProramName = '(//*[contains(@class,"displaySm-bold")])[2]//following::*[contains(@class,"MuiTypography-textLg-bold")][1]';
    this.subProramStreamName ='(//*[contains(@class,"displaySm-bold")])[2]//following::*[contains(@class,"MuiChip-label")][1]';
    this.subProramMainProgramName ='(//*[contains(@class,"displaySm-bold")])[2]//following::*[contains(@class,"MuiChip-label")][2]';

    this.benefitName='(//*[contains(@class,"displaySm-bold")])[2]//following::*[contains(@class,"MuiTypography-textLg-bold")][2]';
    this.benefitStreamName ='(//*[contains(@class,"displaySm-bold")])[3]//following::*[contains(@class,"MuiChip-label")][1]';
    this.benefitMainProgramName ='(//*[contains(@class,"displaySm-bold")])[3]//following::*[contains(@class,"MuiChip-label")][2]';
    // this.benefitSubProgramName ='(//*[contains(@class,"displaySm-bold")])[3]//following::*[contains(@class,"MuiChip-label")][3]';

    this.iconImage = `//img[contains(@alt,"${global.testConfig.Liferay.iconImage.split('.')[0]}")]`;
    this.coverImage = `//img[contains(@alt,"${global.testConfig.Liferay.coverImage.split('.')[0]}")]`;
    this.resposibleImage = `//img[contains(@alt,"${global.testConfig.Liferay.resposibleImage.split('.')[0]}")]`;
  }


  async getApplicantUiMainProgramDetails() {
    let uiDetails = {};

    // var coverImageAlt = await this.page.locator(this.coverImage).getAttribute("alt");
    // var coverImageBase = coverImageAlt?.split('_')[0]?.trim();
    // var iconImageAlt = await this.page.locator(this.iconImage).getAttribute("alt");
    // var iconImageBase = iconImageAlt?.split('_')[0]?.trim();
    var responsibleImageAlt = await this.page.locator(this.resposibleImage).getAttribute("alt");
    var responsibleImageBase = responsibleImageAlt?.split('_')[0]?.trim();

    uiDetails = { 
      mainProgramArabicName: (await this.page.locator(this.mainProgramArabicName).textContent()).trim(),
      mainProgramStreamName: (await this.page.locator(this.mainProgramStreamName).textContent()).trim(),
      mainProgramArabicDescription: (await this.page.locator(this.mainProgramArabicDescription).textContent()).trim(),
      email: (await this.page.locator(this.email).textContent()).trim(),
      phoneNumber: (await this.page.locator(this.phoneNumber).textContent()).trim(),

      mainProgramDate :  (await this.page.locator(this.mainProgramDate).textContent()).trim(),
      responsibleEntity :  (await this.page.locator(this.responsibleEntity).textContent()).trim(),

      // coverImage: coverImageBase,
      // iconImage: iconImageBase,
      responsibleImage: responsibleImageBase,

      subProramName: (await this.page.locator(this.subProramName).textContent()).trim(),
      subProramStreamName : (await this.page.locator(this.subProramStreamName).textContent()).trim(),
      subProramMainProgramName: (await this.page.locator(this.subProramMainProgramName).textContent()).trim(),

      benefitName: (await this.page.locator(this.benefitName).textContent()).trim(),
      benefitStreamName : (await this.page.locator(this.benefitStreamName).textContent()).trim(),
      benefitMainProgramName: (await this.page.locator(this.benefitMainProgramName).textContent()).trim(),
      // benefitSubProgramName: (await this.page.locator(this.benefitSubProgramName).textContent()).trim(),
  
    };

  //  await this.page.click(this.secoundTab);

  // var mainProgramGoals = this.page.locator(this.arabicGoal);
  // await mainProgramGoals.waitFor({ state: 'visible', timeout: 10000 });

  // var goalText = await mainProgramGoals.textContent();
  // // if (!goalText) throw new Error("Program Goals text is empty or not found.");

  // uiDetails = {
  //   ...uiDetails,
  //   programGoals: goalText.trim(),
  // };

    return uiDetails;
  }

  async compareApplicantMainProgramDetails(mainProgramData, LiferayData) {
    const uiDetails = await this.getApplicantUiMainProgramDetails();
    var expectedCoverImageBase = global.testConfig.Liferay.coverImage.split('.')[0];
    var expectedIconImageBase = global.testConfig.Liferay.iconImage.split('.')[0];
    var expectedResponsibleImageBase = global.testConfig.Liferay.resposibleImage.split('.')[0];

    const expectedDetails = {
      mainProgramArabicName : mainProgramData.getArabicMainProgramName(),
      mainProgramStreamName : mainProgramData.getRelatedStreamName(),
      mainProgramArabicDescription : mainProgramData.getArabicMainProgramDescription(),
      email: LiferayData.getEmail(),
      phoneNumber: LiferayData.getPhoneNumber(),

      mainProgramDate : getTodayDateFormatted(),
      responsibleEntity : mainProgramData.getResponsibleEntity(),

      // coverImage: expectedCoverImageBase ,
      // iconImage: expectedIconImageBase ,
      responsibleImage: expectedResponsibleImageBase ,

      subProramName : mainProgramData.getRelatedSubProgramName(),
      subProramStreamName : mainProgramData.getRelatedStreamName(),
      subProramMainProgramName : mainProgramData.getArabicMainProgramName(),

      benefitName: mainProgramData.getRelatedBenefitName(),
      benefitStreamName : mainProgramData.getRelatedStreamName(),
      benefitMainProgramName: mainProgramData.getArabicMainProgramName(),
      // benefitSubProgramName: mainProgramData.getRelatedSubProgramName(),

      // programGoals: LiferayData.getArabicMainProgramGoal(),
      };

    const normalize = str => str?.replace(/\s+/g, ' ').replace(/^\d+[-٫،.]*\s*/, '').trim();

    console.log(uiDetails, expectedDetails);
    const allValid = Object.keys(expectedDetails).every(key => {
      const actual = uiDetails[key]?.trim();
      const expected = expectedDetails[key]?.trim();
      
    return normalize(actual) === normalize(expected);

    });

    return allValid;
  }

  
}
module.exports = { ApplicantMainProgramDetialsPage };
