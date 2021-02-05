import * as D from 'io-ts/Decoder'
import { pipe } from 'fp-ts/lib/pipeable'
import { either } from 'fp-ts/lib/Either';

export const strMinLengthRefine = (n : number) => 
    D.refine(
        (input:string): input is string => input.length >= n, `minimum length ${n}`
    );

export const strMaxLengthRefine = (n : number) => D.refine(
    (input:string): input is string => input.length <= n, `maximum length ${n}`
);

export const strPatternRefine = (p : RegExp) => D.refine(
    (input:string): input is string => p.test(input), `does not conform to pattern`
);

export const strDateRefine = D.refine(
    (input: string): input is string => Date.parse(input) !== NaN,
    `input is not date`
)

export const strDateParser = D.parse<string,Date>(
    (input:string) => {
        const timestamp = Date.parse(input);
        if (timestamp === NaN)
            return D.failure(input, 'input cannot be parsed to date');
        return D.success(new Date(timestamp))
    }
)

export const dateDaysBeforeNowRefine = (numberOfDays:number) => D.refine(
    (input: Date) : input is Date => 
        (new Date()).getTime() - input.getTime() > (numberOfDays * 24 * 60 * 60 * 1000),
        `not old enough`
    )

export const numIntegerRefine = D.refine(
    (input: number):input is number => Number.isInteger(input), "input is not integer"
)    

