const { Utils } = require("../../Utils/utils");

export class UserData {
  constructor() {
    this.utils = Utils;

    this.fullName = null;
    this.nationalId = null;
    this.email = null;
    this.mobileNumber = null;
    this.jobTitle = null;
  }

    getNationalId() {
    if (this.nationalId == null) {
      var randomDigits = this.utils.generateRandomNumber(10);
      this.nationalId = randomDigits;
    }
      return this.nationalId;
    }
    setNationalId(value) {
      this.nationalId = value;
    }

    getFullName() {
      if (this.fullName == null) {
        this.fullName = global.testConfig.createOperationUser.userFullName +" "+ this.utils.generateRandomArabicString(5);
      }
      return this.fullName;
    }
    setFullName(value) {
      this.fullName = value;
    }

    getMobileNumber() {
      if (this.mobileNumber == null) {
        var randomDigits = this.utils.generateRandomNumber(8);
        this.mobileNumber = "5" + randomDigits;
      }
      return this.mobileNumber;
    }
    setMobileNumber(value) {
      this.mobileNumber = value;
    }

    // Getter and Setter for jobTitle
    getJobTitle() {
      if (this.jobTitle === null) {
        this.jobTitle = this.getFullName();
      }
      return this.jobTitle;
    }
    setJobTitle(value) {
      this.jobTitle = value;
    }

  // Getter and Setter for email
    getEmail() {
      if (this.email === null) {
        this.email =  global.testConfig.createOperationUser.emailPrefix + this.utils.generateRandomNumber(5) + global.testConfig.createOperationUser.emailFormat;
      }
      return this.email; 
    }
    setEmail(value) {
      this.email = value;
    }
 
}

module.exports = { UserData };
