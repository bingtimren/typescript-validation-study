import Ajv, { _, KeywordCxt } from "ajv"
import { DataValidationCxt } from "ajv/dist/types"

export default function (ajv: Ajv) {
    ajv.addKeyword({
        keyword: "olderThanFromNow",
        type: "string", // evaluates against string
        schemaType: "number", // must receive a number
        code(ctx: KeywordCxt) {
            const { data, schema } = ctx;
            ctx.fail(_`Date.now() - (new Date(${data})).getTime() <= ${schema}`)  // code generation
        }
    });
    ajv.addKeyword({
        keyword: "toDate",
        schema: false,
        modifying: true,
        type: "string", // evaluates against string
        validate: function (value: any, ctx?: DataValidationCxt) {
            if (typeof value === "string" && ctx !== undefined)
                ctx.parentData[ctx.parentDataProperty] = new Date(value);
            return true;
        }
    });
};
