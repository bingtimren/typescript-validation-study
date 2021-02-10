import { testCases } from "./validation-data"
import { Validator, TestCase, solutions } from '.'

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
        const result = validator(tcase.data);
        if (tcase.result === true) {
            expect(result).toStrictEqual(true)
        } else {
            expect(result).not.toStrictEqual(true)
        }

    })
})
