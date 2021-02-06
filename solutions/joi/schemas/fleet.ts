import Joi from "joi"
import {DriverSchema, VehicleSchema} from "."
export const FleetSchema = Joi.array().items(
    Joi.object({
        driver: DriverSchema,
        vehicle: VehicleSchema
    })
)