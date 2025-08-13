const { Utils } = require("../../Utils/utils.js");

/**
 * Represents and manages data related to subprograms, including names, budgets,
 * and conditions. Provides getter and setter methods for each attribute.
 * @class
 */
export class SubProgramsData {
  constructor() {
    this.utils = Utils;
    this.arabicSubProgramName = null;
    this.englishSubProgramName = null;
    
    this.typeCode = null;
    this.regulationsPublishedDate = null;
    this.designResponsibleGovernance = [];
    this.executionResponsibleGovernance = [];
    this.GFS_Budget = null;
    this.conditionsOfAssistanceUnit = null;

    this.programFundingSourcesCode = null;
    this.relatedPastPrograms = [];
    this.subProgramRisks = [];
    this.requiresGrandfatheringAndGradualImplementation = true;

    this.assistanceUnitCode = null;
    this.conditionsAssistanceUnits = [];
    this.approach = null;
    this.benefitedSegments = [];
    this.geographicalTargeting = [];

    this.activationStartDate = null;
    this.activationEndDate = null;
    this.applicationEnablement = null;
    this.requireRegisterApplication = null;
    this.applicationChannelCodes = [];
    this.periodAfterExistCode = null;
    this.reApplyAfterExistCode = null; 
    
    this.viewapplicationEnablementPerm = null;
    this.viewEnablementStatus = null;
    this.viewApprovalStatus = null;
    this.viewActivationStatus = null;

     this.relatedStreamName = null;
    this.relatedBenefitName = null;
    this.relatedMainProgramName = null;
  }

  // Getter and Setter for Arabic Sub Program Name
  getArabicSubProgramName() {
    if (this.arabicSubProgramName == null) {
      this.arabicSubProgramName = global.testConfig.createSubPrograms.arabicSubProgramName + this.utils.generateRandomArabicString(5) + " " + "أوتو";
      // this.arabicSubProgramName = "برنامج فرعى تعليمي للديمو";
    }
    return this.arabicSubProgramName;
  }
  setArabicSubProgramName(value) {
    this.arabicSubProgramName = value;
  }

  // Getter and Setter for English Sub Program Name
  getEnglishSubProgramName() {
    if (this.englishSubProgramName == null) {
      this.englishSubProgramName =
        global.testConfig.createSubPrograms.englishSubProgramName +
        this.utils.generateRandomEnglishString(5) +
        " " +
        "Auto";
    }
    return this.englishSubProgramName;
  }
  setEnglishSubProgramName(value) {
    this.englishSubProgramName = value;
  }

  // Getter and Setter for Responsible Entity
  getGFSBudget() {
    if (this.GFS_Budget == null) {
      this.GFS_Budget = this.utils.generateRandomNumber(2) + " " + "Auto";
    }
    return this.GFS_Budget;
  }
  setGFSBudget(value) {
    this.GFS_Budget = value;
  }

  // Getter and Setter for Responsible Entity
  getConditionsOfAssistanceUnit() {
    if (this.conditionsOfAssistanceUnit == null) {
      this.conditionsOfAssistanceUnit =
        global.testConfig.createSubPrograms.conditionsOfAssistanceUnit +
        this.utils.generateRandomArabicString(5) +
        " " +
        "أوتو";
    }
    return this.conditionsOfAssistanceUnit;
  }
  setConditionsOfAssistanceUnit(value) {
    this.conditionsOfAssistanceUnit = value;
  }

  // Getter and Setter for Random subProgram ID
  getCreatedSubProgramId() {
    return this.programId;
  }
  setCreatedSubProgramId(value) {
    this.programId = value;
  }

//Seter and Getter for Meta Data for API Parameters 
  //MetaData
  getTypeCode() {
    if (this.typeCode == null) {
      this.typeCode =  global.testConfig.createSubPrograms.typeCode;
    }
    return this.typeCode;
  }
  setTypeCode(value) {
    this.typeCode = value;
  }
  getRegulationsPublishedDate() {
    if (this.regulationsPublishedDate == null) {
     this.regulationsPublishedDate =  global.testConfig.createSubPrograms.regulationsPublishedDate;
    }
    return this.regulationsPublishedDate;
  }
  setRegulationsPublishedDate(value) {
    this.regulationsPublishedDate = value;
  }
  getDesignResponsibleGovernance() {
    if (!this.designResponsibleGovernance ||this.designResponsibleGovernance.length === 0) {
      this.designResponsibleGovernance =  global.testConfig.createSubPrograms.designResponsibleGovernance;
     }
     return this.designResponsibleGovernance;
  }
  setDesignResponsibleGovernance(value) {
    this.designResponsibleGovernance = value;
  }
  getExecutionResponsibleGovernance() {
    if (!this.executionResponsibleGovernance ||this.executionResponsibleGovernance.length === 0) {
      this.executionResponsibleGovernance =  global.testConfig.createSubPrograms.executionResponsibleGovernance;
     }
    return this.executionResponsibleGovernance;
  }
  setExecutionResponsibleGovernance(value) {
    this.executionResponsibleGovernance = value;
  }
  getProgramFundingSourcesCode() {
    if (this.programFundingSourcesCode == null) {
      this.programFundingSourcesCode =  global.testConfig.createSubPrograms.programFundingSourcesCode;
     }
    return this.programFundingSourcesCode;
  }
  setProgramFundingSourcesCode(value) {
    this.programFundingSourcesCode = value;
  }
  getRelatedPastPrograms() {
    if (!this.relatedPastPrograms ||this.relatedPastPrograms.length === 0) {
      this.relatedPastPrograms =  global.testConfig.createSubPrograms.relatedPastPrograms;
     }
    return this.relatedPastPrograms;
  }
  setRelatedPastPrograms(value) {
    this.relatedPastPrograms = value;
  }
  getSubProgramRisks() {
    if (!this.subProgramRisks ||this.subProgramRisks.length === 0) {
      this.subProgramRisks =  global.testConfig.createSubPrograms.subProgramRisks;
     }
    return this.subProgramRisks;
  }
  setSubProgramRisks(value) {
    this.subProgramRisks = value;
  }
  getRequiresGrandfatheringAndGradualImplementation() {
    if (this.requiresGrandfatheringAndGradualImplementation == null) {
      this.requiresGrandfatheringAndGradualImplementation =  global.testConfig.createSubPrograms.requiresGrandfatheringAndGradualImplementation;
     }
    return this.requiresGrandfatheringAndGradualImplementation; 
   }
  setRequiresGrandfatheringAndGradualImplementation(value) {
    this.requiresGrandfatheringAndGradualImplementation = value;
  }
  //TargetData
  getAssistanceUnitCode() {
    if (this.assistanceUnitCode == null) {
      this.assistanceUnitCode =  global.testConfig.createSubPrograms.assistanceUnitCode;}
    return this.assistanceUnitCode;   
  }
  setAssistanceUnitCode(value) {
    this.assistanceUnitCode = value;
  }
  getConditionsAssistanceUnits() {
    if (!this.conditionsAssistanceUnits ||this.conditionsAssistanceUnits.length === 0) {
      this.conditionsAssistanceUnits =  global.testConfig.createSubPrograms.conditionsAssistanceUnits;}
    return this.conditionsAssistanceUnits;     
  }
  setConditionsAssistanceUnits(value) {
    this.conditionsAssistanceUnits = value;
  }
  getTargetApproach() {
    if (this.approach == null) {
      this.approach =  global.testConfig.createSubPrograms.approach;}
    return this.approach;   
  }
  setTargetApproach(value) {
    this.approach = value;
  }
  getBenefitedSegments() {
    if (!this.benefitedSegments ||this.benefitedSegments.length === 0) {
      this.benefitedSegments =  global.testConfig.createSubPrograms.benefitedSegments;
     }
    return this.benefitedSegments;
  }
  setBenefitedSegments(value) {
    this.benefitedSegments = value;
  }
  getGeographicalTargeting() {
    if (!this.geographicalTargeting ||this.geographicalTargeting.length === 0) {
      this.geographicalTargeting =  global.testConfig.createSubPrograms.geographicalTargeting;
     }
    return this.geographicalTargeting;
  }
  setGeographicalTargeting(value) {
    this.geographicalTargeting = value;
  }
  //FeaturesData
  getActivationStartDate() {
    if (this.activationStartDate == null) {
      this.activationStartDate =  global.testConfig.createSubPrograms.activationStartDate;
     }
    return this.activationStartDate;
  }
  setActivationStartDate(value) {
    this.activationStartDate = value;
  }
  getActivationEndDate() {
    if (this.activationEndDate == null) {
      this.activationEndDate =  global.testConfig.createSubPrograms.activationEndDate;
     }
    return this.activationEndDate;
  }
  setActivationEndDate(value) {
    this.activationEndDate = value;
  }
  getApplicationEnablement() {
    if (this.applicationEnablement == null) {
      this.applicationEnablement =  global.testConfig.createSubPrograms.applicationEnablementPerm;
     }
    return this.applicationEnablement;
  }
  setApplicationEnablement(value) {
    this.applicationEnablement = value;
  }
  getRequireRegisterApplication() {
    if (this.requireRegisterApplication == null) {
      this.requireRegisterApplication =  global.testConfig.createSubPrograms.requireRegisterApplication;
     }
    return this.requireRegisterApplication;
  }
  setRequireRegisterApplication(value) {
    this.requireRegisterApplication = value;
  }
  getApplicationChannelCodes() {
    if (!this.applicationChannelCodes ||this.applicationChannelCodes.length === 0) {
      this.applicationChannelCodes =  global.testConfig.createSubPrograms.applicationChannelCodes;
     }
    return this.applicationChannelCodes;
  }
  setApplicationChannelCodes(value) {
    this.applicationChannelCodes = value;
  }

  getPeriodAfterExistCode() {
    if (this.periodAfterExistCode == null) {
      this.periodAfterExistCode =  global.testConfig.createSubPrograms.periodAfterExistCode;
     }
    return this.periodAfterExistCode;
  }
  setPeriodAfterExistCode(value) {
    this.periodAfterExistCode = value;
  }
  getReApplyAfterExistCode() {
    if (this.reApplyAfterExistCode == null) {
      this.reApplyAfterExistCode =  global.testConfig.createSubPrograms.reApplyAfterExistCode;
     }
    return this.reApplyAfterExistCode;
  }
  setReApplyAfterExistCode(value) {
    this.reApplyAfterExistCode = value;
  }

  getViewEnablementStatus() {
    if (this.viewEnablementStatus == null) {
      this.viewEnablementStatus =  global.testConfig.createSubPrograms.viewEnablementStatus;
     }
    return this.viewEnablementStatus;
  }
  setViewEnablementStatus(value) {
    this.viewEnablementStatus = value;
  }

  getViewApprovalStatus() {
    if (this.viewApprovalStatus == null) {
      this.viewApprovalStatus =  global.testConfig.createSubPrograms.viewApprovalStatus;
     }
    return this.viewApprovalStatus;
  }
  setViewApprovalStatus(value) {
    this.viewApprovalStatus = value;
  }

  getViewActivationStatus() {
    if (this.viewActivationStatus == null) {
      this.viewActivationStatus =  global.testConfig.createSubPrograms.viewActivationStatus;
     }
    return this.viewActivationStatus;
  }
  setViewActivationStatus(value) {
    this.viewActivationStatus = value;
  }

  getViewapplicationEnablementPerm() {
    if (this.viewapplicationEnablementPerm == null) {
      this.viewapplicationEnablementPerm =  global.testConfig.createSubPrograms.viewapplicationEnablementPerm;
     }
    return this.viewapplicationEnablementPerm;
  }
  setViewapplicationEnablementPerm(value) {
    this.viewapplicationEnablementPerm = value;
  }


  ////values used in Applicant 

     getRelatedStreamName() {
        return this.relatedStreamName;
    }
    setRelatedStreamName(value) {
        this.relatedStreamName = value;
    }
       
     getRelatedBenefitName() {
        return this.relatedBenefitName;
    }
    setRelatedBenefitName(value) {
        this.relatedBenefitName = value;
    }
       
    getRelatedMainProgramName() {
        return this.relatedMainProgramName;
    }
    setRelatedMainProgramName(value) {
        this.relatedMainProgramName = value;
    }
       


    // toJSON Method
    toJSON(mainProgramID = null) {
      return {
        metadata: {
          nameAr: this.getArabicSubProgramName(),
          nameEn: this.getEnglishSubProgramName(),
          businessKey:null,
          programId: mainProgramID, // Add programId here
          typeCode: this.getTypeCode(),
          regulationsPublishedDate: this.getRegulationsPublishedDate(),
          programFundingSourcesCode: this.getProgramFundingSourcesCode(),
          budget:"رمز التكلفة",
          designResponsibleGovernance: this.getDesignResponsibleGovernance(),
          executionResponsibleGovernance: this.getExecutionResponsibleGovernance(),
          relatedPastPrograms: this.getRelatedPastPrograms(),
          subProgramRisks: this.getSubProgramRisks(),
          requiresGrandfatheringAndGradualImplementation: this.getRequiresGrandfatheringAndGradualImplementation()
        },        
        
        targetingData: {
          assistanceUnitCode: this.getAssistanceUnitCode(),
          conditionsAssistanceUnits: this.getConditionsAssistanceUnits(),
          approach: this.getTargetApproach(),
          benefitedSegments: this.getBenefitedSegments(),
          geographicalTargeting: this.getGeographicalTargeting()
        },
        programFeatures: {
          activationStartDate: this.getActivationStartDate(),
          activationEndDate: this.getActivationEndDate(),
          applicationEnablement: this.getApplicationEnablement(),
          requireRegisterApplication: this.getRequireRegisterApplication(),
          applicationChannelCodes:this.getApplicationChannelCodes(),
          // periodAfterExistCode: this.getPeriodAfterExistCode(),
          // reApplyAfterExistCode: this.getReApplyAfterExistCode(),
        },
      };
    }



}
