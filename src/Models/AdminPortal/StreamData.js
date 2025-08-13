const {Utils }= require('../../Utils/utils.js');

export class StreamData {

  constructor() {
    this.utils = Utils;
    this.streamArabicName = null;
    this.streamEnglishName = null;
    this.streamArabicDescription = null;
    this.streamEnglishDescription = null;
    this.arabicStreamGoal = null;
    this.englishStreamGoal = null;
    this.arabicGoal = null;
    this.englishGoal = null;
    this.streamId = null;
    this.streamNumber = null;

    this.relatedMainProramName = null;
    this.relatedBenefitName = null;
    this.relatedSubProgramName = null;

  }

  // Getter and Setter for streamArabicName
  getstreamArabicName() {
      if (this.streamArabicName == null) {
          this.streamArabicName = global.testConfig.createStream.streamArabicName +" "+ this.utils.generateRandomArabicString(5)+" "+"أوتو";
        //   this.streamArabicName ="مسار تعليمى للديمو";
      }
      return this.streamArabicName;
      }
  setstreamArabicName(value) {
        this.streamArabicName = value;
      }

    // Getter and Setter for streamEnglishName
    getstreamEnglishName() {
        if (this.streamEnglishName == null) {
            this.streamEnglishName =global.testConfig.createStream.streamEnglishName +" "+ this.utils.generateRandomEnglishString(5)+" "+"Auto";
        }
        return this.streamEnglishName;
        }
    setstreamEnglishName(value) {
        this.streamEnglishName = value;
        }

     // Getter and Setter for streamArabicDescription
     getstreamArabicDescription() {
        if (this.streamArabicDescription == null) {
            this.streamArabicDescription = global.testConfig.createStream.streamArabicDescription + this.utils.generateRandomArabicString(10);
        }
        return this.streamArabicDescription;
        }
    setstreamArabicDescription(value) {
        this.streamArabicDescription = value;
        }

  // Getter and Setter for streamEnglishDescription
  getstreamEnglishDescription() {
      if (this.streamEnglishDescription == null) {
          this.streamEnglishDescription = global.testConfig.createStream.streamEnglishDescription + this.utils.generateRandomEnglishString(10);
      }
      return this.streamEnglishDescription;
      }
  setstreamEnglishDescription(value) {
      this.streamEnglishDescription = value;
      }

  // Getter and Setter for arabicStreamGoal
    getarabicStreamGoal() {
        if (this.arabicStreamGoal == null) {
            this.arabicStreamGoal = global.testConfig.createStream.arabicStreamGoal + this.utils.generateRandomArabicString(8);
        }
        return this.arabicStreamGoal;
       }
    setarabicStreamGoal(value) {
        this.arabicStreamGoal =value;
       }

    // Getter and Setter for englishStreamGoal
    getenglishStreamGoal() {
        if (this.englishStreamGoal == null) {
            this.englishStreamGoal = global.testConfig.createStream.englishStreamGoal  + this.utils.generateRandomEnglishString(8);
        }
        return this.englishStreamGoal;
        }
    setenglishStreamGoal(value) {
        this.englishStreamGoal = value;
        }

    // Getter and Setter for arabicGoal
    getarabicGoal() {
        if (this.arabicGoal == null) {
            this.arabicGoal = global.testConfig.createStream.arabicGoal  + this.utils.generateRandomArabicString(6);
        }
        return this.arabicGoal;
        }
    setarabicGoal(value) {
        this.arabicGoal = value;
        }

  // Getter and Setter for englishGoal
  getenglishGoal() {
      if (this.englishGoal == null) {
          this.englishGoal = global.testConfig.createStream.englishGoal + this.utils.generateRandomEnglishString(6);
      }
      return this.englishGoal;
      }
  setenglishGoal(value) {
      this.englishGoal = value;
      }


// Getter and Setter for Stream ID Number
    getCreatedStreamId() {
        return this.streamId;
    }

    // Setter for streamId
    setCreatedStreamId(Value) {
        this.streamId = Value;
    }


    ////values used in Applicant 

     getRelatedMainProgramName() {
        return this.relatedMainProramName;
    }
    setRelatedMainProgramName(value) {
        this.relatedMainProramName = value;
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
       

// Getter and Setter for Random Number

  getStreamNumber() {
    if (this.englishGoal == null) {
      this.streamNumber = this.utils.generateRandomNumber(5);
    }
    return this.streamNumber;
    }
  setStreamNumber(value) {
    this.streamNumber = value;
    }
    
  toJSON() {
    return JSON.stringify({
        "nameAr": this.getstreamArabicName(),
        "nameEn": this.getstreamEnglishName(),
        "arabicDescription":  this.getstreamArabicDescription(),
        "englishDescription":  this.getstreamEnglishDescription(),
        "goalEn":  this.getenglishGoal(),
        "goalAr":  this.getarabicGoal(),
        "streamGoals": [{
            "nameAr": this.getarabicStreamGoal(),
            "nameEn":  this.getenglishStreamGoal() 
            }]
    });
  }

}

module.exports = { StreamData };