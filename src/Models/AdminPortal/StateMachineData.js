const { Utils } = require('../../Utils/utils.js');

export class StateMachineData {

    constructor() {
        this.utils = Utils;
        this.stateManagmentArabicName = null;
        this.stateManagmentEnglishName = null;
        this.stateManagmentArabicDescription = null;
        this.stateManagmentEnglishDescription = null;
        this.firstStateArabicName = null;
        this.firstStateEnglishName = null;
        this.secondStateArabicName = null;
        this.secondStateEnglishName = null;
        this.actionArabicName = null;
        this.actionEnglishName = null;
        this.stateMachineId = null;
    }

    // Getter and Setter for State Managment Arabic Name
    getStateManagmentArabicName() {
        if (this.stateManagmentArabicName == null) {
            this.stateManagmentArabicName = global.testConfig.stateMachine.stateManagmentArabicName + this.utils.generateRandomArabicString(4) + " " + "أوتو";
        }
        return this.stateManagmentArabicName;
    }
    setStateManagmentArabicName(value) {
        this.stateManagmentArabicName = value;
    }

    // Getter and Setter for State Managment English Name
    getStateManagmentEnglishName() {
        if (this.stateManagmentEnglishName == null) {
            this.stateManagmentEnglishName = global.testConfig.stateMachine.stateManagmentEnglishName  + " " +this.utils.generateRandomEnglishString(4) + " " + "Auto";
        }
        return this.stateManagmentEnglishName;
    }
    setStateManagmentEnglishName(value) {
        this.stateManagmentEnglishName = value;
    }

    // Getter and Setter for state Managment Arabic Description
    getStateManagmentArabicDescription() {
        if (this.stateManagmentArabicDescription == null) {
            this.stateManagmentArabicDescription = global.testConfig.stateMachine.stateManagmentArabicDescription + " " + this.utils.generateRandomArabicString(3) + " " + "أوتو";
        }
        return this.stateManagmentArabicDescription;
    }
    setStateManagmentArabicDescription(value) {
        this.stateManagmentArabicDescription = value;
    }

    // Getter and Setter for State Managment English Description
    getStateManagmentEnglishDescription() {
        if (this.stateManagmentEnglishDescription == null) {
            this.stateManagmentEnglishDescription = global.testConfig.stateMachine.stateManagmentEnglishDescription + " " + this.utils.generateRandomEnglishString(3) + " " + "Auto";
        }
        return this.stateManagmentEnglishDescription;
    }
    setStateManagmentEnglishDescription(value) {
        this.stateManagmentEnglishDescription = value;
    }

    // Getter and Setter for First State Arabic Name
    getFirstStateArabicName() {
        if (this.firstStateArabicName == null) {
            this.firstStateArabicName = global.testConfig.stateMachine.firstStateArabicName + " " + this.utils.generateRandomArabicString(3) + " " + "أوتو";
        }
        return this.firstStateArabicName;
    }
    setFirstStateArabicName(value) {
        this.firstStateArabicName = value;
    }

    // Getter and Setter for First State English Name
    getFirstStateEnglishName() {
        if (this.firstStateEnglishName == null) {
            this.firstStateEnglishName = global.testConfig.stateMachine.firstStateEnglishName + " " + this.utils.generateRandomEnglishString(3) + " " + "Auto";
        }
        return this.firstStateEnglishName;
    }
    setFirstStateEnglishName(value) {
        this.firstStateEnglishName = value;
    }

    // Getter and Setter for Second State Arabic Name
    getSecondStateArabicName() {
        if (this.secondStateArabicName == null) {
            this.secondStateArabicName = global.testConfig.stateMachine.secondStateArabicName + " " + this.utils.generateRandomArabicString(3) + " " + "أوتو";
        }
        return this.secondStateArabicName;
    }
    setSecondStateArabicName(value) {
        this.secondStateArabicName = value;
    }

    // Getter and Setter for Second State English Name
    getSecondStateEnglishName() {
        if (this.secondStateEnglishName == null) {
            this.secondStateEnglishName = global.testConfig.stateMachine.secondStateEnglishName + " " + this.utils.generateRandomEnglishString(3) + " " + "Auto";
        }
        return this.secondStateEnglishName;
    }
    setSecondStateEnglishName(value) {
        this.secondStateEnglishName = value;
    }

    // Getter and Setter for Action Arabic Name
    getActionArabicName() {
        if (this.actionArabicName == null) {
            this.actionArabicName = global.testConfig.stateMachine.actionArabicName + " " + this.utils.generateRandomArabicString(1) + " " + "أوتو";
        }
        return this.actionArabicName;
    }
    setActionArabicName(value) {
        this.actionArabicName = value;
    }

    // Getter and Setter for Action English Name
    getActionEnglishName() {
        if (this.actionEnglishName == null) {
            this.actionEnglishName = global.testConfig.stateMachine.actionEnglishName + " " + this.utils.generateRandomEnglishString(1) + " " + "Auto";
        }
        return this.actionEnglishName;
    }
    setActionEnglishName(value) {
        this.actionEnglishName = value;
    }

    
    // Getter and Setter for State Machine ID Number
    getCreatedStateMachineId() {
        return this.stateMachineId;
    }

    // Setter for State Machine ID Number
    setCreatedStateMachineId(Value) {
        this.stateMachineId = Value;
    }
}

module.exports = { StateMachineData };