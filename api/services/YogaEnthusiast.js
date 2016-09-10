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
  address : String,
  age : {
    type : Number,
    required : true
  },
  nationally : String,
  email : {
    type : String,
    validate : validators.isEmail(),
    required : true
  },
  phoneNumber : Number,
  qualifications : {
    type : String,
    required : true
  },
  specialisation : {
    type : String,
    required : true
  },
  expInYoga : String,
  contribute : String,
  feedback : String
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('YogaEnthusiast', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
