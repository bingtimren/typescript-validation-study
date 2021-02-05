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
