import Constants from '../../Utils/Constants.js';

const {Utils }= require('../../Utils/utils.js');

export class SubDomainData {

    constructor() {
      this.utils = Utils;
      this.subDomainArabicName=[];
      this.subDomainEnglishName=[];
      this.acceptChildType= null;
      this.assignedDomain= null;
      this.subDomainDescription= null;
      this.file= null;
    }

 // Getter and Setter for subDomainArabicName
 getsubDomainArabicName() {
      return  this.subDomainArabicName;
    }
setsubDomainArabicName(numberOfNames){
     if (typeof numberOfNames == "number" && numberOfNames > 0) {
       // this.subDomainArabicName = []; // Clear the array before adding new values
        for (let i = 0; i < numberOfNames; i++){
          const randomName = global.testConfig.createSubDomain.subDomainArabicName + " " + this.utils.generateRandomArabicString(5) + " أوتو";
          this.subDomainArabicName.push(randomName);
        }
      } else {
        console.error("Invalid input: numberOfNames must be a positive number.");
      }
    }

    // Getter and Setter for subDomainEnglishName
 getsubDomainEnglishName() {
    return this.subDomainEnglishName;
    }
setsubDomainEnglishName(numberOfNames) {
     if (typeof numberOfNames == "number" && numberOfNames > 0) {
      // this.subDomainArabicName = []; // Clear the array before adding new values
       for (let i = 0; i < numberOfNames; i++){
         const randomName = global.testConfig.createSubDomain.subDomainEnglishName + " " + this.utils.generateRandomEnglishString(5) + " Auto";
         this.subDomainEnglishName.push(randomName);
       }
     } else {
       console.error("Invalid input: numberOfNames must be a positive number.");
     }
    }

    // Getter and Setter for assignedDomain
 getassignedDomain() {
    if (this.assignedDomain == null) {
        this.assignedDomain =global.testConfig.createSubDomain.assignedDomainParent;
    }
    return this.assignedDomain;
    }
setassignedDomain(value) {
      this.assignedDomain = value;
    }

// Getter and Setter for acceptChildType
getacceptChildType() {
    if (this.acceptChildType == null) {
        this.acceptChildType =Constants.SUBDOMAINTYPE;
    }
    return this.acceptChildType;
    }
setacceptChildType(value) {
      this.acceptChildType = value;
    }


// Getter and Setter for subDomainDescription
getsubDomainDescription() {
    if (this.subDomainDescription == null) {
        this.subDomainDescription =global.testConfig.createSubDomain.subDomainDescription;
    }
    return this.subDomainDescription;
    }
setsubDomainDescription(value) {
      this.subDomainDescription = value;
    }

   // Getter and Setter for file
getfile() {
    if (this.file == null) {
        this.file =global.testConfig.createSubDomain.subDomainFile;
    }
    return this.file;
    }
setfile(value) {
      this.file = value;
    } 

}
  