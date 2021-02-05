import { testCases } from "./validation-data"
import fs from 'fs'
import { Validators, Validator, TestCase } from '.'

// prepare the modules
import iots from './solutions/io-ts'

const testTable: [string, Validators][] = [
    ["io-ts", iots]
];

describe('Validator Test', () => {
    // prepare case table
    const caseTable: [string, TestCase, Validator][] = [];
    for (let [solName, solModule] of testTable) {
        for (let tcase of testCases) {
            const validator = solModule[tcase.schema];
            if (validator !== undefined) {
                caseTable.push([`${solName} / ${tcase.schema}: ${tcase.id}`, tcase, validator])
            }
        }
    }

    test.each(caseTable)('%s', (name, tcase, validator) => {
        const result = validator(tcase.data);
        if (tcase.result === true) {
            expect(result).toStrictEqual(true)
        } else {
            expect(result).not.toStrictEqual(true)
        }

    })
})