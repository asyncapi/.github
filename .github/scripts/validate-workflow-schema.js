// validate-workflow-schema.js

const Ajv = require("ajv");
const axios = require("axios");
const yaml = require("js-yaml");
const fs = require("fs").promises;

async function validateWorkflows() {
  const schema = await axios.get(
    "https://raw.githubusercontent.com/SchemaStore/schemastore/master/src/schemas/json/github-workflow.json"
  );

  const files = await fs.readdir(".github/workflows");
  const ymlFiles = files.filter((file) => file.endsWith(".yml"));

  for (const file of ymlFiles) {
    const content = await fs.readFile(`.github/workflows/${file}`, "utf8");
    const target = yaml.load(content);

    const ajv = new Ajv({ strict: false, allErrors: true });
    const validator = ajv.compile(schema.data);
    const valid = validator(target);
    if (!valid) {
      console.error(
        `Validation failed for file '${file}' with the following errors:`
      );
      console.error(validator.errors);
      process.exitCode = 1;
    } else {
      console.log(`Workflow in file '${file}' is valid`);
    }
  }
}

validateWorkflows();
