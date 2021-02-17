// must export 'validators'
import Joi from "joi"
import { Validators } from "../.."
import { PersonSchema, PersonFormSchema, DriverSchema, VehicleSchema, FleetSchema } from "./schemas"

const validator: (schema: Joi.Schema) => ((data: any) => any) =
    (schema) => (
        (data) => {
            const result =  schema.validate(data, {
                abortEarly:false
            });
            if (result.error) throw result;
            return result.value;
        }
    );



const validators: Validators = {
    person: validator(PersonSchema),
    driver: validator(DriverSchema),
    fleet: validator(FleetSchema),
    vehicle: validator(VehicleSchema),
    personForm: validator(PersonFormSchema),
}

export default validators