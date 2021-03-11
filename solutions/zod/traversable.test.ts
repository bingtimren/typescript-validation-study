import {fleetSchema, driverSchema} from "./schemas"

describe("Zod schema traversable test", ()=>{
    it("is able to determine that type of fleet is an array, and driver is an object", ()=>{
        expect(fleetSchema._def.t).toBe("array");
        expect(driverSchema._def.t).toBe("object");
    });
    it("is able to find the item type of fleet schema (object)", ()=>{
        expect(fleetSchema._def.type._def.t).toBe("object")
    });
    it("is further able to find all keys in the item object of fleet schema", ()=>{
        const shapeObj = fleetSchema._def.type.shape;
        expect(Object.keys(shapeObj).length).toBe(2);
        expect(Object.keys(shapeObj)).toContain("driver");
        expect(Object.keys(shapeObj)).toContain("vehicle");
    });
})