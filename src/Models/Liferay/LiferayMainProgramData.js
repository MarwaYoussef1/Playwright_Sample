const { Utils } = require('../../Utils/utils');

export class LiferayMainProgramData {
  constructor() {
    this.utils = Utils;

    this.faqLabel = null;
    this.risks = null;
    this.faq = null;
    this.phoneNumber = null;
    this.email = null;
    this.cmsDescription = null;
    this.arabicMainProgramGoal = null;
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
      this.risks = global.testConfig.Liferay.Risks + this.utils.generateRandomArabicString(6);
    }
    return this.risks;
  }
  setRisks(value) {
    this.risks = value;
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

   // Getter and Setter for Arabic Main Program Goal
   getArabicMainProgramGoal() {
     if (this.arabicMainProgramGoal == null) {
       this.arabicMainProgramGoal =
         global.testConfig.createMainProgram.arabicMainProgramGoal +
         this.utils.generateRandomArabicString(8);
     }
     return this.arabicMainProgramGoal;
   }
   setArabicMainProgramGoal(value) {
     this.arabicMainProgramGoal = value;
   } // Getter and Setter for Arabic Main Program Goal
   getArabicMainProgramGoal() {
     if (this.arabicMainProgramGoal == null) {
       this.arabicMainProgramGoal =
         global.testConfig.createMainProgram.arabicMainProgramGoal      
        }
     return this.arabicMainProgramGoal;
   }
   setArabicMainProgramGoal(value) {
     this.arabicMainProgramGoal = value;
   }
}

module.exports = { LiferayMainProgramData };
