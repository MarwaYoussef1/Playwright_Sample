import { Console } from "console";

export class ApplicantBenefitDetialsPage {
  constructor(page) {
    this.page = page;
    this.benefitArabicName = '//div[contains(@class,"muirtl-1821gv5")]//span[contains(@class,"MuiTypography-displaySm-bold")]';
    this.benefitArabicDescription = '//span[@class="MuiTypography-root MuiTypography-textMd muirtl-1wpkab7"]';
    this.faqLabel = '(//span[@class="MuiTypography-root MuiTypography-textMd muirtl-2cavrn"])[1]';
    this.email = '(//span[@class="MuiTypography-root MuiTypography-textMd muirtl-2cavrn"])[2]';
    this.phoneNumber = '(//span[@class="MuiTypography-root MuiTypography-textMd muirtl-2cavrn"])[3]';
    this.cmsDescription = '//span[@class="MuiTypography-root MuiTypography-textMd muirtl-n4jn3m"]';
    this.secoundTab = '//button[@id="tab-1"]';
    this.arabicGoal = '//p[@class="MuiTypography-root MuiTypography-body1 muirtl-152dj5e"]';
    this.arabicStreamGoal = '//p[@class="MuiTypography-root MuiTypography-body1 MuiTypography-gutterBottom muirtl-1nro4e3"]';
    this.subProgramName = '(//span[@class="MuiTypography-root MuiTypography-textLg-bold muirtl-1jxcmk"])[4]';
    this.benefitName = '(//span[@class="MuiTypography-root MuiTypography-textMd muirtl-2cavrn"])[5]';
    this.iconImage = `//img[contains(@alt,"${global.testConfig.Liferay.iconImage.split('.')[0]}")]`;
    this.coverImage = `//img[contains(@alt,"${global.testConfig.Liferay.coverImage.split('.')[0]}")]`;
  }

  async getApplicantUiBenefitDetails() {
    let uiDetails = {};
    var coverImageAlt = await this.page.locator(this.coverImage).getAttribute("alt");
    var coverImageBase = coverImageAlt?.split(" ")[0]?.trim();
    var iconImageAlt = await this.page.locator(this.iconImage).getAttribute("alt");
    var iconImageBase = iconImageAlt?.split(" ")[0]?.trim();

    uiDetails = {
      benefitArabicName: await this.page.locator(this.benefitArabicName).textContent(),
      benefitArabicDescription: (await this.page.locator(this.benefitArabicDescription).textContent()).trim(),
      email: (await this.page.locator(this.email).textContent()).trim(),
      phoneNumber: (await this.page.locator(this.phoneNumber).textContent()).trim(),
      coverImage: coverImageBase,
      iconImage: iconImageBase,
      subProgramName: (await this.page.locator(this.subProgramName).textContent()).trim(),
      benefitName: (await this.page.locator(this.benefitName).textContent()).trim()
    };

    await this.page.click(this.secoundTab);
    uiDetails = {
      ...uiDetails,
      arabicGoal: (await this.page.locator(this.arabicGoal).textContent()).trim(),
      arabicStreamGoal: (await this.page.locator(this.arabicStreamGoal).textContent()).trim(),
    };

    return uiDetails;
  }

  async compareApplicantBenefitDetails(streamArName, AdminData, LiferayData, benefitsData) {
    const uiDetails = await this.getApplicantUiBenefitDetails();
    var expectedCoverImageBase = global.testConfig.Liferay.coverImage.split('.')[0];
    var expectedIconImageBase = global.testConfig.Liferay.iconImage.split('.')[0];

    const expectedDetails = {
      benefitArabicName: AdminData.getstreamArabicName(),
      benefitArabicDescription: AdminData.getstreamArabicDescription(),
      email: LiferayData.getEmail(),
      phoneNumber: LiferayData.getPhoneNumber(),
      arabicGoal: AdminData.getarabicGoal(),
      arabicStreamGoal: AdminData.getarabicStreamGoal(),
      coverImage: expectedCoverImageBase,
      iconImage: expectedIconImageBase,
      subProgramName: benefitsData.getSubProgramArabicName(),
      benefitName: benefitsData.getArabicBenefitName(),
    };

    console.log(uiDetails, expectedDetails);
    const allValid = Object.keys(expectedDetails).every(key => {
      const actual = uiDetails[key]?.trim();
      const expected = expectedDetails[key]?.trim();
      if (key === "arabicStreamGoal") {
        const cleanedActual = actual.replace(/^\d+\s*[-٫،.]/, '');
        return cleanedActual === expected;
      }
      return actual === expected;
    });

    return allValid;
  }
}
module.exports = { ApplicantBenefitDetialsPage };
