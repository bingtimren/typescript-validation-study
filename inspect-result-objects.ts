import { testCases } from "./validation-data"
import { solutions } from "."
import * as _ from "lodash"

// examine in case of multiple failure, what results are returned from each solution

const validPersonData = testCases.filter((testcase) => (testcase.schema === "person" && testcase.id === "sex-none-ok-optional"))[0]

// visually inspect the returned object from each solutions
for (let [solName, solModule] of solutions) {
    const validator = solModule.person;
    if (validator !== undefined) {
        console.log(`********************************* Solution ${solName} Validating valid person data *********************************`);
        const result = validator(_.cloneDeep(validPersonData.data))
        console.log(`result = ${result}`);
        console.log(`TYPE COERCION = ${(result && result.dob && result.dob instanceof Date)?'TRUE':'FALSE'}`);
        console.log(`DEFAULT = ${(result && result.sex && result.sex === "O")?'TRUE':'FALSE'}`);
        
        console.log(`JSON.stringify(result)=${JSON.stringify(result, null, 2)}`)
    }
}