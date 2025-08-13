const { Utils } = require("../../Utils/utils.js");

/**
 * Represents and manages data related to benefits, including names, budget, and estimated values.
 * Provides getter and setter methods for each attribute.
 * @class
 */
export class BenefitsData {
  constructor() {
    this.utils = Utils;
    this.arabicBenefitName = null;
    this.englishBenefitName = null;
    this.benefitsGFSBudget = null;
    this.benefitEstimatedValue = null;

  // Metadata
      this.responsibleCode = null;
      this.benefitDetails = [];
      this.nature = [];
      this.providerCodes = [];
      this.relatedPastBenefits = [];
      this.mechanism = null;
      this.budget = null;
      this.benefitType = null;
      this.natureValueType = null;
      this.estimatedValue = null;
    
      // Targeting Data
      this.incomeCategoryCodes = [];
      this.targetedSegments = [];

      // Feature Data
      this.assessmentNeed = null;
      this.calculation = [];
      this.calculationValue = null;
      this.calculationValueType = null;
      this.calculationChildren = [];
      this.receivingEntity = null;
      this.entity = null;
      this.assessmentTypeCodes = [];
      this.assessmentFrequencyCodes = [];
      this.entitlementPeriod= null;
      this.Pattern = null;
      this.entitlementPeriodStartDate = null;
      this.entitlementPeriodEndDate = null;
      this.frequencyPattern = null;
      this.frequencyStartDate = null;
      this.frequencyEndDate = null;
      this.activationStartDate = null;
      this.activationEndDate = null;
      this.applicationEnablement = null;
      this.paceValue = null;
      this.paceValueType = null;
      this.paceChildren = [];
      this.requireRegisterApplication = null;
      this.applicationChannelCodes = [];

      this.relatedProgramId = null;
      this.relatedSubProgramId = null;
      this.relatedBenefitId = null;
      this.relationCode= null;

      this.relatedStreamName = null;
      this.relatedMainProgramName = null;
      this.relatedSubProgramName = null;
  

  }

  // Getter and Setter for Arabic Benefit Name
  getArabicBenefitName() {
    if (this.arabicBenefitName == null) {
      this.arabicBenefitName = global.testConfig.createBenefits.arabicBenefitName + this.utils.generateRandomArabicString(5) + " " + "أوتو";
      // this.arabicBenefitName = "اعانة تعليمية للديمو";
    }
    return this.arabicBenefitName;
  }
  setArabicBenefitName(value) {
    this.arabicBenefitName = value;
  }

  // Getter and Setter for English Benefit Name
  getEnglishBenefitName() {
    if (this.englishBenefitName == null) {
      this.englishBenefitName =
        global.testConfig.createBenefits.englishBenefitName +
        this.utils.generateRandomEnglishString(5) + " " + "Auto";
    }
    return this.englishBenefitName;
  }
  setEnglishBenefitName(value) {
    this.englishBenefitName = value;
  }

  // Getter and Setter for benefits GFS Budget
  getbenefitsGFSBudget() {
    if (this.benefitsGFSBudget == null) {
      this.benefitsGFSBudget =
        this.utils.generateRandomNumber(2) + " " + "Auto";
    }
    return this.benefitsGFSBudget;
  }
  setbenefitsGFSBudget(value) {
    this.benefitsGFSBudget = value;
  }

  // Getter and Setter for benefit Estimated Value
  getbenefitEstimatedValue() {
    if (this.benefitEstimatedValue == null) {
      this.benefitEstimatedValue =
        global.testConfig.createBenefits.benefitEstimatedValue +
        this.utils.generateRandomArabicString(5) +
        " " +
        "أوتو";
    }
    return this.benefitEstimatedValue;
  }
  setbenefitEstimatedValue(value) {
    this.benefitEstimatedValue = value;
  }

  // Getter and Setter for Entity
  getentity() {
    if (this.entity == null) {
      this.entity =
        global.testConfig.createBenefits.entity +
        this.utils.generateRandomArabicString(5) +
        " " +
        "أوتو";
    }
    return this.entity;
  }
  setentity(value) {
    this.entity = value;
  }

  // Getter and Setter for Random Benefit ID
  getCreatedBenefitId() {
    return this.benefitId;
  }
  setCreatedBenefitId(value) {
    this.benefitId = value;
  }

//Seter and Getter for Meta Data for API Parameters 
      //MetaData
      getResponsibleCode() {
        if (this.responsibleCode == null) {
          this.responsibleCode =  global.testConfig.createBenefits.responsibleCode;
         }
        return this.responsibleCode;
      }
      setResponsibleCode(value) {
        this.responsibleCode = value;
      }

      getMechanism() {
        if (this.mechanism == null) {
        this.mechanism =  global.testConfig.createBenefits.benefitDetails.mechanism;
       }
        return this.mechanism;
      }
      setMechanism(value) {
        this.mechanism = value;
      }

      getBudget() {
        if (this.budget == null) {
          this.budget =  global.testConfig.createBenefits.benefitDetails.budget;
         }
        return this.budget;
      }
      setBudget(value) {
        this.budget = value;
      }

      getBenefitType() {
        if (this.benefitType == null) {
          this.benefitType =  global.testConfig.createBenefits.benefitDetails.benefitTypeCash;
         }
        return this.benefitType;
      }
      setBenefitType(value) {
        this.benefitType = value;
      }

       getNatureValue() {
        if (this.natureValue == null) {
          this.natureValue =  global.testConfig.createBenefits.benefitDetails.natureValue;
         }
        return this.natureValue;
      }
      setNatureValue(value) {
        this.natureValue = value;
      }

      getNatureValueType() {
        if (this.natureValueType == null) {
          this.natureValueType =  global.testConfig.createBenefits.benefitDetails.natureValueType;
         }
        return this.natureValueType;
      }
      setNatureValueType(value) {
        this.natureValueType = value;
      }

      getNature() {
        if (!this.nature || this.nature.length === 0) {
          this.nature = global.testConfig.createBenefits.benefitDetails.nature 
        }
        return this.nature;
      }

      getProviderCodes() {
        if (!this.providerCodes ||this.providerCodes.length === 0) {
          this.providerCodes =  global.testConfig.createBenefits.benefitDetails.providerCodes;
          }
        return this.providerCodes;
      }
      setProviderCodes(value) {
        this.providerCodes = value;
      }

      getEstimatedValue() {
        if (this.estimatedValue == null) {
          this.estimatedValue =  global.testConfig.createBenefits.benefitDetails.estimatedValue;
         }
        return this.estimatedValue;
      }
      setEstimatedValue(value) {
        this.estimatedValue = value;
      }

      getRelatedPastBenefits() {
        if (!this.relatedPastBenefits ||this.relatedPastBenefits.length === 0) {
          this.relatedPastBenefits =  global.testConfig.createBenefits.relatedPastBenefits;
          }
        return this.relatedPastBenefits;
      }
      setRelatedPastBenefits(value) {
        this.relatedPastBenefits = value;
      }

      // Getters and Setters for Targeting Data
      getIncomeCategoryCodes() {
        if (!this.incomeCategoryCodes ||this.incomeCategoryCodes.length === 0) {
          this.incomeCategoryCodes =  global.testConfig.createBenefits.incomeCategoryCodes;
          }
        return this.incomeCategoryCodes;
      }
      setIncomeCategoryCodes(value) {
        this.incomeCategoryCodes = value;
      }

      getTargetedSegments() {
        if (!this.targetedSegments ||this.targetedSegments.length === 0) {
          this.targetedSegments =  global.testConfig.createBenefits.targetedSegments;
          }
        return this.targetedSegments;
      }
      setTargetedSegments(value) {
        this.targetedSegments = value;
      }

     // Getters and Setters for Feature Data
      getAssessmentNeed() {
        if (this.assessmentNeed == null) {
          this.assessmentNeed =  global.testConfig.createBenefits.assessmentNeed;
         }
        return this.assessmentNeed;
      }
      setAssessmentNeed(value) {
        this.assessmentNeed = value;
      }

      getCalculation() {
        if (!this.calculation ||this.calculation.length === 0) {
          this.calculation =  global.testConfig.createBenefits.calculation;
          }
        return this.calculation;
      }

      getCalculationValue() {
        if (this.calculationValue == null) {
          this.calculationValue =  global.testConfig.createBenefits.calculationValue;
         }
        return this.calculationValue;
      }
      setCalculationValue(value) {
        this.calculationValue = value;
      }

      getCalculationValueType() {
        if (this.calculationValueType == null) {
          this.calculationValueType =  global.testConfig.createBenefits.calculationValueType;
         }
        return this.calculationValueType;
      }
      setCalculationValueType(value) {
        this.calculationValueType = value;
      }

      getCalculationChildren() {
        if (this.calculationChildren == null) {
          this.calculationChildren =  global.testConfig.createBenefits.calculationChildren;
         }
        return this.calculationChildren;
      }
      setCalculationChildren(value) {
        this.calculationChildren = value;
      }

      getReceivingEntity() {
        if (this.receivingEntity == null) {
          this.receivingEntity =  global.testConfig.createBenefits.receivingEntity;
         }
        return this.receivingEntity;
      }
      setReceivingEntity(value) {
        this.receivingEntity = value;
      }

      getEntity() {
        if (this.entity == null) {
          this.entity =  global.testConfig.createBenefits.entity;
         }
        return this.entity;
      }
      setEntity(value) {
        this.entity = value;
      }

      getAssessmentTypeCodes() {
        if (!this.assessmentTypeCodes ||this.assessmentTypeCodes.length === 0) {
          this.assessmentTypeCodes =  global.testConfig.createBenefits.assessmentTypeCodes;
          }
        return this.assessmentTypeCodes;
      }
      setAssessmentTypeCodes(value) {
        this.assessmentTypeCodes = value;
      }

      getAssessmentFrequencyCodes() {
        if (!this.assessmentFrequencyCodes ||this.assessmentFrequencyCodes.length === 0) {
          this.assessmentFrequencyCodes =  global.testConfig.createBenefits.assessmentFrequencyCodes;
          }
        return this.assessmentFrequencyCodes;
      }
      setAssessmentFrequencyCodes(value) {
        this.assessmentFrequencyCodes = value;
      }

      getEntitlementPeriodPattern() {
        if (this.entitlementPeriodPattern == null) {
          this.entitlementPeriodPattern =  global.testConfig.createBenefits.entitlementPeriodPattern;
         }
        return this.entitlementPeriodPattern;
      }
      setEntitlementPeriodPattern(value) {
        this.entitlementPeriodPattern = value;
      }

      getEntitlementPeriodStartDate() {
        if (this.entitlementPeriodStartDate == null) {
          this.entitlementPeriodStartDate =  global.testConfig.createBenefits.entitlementPeriodStartDate;
         }
        return this.entitlementPeriodStartDate;
      }
      setEntitlementPeriodStartDate(value) {
        this.entitlementPeriodStartDate = value;
      }

      getEntitlementPeriodEndDate() {
        if (this.entitlementPeriodEndDate == null) {
          this.entitlementPeriodEndDate =  global.testConfig.createBenefits.entitlementPeriodEndDate;
         }
        return this.entitlementPeriodEndDate;
      }
      setEntitlementPeriodEndDate(value) {
        this.entitlementPeriodEndDate = value;
      }

      getFrequencyPattern() {
        if (this.frequencyPattern == null) {
          this.frequencyPattern =  global.testConfig.createBenefits.frequencyOfPeriodicPattern;
         }
        return this.frequencyPattern;
      }
      setFrequencyPattern(value) {
        this.frequencyPattern = value;
      }

      getFrequencyStartDate() {
        if (this.frequencyStartDate == null) {
          this.frequencyStartDate =  global.testConfig.createBenefits.frequencyOfPeriodicStartDate;
         }
        return this.frequencyStartDate;
      }
      setFrequencyStartDate(value) {
        this.frequencyStartDate = value;
      }

      getFrequencyEndDate() {
        if (this.frequencyEndDate == null) {
          this.frequencyEndDate =  global.testConfig.createBenefits.frequencyOfPeriodicEndDate;
         }
        return this.frequencyEndDate;
      }
      setFrequencyEndDate(value) {
        this.frequencyEndDate = value;
      }

      getActivationStartDate() {
        if (this.activationStartDate == null) {
          this.activationStartDate =  global.testConfig.createBenefits.activationStartDate;
         }
        return this.activationStartDate;
      }
      setActivationStartDate(value) {
        this.activationStartDate = value;
      }

      getActivationEndDate() {
        if (this.activationEndDate == null) {
          this.activationEndDate =  global.testConfig.createBenefits.activationEndDate;
         }
        return this.activationEndDate;
      }
      setActivationEndDate(value) {
        this.activationEndDate = value;
      }

      getApplicationEnablement() {
        if (this.applicationEnablement == null) {
          this.applicationEnablement =  global.testConfig.createBenefits.applicationEnablement;
         }
        return this.applicationEnablement;
      }
      setApplicationEnablement(value) {
        this.applicationEnablement = value;
      }

      getPaceValue() {
        if (this.paceValue == null) {
          this.paceValue =  global.testConfig.createBenefits.paceValue;
         }
        return this.paceValue;
      }
      setPaceValue(value) {
        this.paceValue = value;
      }

      getPaceValueType() {
        if (this.paceValueType == null) {
          this.paceValueType =  global.testConfig.createBenefits.paceValueType;
         }
        return this.paceValueType;
      }
      setPaceValueType(value) {
        this.paceValueType = value;
      }

      getPaceChildren() {
        if (!this.paceChildren ||this.paceChildren.length === 0) {
          this.paceChildren =  global.testConfig.createBenefits.paceChildren;
          }
        return this.paceChildren;
      }
      setPaceChildren(value) {
        this.paceChildren = value;
      }

      getRequireRegisterApplication() {
        if (this.requireRegisterApplication == null) {
          this.requireRegisterApplication =  global.testConfig.createBenefits.requireRegisterApplication;
         }
        return this.requireRegisterApplication;
      }
      setRequireRegisterApplication(value) {
        this.requireRegisterApplication = value;
      }

      getApplicationChannelCodes() {
        if (!this.applicationChannelCodes ||this.applicationChannelCodes.length === 0) {
          this.applicationChannelCodes =  global.testConfig.createBenefits.applicationChannelCodes;
          }
        return this.applicationChannelCodes;
      }
      setApplicationChannelCodes(value) {
        this.applicationChannelCodes = value;
      }


      // Getter and Setter for relatedProgramId
        getRelatedProgramId() {
          if (this.relatedProgramId == null) {
            this.relatedProgramId = global.testConfig.createBenefits.relatedPastBenefits.programId;
          }
          return this.relatedProgramId;
        }
        setRelatedProgramId(value) {
          this.relatedProgramId = value;
        }

        // Getter and Setter for relatedSubProgramId
        getRelatedSubProgramId() {
          if (this.relatedSubProgramId == null) {
            this.relatedSubProgramId = global.testConfig.createBenefits.relatedPastBenefits.subProgramId;
          }
          return this.relatedSubProgramId;
        }
        setRelatedSubProgramId(value) {
          this.relatedSubProgramId = value;
        }

        // Getter and Setter for relatedBenefitId
        getRelatedBenefitId() {
          if (this.relatedBenefitId == null) {
            this.relatedBenefitId = global.testConfig.createBenefits.relatedPastBenefits.benefitId;
          }
          return this.relatedBenefitId;
        }
        setRelatedBenefitId(value) {
          this.relatedBenefitId = value;
        }

        
           // Getter and Setter for relatedBenefitId
        getRrelationCode() {
          if (this.relationCode == null) {
            this.relationCode = global.testConfig.createBenefits.relatedPastBenefits.relationCode;
          }
          return this.relationCode;
        }
        setRrelationCode(value) {
          this.relationCode = value;
        }


        ////values used in Applicant 

     getRelatedStreamName() {
        return this.relatedStreamName;
    }
    setRelatedStreamName(value) {
        this.relatedStreamName = value;
    }
       
    getRelatedMainProgramName() {
        return this.relatedMainProgramName;
    }
    setRelatedMainProgramName(value) {
        this.relatedMainProgramName = value;
    }
       
       getRelatedSubProgramName() {
        return this.relatedSubProgramName;
    }
    setRelatedSubProgramName(value) {
        this.relatedSubProgramName = value;
    }


 // toJSON Method
 
 toJSON(subProgramID= null) {
  return {
    metadata: {
      nameAr: this.getArabicBenefitName(),
      nameEn: this.getEnglishBenefitName(),
      responsibleCode:this.getResponsibleCode() ,
      benefitDetails: {
        mechanism: this.getMechanism(), 
        budget: this.getBudget(), 
        benefitType: this.getBenefitType(),
        nature: {
          value: this.getNatureValue(),
          valueType: this.getNatureValueType(),
        },
        providerCodes: this.getProviderCodes(),
        estimatedValue: this.getEstimatedValue(),
      },
      relatedPastBenefits:this.getRelatedPastBenefits(),
      subProgramId: subProgramID,
    },
    targetingData: {
      incomeCategoryCodes: this.getIncomeCategoryCodes(),
      targetedSegments: this.getTargetedSegments(),
    },
    featureData: {
      assessmentNeed: this.getAssessmentNeed(),
      calculation: {
        value: this.getCalculationValue(),
        valueType: this.getCalculationValueType(),
        children: this.getCalculationChildren(),
      },
      receivingEntity: this.getReceivingEntity(),
      assessmentTypeCodes: this.getAssessmentTypeCodes(),
      assessmentFrequencyCodes:  this.getAssessmentFrequencyCodes(),
      entitlementPeriod: {
        pattern: this.getEntitlementPeriodPattern(),
        startDate: this.getEntitlementPeriodStartDate(),
        endDate: this.getEntitlementPeriodEndDate(),
        startTime: "00:00",
        endTime: "00:00",
        week: [],
        specificDate: [],
      },
      frequencyOfPeriodic: {
        pattern: this.getFrequencyPattern(),
        startDate: this.getFrequencyStartDate(),
        endDate: this.getFrequencyEndDate(),
        startTime: "00:00",
        endTime: "00:00",
        week: [],
        specificDate: [],
      },
      activationStartDate: this.getActivationStartDate(),
      activationEndDate: this.getActivationEndDate(),
      applicationEnablement: this.getApplicationEnablement(),
      pace: {
        value: this.getPaceValue(),
        valueType: this.getPaceValueType(),
        children:this.getPaceChildren(),
      },
      requireRegisterApplication: this.getRequireRegisterApplication(),
      applicationChannelCodes: this.getApplicationChannelCodes(),
    },
  };
  

}







}
