const { Utils } = require('../../Utils/utils');

export class LiferayBenefitData {
  constructor() {
    this.utils = Utils;

    this.faqLabel = null;
    this.risks = null;
    this.faq = null;
    this.phoneNumber = null;
    this.email = null;
    this.cmsDescription = null;
  }

  getFaqLabel() {
    if (this.faqLabel == null) {
      this.faqLabel = global.testConfig.Liferay.benefitFaqLabel;
    }
    return this.faqLabel;
  }
  setFaqLabel(value) {
    this.faqLabel = value;
  }

  getRisks() {
    if (this.risks == null) {
      this.risks = global.testConfig.Liferay.benefitRisks + this.utils.generateRandomArabicString(6);
    }
    return this.risks;
  }
  setRisks(value) {
    this.risks = value;
  }

  getFAQ() {
    if (this.faq == null) {
      this.faq = global.testConfig.Liferay.benefitFAQ;
    }
    return this.faq;
  }
  setFAQ(value) {
    this.faq = value;
  }

  getPhoneNumber() {
    if (this.phoneNumber == null) {
      this.phoneNumber = global.testConfig.Liferay.benefitPhoneNumber;
    }
    return this.phoneNumber;
  }
  setPhoneNumber(value) {
    this.phoneNumber = value;
  }

  getEmail() {
    if (this.email == null) {
      this.email = global.testConfig.Liferay.benefitEmail;
    }
    return this.email;
  }
  setEmail(value) {
    this.email = value;
  }

  getCmsDescription() {
    if (this.cmsDescription == null) {
      this.cmsDescription = global.testConfig.Liferay.benefitCmsDescription + this.utils.generateRandomEnglishString(6);
    }
    return this.cmsDescription;
  }
  setCmsDescription(value) {
    this.cmsDescription = value;
  }
}

module.exports = { LiferayBenefitData };
