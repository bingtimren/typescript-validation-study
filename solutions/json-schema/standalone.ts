const person = require("./std-alone/person-basic").validateObject
const driver = require("./std-alone/driver").validateObject
const vehicle = require("./std-alone/vehicle").validateObject
const personForm = require("./std-alone/personForm").validateObject
const fleet = require("./std-alone/fleet").validateObject

import { Validators } from "../.."

function v(validator:any):any{
    return (data:any)=>{
        if (validator(data)) {
            return data
        } else {
            throw validator.errors;
        }
    }
}

const validators: Validators = {
    person:v(person),
    driver:v(driver),
    fleet: v(fleet),
    vehicle: v(vehicle),
    personForm: v(personForm)
}

export default validators