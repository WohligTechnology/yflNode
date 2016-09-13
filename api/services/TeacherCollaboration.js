var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var uniqueValidator = require('mongoose-unique-validator');
var timestamps = require('mongoose-timestamp');
var validators = require('mongoose-validators');
var monguurl = require('monguurl');
require('mongoose-middleware').initialize(mongoose);

var Schema = mongoose.Schema;

var schema = new Schema({
  firstName : {
    type : String,
    required : true
  },
  middleName : String,
  lastName : {
    type : String,
    required : true
  },
  address1 : String,
  address2 : String,
  pincode : Number,
  nationally : String,
  email : {
    type : String,
    validate : validators.isEmail(),
    unique : true,
    required : true
  },
  mobileNumber : {
    type : Number,
    required : true
  },
  landlineNumber : Number,
  organizationName : {
    type : String,
    required : true
  },
  typeOfYoga : String,
  amenities  : {
    type : [String],
    required : true
  },
  styleOfYoga : [String],
  listTeacher : String,
  expInYoga : String,
  teachingLevel : {
    type : [String],
    required : true
  },
  officialWebsiteAddress : String,
  facebook : String,
  instagram : String,
  isActiveSocial : {
    type : String,
    required : true
  },
  listBranches : String,
  termsConditions : Boolean
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('TeacherCollaboration', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
