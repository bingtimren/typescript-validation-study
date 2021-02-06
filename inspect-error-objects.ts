import {testCases} from "./validation-data"
import {solutions} from "."

// examine in case of multiple failure, what results are returned from each solution

const fleetMultiFailureData = testCases.filter((testcase)=>(testcase.schema==="fleet" && testcase.id==="multiple-failure"))[0]

// visually inspect the returned object from each solutions
for (let [solName, solModule] of solutions) {
    const validator = solModule.fleet;
    if (validator !== undefined) {
        console.log(`********************************* Solution ${solName} Validating multiple-failure fleet data *********************************`);
        const response = validator(fleetMultiFailureData.data);
        console.log(`typeof response = ${typeof response}`);
        console.log(`response = ${response}`);
        console.log(`JSON.stringify(response)=${JSON.stringify(response, null, 2)}`)        
    }
}