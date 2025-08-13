import { Console } from "console";

export class ApplicantStreamDetialsPage {
  constructor(page) {
    this.page = page;

    // Selectors for stream page
    this.streamArabicName = '//div[@data-testid="details-page-layout"]//span[contains(@class,"MuiTypography-displaySm-bold")]';
    this.streamArabicDescription = '//span[@class="MuiTypography-root MuiTypography-textMd muirtl-1wpkab7"]';
    this.faqLabel='(//svg[@data-testid="linksquareicon"]/preceding-sibling::span[1])[1]';
    this.email='//*[@data-testid="mailicon"]/following::span[contains(text(),"@")]';
    this.phoneNumber='(//*[@data-testid="phoneicon"]/following-sibling::div//span)[2]';
    this.cmsDescription='//span[@class="MuiTypography-root MuiTypography-textMd muirtl-n4jn3m"]';
    this.secoundTab ='//button[@id="tab-1"]'
    this.arabicGoal = '//p[@class="MuiTypography-root MuiTypography-body1 muirtl-152dj5e"]' ;
    this.arabicStreamGoal ='//p[@class="MuiTypography-root MuiTypography-body1 MuiTypography-gutterBottom muirtl-1nro4e3"]' ;

    this.mainProramName='(//*[contains(@class,"displaySm-bold")])[2]//following::*[contains(@class,"MuiTypography-textLg-bold")][1]';
    this.mainProramStreamName='(//*[contains(@class,"displaySm-bold")])[2]//following::*[contains(@class,"MuiChip-label")][1]';
    
    this.benefitName='(//*[contains(@class,"displaySm-bold")])[2]//following::*[contains(@class,"MuiTypography-textLg-bold")][2]';
    this.benefitStreamName ='(//*[contains(@class,"displaySm-bold")])[3]//following::*[contains(@class,"MuiChip-label")][1]';
    this.benefitMainProgramName ='(//*[contains(@class,"displaySm-bold")])[3]//following::*[contains(@class,"MuiChip-label")][2]';
    this.benefitSubProgramName ='(//*[contains(@class,"displaySm-bold")])[3]//following::*[contains(@class,"MuiChip-label")][3]';
    this.iconImage = `//img[contains(@alt,"${global.testConfig.Liferay.iconImage.split('.')[0]}")]`;
    this.coverImage = `//img[contains(@alt,"${global.testConfig.Liferay.coverImage.split('.')[0]}")]`;

  }
  
   async getApplicantUiStreamDetails() {
      let AppStreamDetails = {};

      const getBaseImageName = async (locator) => {
      const element = this.page.locator(locator);
      const isVisible = await element.isVisible().catch(() => false);
      if (!isVisible) {
        console.log(`Image not visible`);
        return null;
      }
      const alt = await element.getAttribute("alt");
      return alt?.split('_')[0]?.trim();
       };

      AppStreamDetails ={
        streamArabicName: (await this.page.locator(this.streamArabicName).textContent()).trim(),
        streamArabicDescription: (await this.page.locator(this.streamArabicDescription).textContent()).trim(),
        // faqLabel: (await this.page.locator(this.faqLabel).textContent()).trim(),
        email: (await this.page.locator(this.email).textContent()).trim(),
        phoneNumber: (await this.page.locator(this.phoneNumber).textContent()).trim(),
        cmsDescription: (await this.page.locator(this.cmsDescription).textContent()).trim(),
        coverImage: await getBaseImageName(this.coverImage),
        mainProramName: (await this.page.locator(this.mainProramName).textContent()).trim(),
        mainProramStreamName : (await this.page.locator(this.mainProramStreamName).textContent()).trim(),
        benefitName: (await this.page.locator(this.benefitName).textContent()).trim(),
        benefitStreamName: (await this.page.locator(this.benefitStreamName).textContent()).trim(),
        benefitMainProgramName: (await this.page.locator(this.benefitMainProgramName).textContent()).trim(),
        benefitSubProgramName: (await this.page.locator(this.benefitSubProgramName).textContent()).trim(),
      };
      await this.page.click(this.secoundTab);
      AppStreamDetails ={
        ...AppStreamDetails,
        arabicGoal: (await this.page.locator(this.arabicGoal).textContent()).trim(),
        arabicStreamGoal: (await this.page.locator(this.arabicStreamGoal).textContent()).trim(),
      };
      return AppStreamDetails;
}

async compareApplicantStreamDetails(StreamData, LiferayStreamData ) {
    const uiDetails = await this.getApplicantUiStreamDetails();

    var expectedCoverImageBase = global.testConfig.Liferay.coverImage.split('.')[0];
    var expectedIconImageBase = global.testConfig.Liferay.iconImage.split('.')[0];

    const expectedDetails = {
      streamArabicName: StreamData.getstreamArabicName(),
      streamArabicDescription: StreamData.getstreamArabicDescription(),
      // faqLabel: LiferayData.getFAQ(),
      email: LiferayStreamData.getEmail(),
      phoneNumber: LiferayStreamData.getPhoneNumber(),
      cmsDescription: LiferayStreamData.getCmsDescription(),
      coverImage: expectedCoverImageBase,
      mainProramName: StreamData.getRelatedMainProgramName(),
      mainProramStreamName :StreamData.getstreamArabicName(),
      benefitName: StreamData.getRelatedBenefitName(),
      benefitStreamName: StreamData.getstreamArabicName(),
      benefitMainProgramName: StreamData.getRelatedMainProgramName(),
      benefitSubProgramName: StreamData.getRelatedSubProgramName(),
      arabicGoal: StreamData.getarabicGoal(),
      arabicStreamGoal: StreamData.getarabicStreamGoal(),
    };
    console.log(uiDetails , expectedDetails);
     const normalize = str => str?.replace(/\s+/g, ' ').replace(/^\d+[-٫،.]*\s*/, '').trim();

      const allValid = Object.keys(expectedDetails).every((key) => {
        const actual = uiDetails[key];
        const expected = expectedDetails[key];

      return normalize(actual) === normalize(expected);

      });
    // const allValid = Object.keys(expectedDetails).every(key => uiDetails[key] === expectedDetails[key]);
    return allValid;
  }

}
module.exports = { ApplicantStreamDetialsPage };
