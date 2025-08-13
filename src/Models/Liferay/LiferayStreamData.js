const { Utils } = require('../../Utils/utils');

export class LiferayStreamData {
  constructor() {
    this.utils = Utils;

    this.faqLabel = null;
    this.serviceChannels = null;
    this.faq = null;
    this.phoneNumber = null;
    this.email = null;
    this.cmsDescription = null;
  }

  getFaqLabel() {
    if (this.faqLabel == null) {
      this.faqLabel = global.testConfig.Liferay.FaqLabel;
    }
    return this.faqLabel;
  }
  setFaqLabel(value) {
    this.faqLabel = value;
  }

  getServiceChannels() {
    if (this.serviceChannels == null) {
      this.serviceChannels = global.testConfig.Liferay.ServiceChannels + this.utils.generateRandomArabicString(6);
    }
    return this.serviceChannels;
  }
  setServiceChannels(value) {
    this.serviceChannels = value;
  }

  getFAQ() {
    if (this.faq == null) {
      this.faq = global.testConfig.Liferay.FAQ ;
    }
    return this.faq;
  }
  setFAQ(value) {
    this.faq = value;
  }

  getPhoneNumber() {
    if (this.phoneNumber == null) {
      this.phoneNumber = global.testConfig.Liferay.PhoneNumber;
    }
    return this.phoneNumber;
  }
  setPhoneNumber(value) {
    this.phoneNumber = value;
  }

  getEmail() {
    if (this.email == null) {
      this.email = global.testConfig.Liferay.Email;
    }
    return this.email;
  }
  setEmail(value) {
    this.email = value;
  }

  getCmsDescription() {
    if (this.cmsDescription == null) {
      this.cmsDescription = global.testConfig.Liferay.CmsDescription + this.utils.generateRandomArabicString(6);
    }
    return this.cmsDescription;
  }
  setCmsDescription(value) {
    this.cmsDescription = value;
  }
}

module.exports = { LiferayStreamData };
