# Playwright Sample

## Overview
This repository demonstrates a clean and modular **Playwright** automation framework using JavaScript. It provides a solid foundation for end-to-end web testing, complete with configuration setup, environment management, and robust scripting under `src` and `tests`.

## Key Features
- Playwright-based UI testing with JavaScript  
- Configurable environment setup via custom loaders  
- Organized project structure for scalability  
- Support for global test setup and teardown  
- Ready for CI pipelines and parallel execution

## Prerequisites
Ensure the following before running the tests:
- Node.js and npm installed  
- Playwright dependencies installed via npm  
- A supported browser installed (or configured to be auto-installed via Playwright)
## Project Structure
Playwright_Sample/

├── configs/               # Configuration files (e.g., environments, settings)

├── Resources/             # Project resources (data, assets, etc.)

├── src/                   # Playwright page objects or reusable modules

├── tests/                 # Test scripts (e.g., api.spec.js)

├── configLoader.js        # Utility to load configs dynamically

├── global-setup.js        # Test setup (runs before all tests)

├── global.js              # Global test context

├── playwright.config.js   # Playwright configuration for test runner

├── package.json           # Project dependencies and scripts

├── package-lock.json      # Exact dependency versions installed

└── .gitignore             # Files and directories to ignore from version control
