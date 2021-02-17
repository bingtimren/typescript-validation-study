import Ajv, {Schema} from "ajv"
import addFormats from "ajv-formats"
import standaloneCode from "ajv/dist/standalone"
import addKeyword from "./customer-keywords"

import personSchema from "./schemas/person-basic.json"
import personFormSchema from "./schemas/personForm.json"
import driverSchema from "./schemas/driver.json"
import vehicleSchema from "./schemas/vehicle.json"
import fleetSchema from "./schemas/fleet.json"
import fs from "fs"
import path from "path"

const schemas = [
    personSchema, personFormSchema, driverSchema, vehicleSchema, fleetSchema
]

const ajv = new Ajv({
    code: {
        source:true,
        optimize:false,
        lines:true,
    },
    allErrors: true,
    $data: true,
    schemas: schemas,
    useDefaults:true
})

addFormats(ajv)
addKeyword(ajv)

function codeGen(schema: {"$id":string,[k:string]:any}) {
    const schemaId = schema.$id
    const typeId = schemaId.split(".")[0]
    const moduleCode = standaloneCode(ajv, {
        validateObject: schemaId
    });
    fs.writeFileSync(path.join(__dirname, `std-alone/${typeId}.js`), moduleCode)
}

schemas.forEach(codeGen);