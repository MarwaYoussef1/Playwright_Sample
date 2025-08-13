const { Utils } = require('../../Utils/utils.js');

export class SocialRecordCopiesData {

    constructor() {
        this.utils = Utils;
        this.ArVersionName = null;
        this.EnVersionName = null;
        this.activationDate = null;
        this.activationDateForApplicant = null;
        this.activationDateForPrograms = null;
        this.fieldArName = null;
        this.existFieldsArNames = [];
        this.rowsCount = 0;
        this.isrTaskNumbrer = null;
        this.ConcatenatedEnName = null;
        this.IsrBusinessKey = null;
        this.fieldBusinessKey = null;
        this.existingFieldChangedToRestrictedArName = null
        this.existingFieldId = null;
    }

    // Getter and Setter for Version Arabic Name
    getVersionArabicName() {
        if (this.ArVersionName == null) {
            this.ArVersionName = global.testConfig.SocialRecordCopies.ArVersionName + this.utils.generateRandomArabicString(4) + " " + "أوتو";
        }
        return this.ArVersionName;
    }
    setVersionArabicName(value) {
        this.ArVersionName = value;
    }

    // Getter and Setter for Version English Name
    getVersionEnglishName() {
        if (this.EnVersionName == null) {
            this.EnVersionName = global.testConfig.SocialRecordCopies.EnVersionName + " " + this.utils.generateRandomEnglishString(4) + " " + "Auto";
        }
        return this.EnVersionName;
    }
    setVersionEnglishName(value) {
        this.EnVersionName = value;
    }

    // Getter and Setter for activation Date
    getActivationDate() {
        if (this.activationDate == null) {
            this.activationDate = this.utils.getCurrentDate();
        }
        return this.activationDate;
    }
    setActivationDate(value) {
        this.activationDate = value;
    }

    // Getter and Setter for activation Date for Applicant
    getActivationDateForApplicant() {
        if (this.activationDateForApplicant == null) {
            this.activationDateForApplicant = this.utils.getDateAfterDays(2);
        }
        return this.activationDateForApplicant;
    }
    setActivationDateForApplicant(value) {
        this.activationDateForApplicant = value;
    }

    // Getter and Setter for activation Date for Programs
    getActivationDateForPrograms() {
        if (this.activationDateForPrograms == null) {
            this.activationDateForPrograms = this.utils.getDateAfterDays(3);
        }
        return this.activationDateForPrograms;
    }
    setActivationDateForPrograms(value) {
        this.activationDateForPrograms = value;
    }

    // Getter and Setter for Field Arabic Name
    getFieldArName() {
        if (this.fieldArName == null) {
            return false;
        }
        return this.fieldArName;
    }
    setFieldArName(value) {
        this.fieldArName = value;
    }

    // Getter for Existing Fields Arabic Name text Values
    getExistingFieldsArName() {
        return this.existFieldsArNames;
    }

    // Setter for Existing Fields Arabic Name text Values
    setExistingFieldsArName(values) {
        this.existFieldsArNames = values;
    }

    // Getter for Existing Fields Row counts
    getRowCount() {
        return this.rowsCount;
    }

    // Setter for Existing Fields Row Counts
    setRowCount(values) {
        this.rowsCount = values;
    }

    // Getter and Setter for ISR task number
    getIsrTaskNumber() {
        if (this.isrTaskNumbrer == null) {
            return false;
        }
       console.log("get ISRTaskNumber by " + this.isrTaskNumbrer);
        return this.isrTaskNumbrer;
    }
    setIsrTaskNumber(value) {
        this.isrTaskNumbrer = value;
        console.log("set ISRTaskNumber by " + this.isrTaskNumbrer);
    }

    // Getter and Setter for ISR Version English Concatenated Name
    getVersionEnConcatenatedName() {
        if (this.ConcatenatedEnName == null) {
            return false;
        }
        return this.ConcatenatedEnName;
    }
    setVersionEnConcatenatedName(value) {
        this.ConcatenatedEnName = value;
    }

    // Getter and Setter for ISR Business Key
    getIsrBusinessKey() {
        if (this.IsrBusinessKey == null) {
            return false;
        }
        return this.IsrBusinessKey;
    }
    setIsrBusinessKey(value) {
        this.IsrBusinessKey = value;
    }
    // Getter and Setter for field Business Key
    getFieldBusinessKey() {
        if (this.fieldBusinessKey == null) {
            return false;
        }
        return this.fieldBusinessKey;
    }
    setFieldBusinessKey(value) {
        this.fieldBusinessKey = value;
    }
    // Getter and Setter for existing Field Changed To Restricted Ar Name
    getExistingFieldChangedToRestrictedArName() {
        if (this.existingFieldChangedToRestrictedArName == null) {
            return false;
        }
        return this.existingFieldChangedToRestrictedArName;
    }
    setExistingFieldChangedToRestrictedArName(value) {
        this.existingFieldChangedToRestrictedArName = value;
    }

    // Getter and Setter for existing Field Changed To Restricted Id
    getExistingFieldId() {
        if (this.existingFieldId == null) {
            return false;
        }
        return this.existingFieldId;
    }
    setExistingFieldId(value) {
        this.existingFieldId = value;
    }


    isrSchemaCreationToJSON() {
        return {
            schemaNameAr: this.getVersionArabicName(),
            schemaNameEn: this.getVersionEnglishName(),
            activatedAt: this.getActivationDate(),
            activatedAtForApplicant: this.getActivationDateForApplicant(),
            activatedAtForProgram: this.getActivationDateForPrograms(),
        }
    }

    addFieldInIsrToJSON() {
        return {
            fieldBusinessKey: this.getFieldBusinessKey(),// passed from business key of the new field created by API
            "isrSettings": {
                "fieldUsage": "PRIMARY",
                "exportable": false,
                "relativeNetworkSupervisorPermission": "PUBLIC"
            }
        }
    }

    requestCreationToJSON() {
        return {
            schemaBusinessKey: this.getIsrBusinessKey(), // passed from business key from the response of isrSchemaCreationToJSON
            "requestData": {
                "justifications": [
                    {
                        "id": "67640814ae9881e447c40dbb",
                        "code": null,
                        "nameEn": "Update general",
                        "nameAr": "تحديث عام"
                    }
                ],
                "attachments": {
                    "modelData": {
                        "fileDescription": "",
                        "modelDataFile": []
                    },
                    "dataSource": {
                        "dataSource": []
                    },
                    "conditionsFile": [],
                    "variables": {
                        "variables": []
                    }
                }
            }
        }
    }

}

module.exports = { SocialRecordCopiesData };