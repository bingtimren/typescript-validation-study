// purpose of this module is to test TS types generated from the schemas
import {Fleet} from "./schemas"

// valid values
export const f1 : Fleet = []
export const f2 : Fleet = [ {
    driver:{
        dob: new Date(),
        licenseNo: "",
        name: "",
        password: "",
        sex: "M" // enum working
    }, 
    vehicle:{
        length:1.3,
        seats:5,
        type:"car"
    }
}]

export const f3 : Fleet = [ {
    driver:{
        dob: new Date(),
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
        dob: new Date(),
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


// result: type inference works very well