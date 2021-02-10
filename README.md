# typescript-validation-study
Study of various typescript data validation solutions

## Why?
- Typescript type checking only occur at compile time. 
- Type information is not available at run-time
- Protection is needed at runtime (user input from GUI, received from API)

## Evaluation Goals
I wish to find a solution that satisfy the following goals:
- DRY - don't repeat yourself, data schema / type shall be defined only once and then enable both static (compile time) and runtime checking. 
- Extensible (Composable & Extensible) - if data types are related, e.g. composition (one data type is the part of another), inheritance (one data type is the base of another), the solution shall allow such relationship so as not to repeat the codes
- Fine-grained - enables validations similar to https://json-schema.org/draft/2019-09/json-schema-validation.html
- Form-friendly - if the validation is friendly to UI forms, i.e. validate multiple fields, and give meaningful information
- Failfast - for backend validation, fail at first violation
- Combinable - allows multiple validators on same node (AND), or even better, allows a logic expression
- Customizable - allows custom validators
- Traversable - runtime schema can be traversed at runtime
- Standard - if the schema / type defining language is a standard and supported by a community

## Example Problem and Test Criterias 

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

JSON schema has a huge ecology surrounding it. Schema defined with JSON Schema has lots of tools supporting it. 

Considerations:

For DRY requirement, there are libraries to convert from typescript to JSON Schema and reverse. Since JSON Schema is more fine-grained than typescript types (minimum length, etc.), typescript schema definition would rely on annotation, which lacks tool support. 


This test uses:

ajv : validator
json-schema-to-typescript : produce typescript types



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
