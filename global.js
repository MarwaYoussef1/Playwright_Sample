// global.js
const fs = require('fs');
const path = require('path');

const configPath = path.resolve(__dirname,'configs', 'AllConfigs.json');

// Read the configuration from config.json and expose it
if (fs.existsSync(configPath)) {
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  global.testConfig = config;
 // console.log('Global configuration loaded:', global.testConfig);
} else {
 // console.error('Global configuration file not found. Ensure global-setup.js has been executed.');
  global.testConfig = {};
}