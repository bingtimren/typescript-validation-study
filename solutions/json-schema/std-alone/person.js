"use strict";
exports.validateObject = validate10;
const schema27 = {"$id":"person.json","$schema":"http://json-schema.org/draft-07/schema#","title":"Person","description":"A Person","type":"object","additionalProperties":true,"properties":{"name":{"type":"string","minLength":3,"maxLength":20,"pattern":"[a-z A-Z ]+"},"dob":{"type":"string","anyOf":[{"format":"date"},{"format":"date-time"}],"olderThanFromNow":567648000000},"sex":{"type":"string","enum":["M","F","O"]},"password":{"type":"string","minLength":5}},"required":["name","dob","password"]};
const func4 = require("ajv/dist/compile/ucs2length").default;
const func0 = require("ajv/dist/compile/equal");
const pattern0 = new RegExp("[a-z A-Z ]+", "u");
const formats0 = require("ajv-formats/dist/formats").fullFormats.date;
const formats2 = require("ajv-formats/dist/formats").fullFormats["date-time"];

function validate10(data, {dataPath="", parentData, parentDataProperty, rootData=data}={}){
/*# sourceURL="person.json" */;
let vErrors = null;
let errors = 0;
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.name === undefined){
const err0 = {keyword:"required",dataPath,schemaPath:"#/required",params:{missingProperty: "name"},message:"should have required property '"+"name"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.dob === undefined){
const err1 = {keyword:"required",dataPath,schemaPath:"#/required",params:{missingProperty: "dob"},message:"should have required property '"+"dob"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.password === undefined){
const err2 = {keyword:"required",dataPath,schemaPath:"#/required",params:{missingProperty: "password"},message:"should have required property '"+"password"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
const _errs0 = errors;
if(data.name !== undefined){
let data0 = data.name;
const _errs1 = errors;
if(typeof data0 === "string"){
if(func4(data0) > 20){
const err3 = {keyword:"maxLength",dataPath:dataPath+"/name",schemaPath:"#/properties/name/maxLength",params:{limit: 20},message:"should NOT have more than 20 characters"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(func4(data0) < 3){
const err4 = {keyword:"minLength",dataPath:dataPath+"/name",schemaPath:"#/properties/name/minLength",params:{limit: 3},message:"should NOT have fewer than 3 characters"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(!pattern0.test(data0)){
const err5 = {keyword:"pattern",dataPath:dataPath+"/name",schemaPath:"#/properties/name/pattern",params:{pattern: "[a-z A-Z ]+"},message:"should match pattern \""+"[a-z A-Z ]+"+"\""};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
}
else {
const err6 = {keyword:"type",dataPath:dataPath+"/name",schemaPath:"#/properties/name/type",params:{type: "string"},message:"should be string"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
var valid0 = _errs1 === errors;
}
if(data.dob !== undefined){
let data1 = data.dob;
const _errs2 = errors;
const _errs3 = errors;
let valid1 = false;
const _errs4 = errors;
if((typeof data1 == "number") && (isFinite(data1))){
}
if(typeof data1 === "string"){
if(!(formats0.validate(data1))){
const err7 = {keyword:"format",dataPath:dataPath+"/dob",schemaPath:"#/properties/dob/anyOf/0/format",params:{format: "date"},message:"should match format \""+"date"+"\""};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
var _valid0 = _errs4 === errors;
valid1 = valid1 || _valid0;
if(!valid1){
const _errs5 = errors;
if((typeof data1 == "number") && (isFinite(data1))){
}
if(typeof data1 === "string"){
if(!(formats2.validate(data1))){
const err8 = {keyword:"format",dataPath:dataPath+"/dob",schemaPath:"#/properties/dob/anyOf/1/format",params:{format: "date-time"},message:"should match format \""+"date-time"+"\""};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
var _valid0 = _errs5 === errors;
valid1 = valid1 || _valid0;
if(!valid1){
}
}
if(!valid1){
const err9 = {keyword:"anyOf",dataPath:dataPath+"/dob",schemaPath:"#/properties/dob/anyOf",params:{},message:"should match some schema in anyOf"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
else {
errors = _errs3;
if(vErrors !== null){
if(_errs3){
vErrors.length = _errs3;
}
else {
vErrors = null;
}
}
}
if(typeof data1 === "string"){
if(Date.now() - (new Date(data1)).getTime() <= 567648000000){
const err10 = {keyword:"olderThanFromNow",dataPath:dataPath+"/dob",schemaPath:"#/properties/dob/olderThanFromNow",params:{},message:"should pass \"olderThanFromNow\" keyword validation"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
else {
const err11 = {keyword:"type",dataPath:dataPath+"/dob",schemaPath:"#/properties/dob/type",params:{type: "string"},message:"should be string"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
var valid0 = _errs2 === errors;
}
if(data.sex !== undefined){
let data2 = data.sex;
const _errs6 = errors;
if(typeof data2 !== "string"){
const err12 = {keyword:"type",dataPath:dataPath+"/sex",schemaPath:"#/properties/sex/type",params:{type: "string"},message:"should be string"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
const vSchema0 = schema27.properties.sex.enum;
if(!(((data2 === "M") || (data2 === "F")) || (data2 === "O"))){
const err13 = {keyword:"enum",dataPath:dataPath+"/sex",schemaPath:"#/properties/sex/enum",params:{allowedValues: schema27.properties.sex.enum},message:"should be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
var valid0 = _errs6 === errors;
}
if(data.password !== undefined){
let data3 = data.password;
const _errs7 = errors;
if(typeof data3 === "string"){
if(func4(data3) < 5){
const err14 = {keyword:"minLength",dataPath:dataPath+"/password",schemaPath:"#/properties/password/minLength",params:{limit: 5},message:"should NOT have fewer than 5 characters"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
else {
const err15 = {keyword:"type",dataPath:dataPath+"/password",schemaPath:"#/properties/password/type",params:{type: "string"},message:"should be string"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
var valid0 = _errs7 === errors;
}
}
else {
const err16 = {keyword:"type",dataPath,schemaPath:"#/type",params:{type: "object"},message:"should be object"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
validate10.errors = vErrors;
return errors === 0;
}
