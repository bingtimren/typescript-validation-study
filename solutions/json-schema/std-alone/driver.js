"use strict";
exports.validateObject = validate12;
const schema30 = {"$id":"driver.json","$schema":"http://json-schema.org/draft-07/schema","title":"Driver","description":"Driver","type":"object","allOf":[{"$ref":"person.json"},{"properties":{"licenseNo":{"type":"string","minLength":3,"maxLength":30,"pattern":"^[a-zA-Z]+$"}},"required":["licenseNo"]}]};
const schema27 = {"$id":"person.json","$schema":"http://json-schema.org/draft-07/schema#","title":"Person","description":"A Person","type":"object","additionalProperties":true,"properties":{"name":{"type":"string","minLength":3,"maxLength":20,"pattern":"[a-z A-Z ]+"},"dob":{"type":"string","anyOf":[{"format":"date"},{"format":"date-time"}],"olderThanFromNow":567648000000},"sex":{"type":"string","enum":["M","F","O"]},"password":{"type":"string","minLength":5}},"required":["name","dob","password"]};
const func4 = require("ajv/dist/compile/ucs2length").default;
const func0 = require("ajv/dist/compile/equal");
const pattern0 = new RegExp("[a-z A-Z ]+", "u");
const pattern3 = new RegExp("^[a-zA-Z]+$", "u");
const formats0 = require("ajv-formats/dist/formats").fullFormats.date;
const formats2 = require("ajv-formats/dist/formats").fullFormats["date-time"];

function validate12(data, {dataPath="", parentData, parentDataProperty, rootData=data}={}){
/*# sourceURL="driver.json" */;
let vErrors = null;
let errors = 0;
if(!(data && typeof data == "object" && !Array.isArray(data))){
const err0 = {keyword:"type",dataPath,schemaPath:"#/type",params:{type: "object"},message:"should be object"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
const _errs0 = errors;
const _errs1 = errors;
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.name === undefined){
const err1 = {keyword:"required",dataPath,schemaPath:"person.json/required",params:{missingProperty: "name"},message:"should have required property '"+"name"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.dob === undefined){
const err2 = {keyword:"required",dataPath,schemaPath:"person.json/required",params:{missingProperty: "dob"},message:"should have required property '"+"dob"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.password === undefined){
const err3 = {keyword:"required",dataPath,schemaPath:"person.json/required",params:{missingProperty: "password"},message:"should have required property '"+"password"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
const _errs2 = errors;
if(data.name !== undefined){
let data0 = data.name;
const _errs3 = errors;
if(typeof data0 === "string"){
if(func4(data0) > 20){
const err4 = {keyword:"maxLength",dataPath:dataPath+"/name",schemaPath:"person.json/properties/name/maxLength",params:{limit: 20},message:"should NOT have more than 20 characters"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(func4(data0) < 3){
const err5 = {keyword:"minLength",dataPath:dataPath+"/name",schemaPath:"person.json/properties/name/minLength",params:{limit: 3},message:"should NOT have fewer than 3 characters"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(!pattern0.test(data0)){
const err6 = {keyword:"pattern",dataPath:dataPath+"/name",schemaPath:"person.json/properties/name/pattern",params:{pattern: "[a-z A-Z ]+"},message:"should match pattern \""+"[a-z A-Z ]+"+"\""};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
else {
const err7 = {keyword:"type",dataPath:dataPath+"/name",schemaPath:"person.json/properties/name/type",params:{type: "string"},message:"should be string"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
var valid2 = _errs3 === errors;
}
if(data.dob !== undefined){
let data1 = data.dob;
const _errs4 = errors;
const _errs5 = errors;
let valid3 = false;
const _errs6 = errors;
if((typeof data1 == "number") && (isFinite(data1))){
}
if(typeof data1 === "string"){
if(!(formats0.validate(data1))){
const err8 = {keyword:"format",dataPath:dataPath+"/dob",schemaPath:"person.json/properties/dob/anyOf/0/format",params:{format: "date"},message:"should match format \""+"date"+"\""};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
var _valid0 = _errs6 === errors;
valid3 = valid3 || _valid0;
if(!valid3){
const _errs7 = errors;
if((typeof data1 == "number") && (isFinite(data1))){
}
if(typeof data1 === "string"){
if(!(formats2.validate(data1))){
const err9 = {keyword:"format",dataPath:dataPath+"/dob",schemaPath:"person.json/properties/dob/anyOf/1/format",params:{format: "date-time"},message:"should match format \""+"date-time"+"\""};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
var _valid0 = _errs7 === errors;
valid3 = valid3 || _valid0;
if(!valid3){
}
}
if(!valid3){
const err10 = {keyword:"anyOf",dataPath:dataPath+"/dob",schemaPath:"person.json/properties/dob/anyOf",params:{},message:"should match some schema in anyOf"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
else {
errors = _errs5;
if(vErrors !== null){
if(_errs5){
vErrors.length = _errs5;
}
else {
vErrors = null;
}
}
}
if(typeof data1 === "string"){
if(Date.now() - (new Date(data1)).getTime() <= 567648000000){
const err11 = {keyword:"olderThanFromNow",dataPath:dataPath+"/dob",schemaPath:"person.json/properties/dob/olderThanFromNow",params:{},message:"should pass \"olderThanFromNow\" keyword validation"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
else {
const err12 = {keyword:"type",dataPath:dataPath+"/dob",schemaPath:"person.json/properties/dob/type",params:{type: "string"},message:"should be string"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
var valid2 = _errs4 === errors;
}
if(data.sex !== undefined){
let data2 = data.sex;
const _errs8 = errors;
if(typeof data2 !== "string"){
const err13 = {keyword:"type",dataPath:dataPath+"/sex",schemaPath:"person.json/properties/sex/type",params:{type: "string"},message:"should be string"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
const vSchema0 = schema27.properties.sex.enum;
if(!(((data2 === "M") || (data2 === "F")) || (data2 === "O"))){
const err14 = {keyword:"enum",dataPath:dataPath+"/sex",schemaPath:"person.json/properties/sex/enum",params:{allowedValues: schema27.properties.sex.enum},message:"should be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
var valid2 = _errs8 === errors;
}
if(data.password !== undefined){
let data3 = data.password;
const _errs9 = errors;
if(typeof data3 === "string"){
if(func4(data3) < 5){
const err15 = {keyword:"minLength",dataPath:dataPath+"/password",schemaPath:"person.json/properties/password/minLength",params:{limit: 5},message:"should NOT have fewer than 5 characters"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
else {
const err16 = {keyword:"type",dataPath:dataPath+"/password",schemaPath:"person.json/properties/password/type",params:{type: "string"},message:"should be string"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
var valid2 = _errs9 === errors;
}
}
else {
const err17 = {keyword:"type",dataPath,schemaPath:"person.json/type",params:{type: "object"},message:"should be object"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
var valid1 = _errs1 === errors;
var valid0 = _errs0 === errors;
const _errs10 = errors;
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.licenseNo === undefined){
const err18 = {keyword:"required",dataPath,schemaPath:"#/allOf/1/required",params:{missingProperty: "licenseNo"},message:"should have required property '"+"licenseNo"+"'"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
if(data.licenseNo !== undefined){
let data4 = data.licenseNo;
const _errs11 = errors;
if(typeof data4 === "string"){
if(func4(data4) > 30){
const err19 = {keyword:"maxLength",dataPath:dataPath+"/licenseNo",schemaPath:"#/allOf/1/properties/licenseNo/maxLength",params:{limit: 30},message:"should NOT have more than 30 characters"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
if(func4(data4) < 3){
const err20 = {keyword:"minLength",dataPath:dataPath+"/licenseNo",schemaPath:"#/allOf/1/properties/licenseNo/minLength",params:{limit: 3},message:"should NOT have fewer than 3 characters"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
if(!pattern3.test(data4)){
const err21 = {keyword:"pattern",dataPath:dataPath+"/licenseNo",schemaPath:"#/allOf/1/properties/licenseNo/pattern",params:{pattern: "^[a-zA-Z]+$"},message:"should match pattern \""+"^[a-zA-Z]+$"+"\""};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
else {
const err22 = {keyword:"type",dataPath:dataPath+"/licenseNo",schemaPath:"#/allOf/1/properties/licenseNo/type",params:{type: "string"},message:"should be string"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
var valid4 = _errs11 === errors;
}
}
var valid0 = _errs10 === errors;
validate12.errors = vErrors;
return errors === 0;
}