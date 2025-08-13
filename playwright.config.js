// @ts-nocheck
const { defineConfig, devices } = require("@playwright/test");
require("./global.js"); // Load the global configuration
/**
 * @see https://playwright.dev/docs/test-configuration
 */


const ENV = "uat";
//const isHeadless = process.env.HEADLESS !== 'false';
const isHeadless = true;
module.exports = defineConfig({
  timeout: 900000,

  globalSetup: require.resolve("./global-setup"),
  //globalTeardown: './globalTeardown.js',

  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 1,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  //workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["html", { outputFolder: "playwright-report" }],
    ["allure-playwright", { outputFolder: "allure-results" }], // Allure reporter
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: { //1920 * 1080 //1280 * 720
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',
    browserName: "chromium",
    headless: isHeadless,
    viewport: isHeadless ? {  width: 1920, height: 1080  } : null,
    //viewport: null,
    launchOptions: {
      args: isHeadless
        ? ['--window-size=1920,1080']
        : ['--start-maximized'], // only for headed ,'--force-device-scale-factor=0.9'
    },
   
    
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    video: "on",
    screenshot: "only-on-failure", // Capture screenshot always
    actionTimeout: 200000, // Timeout for Playwright actions (15 seconds)
    navigationTimeout: 600000, // Timeout for page navigation (60 seconds)
  },
  /* Configure projects for major browsers */
projects: [

     {
        name: "Sainty",
         testDir: "./tests/AdminPortal/SocialRegistryServices/SocialRecordCopiesTests", // Test directory
          },
     {
      name: "Admin",
       testDir: "./tests/AdminPortal", // Test directory
        },

     {
         name: "Login",
       testDir: "./tests/Login", // Test directory
  },
      {
         name: "All",
         testDir: "./tests",
         testMatch: [
        'AdminPortal/**//*.spec.js',
        'OperationPortal/**//*.spec.js'
         ], 
      },
       /*{
         name: "All",
         testDir: "./tests",
        
      },*/
       {
        name: "Programs",
       testDir: "./tests/AdminPortal/ProgramManagementTests", // Test directory
       },
     {
      name: "Lookups",
          testDir: "./tests/AdminPortal/LookupsTests", // Test directory
       },
      {
         name: "StateMachine",
        testDir: "./tests/AdminPortal/StateMachineTests", // Test directory
     },

      {
        name: "SocialRegistryServices",
        testDir: "./tests/AdminPortal/SocialRegistryServices/FieldLibraryUpdateRequests", // Test directory
    },
    {
      name: "Authroization",
      testDir: "./tests/AdminPortal/PermissionsTests", // Test directory
      },
      {
      name: "Applicant",
      testDir: "./tests/ApplicantPortal",
      use: {
        headless: isHeadless,
        viewport: isHeadless ? { width: 1366, height: 768 } : null, // Specific viewport in headless
        launchOptions: {
          args: isHeadless
            ? ['--window-size=1366,768']
            : ['--start-maximized'], // Maximize in headed mode
        },
      },
    },

       {
         name: "Operation",
        testDir: "./tests/OperationPortal", // Test directory
         },

         /* {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
          },*/

         /* {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
          },

          {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
          },*/

          /* Test against mobile viewports. */
          // {
          //   name: 'Mobile Chrome',
          //   use: { ...devices['Pixel 5'] },
          // },
          // {
          //   name: 'Mobile Safari',
          //   use: { ...devices['iPhone 12'] },
          // },

         /* Test against branded browsers. */
         // {
         //   name: 'Microsoft Edge',
        //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
        // },
         // {
         //   name: 'Google Chrome',
         //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
         // },
      //
 ],
});
module.exports.ENV = ENV;