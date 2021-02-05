// must export 'validators'
import {Validators} from "../.."
import {PersonSchema, PersonFormSchema} from "./schemas"


const validators : Validators = {
    person: (data)=>PersonSchema.validate(data).error === undefined,
    // driver: (data) => isRight(Driver.decode(data)),
    // fleet: (data) => isRight(Fleet.decode(data)),
    // vehicle: (data) => isRight(Vehicle.decode(data)),
    personForm: (data) => PersonFormSchema.validate(data).error === undefined,
}

export default validators