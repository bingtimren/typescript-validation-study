// must export 'validators'
import Joi from "joi"
import { Validators } from "../.."
import { PersonSchema, PersonFormSchema, DriverSchema, VehicleSchema, FleetSchema } from "./schemas"
import { pipe } from "fp-ts/pipeable"

const validator: (schema: Joi.Schema) => ((data: any) => any) =
    (schema) => (
        (data) => (
            pipe(
                data,
                schema.validate.bind(schema),
                (result) => (result.error === undefined ? true : result)
            )
        )
    )


const validators: Validators = {
    person: validator(PersonSchema),
    driver: validator(DriverSchema),
    fleet: validator(FleetSchema),
    vehicle: validator(VehicleSchema),
    personForm: validator(PersonFormSchema),
}

export default validators