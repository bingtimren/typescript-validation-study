// must export 'validators'
import * as S from "superstruct"
import * as schemas from "./schemas"
import { Validators } from "../.."

const validator: (schema: S.Struct<any, any>) => ((data: any) => any) =
    (schema) => (
        (data) => {
            try {
                return S.create(data, schema);
            } catch (err) {
                const allFailures = []
                for (const f of err.failures()) {
                    allFailures.push(f)
                }
                throw allFailures

            }
        }
    )


const validators: Validators = {
    person: validator(schemas.personSchema),
    driver: validator(schemas.driverSchema),
    fleet: validator(schemas.fleetSchema),
    vehicle: validator(schemas.vehicleSchema),
    personForm: validator(schemas.personFormSchema),
}

export default validators