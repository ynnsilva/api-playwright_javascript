# API Testing with Playwright

This project contains automated API tests for (https://restful-api.dev/) using Playwright.

# Test Scenarios Covered:
1. Get a list of all objects (GET)
2. Add an object (POST)
3. Retrieve a single object by ID (GET)
4. Update an object (PUT)
5. Delete an object (DELETE)
6. Additional assertions for robustness

# Note
- Status code is 201 for the standard response of a successful POST request.Some APIs return 200 OK instead of 201 Created. This checked via the POSTMAN before the implementation.
- The POST request lacks the necessary mandatory fields.

# Setup & Installation
# Prerequisites
- Install [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- Install Playwright : npm init playwright@latest
    choose javascript,
    choose test folder to insert end to end tests,
    github workflow-true,
    install browsers-true
- Install extension : Playwright Test for VSCode
- Install faker : npm install @faker-js/faker --save-dev
- Install luxon : npm install --save luxon

# Execution
Go to Trminal > New Terminal and
- for run all Tests: npx playwright test
- for run individual Test: npx playwright test tests/api-crud-object.spec.js
- for run Tests via UI : npx playwright test --ui
execution results can be found at 'test-results'


