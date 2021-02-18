import * as yup from "yup"

const sexOptions = ['M','F','O'] as const;
type SexOptions = typeof sexOptions[Exclude<keyof typeof sexOptions, string>]

export const personSchema = yup.object({
    name: yup.string().required().min(3).max(20).matches(/^[a-z A-Z ]+$/),
    dob: yup.date().required().max(new Date(Date.now()-24*60*60*1000*365*18)),

    // ISSUE: .optional() and enum does not mix. The following two lines all just achieve partial result
    
    // the line below allows 'undefined' to be assigned (not still not exactly 'optional', as it still requires explicit property with undefined value)
    // AND enum is lost in typing - it becomes 'string
    // sex: yup.mixed<SexOptions>().oneOf(sexOptions as unknown as SexOptions[]).default('M').optional(),

    // the line below preserves enum, but is then not optional when typescript do type checking
    // note however when doing runtime validation it is indeed optional
    sex: yup.mixed<SexOptions>().oneOf(sexOptions as unknown as SexOptions[]).default('M'),
    
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