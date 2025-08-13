const { Utils } = require('../../Utils/utils.js');

export class LookupData {

    constructor() {
        this.utils = Utils;
        this.lookupArabicName = null;
        this.lookupEnglishName = null;
        this.lookupDescriptionArabicName = null;
        this.lookupDescriptionEnglishName = null;
        this.nameInArabic = null;
        this.nameInEnglish = null;
        this.code = null;
        this.nameArabic = null;
        this.nameEnglish = null;
        this.codeLookup = null;
        this.lookupId = null;
    }

    // Getter and Setter for lookupArabicName
    getLookupArabicName() {
        if (this.lookupArabicName == null) {
            this.lookupArabicName = global.testConfig.lookUps.firstTabArabicName + this.utils.generateRandomArabicString(3) + " " + "أوتو";
        }
        return this.lookupArabicName;
    }
    setLookupArabicName(value) {
        this.lookupArabicName = value;
    }

    // Getter and Setter for lookupEnglishName
    getLookupEnglishName() {
        if (this.lookupEnglishName == null) {
            this.lookupEnglishName = global.testConfig.lookUps.firstTabEnglishName  + " " +this.utils.generateRandomEnglishString(3) + " " + "Auto";
        }
        return this.lookupEnglishName;
    }
    setLookupEnglishName(value) {
        this.lookupEnglishName = value;
    }

    // Getter and Setter for lookupDescriptionArabicName
    getLookupDescriptionArabicName() {
        if (this.lookupDescriptionArabicName == null) {
            this.lookupDescriptionArabicName = global.testConfig.lookUps.firstTabDescriptionArabicName + " " + this.utils.generateRandomArabicString(3) + " " + "أوتو";
        }
        return this.lookupDescriptionArabicName;
    }
    setLookupDescriptionArabicName(value) {
        this.lookupDescriptionArabicName = value;
    }

    // Getter and Setter for lookupDescriptionEnglishName
    getLookupDescriptionEnglishName() {
        if (this.lookupDescriptionEnglishName == null) {
            this.lookupDescriptionEnglishName = global.testConfig.lookUps.firstTabDescriptionEnglishName + " " + this.utils.generateRandomEnglishString(3) + " " + "Auto";
        }
        return this.lookupDescriptionEnglishName;
    }
    setLookupDescriptionEnglishName(value) {
        this.lookupDescriptionEnglishName = value;
    }

    // Getter and Setter for nameInArabic
    getNameInArabic() {
        if (this.nameInArabic == null) {
            this.nameInArabic = global.testConfig.lookUps.secondTabArabicName + " " + this.utils.generateRandomArabicString(3) + " " + "أوتو";
        }
        return this.nameInArabic;
    }
    setNameInArabic(value) {
        this.nameInArabic = value;
    }

    // Getter and Setter for nameInEnglish
    getNameInEnglish() {
        if (this.nameInEnglish == null) {
            this.nameInEnglish = global.testConfig.lookUps.secondTabEnglishName + " " + this.utils.generateRandomEnglishString(3) + " " + "Auto";
        }
        return this.nameInEnglish;
    }
    setNameInEnglish(value) {
        this.nameInEnglish = value;
    }

    // Getter and Setter for code
    getCode() {
        if (this.code == null) {
            this.code = this.utils.generateRandomNumber(6);
        }
        return this.code;
    }
    setCode(value) {
        this.code = value;
    }

    // Getter and Setter for nameArabic
    getNameArabic() {
        if (this.nameArabic == null) {
            this.nameArabic = global.testConfig.lookUps.thirdTabArabicName + " " + this.utils.generateRandomArabicString(3) + " " + "أوتو";
        }
        return this.nameArabic;
    }
    setNameArabic(value) {
        this.nameArabic = value;
    }

    // Getter and Setter for nameEnglish
    getNameEnglish() {
        if (this.nameEnglish == null) {
            this.nameEnglish = global.testConfig.lookUps.thirdTabEnglishName + this.utils.generateRandomEnglishString(3) + " " + "Auto";
        }
        return this.nameEnglish;
    }
    setNameEnglish(value) {
        this.nameEnglish = value;
    }

    // Getter and Setter for codeLookup
    getCodeLookup() {
        if (this.codeLookup == null) {
            this.codeLookup = this.utils.generateRandomNumber(6);
        }
        return this.codeLookup;
    }
    setCodeLookup(value) {
        this.codeLookup = value;
    }

    // Getter and Setter for lookup ID Number
    getCreatedLookupId() {
        return this.lookupId;
    }

    // Setter for lookup ID Number
    setCreatedLookupId(Value) {
        this.lookupId = Value;
    }
}

module.exports = { LookupData };