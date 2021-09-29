import * as z from "zod"

export const personSchema =  z.object({
    name: z.string().min(3).max(20).regex(/^[a-z A-Z ]+$/),
    dob: z.string().
        refine((strDate)=>((new Date(strDate)).getTime() <= Date.now()-24*60*60*1000*365*18)).transform((val)=>new Date(val)),
    sex: z.enum(["M","F","O"]).optional(),
    password: z.string().min(5)
});

export const personFormSchema = personSchema.extend({
    repeatPassword: z.string()
}).refine((value)=>(value && value.password && value.repeatPassword && value.password === value.repeatPassword ? true:false))

export const driverSchema = personSchema.extend({
    licenseNo: z.string().max(30).min(3).regex(/^[a-zA-Z]+$/)
})

export const vehicleSchema = z.object({
    type: z.enum(["car","bus"]),
    seats: z.number().int().min(1),
    length: z.number().positive()
})

export const fleetSchema = z.array(
    z.object({
        driver: driverSchema,
        vehicle: vehicleSchema
    })
)

export type Fleet = z.TypeOf<typeof fleetSchema>