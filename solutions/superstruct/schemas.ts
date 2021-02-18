import * as S from "superstruct"

export const personSchema = S.type({
    name: S.pattern(S.size(S.string(), 3, 20), /^[a-z A-Z ]+$/),
    dob: S.refine(
        S.coerce(S.date(), S.string(), (value) => (new Date(value))),
        'dob18years',
        (value) => (Date.now() - value.getTime() >= 24 * 60 * 60 * 1000 * 365 * 18)),
    sex: S.optional(S.defaulted(S.enums(["M", "F", "O"] as const), "O")),
    password: S.size(S.string(), 5)
});

export type Person = S.Infer<typeof personSchema>

export const personFormSchema = S.refine(S.assign(personSchema, S.object({
    repeatPassword: S.string()
})), 'perform-form',
    (value) => (value && value.password && value.repeatPassword && value.password === value.repeatPassword ? true : false)
);

export const driverSchema = S.assign(personSchema, S.object({
    licenseNo: S.pattern(S.size(S.string(), 3, 30), /^[a-zA-Z]+$/)
}));


export const vehicleSchema = S.object({
    type: S.enums(["car", "bus"]),
    seats: S.min(S.integer(), 1),
    length: S.min(S.number(), 0, { exclusive: true })
});

export const fleetSchema = S.array(
    S.object({
        driver: driverSchema,
        vehicle: vehicleSchema
    })
);

export type Fleet = S.Infer<typeof fleetSchema>