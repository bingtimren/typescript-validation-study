import {createSchema, Type, Extract, ExtractDoc, ExtractProps} from "ts-mongoose"

export const PersonSchema = createSchema(
    {
        name: Type.string({
            required : true,
        }),
        dob: Type.string(),
        sex: Type.string({
            required:true,
            enum: ['M','F'] as const,
            nonsense:"whatever" // not typed
        }),
        password: Type.string()
    }
)
// yes, can extract
export type Person = ExtractProps<typeof PersonSchema>
