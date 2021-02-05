import * as D from 'io-ts/Decoder'
import { pipe } from 'fp-ts/lib/pipeable'
import * as util from './utils'
export const Person = pipe( 
    D.type({
        name: pipe(
            D.string,
            util.strMinLengthRefine(3),
            util.strMaxLengthRefine(20),
            util.strPatternRefine(/[a-z A-Z ]+/)
        ),
        dob: pipe(
            D.string,
            util.strDateParser,
            util.dateDaysBeforeNowRefine(18 * 365)
        ),
        password: pipe(
            D.string,
            util.strMinLengthRefine(5)
        )
    }),
    D.intersect(
        D.partial({ // optional 
            sex: D.union(D.literal("M"), D.literal("F"), D.literal("O")),
        })
    )
)

export type Person = D.TypeOf<typeof Person>

export const PersonForm = pipe(
    Person,
    // I tried D.refine but it would not work
    // Reason: "Person" uses D.type, which stripes extra properties 
    // D.refine((p:Person):p is Person=>{
    //     return (p as any).repeatPassword === p.password
    // },"test"),
    
    // D.intersect uses original value
    D.intersect({ // a decoder that validates repeat password
        decode: (input:any) => {
            if (input.password && input.repeatPassword && input.password === input.repeatPassword) {
                return D.success(input)
            }
            return D.failure(input, "repeat password does not match")
        }
    }),
)

export type PersonForm = D.TypeOf<typeof PersonForm>


export const Driver = pipe(
    Person,
    D.intersect(
        D.type({
            licenseNo: pipe(
                D.string,
                util.strMinLengthRefine(3),
                util.strMaxLengthRefine(30),
                util.strPatternRefine(/^[a-zA-Z]+$/),
            )
        })
    )
)

export type Driver = D.TypeOf<typeof Driver>

export const Vehicle = D.type({
    type: D.union(
        D.literal('car'), D.literal('bus')
    ),
    seats: pipe(
        D.number,
        util.numIntegerRefine,
        D.refine((i):i is number=>(i>=1),"seat must >= 1")
    ),
    length: pipe(
        D.number,
        D.refine((i):i is number=>(i>0),"length > 0")
    ),
})

export type Vehicle = D.TypeOf<typeof Vehicle>

export const Fleet = D.array(
    D.type({
        driver: Driver,
        vehicle: Vehicle
    })
)

export type Fleet = D.TypeOf<typeof Fleet>
