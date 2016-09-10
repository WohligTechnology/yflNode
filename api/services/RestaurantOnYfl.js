var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var uniqueValidator = require('mongoose-unique-validator');
var timestamps = require('mongoose-timestamp');
var validators = require('mongoose-validators');
var monguurl = require('monguurl');
require('mongoose-middleware').initialize(mongoose);

var Schema = mongoose.Schema;

var schema = new Schema({
  // Personal Details
  firstName : {
    type : String,
    required : true
  },
  middleName : {
    type : String,
    required : true
  },
  lastName : {
    type : String,
    required : true
  },
  mobileNumber : {
    type : Number,
    required : true
  },
  landlineNumber : Number,
  email : {
    type : String,
    validate : validators.isEmail(),
    unique : true,
    required : true
  },

  // Restaurant Details
  restaurantName : {
    type : String,
    required : true
  },
  address : {
    type : String,
    required : true
  },
  zipcode : {
    type : Number,
    required : true
  },
  city : {
    type : String,
    required : true
  },
  state : {
    type : String,
    required : true
  },
  country : {
    type : String,
    required : true
  },
  resPhoneNumbers : {
    type : [Number],
    required : true
  },
  managerName : {
    type : String,
    required : true
  },
  managerNumber : {
    type : Number,
    required : true
  },
  timings : {
    type : String,
    required : true
  },
  cuisines : {
    type : String,
    required : true
  },
  avgCost : {
    type : String,
    required : true
  },

  // Facility
  homeDelivery : {
    type : Boolean,
    required : true
  },
  minOrder : {
    type : String,
    required : true
  },
  dineIn : {
    type : Boolean,
    required : true
  },
  bar : {
    type : Boolean,
    required : true
  },
  happyHours : {
    type : Boolean,
    required : true
  },
  ac : {
    type : Boolean,
    required : true
  },
  wifi : {
    type : Boolean,
    required : true
  },
  outDoorDining : {
    type : Boolean,
    required : true
  },
  liveMusic : {
    type : Boolean,
    required : true
  },
  pureVeg : {
    type : Boolean,
    required : true
  },
  creditCard : {
    type : Boolean,
    required : true
  },
  smokingArea : {
    type : Boolean,
    required : true
  },
  buffetDetails : {
    type : String,
    required : true
  },
  catering : {
    type : Boolean,
    required : true
  }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('RestaurantOnYfl', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
