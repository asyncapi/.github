const core = require('@actions/core');
const Ajv = require('ajv');
const yaml = require('js-yaml');
const fs = require('fs');


function getFileExtension(filename){
    return filename.split('.').pop();
}

function validateYmlSchema(filename){
    const fileExtensions = ['yml', 'yaml'];
    if(fileExtensions.includes(getFileExtension(filename))){
        // Read the schema file and workflow file synchronously
        let schema = fs.readFileSync('.github/scripts/yml-schema.json', {encoding:'utf8', flag:'r'});
        schema = JSON.parse(schema);
        const file = fs.readFileSync(filename, 'utf8');
        try{
            const target = yaml.load(file);
            const ajv = new Ajv({ strict: false, allErrors: true });
            const validator = ajv.compile(schema);
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
    } else {
        return {
            'status' : true,
            'log': 'Not a yml/yaml file'
        }
    }
}

module.exports = (allFiles) => {
    const allLogs = {}
    allFiles = allFiles.split(' ');
    for(file of allFiles){
        let log = validateYmlSchema(file);
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
