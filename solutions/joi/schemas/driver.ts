import {PersonSchema} from "./person"
import Joi from "joi"

export const DriverSchema = PersonSchema.keys({
    licenseNo: Joi.string().required().max(30).min(3).pattern(/^[a-zA-Z]+$/)
})