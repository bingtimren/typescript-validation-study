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
- Standard - if the schema / type defining language is a standard and supported by a community

## Example Problem and Test Criterias 

Person:
  - name: not null, string, length 3~20, pattern (tests Find-grained, Form-friendly (reports actual length), Combinable / Customizable
  - dob: date, not null, < now-18 (tests Fine-grained, Combinable / Customizable)
  - password: not null, string, length > 5

PersonForm:
  extends Person (tests Extensible)
  - repeatPassword: same as password (Customisable, Form-friendly)

Driver:
  extends Person (tests Extensible)
  - licenseNo: string, length 3~30, pattern

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

| Solution | DRY | Composable | Extensible | Fine-grained | Form-friendly | Failfast | Standard |
| --- | --- | --- | --- | --- | --- | --- | --- |


## Reference and credits

Reference: https://learning-notes.mistermicheels.com/javascript/typescript/runtime-type-checking/
