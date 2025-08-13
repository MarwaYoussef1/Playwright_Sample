
// global-setup.js
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { ENV } = require('./playwright.config'); 

// Function to load environment variables and JSON files
const loadConfig = (env) => {
  const envPath = path.resolve(__dirname, 'configs', `.env.${env}`);
  dotenv.config({ path: envPath });

  const jsonPath = path.resolve(__dirname, 'configs', `config-${env}.json`);
  const jsonConfig = fs.existsSync(jsonPath) ? JSON.parse(fs.readFileSync(jsonPath, 'utf-8')) : {};

  return {
    ...process.env, // Load all environment variables
    ...jsonConfig, // Merge with JSON config
  };
};

// Global setup to combine configs and save to config.json
async function globalSetup() {
  const environment = process.env.ENV || ENV; // Default to 'testing'
  const combinedConfig = loadConfig(environment);

  const configPath = path.resolve(__dirname,'configs', 'AllConfigs.json');
  fs.writeFileSync(configPath, JSON.stringify(combinedConfig, null, 2)); // Save combined config to file

  //console.log('Global configuration written to config.json');
}

module.exports = globalSetup;


