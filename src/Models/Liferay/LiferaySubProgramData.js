const { Utils } = require('../../Utils/utils');

export class LiferaySubProgramData {
  constructor() {
    this.utils = Utils;

    this.applicationChannel;
    this.faqLabel = null;
    this.risks = null;
    this.faq = null;
    this.phoneNumber = null;
    this.email = null;
    this.assistanceUnit = null;
    this.subDescription = null;
    this.description = null;
    this.targetSegmant = null;
    this.conditionsOfFormingAssistanceUnit = null;
    this.geographicalTargeting = null;
    this.entitledSegments = null;
    this.governance = null;

  }
    getApplicationChannel() {
    if (this.applicationChannel == null) {
      this.applicationChannel = global.testConfig.Liferay.applicationChannel;
    }
    return this.applicationChannel;
  }
  setApplicationChannel(value) {
    this.applicationChannel = value;
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

  getRisks() {
    if (this.risks == null) {
      this.risks = global.testConfig.Liferay.Risks;
    }
    return this.risks;
  }
  setRisks(value) {
    this.risks = value;
  }
    getTargetSegmant() {
    if (this.targetSegmant == null) {
      this.targetSegmant = global.testConfig.Liferay.targetSegmant;
    }
    return this.targetSegmant;
  }
    setTargetSegmant(value) {
    this.targetSegmant = value;
  }

      getConditionsOfFormingAssistanceUnit() {
    if (this.conditionsOfFormingAssistanceUnit == null) {
      this.conditionsOfFormingAssistanceUnit = global.testConfig.Liferay.conditionsOfFormingAssistanceUnit;
    }
    return this.conditionsOfFormingAssistanceUnit;
  }
    setConditionsOfFormingAssistanceUnit(value) {
    this.conditionsOfFormingAssistanceUnit = value;
  }

      getGeographicalTargeting() {
    if (this.geographicalTargeting == null) {
      this.geographicalTargeting = global.testConfig.Liferay.geographicalTargeting;
    }
    return this.geographicalTargeting;
  }
    setGeographicalTargeting(value) {
    this.geographicalTargeting = value;
  }

      getEntitledSegments() {
    if (this.entitledSegments == null) {
      this.entitledSegments = global.testConfig.Liferay.entitledSegments;
    }
    return this.entitledSegments;
  }
    setEntitledSegments(value) {
    this.entitledSegments = value;
  }

       getGovernance() {
    if (this.governance == null) {
      this.governance = global.testConfig.Liferay.Governance;
    }
    return this.governance;
  }
    setGovernance(value) {
    this.governance = value;
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

   getAssistanceUnit() {
    if (this.assistanceUnit == null) {
      this.assistanceUnit = global.testConfig.Liferay.assistanceUnit;
    }
    return this.assistanceUnit;
  }
  setAssistanceUnit(value) {
    this.assistanceUnit = value;
  }

  getDescription() {
    if (this.description == null) {
      this.description = global.testConfig.Liferay.Description + this.utils.generateRandomArabicString(6);
    }
    return this.description;
  }
  setDescription(value) {
    this.description = value;
  }

  getSubDescription() {
    if (this.subDescription == null) {
      this.subDescription = global.testConfig.Liferay.subDescription;
    }
    return this.subDescription;
  }
  setSubDescription(value) {
    this.subDescription = value;
  }
}

module.exports = { LiferaySubProgramData };
