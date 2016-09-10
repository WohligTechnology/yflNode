var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var uniqueValidator = require('mongoose-unique-validator');
var timestamps = require('mongoose-timestamp');
var validators = require('mongoose-validators');
var monguurl = require('monguurl');
require('mongoose-middleware').initialize(mongoose);

var Schema = mongoose.Schema;

var schema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  middleName: String,
  lastName: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: Number,
    validate: validators.isLength(10,12)
  },
  email: {
    type: String,
    validate: validators.isEmail(),
    unique: true,
    required: true
  },
  professionalExperience: String,
  restaurantName: String,
  restaurantWebsite: String,
  hometown: String,
  socialFootprint: String,
  cookingStyle: String,
  cuisine: String,
  collaborateYfl: String
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('ChefCollaboration', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
