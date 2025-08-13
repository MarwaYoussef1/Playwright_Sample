const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv-flow');

// Function to load configurations
function loadConfig(env) {
  // Load environment variables from the .env files in the configs folder
  dotenv.config({ path: path.resolve(__dirname, 'configs') });

  // Path to the JSON config file in the configs folder
  const jsonFilePath = path.resolve(__dirname, 'configs', `config-${env}.json`);
  
  let jsonConfig = {};

  // Check if the JSON file exists
  if (fs.existsSync(jsonFilePath)) {
    // Read and parse the JSON configuration file
    jsonConfig = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
  } else {
    console.error(`JSON config file not found for environment: ${env}`);
  }

  // Merge environment variables and JSON config
  return {
    ...process.env,
    ...jsonConfig,
  };
}

module.exports = { loadConfig };
