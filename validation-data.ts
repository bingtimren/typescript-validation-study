import { resolveModuleName } from "typescript"
import {TestCases} from "."

const _testCases : TestCases = [
    {
        schema:"person",
        id:"valid",
        data: {
            name:"Abc",
            dob:"1900-01-01",
            sex:"M",
            password:"12345"
        },
        comment: "a valid person",
        result:true
    },
    {
        schema:"person",
        id:"name-too-short",
        data: {
            name:"Ab",
            dob:"1900-01-01",
            sex:"M",
            password:"12345"
        },
        result:false
    },
    {
        schema:"person",
        id:"name-too-long",
        data: {
            name:"Abcdddddddddddddddddddddddddddddddddddddddddddd",
            dob:"1900-01-01",
            sex:"M",
            password:"12345"
        },
        result:false
    },
    {
        schema:"person",
        id:"name-missing",
        data: {
            dob:"1900-01-01",
            sex:"M",
            password:"12345"
        },
        result:false
    },
    {
        schema:"person",
        id:"name-non-string",
        data: {
            name:123,
            dob:"1900-01-01",
            sex:"M",
            password:"12345"
        },
        result:false
    },
    {
        schema:"person",
        id:"name-invalid-pattern",
        data: {
            name:"0123",
            dob:"1900-01-01",
            sex:"M",
            password:"12345"
        },
        result:false
    },
    {
        schema:"person",
        id:"dob-non-date",
        data: {
            name:"Abc",
            dob:"something",
            sex:"M",
            password:"12345"
        },
        result:false
    },
    {
        schema:"person",
        id:"dob-missing",
        data: {
            name:"Abc",
            sex:"M",
            password:"12345"
        },
        result:false
    },
    {
        schema:"person",
        id:"dob-too-young",
        data: {
            name:"Abc",
            dob:(new Date()).toUTCString(),
            sex:"M",
            password:"12345"
        },
        result:false
    },
    {
        schema:"person",
        id:"dob-just-right",
        data: {
            name:"Abc",
            dob:(new Date(Date.now()-24*60*60*1000*365*18)).toUTCString(),
            sex:"M",
            password:"12345"
        },
        result:true
    },
    {
        schema:"person",
        id:"dob-is-too-young",
        data: {
            name:"Abc",
            dob:(new Date(Date.now()-24*60*60*1000*365*18+60*1000)).toUTCString(),
            sex:"M",
            password:"12345"
        },
        result:false
    },

    {
        schema:"person",
        id:"sex-invalid",
        data: {
            name:"Abc",
            dob:"1900-01-01",
            sex:"1",
            password:"12345"
        },
        result:false
    },
    {
        schema:"person",
        id:"sex-none-ok-optional",
        data: {
            name:"Abc",
            dob:"1900-01-01",
            password:"12345"
        },
        result:true
    },
    {
        schema:"person",
        id:"password-missing",
        data: {
            name:"Abc",
            dob:"1900-01-01",
            sex:"M",
        },
        result:false
    },
    {
        schema:"person",
        id:"password-too-short",
        data: {
            name:"Abc",
            dob:"1900-01-01",
            sex:"M",
            password:"1234"
        },
        result:false
    },
    {
        schema:"person",
        id:"extra-field",
        data: {
            name:"Abc",
            dob:"1900-01-01",
            sex:"M",
            password:"12345",
            somethingElse:""
        },
        comment:"'type' allows extra field but strips it after decode",
        result:true
    },
    {
        schema:"personForm",
        id:"valid",
        data: {
            name:"Abc",
            dob:"1900-01-01",
            sex:"M",
            password:"12345",
            repeatPassword:"12345"
        },
        result:true
    },
    {
        schema:"personForm",
        id:"repeat-password-missing",
        data: {
            name:"Abc",
            dob:"1900-01-01",
            sex:"M",
            password:"12345",
        },
        result:false
    },
    {
        schema:"personForm",
        id:"repeat-password-does-not-match",
        data: {
            name:"Abc",
            dob:"1900-01-01",
            sex:"M",
            password:"12345",
            repeatPassword:"11111"
        },
        result:false
    },
    {
        schema:"personForm",
        id:"invalid-person",
        data: {
            name:"",
            dob:"1900-01-01",
            sex:"M",
            password:"12345",
            repeatPassword:"11111"
        },
        result:false
    },
    {
        schema:"driver",
        id:"valid",
        data: {
            name:"Abc",
            dob:"1900-01-01",
            sex:"M",
            password:"12345",
            licenseNo:"abcde"
        },
        result:true
    },
    {
        schema:"driver",
        id:"license-missing",
        data: {
            name:"Abc",
            dob:"1900-01-01",
            sex:"M",
            password:"12345",
        },
        result:false
    },
    {
        schema:"driver",
        id:"license-too-short",
        data: {
            name:"Abc",
            dob:"1900-01-01",
            sex:"M",
            password:"12345",
            licenseNo:"a"
        },
        result:false
    },
    {
        schema:"driver",
        id:"license-too-long",
        data: {
            name:"Abc",
            dob:"1900-01-01",
            sex:"M",
            password:"12345",
            licenseNo:"abcdeddddddddddddddddddddddddddddddddddddddddddddddd"
        },
        result:false
    },
    {
        schema:"driver",
        id:"license-invalid",
        data: {
            name:"Abc",
            dob:"1900-01-01",
            sex:"M",
            password:"12345",
            licenseNo:"abc  de"
        },
        result:false
    },
    {
        schema:"vehicle",
        id:"valid",
        data:{
            type:"car",
            seats:5,
            length:1.2
        },
        result:true
    },
    {
        schema:"vehicle",
        id:"invalid-type",
        data:{
            type:"submarine",
            seats:5,
            length:1.2
        },
        result:false
    },
    {
        schema:"vehicle",
        id:"negative-seat",
        data:{
            type:"car",
            seats:-5,
            length:1.2
        },
        result:false
    },
    {
        schema:"vehicle",
        id:"fractional-seat",
        data:{
            type:"car",
            seats:0.5,
            length:1.2
        },
        result:false
    },
    {
        schema:"vehicle",
        id:"missing-length",
        data:{
            type:"car",
            seats:5,
        },
        result:false
    },
    {
        schema:"fleet",
        id:"valid",
        data:[
            {
                driver:{
                    name:"Abc",
                    dob:"1900-01-01",
                    sex:"M",
                    password:"12345",
                    licenseNo:"abcde"
                },
                vehicle:{
                    type:"car",
                    seats:5,
                    length:1.2
                }
            },
            {
                driver:{
                    name:"Abc Def",
                    dob:"1980-01-01",
                    sex:"F",
                    password:"00000",
                    licenseNo:"abcde"
                },
                vehicle:{
                    type:"bus",
                    seats:100,
                    length:20
                }
            }

        ],
        result:true
    },
    {
        schema:"fleet",
        id:"invalid",
        data:[
            {
                driver:{
                    name:"Abc",
                    dob:"1900-01-01",
                    sex:"M",
                    password:"12345",
                    licenseNo:"abcde"
                },
                vehicle:{
                    type:"car",
                    seats:-5,
                    length:1.2
                }
            },
            {
                driver:{
                    name:"Abc Def",
                    dob:"1980-01-01",
                    sex:"F",
                    password:"00000",
                    licenseNo:"abcde"
                },
                vehicle:{
                    type:"bus",
                    seats:100,
                    length:20
                }
            }

        ],
        result:false
    },
    {
        schema:"fleet",
        id:"multiple-failure",
        data:[
            {
                driver:{
                    name:"Abc !!!",
                    dob:"2100-01-01",
                    sex:"-",
                    password:"",
                    licenseNo:"     "
                },
                vehicle:{
                    type:"none",
                    seats:-5,
                    length:-1
                }
            },
            {
                driver:{
                    name:"Abc !!!",
                    dob:"2100-01-01",
                    sex:"-",
                    password:"",
                    licenseNo:"     "
                },
                vehicle:{
                    type:"none",
                    seats:-5,
                    length:-1
                }
            },
        ],
        result:false
    }

]

export const testCases = _testCases