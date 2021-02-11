# typescript-validation-study
Study of various typescript data validation solutions

## Why?
- Typescript type checking only occur at compile time. 
- Type information is not available at run-time
- Protection is needed at runtime (user input from GUI, received from API)

## Evaluation Goals
I wish to find a solution that satisfy the following goals:
- DRY - don't repeat yourself, data schema / type shall be defined only once and then enable both static (compile time) and runtime checking. Since the requirement of runtime validation is more specific than the typing system (e.g. maximum length of string, string pattern, etc.), it's often the validation schema is converted to the typescript types (losing some fine-grained constraints). 
- Extensible (Composable & Extensible) - if data types are related, e.g. composition (one data type is the part of another), inheritance (one data type is the base of another), the solution shall allow such relationship so as not to repeat the codes
- Fine-grained - enables validations similar to https://json-schema.org/draft/2019-09/json-schema-validation.html
- Form-friendly - if the validation is friendly to UI forms, i.e. validate multiple fields, and give meaningful information
- Failfast - for backend validation, fail at first violation
- Combinable - allows multiple validators on same node (AND), or even better, allows a logic expression
- Customizable - allows custom validators
- Traversable - runtime schema can be traversed at runtime
- Standard - if the schema / type defining language is a standard and supported by a community

## Example Problem and Test Criteria

I validate the following entities with each of the solutions.

Person:
  - name: required, string, length 3~20, pattern /[a-z A-Z ]+/ (tests Find-grained, Form-friendly (reports actual length), Combinable / Customizable
  - dob: date, required, < now-18 (tests Fine-grained, Combinable / Customizable)
  - sex: optional, 'M', 'F', 'O'
  - password: not null, string, length >= 5

PersonForm:
  extends Person (tests Extensible)
  - repeatPassword: same as password (Customisable, Form-friendly)

Driver:
  extends Person (tests Extensible)
  - licenseNo: string, length 3~30, pattern /^[a-zA-Z]+$/

Vehicle:
  - type: 'car','bus' (DRY)
  - seats: number, integer, >=1
  - length: number, >0

Fleet: (tests Composable)
  [{
    driver: Driver,
    vehicle: Vehicle
  }]

## Test Method

I implement validators using each of the tested solutions to validate the above entities. Find them in [/solutions](/solutions).

Each module in the "solutions" dir exports a set of validators. I use them to validate the same set of [data](/validation-data.ts). Each solution needs to pass all the tests. To run the tests, execute `npm t`. While running the tests, the schemas are also compiled into typescript types, and you can find those in each solution's respective folders. Check the "pre" run script in [package.json](package.json).

To examine if the validation result contains all the information for UI form, I used a "fleet" instance as example. Every items and fields of that instance have validation errors. The returned object should describe the problems in full. Run `npm run inspect` to examine the returned error object by each solution in checking that "fleet" instance.

## Results


### io-ts

Reference: https://medium.com/swlh/typescript-runtime-validation-with-io-ts-456f095b7f86


| Goal | Achieved | Comment |
| ---  | -------- | ------- |
| DRY | Yes | Define run-time type, extract corresponding static type |
| Composable | Yes | Defined run-time types can be used as building blocks for other types |
| Extensible |  Yes | Use 'pipe' to add properties |
| Fine-grained |  Yes/no | Not out-of-box, but can write custom decoders |
| Combinable | Yes | Uses 'pipe' to combine multiple validators |
| Form-friendly | Yes-but | Look at the returned object, all errors about all nodes of the data are there. However the useful information is buried in a myriad of wrappers and difficult to use. There is a default error reporter that is able to retrieve the information and organize in a meaningful way, meaning utilization of the information is possible, but more work needs to be done. |
| Fail-fast | No | The decoder does not stop at first error |
| Customizable | Yes | Can write custom decoders, refines, etc. |
| Traversable | No | The realtime type is a decoder, with a decode function |
| Standard | No | Realtime type defined with io-ts |

Comment:

To use io-ts also means to use at least some basic fp-ts and functional programming.

### Joi

Can it work on both back-end and front-end? One user [said](https://www.reddit.com/r/reactjs/comments/awluya/reusable_validation_at_serverside_and_frontend/) "I used shared joi schema on backend, web frontend and react-native app. In the end I ditched it, because it's super heavy and requires joi-browser and some extra hacking to work on client side."

| Goal | Achieved | Comment |
| ---  | -------- | ------- |
| DRY | Yes* | With joi-to-typescript, Joi schema can be used to generate typescript types (code generation)  |
| Composable | Yes | |
| Extensible | Yes | |
| Fine-grained | Yes | |
| Combinable | Yes | |
| Form-friendly | Yes | There is an "abortEarly" option    |
| Fail-fast | Yes | |
| Customizable | Yes | |
| Traversable | Maybe | Didn't really check. |
| Standard | Kind-of | Joi is hugely popular |


Comment:

Joi is hugely popular so there's an ecosystem around it.
Some says it's heavy and not front-end friendly. The same post suggests yup.
There are joi browser and joi vue integration packages out there, not sure how it works.


### json-schema based

JSON schema is a standard and has the support of an ecosystem - tools, libraries, tutorials, etc.

In my test I used:

- ajv : used as JSON Schema validator
- json-schema-to-typescript : produce typescript types (Note: be careful of a bug that overwrite source file https://github.com/bcherny/json-schema-to-typescript/issues/365)

| Goal | Achieved | Comment |
| ---  | -------- | ------- |
| DRY | Yes | The conversion works well |
| Composable | Yes | With "$ref" JSON schema can be composed. See [https://json-schema.org/understanding-json-schema/structuring.html] |
| Extensible | Yes | Although not in an typical OO way such as "extends", but to use "allOf", it works |
| Fine-grained | Yes | Has a rich keywords for defining fine-grained constraints |
| Combinable | Yes | Multiple keywords can be added to single data point, and "allOf" can also be used  |
| Form-friendly | Yes | Through an option "allErrors: true" |
| Fail-fast | Yes | Option "allErrors: false" |
| Customizable | Yes | See [user defined keywords](https://ajv.js.org/docs/keywords.html) for details. Keywords can be defined with code generation, validation function, compilation function, and macro function. However the document is a bit vague and code generation is difficult to debug, maybe only suitable for simple implementations. See an example in [index.ts](/solutions/json-schema/index.ts).  |
| Traversable | Yes | JSON schema is a JSON itself |
| Standard | Yes | |


Comment:

This solution ticks all the boxes. Plus ajv claim to be the fastest among all JSON schema validators and works well in both backend and frontend. 

My experience working with this solution is:

Yes it's powerful, once you figure out how to do things. Also there are a lot of tools out there help you write your schema. However when something went wrong with the schema, sometimes the error message returned from ajv is vague and does not give the location of the error, leaves me scratching my head. To define custom validation keywords with code generation is not intuitive and if things go wrong, it can be difficult to debug (due to the nature of code generation). Nevertheless other methods are provided. 

My overall experience is json-schema (ajv) is not as easy to use as joi. That's said, ajv claim to work well on both front and back end, while there are complaints about joi on frontend (not verified myself). Both ajv and joi should be powerful enough to satisfy most validation needs.


### mongoose + ts-mongoose

References:

https://hackernoon.com/how-to-link-mongoose-and-typescript-for-a-single-source-of-truth-94o3uqc


| Goal | Achieved | Comment |
| ---  | -------- | ------- |
| DRY | Yes | With additional ts-mongoose type can be extracted |
| Composable | | |
| Extensible | | |
| Fine-grained | | |
| Combinable | | |
| Form-friendly | | |
| Fail-fast | | |
| Customizable | | |
| Traversable | | |
| Standard | | |


Comment:

Didn't finish this research. Mongoose is too tightly coupled with mongodb. Did not find a way to validate data without attempt to save it. Not a suitable candidate.







### template



| Goal | Achieved | Comment |
| ---  | -------- | ------- |
| DRY | | |
| Composable | | |
| Extensible | | |
| Fine-grained | | |
| Combinable | | |
| Form-friendly | | |
| Fail-fast | | |
| Customizable | | |
| Traversable | | |
| Standard | | |


Comment:




## Reference and credits

Reference: https://learning-notes.mistermicheels.com/javascript/typescript/runtime-type-checking/
