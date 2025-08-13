export class FieldRequestData {

  constructor() {
    //API
    this.requestId=null;
    this.fields = [];

  }

    // Getter and Setter for API Request field  request ID Number
     getRequestId() {
        return this.requestId;
    }

    // Setter for Field request ID
    setRequestId(Value) {
        this.requestId = Value;
    }

    // Getter for Fields objects
    getFields() {
      return this.fields;
  }

    // Setter for Fields objects
  setFields(values) {
    this.fields = values;
  }
    toJSON() {
        return {
          "justifications": [
              {
                  "id": "67640814ae9881e447c40dbb",
                  "code": null,
                  "nameEn": "Update general",
                  "nameAr": "تحديث عام"
              }
          ]
      }





    }
}


module.exports = { FieldRequestData };