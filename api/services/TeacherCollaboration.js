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
  address : String,
  age : {
    type : Number,
    required : true
  },
  nationally : String,
  email : {
    type : String,
    validate : validators.isEmail(),
    unique : true,
    required : true
  },
  phoneNumber : Number,
  certifiedYogaTeacher : {
    type : String,
    required : true
  },
  otherQualifications : {
    type : String,
    required : true
  },
  professionalExperience : {
    type : String,
    required : true
  },
  specialisation : {
    type : String,
    required : true
  },
  teachingLevel : {
    type : String,
    enum : ["Beginner","Intermediate","Advanced","Open level"],
    required : true
  },
  chargePerSession : String,
  affiliatedStudios : String,
  expInYoga : String,
  officialWebsiteAddress : String,
  facebook : String,
  instagram : String,
  isActiveSocial : {
    type : String,
    required : true
  },
  usePlatform : {
    type : Boolean,
    required : true
  },
  freeSchedule : {
    type : String,
    required : true
  },
  feedback : String
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('TeacherCollaboration', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
