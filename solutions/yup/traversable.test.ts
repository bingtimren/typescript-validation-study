import {fleetSchema, driverSchema} from "./schemas"

describe("Joi schema traversable test", ()=>{
    it("is able to determine that type of fleet is an array, and driver is an object", ()=>{
        expect(fleetSchema.describe().type).toBe("array"),
        expect(driverSchema.describe().type).toBe("object")
    });
    it("is able to find the item type of fleet schema (object)", ()=>{
        expect(fleetSchema.describe().innerType?.type).toBe("object")
    });
    it("is further able to find all keys in the item object of fleet schema", ()=>{
        expect(Object.keys(((fleetSchema.describe().innerType as any).fields)).length).toBe(2);
        expect(Object.keys(((fleetSchema.describe().innerType as any).fields))).toContain("driver");
        expect(Object.keys(((fleetSchema.describe().innerType as any).fields))).toContain("vehicle");
    });
})