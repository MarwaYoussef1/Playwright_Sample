import Constants from '../../Utils/Constants.js';

const {Utils }= require('../../Utils/utils.js');

export class FieldData {

  constructor() {
    this.utils = Utils;
    this.fieldArabicName = null;
    this.fieldEnglishName = null;
    this.arabicFieldDescription = null;
    this.englishFieldDescription = null;
    this.fieldType = null;
    this.fieldId = null;  
    this.glossaryParentName = null ;
    this.glossaryFieldNature = null;
    this.glossaryFieldSource = null;
    this.glossaryAxonStatus = null;
    this.glossaryServiceName == null ;

    //API
    this.requestId=null;
    this.parentKey=null;
    this.inputSource=null;
    this.parentDomain=null;

  }

// Getter and Setter for FieldType
getFieldType() {
    if (this.fieldType == null) {
        this.fieldType =Constants.COMPLEX_FIELD
        // global.testConfig.createField.fieldArabicName +" "+ this.utils.generateRandomArabicString(5)+" "+"أوتو";
    }
    return this.fieldType;
    }
setFieldType(value) {
      this.fieldType = value;
    }

  // Getter and Setter for FieldArabicName
  getArabicFieldName() {
      if (this.fieldArabicName == null) {
          this.fieldArabicName =global.testConfig.createField.fieldArabicName +" "+ this.utils.generateRandomArabicString(5)+" "+"أوتو";
      }
      return this.fieldArabicName;
      }
  setArabicFieldName(value) {
        this.fieldArabicName = value;
      }

      // Getter and Setter for FieldEnglishName
    getEnglishFieldName() {
        if (this.fieldEnglishName == null) {
            this.fieldEnglishName =global.testConfig.createField.fieldEnglishName +" "+ this.utils.generateRandomEnglishString(5)+" "+"Auto";
        }
        return this.fieldEnglishName;
        }
    setEnglishFieldName(value) {
        this.fieldEnglishName = value;
        }

    // Getter and Setter for ArabicFieldDescription
    getArabicFieldDescription() {
        if (this.arabicFieldDescription == null) {
            this.arabicFieldDescription = global.testConfig.createField.arabicFieldDescription + this.utils.generateRandomArabicString(10);
        }
        return this.arabicFieldDescription;
        }
    setArabicFieldDescription(value) {
        this.arabicFieldDescription = value;
        }

    // Getter and Setter for EnglishFieldDescription
    getEnglishFieldDescription() {
        if (this.englishFieldDescription == null) {
            this.englishFieldDescription = global.testConfig.createField.englishFieldDescription + this.utils.generateRandomEnglishString(10);
        }
        return this.englishFieldDescription;
        }
    setEnglishFieldDescription(value) {
        this.englishFieldDescription = value;
        }

    // Getter and Setter for Field ID Number
    getCreatedFieldId() {
        return this.fieldId;
    }
    // Setter for FieldID
    setCreatedFieldId(Value) {
        this.fieldId = Value;
    }

    // Getter and Setter for Glossary Parent Name
     getGlossaryParentName() {
        if (this.glossaryParentName == null) {
            this.glossaryParentName =global.testConfig.createField.glossaryParentBeforeApprove;
        }
        return this.glossaryParentName;
    }
    // Setter for Glossary Parent Name
    setGlossaryParentName(Value) {
        this.glossaryParentName = Value;
    }
    
    // Getter and Setter for Glossary Field Nature
     getGlossaryFieldNature() {
        if (this.glossaryFieldNature == null) {
            this.glossaryFieldNature =global.testConfig.createField.glossaryFieldEmptyValue;
        }
        return this.glossaryFieldNature;
    }
    // Setter for Glossary Field Nature
    setGlossaryFieldNature(Value) {
        this.glossaryFieldNature = Value;
    }

    // Getter and Setter for Glossary Field Source
    getGlossaryFieldSource() {
        if (this.glossaryFieldSource == null) {
            this.glossaryFieldSource =global.testConfig.createField.glossaryFieldEmptyValue;
        }
        return this.glossaryFieldSource;
    }
    // Setter for Glossary Field Source
    setGlossaryFieldSource(Value) {
        this.glossaryFieldSource = Value;
    }
    
    // Getter and Setter for Glossary Axon Status
    getGlossaryAxonStatus() {
        if (this.glossaryAxonStatus == null) {
            this.glossaryAxonStatus =global.testConfig.createField.glossaryFieldAxsonStatus;
        }
        return this.glossaryAxonStatus;
    }
    // Setter for Glossary Axon Status
    setGlossaryAxonStatus(Value) {
        this.glossaryAxonStatus = Value;
    }

       // Getter and Setter for Glossary Axon Service Name
       getGlossaryServiceName() {
        if (this.glossaryServiceName == null) {
            this.glossaryServiceName =global.testConfig.createField.glossaryServiceName;
        }
        return this.glossaryServiceName;
        }
        // Setter for Glossary Axon Service Name
        setGlossaryServiceName(Value) {
            this.glossaryServiceName = Value;
        }

      // Getter and Setter for API Request field ID Number
      getRequestId() {
        return this.requestId;
     }

    // Setter for FieldID
    setRequestId(Value) {
        this.requestId = Value;
    }

    // Getter and Setter for API parent Key
    getParentKey() {
        if(this.parentKey==null)
        {
            this.parentKey=global.testConfig.createField.API_Default_ParentKey;
        }
        return this.parentKey;
    }

    
    setParentKey(Value) {
        this.parentKey = Value;
    }


     // Getter and Setter for API parent domain
     getParentDomain() {
        if(this.parentDomain==null)
        {
            this.parentDomain=global.testConfig.createField.API_Default_ParentDomain;
        }
        return this.parentDomain;
    }

    
    setParentDomain(Value) {
        this.parentDomain = Value;
    }

     // Getter and Setter for API input source
     getInputSource() {
       
        return this.inputSource;
    }
    setInputSource(Value) {
        this.inputSource = Value;
    }

 toJSON() {
        return {
     "dataSource": this.getFieldType(),
    "isrRequestId": this.getRequestId(),
    "parentKey": this.getParentKey(),
    "parentType": this.getParentDomain(),
    "metaData": 
    {
        "required": false,
        "multipleField": false,
        "tags": null,
        "privacy": global.testConfig.createField.API_Privacy,
        "impactDegree": global.testConfig.createField.API_ImpactDegree,
        "encrypted": false,
        "index": null,
        "activationDate": null,
        "expirationDate": null,
        "alarmForUnAllowedValues1": [
            {
                "textField": "",
                "alarmForUnallowedValues": "",
                "dataQualityRules": ""
            }
        ],
        "alarmForUnAllowedValues": [],
        "note": null,
        "id": "",
        "arabicFieldName": this.getArabicFieldName(),
        "englishFieldName": this.getEnglishFieldName(),
        "fieldType": "Text",
        "assignedDomain": global.testConfig.createField.API_Assigned_Domain,
        "inputSource": this.getInputSource(),
        "arabicFieldDescription": null,
        "englishFieldDescription": null,
         "fieldNature": {
                    "id": global.testConfig.createField.API_FieldNature_id,
                    "code": null,
                    "nameEn":global.testConfig.createField.API_FieldNature_nameEn,
                    "nameAr": global.testConfig.createField.API_FieldNature_nameAr
                },
         
                "severity": {
                    "id":global.testConfig.createField.API_Severity_id,
                    "code": null,
                    "nameEn": global.testConfig.createField.API_Severity_nameEn,
                    "nameAr":global.testConfig.createField.API_Severity_nameAr
                },
        "periodicDataUpdate": {
                    "id": global.testConfig.createField.API_PeriodicDataUpdate_id,
                    "code": null,
                    "nameEn": global.testConfig.createField.API_PeriodicDataUpdate_nameEn,
                    "nameAr": global.testConfig.createField.API_PeriodicDataUpdate_nameAr
                },
         "classification": {
                    "id": global.testConfig.createField.API_Classification,
                    "code": global.testConfig.createField.API_Classification,
                    "nameEn": global.testConfig.createField.API_Classification,
                    "nameAr": global.testConfig.createField.API_Classification_Ar
                },
        "dataQualityRules": null
            
        }
    
    }
 }
  
}





    

   /* toComplexJson()
    { 
        return {
            "dataSource": this.getFieldType(),
            "isrRequestId":this.getRequestId(),
            "parentKey": this.getParentKey(),
            "parentType": "DOMAIN",
            "metaData": {
         "classification": {
            "id": "public",
            "code": "public",
            "nameEn": "public",
            "nameAr": "عام"
        },
        "required": true,
        "multipleField": true,
        "tags": null,
        "periodicDataUpdate": {
            "id": "675edfc28d5d8a38173540aa",
            "code": null,
            "nameEn": "monthly",
            "nameAr": "شهري"
        },
        "privacy": "Public",
        "impactDegree": "High",
        "severity": {
            "id": "675edd7f270cc3ce790d2709",
            "code": null,
            "nameEn": "low",
            "nameAr": "منخفض"
        },
        "encrypted": false,
        "index": null,
        "dataQualityRules": null,
        "activationDate1": "",
        "expirationDate1": "",
        "alarmForUnAllowedValues2": [
            {
                "textField": "",
                "alarmForUnallowedValues": ""
            }
        ],
        "id": "",
        "arabicFieldName": "حقل مركب مممم",
        "englishFieldName": "complex field mmmmm",
        "fieldType": "Text",
        "assignedDomain": "البيانات الشخصية",
        "inputSource": "مركب",
        "fieldNature": {
            "id": "675edd657215dc2057c65774",
            "code": null,
            "nameEn": "Health",
            "nameAr": "صحي"
        },
        "arabicFieldDescription": null,
        "englishFieldDescription": null,
        "alarmForUnAllowedValues": [],
        "note": null,
        "expirationDate": null,
        "activationDate": null
    }
      }
    }*/
    




module.exports = { FieldData };