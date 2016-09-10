var _ = require('lodash');
var mongoxlsx = require("mongo-xlsx");
module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
  excelDownload: function(req, res) {
    ExcelExport.find().lean().exec(function(err, found) {
      // res.json({ data: found });
      // exel
      if (err) {
        res.callback(err, found);
      } else {
        Config.generateExcel("ExcelExport-", found, res);
      }

    });
  },
  excelImport: function(req, res) {
    var model = null;
    var xlsx = './.tmp/excel-data.xlsx';
    mongoxlsx.xlsx2MongoData(xlsx, model, function(err, data) {
      if (err) {
        res.callback(err, data);
      } else {
        console.log(data);
        var excelData = [];
        _.map(data, function(singleData) {
          var singleExcel = {};
          _.map(singleData, function(n, key) {
            if (key != "__v" && key != "createdAt" && key != "updatedAt") {
              singleExcel[_.kebabCase(key)] = n;
            }
          });
          excelData.push(singleExcel);
        });
        console.log(excelData);
        excelData.save(function(err, data) {
          if (err) {
            res.callback(err, data);
          } else {
            console.log(data);
          }
        });
      }
    });
  }
};
module.exports = _.assign(module.exports, controller);
