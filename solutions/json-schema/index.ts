import Ajv, { _, JSONSchemaType, DefinedError, KeywordCxt } from "ajv"
import addFormats from "ajv-formats"
import { Validators } from "../.."

import personSchema from "./schemas/person.json"
import personFormSchema from "./schemas/personForm.json"
import driverSchema from "./schemas/driver.json"
import vehicleSchema from "./schemas/vehicle.json"
import fleetSchema from "./schemas/fleet.json"

const ajv = new Ajv({
    allErrors: true,
    $data: true,
    schemas: [
        personSchema, personFormSchema, driverSchema, vehicleSchema, fleetSchema
    ]
});
addFormats(ajv)
ajv.addKeyword({
    keyword: "olderThanFromNow",
    type: "string", // evaluates against string
    schemaType: "number", // must receive a number
    code(ctx: KeywordCxt) {
        const { data, schema } = ctx;
        ctx.fail(_`Date.now() - (new Date(${data})).getTime() <= ${schema}`)  // code generation
    }
});

const fleetValidator = ajv.getSchema(fleetSchema.$id)

const validators: Validators = {
    person: ajv.getSchema(personSchema.$id),
    driver: ajv.getSchema(driverSchema.$id),
    fleet: (data)=>fleetValidator!(data)===true?true:fleetValidator!.errors,
    vehicle: ajv.getSchema(vehicleSchema.$id),
    personForm: ajv.getSchema(personFormSchema.$id),
}

export default validators