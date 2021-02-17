// must export 'validators'
import * as z from "zod"
import { Validators } from "../.."
import * as schemas from "./schemas"

const validator: (schema: z.ZodType<any, any>) => ((data: any) => any) =
    (schema) => (
        (data) => {
            return schema.parse(data);
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