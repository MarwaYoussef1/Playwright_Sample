const { Utils } = require("../../Utils/utils.js");

export class SimulationModelData {
  constructor() {
    this.utils = Utils;
    //tab1
    this.simulationModelArName = null;
    this.simulationModelEnName = null;
    this.simulationModelDescription = null;
    this.simulationModelEditedArName = null;
    this.simulationModelEditedEnName = null;
    this.simulationModelEditedDescription = null;
    this.variableOneArName = null;
    this.variableOneEnName = null;
    this.variableOneDescription = null;
    this.defaultValueOne = null;

    this.variableTwoArName = null;
    this.variableTwoEnName = null;
    this.variableTwoDescription = null;
    this.defaultValueTwo = null;

    this.variableThreeArName = null;
    this.variableThreeEnName = null;
    this.variableThreeDescription = null;
    this.simulationModelId = null;
    this.simulationModelEditedId = null;

    this.variableFourArName = null;
    this.variableFourEnName = null;
    this.defaultValueOneEdited = null;

    this.executionNumber = null;

    //API
    this.simulationModelDraftId = null;
    this.decisionModelAttachmentId = null;
    this.ruleSetAttachmentId = null;
    this.fileDataSourceAttachmentsId = null;
  }

  // Getter and Setter for Simulation Model Arabic Name
  getSimulationModelArName() {
    if (this.simulationModelArName == null) {
      this.simulationModelArName =
        global.testConfig.SimulationModels.simulationModelArName +
        this.utils.generateRandomArabicString(3) +
        " " +
        "أوتو";
    }
    return this.simulationModelArName;
  }
  setSimulationModelArName(value) {
    this.simulationModelArName = value;
  }

  // Getter and Setter for Simulation Model English Name
  getSimulationModelEnName() {
    if (this.simulationModelEnName == null) {
      this.simulationModelEnName =
        global.testConfig.SimulationModels.simulationModelEnName +
        " " +
        this.utils.generateRandomEnglishString(3) +
        " " +
        "Auto";
    }
    return this.simulationModelEnName;
  }
  setSimulationModelEnName(value) {
    this.simulationModelEnName = value;
  }

  // Getter and Setter for Simulation Model Description
  getSimulationModelDescription() {
    if (this.simulationModelDescription == null) {
      this.simulationModelDescription =
        global.testConfig.SimulationModels.simulationModelDescription +
        " " +
        this.utils.generateRandomArabicString(3) +
        " " +
        "أوتو";
    }
    return this.simulationModelDescription;
  }
  setSimulationModelDescription(value) {
    this.simulationModelDescription = value;
  }

  // Getter and Setter for Edited Simulation Model Arabic Name
  getEditedSimulationModelArName() {
    if (this.simulationModelEditedArName == null) {
      this.simulationModelEditedArName =
        global.testConfig.SimulationModels.simulationModelArName +
        this.utils.generateRandomArabicString(3) +
        " " +
        "أوتو";
    }
    return this.simulationModelEditedArName;
  }
  setEditedSimulationModelArName(value) {
    this.simulationModelEditedArName = value;
  }

  // Getter and Setter for Edited Simulation Model English Name
  getEditedSimulationModelEnName() {
    if (this.simulationModelEditedEnName == null) {
      this.simulationModelEditedEnName =
        global.testConfig.SimulationModels.simulationModelEnName +
        " " +
        this.utils.generateRandomEnglishString(3) +
        " " +
        "Auto";
    }
    return this.simulationModelEditedEnName;
  }
  setEditedSimulationModelEnName(value) {
    this.simulationModelEditedEnName = value;
  }

  // Getter and Setter for Edited Simulation Model Description
  getEditedSimulationModelDescription() {
    if (this.simulationModelEditedDescription == null) {
      this.simulationModelEditedDescription =
        global.testConfig.SimulationModels.simulationModelDescription +
        " " +
        this.utils.generateRandomArabicString(3) +
        " " +
        "أوتو";
    }
    return this.simulationModelEditedDescription;
  }
  setEditedSimulationModelDescription(value) {
    this.simulationModelEditedDescription = value;
  }

  // Getter and Setter for variable Arabic Name
  getVariableOneArName() {
    if (this.variableOneArName == null) {
      this.variableOneArName =
        global.testConfig.SimulationModels.variableOneArName;
    }
    return this.variableOneArName;
  }
  setVariableOneArName(value) {
    this.variableOneArName = value;
  }
  getVariableTwoArName() {
    if (this.variableTwoArName == null) {
      this.variableTwoArName =
        global.testConfig.SimulationModels.variableTwoArName;
    }
    return this.variableTwoArName;
  }
  setVariableTwoArName(value) {
    this.variableTwoArName = value;
  }
  getVariableThreeArName() {
    if (this.variableThreeArName == null) {
      this.variableThreeArName =
        global.testConfig.SimulationModels.variableThreeArName;
    }
    return this.variableThreeArName;
  }
  setVariableThreeArName(value) {
    this.variableThreeArName = value;
  }

  getVariableFourArName() {
    if (this.variableFourArName == null) {
      this.variableFourArName =
        global.testConfig.SimulationModels.variableFourArName;
    }
    return this.variableFourArName;
  }
  setVariableFourArName(value) {
    this.variableFourArName = value;
  }

  // Getter and Setter for variable English Name
  getVariableOneEnName() {
    if (this.variableOneEnName == null) {
      this.variableOneEnName =
        global.testConfig.SimulationModels.variableOneEnName;
    }
    return this.variableOneEnName;
  }
  setVariableOneEnName(value) {
    this.variableOneEnName = value;
  }
  getVariableTwoEnName() {
    if (this.variableTwoEnName == null) {
      this.variableTwoEnName =
        global.testConfig.SimulationModels.variableTwoEnName;
    }
    return this.variableTwoEnName;
  }
  setVariableTwoEnName(value) {
    this.variableTwoEnName = value;
  }
  getVariableThreeEnName() {
    if (this.variableThreeEnName == null) {
      this.variableThreeEnName =
        global.testConfig.SimulationModels.variableThreeEnName;
    }
    return this.variableThreeEnName;
  }
  setVariableThreeEnName(value) {
    this.variableThreeEnName = value;
  }
  getVariableFourEnName() {
    if (this.variableFourEnName == null) {
      this.variableFourEnName =
        global.testConfig.SimulationModels.variableFourEnName;
    }
    return this.variableFourEnName;
  }
  setVariableFourEnName(value) {
    this.variableFourEnName = value;
  }

  // Getter and Setter for variable Description
  getVariableOneDescription() {
    if (this.variableOneDescription == null) {
      this.variableOneDescription =
        global.testConfig.SimulationModels.variableOneDescription +
        " " +
        this.utils.generateRandomArabicString(3) +
        " " +
        "أوتو";
    }
    return this.variableOneDescription;
  }
  setVariableOneDescription(value) {
    this.variableOneDescription = value;
  }
  getVariableTwoDescription() {
    if (this.variableTwoDescription == null) {
      this.variableTwoDescription =
        global.testConfig.SimulationModels.variableTwoDescription +
        " " +
        this.utils.generateRandomArabicString(3) +
        " " +
        "أوتو";
    }
    return this.variableTwoDescription;
  }
  setVariableTwoDescription(value) {
    this.variableTwoDescription = value;
  }
  getVariableThreeDescription() {
    if (this.variableThreeDescription == null) {
      this.variableThreeDescription =
        global.testConfig.SimulationModels.variableThreeDescription +
        " " +
        this.utils.generateRandomArabicString(3) +
        " " +
        "أوتو";
    }
    return this.variableThreeDescription;
  }
  setVariableThreeDescription(value) {
    this.variableThreeDescription = value;
  }

  // Getter and Setter for default Value
  getDefaultValueOne() {
    if (this.defaultValueOne == null) {
      this.defaultValueOne =
        global.testConfig.SimulationModels.defaultValueText;
    }
    return this.defaultValueOne;
  }
  setDefaultValueOne(value) {
    this.defaultValueOne = value;
  }
  getDefaultValueTwo() {
    if (this.defaultValueTwo == null) {
      this.defaultValueTwo =
        global.testConfig.SimulationModels.defaultValueNumeric;
    }
    return this.defaultValueTwo;
  }
  setDefaultValueTwo(value) {
    this.defaultValueTwo = value;
  }

  // Getter and Setter for Simulation Model ID Number
  getCreatedSimulationModelId() {
    return this.simulationModelId;
  }

  setCreatedSimulationModelId(Value) {
    this.simulationModelId = Value;
  }
  // Getter and Setter for Simulation Model Edited ID Number
  getCreatedSimulationModelEditedId() {
    return this.simulationModelEditedId;
  }

  setCreatedSimulationModelEditedId(Value) {
    this.simulationModelEditedId = Value;
  }

  // Getter and Setter for Simulation Model Execution Number
  getSimulationModelExecutionNumber() {
    return this.executionNumber;
  }

  setSimulationModelExecutionNumber(Value) {
    this.executionNumber = Value;
  }

  // Getter and Setter for default Value Edited
  getSimulationModelDefaultValueOneEdited() {
    if (this.defaultValueOneEdited == null) {
      this.defaultValueOneEdited = global.testConfig.SimulationModels.defaultValueEditedText;
    }
    return this.defaultValueOneEdited;
  }
  setSimulationModelDefaultValueOneEdited(value) {
    this.defaultValueOneEdited = value;
  }


  //API setters & getters
  // Getter and Setter for Simulation Model  Draft ID Number
  getCreatedSimulationModelDraftId() {
    return this.simulationModelDraftId;
  }

  setCreatedSimulationModelDraftId(Value) {
    this.simulationModelDraftId = Value;
  }

  // Getter and Setter for Simulation Model  decisionModelAttachment ID
  getDecisionModelAttachmentId() {
    return this.decisionModelAttachmentId;
  }

  setDecisionModelAttachmentId(Value) {
    this.decisionModelAttachmentId = Value;
  }

  // Getter and Setter for Simulation Model  ruleSetAttachments ID
  getRuleSetAttachmentId() {
    return this.ruleSetAttachmentId;
  }

  setRuleSetAttachmentId(Value) {
    this.ruleSetAttachmentId = Value;
  }

  // Getter and Setter for Simulation Model  ruleSetAttachments ID
  getFileDataSourceAttachmentsId() {
    return this.fileDataSourceAttachmentsId;
  }

  setFileDataSourceAttachmentsId(Value) {
    this.fileDataSourceAttachmentsId = Value;
  }

  toDraftJSON() {
    return {
      type: "ELIGIBILITY",
      nameAr: this.getSimulationModelArName(),
      nameEn: this.getSimulationModelEnName(),
      data: {
        modelData: {
          nameAr: this.getSimulationModelArName(),
          nameEn: this.getSimulationModelEnName(),
          beneficiaryParty:
            global.testConfig.SimulationModels.APIbeneficiaryParty,
          description: "",
          fileDescription: "",
          modelDataFile: [
            {
              fileName: global.testConfig.SimulationModels.simulationModelPDF,
              fileSize:
                global.testConfig.SimulationModels.APIsimulationModelPDFSize,
              fileId: this.getDecisionModelAttachmentId(),
              fileType: "application/pdf",
              description: "",
              id: "0",
            },
          ],
        },
      },
    };
  }

  toJSON() {
    return {
      draftId: this.getCreatedSimulationModelDraftId(),
      decisionModelVersionDto: {
        beneficiaryParty:
          global.testConfig.SimulationModels.APIbeneficiaryParty,
        description: null,
        decisionModelAttachments: [
          {
            fileName: global.testConfig.SimulationModels.simulationModelPDF,
            fileSize:
              global.testConfig.SimulationModels.APIsimulationModelPDFSize,
            fileId: this.getDecisionModelAttachmentId(),
            fileType: "application/pdf",
            description: null,
          },
        ],
        dataSources: [
          {
            dataSourceCode: "dataFile",
          },
          {
            dataSourceCode: "AU",
          },
          {
            dataSourceCode: "IBR",
          },
          {
            dataSourceCode: "ISR",
          },
        ],
        ruleSetAttachments: [
          {
            fileName: global.testConfig.SimulationModels.simulationModelPDF,
            fileSize:
              global.testConfig.SimulationModels.APIsimulationModelPDFSize,
            fileId: this.getRuleSetAttachmentId(),
            fileType: "application/pdf",
            description: null,
          },
        ],
        decisionModelVariables: [
          {
            nameAr: "العمر",
            nameEn: "Age",
            type: "string",
            defaultValue: "18",
            description: "العمر اكبر من 18",
          },
        ],
        fileDataSourceAttachmentsRequests: [
          {
            fileName: global.testConfig.SimulationModels.simulationModelCSV,
            fileSize:
              global.testConfig.SimulationModels.APIsimulationModelCSVSize,
            fileId: this.getFileDataSourceAttachmentsId(),
            fileType: "text/csv",
            description: null,
          },
        ],
      },
      nameAr: this.getSimulationModelArName(),
      nameEn: this.getSimulationModelEnName(),
    };
  }
}

module.exports = { SimulationModelData };
