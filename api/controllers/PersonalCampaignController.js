module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
  excelDownload: function(req, res) {
    PersonalCampaign.find().lean().exec(function(err, found) {
      // res.json({ data: found });
      // exel
      if (err) {
        res.callback(err, found);
      } else {
        Config.generateExcel("ExcelExport-", found, res);
      }

    });
  },
};
module.exports = _.assign(module.exports, controller);
