// validator returns true if validation passed, otherwise whatever
export type Validator = (input: unknown) => any;

export interface Validators {
    person?: Validator,
    personForm?: Validator,
    driver?: Validator,
    vehicle?: Validator,
    fleet?: Validator
}

export type TestCase = 
    {
        schema: keyof Validators,
        id: string,
        data: any,
        comment?: string,
        result: boolean
    }

export type TestCases = TestCase[]    


import iots from './solutions/io-ts'
import joi from './solutions/joi'
import jschema from './solutions/json-schema'
import yup from './solutions/yup'

export const solutions: [string, Validators][] = [
    ["io-ts", iots],
    ["joi", joi],
    ["json-schema", jschema],
    ['yup', yup]
];
