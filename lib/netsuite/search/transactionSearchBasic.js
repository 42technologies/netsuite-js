'use strict';

var util = require('util'),
  SearchRecord = require('./searchRecord');

/**
 * https://system.netsuite.com/help/helpcenter/en_US/srbrowser/Browser2014_2/schema/search/TransactionSearchBasic.html?mode=package
 *
 * @class
 * @extends SearchRecord
 * @return {TransactionSearchBasic}
 */
var TransactionSearchBasic = module.exports = function TransactionSearchBasic() {
  SearchRecord.call(this);
};

util.inherits(TransactionSearchBasic, SearchRecord);

/**
 * @override
 */
TransactionSearchBasic.prototype.getAttributes = function() {
  var attrs = {
    'xsi:type': 'platformCommon:TransactionSearchBasic'
  };

  return attrs;
};

/**
 * @override
 */
TransactionSearchBasic.prototype.getXml = function() {
  var xml = '';
  this.searchFields.forEach(function(searchField) {
    xml += searchField.getXml();
  });

  return xml;
};
