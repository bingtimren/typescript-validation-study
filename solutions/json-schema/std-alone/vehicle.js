"use strict";
exports.validateObject = validate13;
const schema32 = {"$id":"vehicle.json","$schema":"http://json-schema.org/draft-07/schema","title":"Vehicle","description":"Vehicle","type":"object","properties":{"type":{"type":"string","enum":["car","bus"]},"seats":{"type":"integer","minimum":1},"length":{"type":"number","minimum":0}},"required":["type","seats","length"]};
const func0 = require("ajv/dist/compile/equal");

function validate13(data, {dataPath="", parentData, parentDataProperty, rootData=data}={}){
/*# sourceURL="vehicle.json" */;
let vErrors = null;
let errors = 0;
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.type === undefined){
const err0 = {keyword:"required",dataPath,schemaPath:"#/required",params:{missingProperty: "type"},message:"should have required property '"+"type"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.seats === undefined){
const err1 = {keyword:"required",dataPath,schemaPath:"#/required",params:{missingProperty: "seats"},message:"should have required property '"+"seats"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.length === undefined){
const err2 = {keyword:"required",dataPath,schemaPath:"#/required",params:{missingProperty: "length"},message:"should have required property '"+"length"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.type !== undefined){
let data0 = data.type;
const _errs0 = errors;
if(typeof data0 !== "string"){
const err3 = {keyword:"type",dataPath:dataPath+"/type",schemaPath:"#/properties/type/type",params:{type: "string"},message:"should be string"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
const vSchema0 = schema32.properties.type.enum;
if(!((data0 === "car") || (data0 === "bus"))){
const err4 = {keyword:"enum",dataPath:dataPath+"/type",schemaPath:"#/properties/type/enum",params:{allowedValues: schema32.properties.type.enum},message:"should be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
var valid0 = _errs0 === errors;
}
if(data.seats !== undefined){
let data1 = data.seats;
const _errs1 = errors;
if(!(((typeof data1 == "number") && (!(data1 % 1) && !isNaN(data1))) && (isFinite(data1)))){
const err5 = {keyword:"type",dataPath:dataPath+"/seats",schemaPath:"#/properties/seats/type",params:{type: "integer"},message:"should be integer"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if((typeof data1 == "number") && (isFinite(data1))){
if(data1 < 1 || isNaN(data1)){
const err6 = {keyword:"minimum",dataPath:dataPath+"/seats",schemaPath:"#/properties/seats/minimum",params:{comparison: ">=", limit: 1},message:"should be >= 1"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
var valid0 = _errs1 === errors;
}
if(data.length !== undefined){
let data2 = data.length;
const _errs2 = errors;
if((typeof data2 == "number") && (isFinite(data2))){
if(data2 < 0 || isNaN(data2)){
const err7 = {keyword:"minimum",dataPath:dataPath+"/length",schemaPath:"#/properties/length/minimum",params:{comparison: ">=", limit: 0},message:"should be >= 0"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
else {
const err8 = {keyword:"type",dataPath:dataPath+"/length",schemaPath:"#/properties/length/type",params:{type: "number"},message:"should be number"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
var valid0 = _errs2 === errors;
}
}
else {
const err9 = {keyword:"type",dataPath,schemaPath:"#/type",params:{type: "object"},message:"should be object"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
validate13.errors = vErrors;
return errors === 0;
}
