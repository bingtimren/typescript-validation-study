import Joi from "joi"

export const PersonSchema = Joi.object({
    name: Joi.string().required().min(3).max(20).pattern(/[a-z A-Z ]+/),
    dob: Joi.date().required().max(Date.now()-24*60*60*1000*365*18),
    sex: Joi.string().valid("M", "F", "O"),
    password: Joi.string().required().min(5)
}).unknown(true)

