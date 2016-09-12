var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var uniqueValidator = require('mongoose-unique-validator');
var timestamps = require('mongoose-timestamp');
var validators = require('mongoose-validators');
var monguurl = require('monguurl');
require('mongoose-middleware').initialize(mongoose);

var Schema = mongoose.Schema;

var schema = new Schema({
  // Business Details
  storeName : {
    type : String,
    required : true
  },
  contactPerson : {
    type : String,
    required : true
  },
  mobileNumber : {
    type : Number,
    required : true
  },
  landlineNumber : {
    type : Number,
    required : true
  },
  primaryCategory : {
    type : String,
    required : true
  },

  // Business Address
  address1 : {
    type : String,
    required : true
  },
  address2 : String,
  city : {
    type : String,
    required : true
  },
  pincode : {
    type : Number,
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

  // VAT and CST Details
  pan : String,
  vatTin : String,
  cst : String,
  isVatCst : Boolean,

  // Choose categories you wish to sell
  booksMoviesGames : {
      type : [String],
      enum : ["Books","Movies","Musical Instruments","Music","Video Games"]
  },
  clothingShoesJewelry :{
      type : [String],
      enum : ["Clothing","Shoes","Watches","Jewelery","Luggage"]
  },
  beautyHealthGroceries : {
      type : [String],
      enum : ["Beauty","Grocery","Health","Personal Care Appliances"]
  },
  yogaProducts : [String],
  other : Boolean,
  productsFrom : {
    type : String,
    enum : ["Manufacture","Resell","Sell","Import"]
  },
  annualTurnover : {
    type : String,
    enum : ["Less-1lakh","Btwn 1-10 l","Btwn 10 l-1 c","More-1crore","unknown"]
  },
  productSell : {
    type : String,
    enum : ["1-10","11-100","101-500","More-500","unknown"]
  },
  sellOtherWebsite : Boolean,
  url : String
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('SellOnYfl', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
