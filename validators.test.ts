import { testCases } from "./validation-data"
import { Validator, TestCase, solutions } from '.'
import * as _ from "lodash"

describe('Validator Test', () => {
    // prepare case table
    const caseTable: [string, TestCase, Validator][] = [];
    for (let [solName, solModule] of solutions) {
        for (let tcase of testCases) {
            const validator = solModule[tcase.schema];
            if (validator !== undefined) {
                caseTable.push([`${solName} / ${tcase.schema}: ${tcase.id} [${String(tcase.result).toUpperCase()}]`, tcase, validator])
            }
        }
    }

    test.each(caseTable)('%s', (name, tcase, validator) => {
        // some validator may modify data (type coercion)
        // make a clone first
        const clonedData = _.cloneDeep(tcase.data);
        if (tcase.result === true) {
            const result = validator(clonedData);
        } else {
            expect(()=>validator(clonedData)).toThrow()
        }

    })
})
