// purpose of this module is to test TS types generated from the schemas
import {FleetInput} from "."

// valid values
export const f1 : FleetInput = []
export const f2 : FleetInput = [ {
    driver:{
        dob: new Date(),
        licenseNo: "",
        name: "",
        password: "",
        sex: ""
    }, 
    vehicle:{
        length:1.3,
        seats:5,
        type:"car"
    }
}]

export const f3 : FleetInput = [ {
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

// property optional but still key is required

// export const f4 : FleetInput = [ {
//     driver:{
//         dob: new Date(),
//         licenseNo: "",
//         name: "",
//         password: "",
//         // sex: ""
//     }, 
//     vehicle:{
//         length:1.3,
//         seats:5,
//         type:"car"
//     }
// }]


// result: code assist and typing works well