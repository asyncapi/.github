// Dependencies
const core = require('@actions/core');
const Ajv = require('ajv');
const yaml = require('js-yaml');
const fs = require('fs');
const axios = require('axios').default;

function validateYmlSchema(filename, validator){
    // Read the schema and workflow file synchronously
    const file = fs.readFileSync(filename, 'utf8');
    try{
        const target = yaml.load(file);
        const valid = validator(target);
        // Return the status and log for each workflow file validated
        if (!valid) {
            return {
                'status' : false,
                'log': validator.errors
            }          
        } else {
            return {
                'status' : true,
                'log': 'Validation successful'
            }
        }
    }
    catch(err){
        return {
            'status' : false,
            'log': err
        }
    } 
}

module.exports = async (allFiles) => {
    const response = await axios.get('https://json.schemastore.org/github-workflow.json',{responseType: 'application/json'});
    const schema = response.data;
    const ajv = new Ajv({ strict: false, allErrors: true });
    const validator = ajv.compile(schema);
    const allLogs = {}
    allFiles = allFiles.split(' ');
    for(file of allFiles){
        let log = validateYmlSchema(file, validator);
        if(!log['status']){
            allLogs[file] = log['log']
        }
    }
    // Workflow fails if an error is detected in any file
    if(Object.keys(allLogs).length > 0){
        for(file in allLogs){
            console.log("ERROR IN FILE " + file)
            console.log(allLogs[file]);
        }
        core.setFailed('There are errors in the workflow files');
    } else {
        console.log('No errors detected in the yml/yaml files');
    }
}
