import * as yup from "yup"

export const personSchema = yup.object({
    name: yup.string().required().min(3).max(20).matches(/^[a-z A-Z ]+$/),
    dob: yup.date().required().max(new Date(Date.now()-24*60*60*1000*365*18)),
    sex: yup.string().oneOf(["M", "F", "O"]),
    password: yup.string().required().min(5)
}).unknown(true)


export const personFormSchema = personSchema.shape({
    repeatPassword: yup.string().required()
}).test(
    'repeat password',
    'repeat password must match password',
    (value)=>(value && value.password && value.repeatPassword && value.password === value.repeatPassword ? true:false)
)

export const driverSchema = personSchema.shape({
    licenseNo: yup.string().required().max(30).min(3).matches(/^[a-zA-Z]+$/)
})


export const vehicleSchema = yup.object({
    type: yup.string().required().oneOf(["car","bus"]),
    seats: yup.number().required().integer().min(1),
    length: yup.number().required().positive()
})

export const fleetSchema = yup.array().of(
    yup.object({
        driver: driverSchema,
        vehicle: vehicleSchema
    })
)