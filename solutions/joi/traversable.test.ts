import {FleetSchema, DriverSchema} from "./schemas"

describe("Joi schema traversable test", ()=>{
    it("is able to determine that type of fleet is an array, and driver is an object", ()=>{
        expect(FleetSchema.describe().type).toBe("array"),
        expect(DriverSchema.describe().type).toBe("object")
    });
    it("is able to find the item type of fleet schema (object)", ()=>{
        expect(FleetSchema.describe().items[0].type).toBe("object")
    });
    it("is further able to find all keys in the item object of fleet schema", ()=>{
        expect(Object.keys(FleetSchema.describe().items[0].keys).length).toBe(2);
        expect(Object.keys(FleetSchema.describe().items[0].keys)).toContain("driver");
        expect(Object.keys(FleetSchema.describe().items[0].keys)).toContain("vehicle");
    });
})