import Ajv, { _ } from "ajv"
import addFormats from "ajv-formats"
import { Validators } from "../.."

// personBasic + dob type coercion
import personSchema from "./schemas/person.json"
// defines person schema, but without type coercion, as the custom keyword is not written with code generation
import personBasicSchema from "./schemas/person-basic.json"
import personFormSchema from "./schemas/personForm.json"
import driverSchema from "./schemas/driver.json"
import vehicleSchema from "./schemas/vehicle.json"
import fleetSchema from "./schemas/fleet.json"
import addKeyword from "./customer-keywords"


const ajv = new Ajv({
    allErrors: true,
    $data: true,
    schemas: [
        personSchema, personBasicSchema, personFormSchema, driverSchema, vehicleSchema, fleetSchema
    ],
    coerceTypes:true,
    useDefaults: true
});
addFormats(ajv)
addKeyword(ajv)


const validator = (schema:any):(data:unknown)=>any=>(
    (data)=>{
        const validator = ajv.getSchema(schema.$id)!;
        if (validator(data)) {
            return data
        } else {
            throw validator.errors
        }   
    }
)

const validators: Validators = {
    person: validator(personSchema),
    driver: validator(driverSchema),
    fleet: validator(fleetSchema),
    vehicle: validator(vehicleSchema),
    personForm: validator(personFormSchema)
}

export default validators