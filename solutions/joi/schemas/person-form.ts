import { Person } from "../../io-ts/types"
import {PersonSchema} from "./person"
import Joi from "joi"


export const PersonFormSchema = PersonSchema.keys({
    repeatPassword: Joi.string().required()
}).custom(
    (pf, helper)=>{
        if (pf && pf.password && pf.repeatPassword && pf.password === pf.repeatPassword)
            return pf;
        else
            return helper.error("repeat password not same")
        }
)
