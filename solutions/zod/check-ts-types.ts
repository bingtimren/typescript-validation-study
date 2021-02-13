// purpose of this module is to test TS types generated from the schemas
import {Fleet} from "./schemas"

// valid values
export const f1 : Fleet = []
export const f2 : Fleet = [ {
    driver:{
        dob: new Date().toISOString(),
        licenseNo: "",
        name: "",
        password: "",
        sex: "M"
    }, 
    vehicle:{
        length:1.3,
        seats:5,
        type:"car"
    }
}]

export const f3 : Fleet = [ {
    driver:{
        dob: new Date().toISOString(),
        licenseNo: "",
        name: "",
        password: "",
        sex: undefined // sex property optional
    }, 
    vehicle:{
        length:1.3,
        seats:5,
        type:"car"
    }
}]

export const f4 : Fleet = [ {
    driver:{
        dob: new Date().toISOString(),
        licenseNo: "",
        name: "",
        password: "",
        // sex: "" // optional
    }, 
    vehicle:{
        length:1.3,
        seats:5,
        type:"car"
    }
}]


// result: code assist and typing works well