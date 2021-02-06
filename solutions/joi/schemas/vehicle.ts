import Joi from "joi"

export const VehicleSchema = Joi.object({
    type: Joi.string().required().valid("car","bus"),
    seats: Joi.number().required().integer().min(1),
    length: Joi.number().required().positive()
})