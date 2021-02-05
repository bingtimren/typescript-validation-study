// must export 'validators'
import {Validators} from "../.."
import {Person, PersonForm, Driver, Vehicle, Fleet} from "./types"
import {isRight} from 'fp-ts/Either'

const validators : Validators = {
    person: (data)=>isRight(Person.decode(data)),
    driver: (data) => isRight(Driver.decode(data)),
    fleet: (data) => isRight(Fleet.decode(data)),
    vehicle: (data) => isRight(Vehicle.decode(data)),
    personForm: (data) => isRight(PersonForm.decode(data))
}

export default validators