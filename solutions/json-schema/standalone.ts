const person = require("./std-alone/person").validateObject
const driver = require("./std-alone/driver").validateObject
const vehicle = require("./std-alone/vehicle").validateObject
const personForm = require("./std-alone/personForm").validateObject
const fleet = require("./std-alone/fleet").validateObject

import { Validators } from "../.."

function v(validator:any):any{
    return (data:any)=>{
        if (validator(data)) {
            return true
        } else {
            return validator.errors;
        }
    }
}

const validators: Validators = {
    person,
    driver,
    fleet: v(fleet),
    vehicle,
    personForm
}

export default validators