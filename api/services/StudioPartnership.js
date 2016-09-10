var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var uniqueValidator = require('mongoose-unique-validator');
var timestamps = require('mongoose-timestamp');
var validators = require('mongoose-validators');
var monguurl = require('monguurl');
require('mongoose-middleware').initialize(mongoose);

var Schema = mongoose.Schema;

var schema = new Schema({
  name : {
    type : String,
    required : true
  },
  desc : {
    type : String,
    required : true
  },
  contactPerson : {
    type : String,
    required : true
  },
  phone : {
    type : Number,
    required : true,
    validate : validators.isNumeric(),
    validate : validators.isLength(8,12)
  },
  email : {
    type : String,
    required : true,
    lowercase: true,
    unique : true,
    validate : validators.isEmail()
  },
  address : String,
  city : {
    type : String,
    required : true,
    validate : validators.isLength(2,20)
  },
  amenities : {
    type : String,
    required : true
  },
  styleOfYoga : {
    type : String,
    required : true
  },
  typeOfYoga : String,
  teachersInstructors : String,
  level : {
    type : String,
    required : true
  },
  officialWebsite : {
    type : Boolean,
    required : true
  },
  websiteAddress : String,
  facebook : String,
  instagram : String,
  isActiveSocial : {
    type : String,
    required : true
  },
  branches : {
    type : Boolean,
    required : true
  },
  branchesAddress : String,
  termsConditions : Boolean
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('StudioPartnership', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
