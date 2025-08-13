const { Utils } = require("../../Utils/utils.js");

/**
 * Represents and manages data related to main programs, including names, descriptions,
 * risks, and goals. Provides getter and setter methods for each attribute.
 * @class
 */ export class MainProgramData {
   constructor() {
     this.utils = Utils;
     this.arabicMainProgramName = null;
     this.englishMainProgramName = null;
     this.responsibleEntity = null;
     this.responsibleId = null;
     this.arabicMainProgramDescription = null;
     this.englishMainProgramDescription = null;
     this.year = null;
     this.yearId = null;
     this.estimatedBudget = null;
     this.calculationMethod = null;
     this.calculationMethodAPI = null;
     this.riskCategory = null;
     this.riskCategoryAPI = null;
     this.risks = null;
     this.risksAPI = null;
     this.riskArabicDescription = null;
     this.riskEnglishDescription = null;
     this.arabicMainProgramGoal = null;
     this.englishMainProgramGoal = null;

    this.relatedStreamName = null;
    this.relatedBenefitName = null;
    this.relatedSubProgramName = null;
   }

   // Getter and Setter for Arabic Main Program Name
   getArabicMainProgramName() {
     if (this.arabicMainProgramName == null) {
       this.arabicMainProgramName = global.testConfig.createMainProgram.arabicMainProgramName + this.utils.generateRandomArabicString(5) + " " + "أوتو";
      //  this.arabicMainProgramName = "برنامج رئيسي تعليمى للديمو";
     }
     return this.arabicMainProgramName;
   }
   setArabicMainProgramName(value) {
     this.arabicMainProgramName = value;
   }

   // Getter and Setter for English Main Program Name
   getEnglishMainProgramName() {
     if (this.englishMainProgramName == null) {
       this.englishMainProgramName =
         global.testConfig.createMainProgram.englishMainProgramName +
         this.utils.generateRandomEnglishString(5) +
         " " +
         "Auto";
     }
     return this.englishMainProgramName;
   }
   setEnglishMainProgramName(value) {
     this.englishMainProgramName = value;
   }

   // Getter and Setter for Responsible Entity
   getResponsibleEntity() {
     if (this.responsibleEntity == null) {
       this.responsibleEntity =
         global.testConfig.createMainProgram.responsibleEntity;
     }
     return this.responsibleEntity;
   }
   setResponsibleEntity(value) {
     this.responsibleEntity = value;
   }

   // Getter and Setter for Arabic Main Program Description
   getArabicMainProgramDescription() {
     if (this.arabicMainProgramDescription == null) {
       this.arabicMainProgramDescription =
         global.testConfig.createMainProgram.arabicMainProgramDescription +
         this.utils.generateRandomArabicString(10);
     }
     return this.arabicMainProgramDescription;
   }
   setArabicMainProgramDescription(value) {
     this.arabicMainProgramDescription = value;
   }

   // Getter and Setter for English Main Program Description
   getEnglishMainProgramDescription() {
     if (this.englishMainProgramDescription == null) {
       this.englishMainProgramDescription =
         global.testConfig.createMainProgram.englishMainProgramDescription +
         this.utils.generateRandomEnglishString(10);
     }
     return this.englishMainProgramDescription;
   }
   setEnglishMainProgramDescription(value) {
     this.englishMainProgramDescription = value;
   }

   // Getter and Setter for Calculation Method
   getCalculationMethod() {
     if (this.calculationMethod == null) {
       this.calculationMethod =
         global.testConfig.createMainProgram.calculationMethod +
         this.utils.generateRandomArabicString(10);
     }
     return this.calculationMethod;
   }
   setCalculationMethod(value) {
     this.calculationMethod = value;
   }

   // Getter and Setter for Year
   getYear() {
     if (this.year == null) {
       this.year = global.testConfig.createMainProgram.year;
     }
     return this.year;
   }
   setYear(value) {
     this.year = value;
   }

   // Getter and Setter for Estimated Budget
   getEstimatedBudget() {
     if (this.estimatedBudget == null) {
       this.estimatedBudget =
         global.testConfig.createMainProgram.estimatedBudget +
         this.utils.generateRandomArabicString(5);
     }
     return this.estimatedBudget;
   }
   setEstimatedBudget(value) {
     this.estimatedBudget = value;
   }

   // Getter and Setter for Risk Category
   getRiskCategory() {
     if (this.riskCategory == null) {
       this.riskCategory = global.testConfig.createMainProgram.riskCategory;
     }
     return this.riskCategory;
   }
   setRiskCategory(value) {
     this.riskCategory = value;
   }

   // Getter and Setter for Risks
   getRisks() {
     if (this.risks == null) {
       this.risks = global.testConfig.createMainProgram.risks;
     }
     return this.risks;
   }
   setRisks(value) {
     this.risks = value;
   }

   // Getter and Setter for Risk Arabic Description
   getRiskArabicDescription() {
     if (this.riskArabicDescription == null) {
       this.riskArabicDescription =
         global.testConfig.createMainProgram.riskArabicDescription +
         this.utils.generateRandomArabicString(10);
     }
     return this.riskArabicDescription;
   }
   setRiskArabicDescription(value) {
     this.riskArabicDescription = value;
   }

   // Getter and Setter for Risk English Description
   getRiskEnglishDescription() {
     if (this.riskEnglishDescription == null) {
       this.riskEnglishDescription =
         global.testConfig.createMainProgram.riskEnglishDescription +
         this.utils.generateRandomEnglishString(10);
     }
     return this.riskEnglishDescription;
   }
   setRiskEnglishDescription(value) {
     this.riskEnglishDescription = value;
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
   }

   // Getter and Setter for English Main Program Goal
   getEnglishMainProgramGoal() {
     if (this.englishMainProgramGoal == null) {
       this.englishMainProgramGoal =
         global.testConfig.createMainProgram.englishMainProgramGoal +
         this.utils.generateRandomEnglishString(8);
     }
     return this.englishMainProgramGoal;
   }
   setEnglishMainProgramGoal(value) {
     this.englishMainProgramGoal = value;
   }

   // Getter and Setter for Random Program ID
   getCreatedMainProgramId() {
     return this.programId;
   }
   setCreatedMainProgramId(value) {
     this.programId = value;
   }


   //Getter and Setter for API
  getRiskCategoryAPI() {
    if (this.riskCategoryAPI == null) {
      this.riskCategoryAPI = global.testConfig.createMainProgram.riskCategoryAPIChildhood;
    }
    return this.riskCategoryAPI;
  }
  setRiskCategoryAPI(value) {
    this.riskCategoryAPI = value;
  }

  // Getter and Setter for Risks
  getRisksAPI() {
    if (this.risksAPI == null) {
      this.risksAPI = global.testConfig.createMainProgram.risksAPI;
    }
    return this.risksAPI;
  }
  setRisksAPI(value) {
    this.risksAPI = value;
  }

     // Getter and Setter for Calculation Method
     getcalculationMethodAPI() {
      if (this.calculationMethodAPI == null) {
        this.calculationMethodAPI =global.testConfig.createMainProgram.calculationMethodAPI ;
      }
      return this.calculationMethodAPI;
    }
    setcalculationMethodAPI(value) {
      this.calculationMethodAPI = value;
    }
 
    // Getter and Setter for Year
    getYearId() {
      if (this.yearId == null) {
        this.yearId = global.testConfig.createMainProgram.yearId;
      }
      return this.yearId;
    }
    setYearId(value) {
      this.yearId = value;
    }
 
 // Getter and Setter for Responsible Entity
 getResponsibleId() {
  if (this.responsibleId == null) {
    this.responsibleId =
      global.testConfig.createMainProgram.responsibleId;
  }
  return this.responsibleId;
}
setResponsibleEntity(value) {
  this.responsibleId = value;
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
       
    getRelatedSubProgramName() {
        return this.relatedSubProgramName;
    }
    setRelatedSubProgramName(value) {
        this.relatedSubProgramName = value;
    }
       


   toJSON() {
     return {
       nameAr: this.getArabicMainProgramName(),
       nameEn: this.getEnglishMainProgramName(),
       responsibleId: this.getResponsibleId(),
       descriptionAr: this.getArabicMainProgramDescription(),
       descriptionEn: this.getEnglishMainProgramDescription(),
       calculationMethod: this.getcalculationMethodAPI(),
       estimatedBudgets: [
         {
           yearId: this.getYearId(),
           estimatedBudget: this.getEstimatedBudget(),
         },
       ],
       programGoals: [
         {
           nameAr: this.getArabicMainProgramGoal(),
           nameEn: this.getEnglishMainProgramGoal(),
         },
       ],
       targetedRiskCoverages: [
         {
           riskCategoryId: this.getRiskCategoryAPI(),
           risks: [
             {
               riskId: this.getRisksAPI(),
               descriptionEn: this.getRiskEnglishDescription(),
               descriptionAr: this.getRiskArabicDescription(),
             },
           ],
         },
       ],
     };
   }
 }
