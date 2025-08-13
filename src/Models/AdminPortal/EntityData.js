const {Utils }= require('../../Utils/utils.js');

export class EntityData {

  constructor() {
    this.utils = Utils;
    this.entityName = null;
    this.entityNRN = null;
    this.entityTypeId = null;
    this.entityRoleIds = null;
    this.logoFile = null;  
    this.entitySerialNo = null;  
    this.entityTypeValue = null;
    this.simulationManagerRole = null;
    this.programOwnerRole = null;
  }

// Getter and Setter for EntityArabicName
    getEntityName() {
        if (this.entityName == null) {
            this.entityName =global.testConfig.createEntity.entityName +" " + this.utils.generateRandomArabicString(5)+" "+"أوتو";
            }
            return this.entityName;
        }
    setEntityName(value) {
            this.entityName = value;
        }

// Getter and Setter for The national registry number for entities
    getEntityNRN() {
    if (this.entityNRN == null) {
        var randomDigits = this.utils.generateRandomNumber(7);
        this.entityNRN = "700" + randomDigits;
        }
        return this.entityNRN;
    }
    setEntityNRN(value) {
        this.entityNRN = value;
    }

    getEntityTypeId() {
      if (this.entityTypeId == null) {
        this.entityTypeId = global.testConfig.createEntity.typeId;
      }
      return this.entityTypeId;
    }
    setEntityTypeId(value) {
      this.entityTypeId = value;
    }

    // Entity Role IDs
    getEntityRoleIds() {
      if (this.entityRoleIds == null) {
        this.entityRoleIds = global.testConfig.createEntity.entityRoleIds;
      }
      return this.entityRoleIds;
    }
    setEntityRoleIds(value) {
      this.entityRoleIds = value;
    }

      // Logo File ID
      getLogoFile() {
        if (this.logoFile == null) {
          this.logoFile = global.testConfig.createEntity.logoFileId;
        }
        return this.logoFile;
      }
      setLogoFile(value) {
        this.logoFile = value;
      }

      // Getter and Setter for Stream ID Number
    getCreatedEntitySerialNo() {
        return this.entitySerialNo;
    }

    // Setter for streamId
    setCreatedEntitySerialNo(Value) {
        this.entitySerialNo = Value;
    }

      // Entity Type Value
      getentityTypeValue() {
        if (this.entityTypeValue == null) {
          this.entityTypeValue = global.testConfig.createEntity.entityType;
        }
        return this.entityTypeValue;
      }
      setentityTypeValue(value) {
        this.entityTypeValue = value;
      }

      // Simulation Manager Role
      getsimulationManagerRole() {
        if (this.simulationManagerRole == null) {
          this.simulationManagerRole = global.testConfig.createEntity.entityRoleSimulationModelsManager;
        }
        return this.simulationManagerRole;
      }
      setsimulationManagerRole(value) {
        this.simulationManagerRole = value;
      }

      // Program Owner Role
      getprogramOwnerRole() {
        if (this.programOwnerRole == null) {
          this.programOwnerRole = global.testConfig.createEntity.entityRoleProgramOwner;
        }
        return this.programOwnerRole;
      }
      setprogramOwnerRole(value) {
        this.programOwnerRole = value;
      }


    
 toJSON() {
    return {
      name: this.getEntityName(),
      typeId: this.getEntityTypeId(),
      entityRoleIds: this.getEntityRoleIds(),
      logoFileId: this.getLogoFile(),
      nationalNumber: this.getEntityNRN()
    };
  }

}

module.exports = { EntityData };