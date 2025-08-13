const { request } = require('@playwright/test');

/**
 * Service class to manage tasks through API endpoints, including retrieving tasks,
 * assigning tasks, completing tasks, and verifying completed tasks.
 * @class
 */
export class TasksService {
  constructor(token) {
    this.baseUrl = global.testConfig.BASE_URL_API;
    this.getgroupTasksUrl = this.baseUrl + "/workflow/v1/groupTasks?page=1&size=10";
    this.assignTaskUrl = this.baseUrl + "/workflow/v1/userTasks/assign";
    this.completeTaskUrl = this.baseUrl + "/workflow/v1/complete-task";
    this.completedTasksUrl= this.baseUrl +"/workflow/v1/userTasks/complete?page=1&size=10";
    this.token = "Bearer " + token;
  }

  
  /**
   * Retrieves the task ID based on the given serial number.
   * @param {string} taskserialNumber - The serial number of the task to search for.
   * @returns {Promise<string|null>} - The task ID if found, or null if not found.
   */
  async getTaskID(taskserialNumber) {
    await new Promise((resolve) => setTimeout(resolve, 15000));
    let taskID = null;
    var requestContext = await request.newContext({ ignoreHTTPSErrors: true });

    var response = await requestContext.get(this.getgroupTasksUrl, {
      headers: {Authorization: this.token,Accept: "application/json"},timeout: 35000,});
    var responseBody = await response.json();

  
    if (response.ok() && responseBody.result && responseBody.result.records) {
      var Task = responseBody.result.records.find((record) => record.serialNumber === taskserialNumber);
      if (Task) {
        taskID = Task.id;
        console.log(`Task serialNumber : ${taskserialNumber}, task ID: ${taskID}`);
      } else {
        console.error(`Task Serial Number not found.`);
      }} 
      else {
      var errorBody = await response.text();
      console.error("Error Response Body:", errorBody);
      console.error("Failed to retrieve Task:",response.status(),response.statusText());
      }
    //await requestContext.dispose();
    return taskID;
  }

    /**
   * Assigns a task to the current user based on its ID.
   * @param {string} taskID - The ID of the task to assign.
   * @returns {Promise<boolean>} - Returns true if the task is successfully assigned; otherwise, false.
   */
  async assignTask(taskID) {

    var requestContext = await request.newContext({ ignoreHTTPSErrors: true });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    var response = await requestContext.post(this.assignTaskUrl, {
      headers: {"Content-Type": "application/json",Authorization: this.token,Accept: "application/json"},
      data: JSON.stringify({"taskId":taskID})});

    if (response.ok()) {
      console.log("The Task assigned Successfully");
      return true;
        } else {
          const errorBody = await response.text();
          console.error("Error Response Body:", errorBody);
          console.error("Failed to assign the task.",response.status(),response.statusText());
          return false;
        }
    }


  /**
   * Completes a task based on its ID with an approval action.
   * @param {string} taskID - The ID of the task to complete.
   * @returns {Promise<boolean>} - Returns true if the task is successfully completed; otherwise, false.
   */
  async completeTask(taskID) {
    var requestContext = await request.newContext({ ignoreHTTPSErrors: true });
   await new Promise((resolve) => setTimeout(resolve, 15000));
    var response = await requestContext.post(this.completeTaskUrl, {
      headers: {"Content-Type": "application/json",Authorization: this.token,Accept: "application/json"},
      data: JSON.stringify({"action":"APPROVE","taskId":taskID,"message":"قبول المهمة"}),timeout: 30000});

      if (response.ok()) {
        var responseBody = await response.json();

        if (responseBody.result && responseBody.result.completed) {
            console.log("The Task was assigned successfully , completed: true");
            return true;
        } else {
            console.error("Task assignment failed, completed: false");
            return false;
        }
    } else {
        const errorBody = await response.text();
        console.error("Error Response Body:", errorBody);
        console.error("Failed to assign the task.",response.status(),response.statusText());
        return false;
    }
    }



  /**
   * Verifies if a task with the given ID exists in the completed tasks list.
   * @param {string} taskID - The ID of the task to verify.
   * @returns {Promise<boolean>} - Returns true if the task is found in completed tasks; otherwise, false.
   */
  async getCompletedTaskById(taskID) {
    await new Promise((resolve) => setTimeout(resolve, 15000));
    var requestContext = await request.newContext({ ignoreHTTPSErrors: true });

    var response = await requestContext.get(this.completedTasksUrl, {
        headers: {"Content-Type": "application/json",Authorization: this.token,Accept: "application/json" },
        timeout: 50000, });

    if (response.ok()) {
        var responseBody = await response.json();
        var completedTask = responseBody.result.records.find((record) => record.id === taskID);
        if (completedTask) {
            console.log(`Task Found: ID=${completedTask.id}, SerialNumber=${completedTask.serialNumber}`);
            return true; 
            } else {
                console.error(`Task with ID "${taskID}" not found in completed tasks.`);
                return false; // Task not found
            }
        } else {
            const errorBody = await response.text();
            console.error("Error Response Body:", errorBody);
            console.error("Failed to retrieve completed tasks:", response.status(), response.statusText());
            return false;
        }
  }


  

}

