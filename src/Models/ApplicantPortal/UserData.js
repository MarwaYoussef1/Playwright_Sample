const { Utils } = require("../../Utils/utils");

export class UserData {
  constructor() {
    this.utils = Utils;

    this.username = null;
    this.firstName = null;
    this.lastName = null;
    this.password = null;

    this.nationalId = null;
    this.dob = null;
    this.mobileNumber = null;
  }

  getUsername() {
  if (this.username == null) {
    var randomDigits = this.utils.generateRandomNumber(9);
    this.username = "1" + randomDigits;
  }
    return this.username;
  }
  setUsername(value) {
    this.username = value;
  }

  getFirstName() {
    if (this.firstName == null) {
      this.firstName = global.testConfig.Applicant.userFirstName;
      // const raw = this.utils.generateRandomEnglishString(6);
      // this.firstName = raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
    }
    return this.firstName;
  }
  setFirstName(value) {
    this.firstName = value;
  }

  getLastName() {
    if (this.lastName == null) {
      this.lastName =global.testConfig.Applicant.userLastName;
    }
    return this.lastName;
  }
  setLastName(value) {
    this.lastName = value;
  }

  getPassword() {
    if (this.password == null) {
      this.password =global.testConfig.Applicant.userPassword;
    }
    return this.password;
  }
  setPassword(value) {
    this.password = value;
  }

  getNationalId() {
    if (this.nationalId == null) {
      this.nationalId = this.getUsername(); 
    }
    return this.nationalId;
  }
  setNationalId(value) {
    this.nationalId = value;
  }

  getDob(isAdult = true) {
    if (this.dob == null) {
      this.dob = isAdult ? global.testConfig.Applicant.aboveEighteen : global.testConfig.Applicant.underEighteen;
    }
    return this.dob;
  }
  setDob(value) {
    this.dob = value;
  }

  getMobileNumber() {
    if (this.mobileNumber == null) {
      this.mobileNumber = global.testConfig.Applicant.mobileNumber;
    }
    return this.mobileNumber;
  }
  setMobileNumber(value) {
    this.mobileNumber = value;
  }

  toJSON() {
    return {
      username: this.getUsername(),
      email: "",
      enabled: true,
      firstName: this.getFirstName(),
      lastName: this.getLastName(),
      userProfileMetadata: {
        attributes: [
          {
            name: "username",
            displayName: "username",
            required: true,
            readOnly: true,
            validators: {}
          },
          {
            name: "email",
            displayName: "email",
            required: true,
            readOnly: false,
            validators: {
              email: {
                "ignore.empty.value": true
              }
            }
          }
        ],
        groups: []
      },
      attributes: {
        nationalId: [this.getNationalId()],
        dob: [this.getDob()],
        mobileNumber: [this.getMobileNumber()]
      },
      credentials: [
        {
          temporary: false,
          type: "password",
          value: this.getPassword()
        }
      ]
    };
  }
}

module.exports = { UserData };
