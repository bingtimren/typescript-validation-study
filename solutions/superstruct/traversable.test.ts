import {fleetSchema, driverSchema} from "./schemas"

describe("Joi schema traversable test", ()=>{
    it("is able to determine that type of fleet is an array, and driver is an object", ()=>{
        expect(fleetSchema.type).toBe("array"),
        expect(driverSchema.type).toBe("object")
    });
    it("is able to find the item type of fleet schema (object)", ()=>{
        expect(fleetSchema.schema.type).toBe("object")
    });
    it("is further able to find all keys in the item object of fleet schema", ()=>{
        const shapeObj = fleetSchema.schema.schema;
        expect(Object.keys(shapeObj).length).toBe(2);
        expect(Object.keys(shapeObj)).toContain("driver");
        expect(Object.keys(shapeObj)).toContain("vehicle");
    });
})