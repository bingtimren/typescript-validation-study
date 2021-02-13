import Ajv, { _,KeywordCxt } from "ajv"

export default function (ajv: Ajv) {
    ajv.addKeyword({
        keyword: "olderThanFromNow",
        type: "string", // evaluates against string
        schemaType: "number", // must receive a number
        code(ctx: KeywordCxt) {
            const { data, schema } = ctx;
            ctx.fail(_`Date.now() - (new Date(${data})).getTime() <= ${schema}`)  // code generation
        }
    })
};
