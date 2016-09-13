var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var uniqueValidator = require('mongoose-unique-validator');
var timestamps = require('mongoose-timestamp');
var validators = require('mongoose-validators');
var monguurl = require('monguurl');
var md5 = require('md5');
require('mongoose-middleware').initialize(mongoose);

var Schema = mongoose.Schema;

var schema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  accesslevel: {
    type: Number,
    default: ""
  }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Register', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
  login: function(data, callback) {
    data.password = md5(data.password);
    Register.findOne({
      email: data.email,
      password: data.password
    }, function(err, data2) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        if (_.isEmpty(data2)) {
          Register.findOne({
            email: data.email,
            forgotpassword: data.password
          }, function(err, data4) {
            if (err) {
              console.log(err);
              callback(err, null);
            } else {
              if (_.isEmpty(data4)) {
                callback(null, {
                  comment: "User Not Found"
                });
              } else {
                Register.findOneAndUpdate({
                  _id: data4._id
                }, {
                  password: data.password,
                  forgotpassword: ""
                }, function(err, data5) {
                  if (err) {
                    console.log(err);
                    callback(err, null);
                  } else {
                    data5.password = "";
                    data5.forgotpassword = "";
                    callback(null, data5);
                  }
                });
              }
            }
          });
        } else {
          Register.findOneAndUpdate({
            _id: data2._id
          }, {
            forgotpassword: ""
          }, function(err, data3) {
            if (err) {
              console.log(err);
              callback(err, null);
            } else {
              data3.password = "";
              data3.forgotpassword = "";
              callback(null, data3);
            }
          });
        }
      }
    });
  },
  saveLoginData: function(data, callback) {
   console.log(data);
   if (data.password && data.password != "") {
       data.password = md5(data.password);
   }
   var register = this(data);
   if (data._id) {
     this.findOneAndUpdate({
       _id: data._id
     }, data).exec(function(err, updated) {
       if (err) {
         console.log(err);
         callback(err, null);
       } else if (updated) {
         callback(null, updated);
       } else {
         callback(null, {});
       }
     });
   } else {
     register.save(function(err, created) {
       if (err) {
         callback(err, null);
       } else if (created) {
         callback(null, created);
       } else {
         callback(null, {});
       }
     });
   }
 }
};
module.exports = _.assign(module.exports, exports, model);
