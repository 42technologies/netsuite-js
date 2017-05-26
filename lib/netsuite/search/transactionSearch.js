'use strict';

var util = require('util'),
  SearchRecord = require('./searchRecord');

/**
 * https://system.netsuite.com/help/helpcenter/en_US/srbrowser/Browser2014_2/schema/search/TransactionSearch.html?mode=package
 *
 * @class
 * @extends SearchRecord
 * @return {TransactionSearch}
 */
var TransactionSearch = module.exports = function TransactionSearch() {
  SearchRecord.call(this);

  // Strangely, inherits from SearchRecord but does NOT have a `searchFields` field.
  // Instead has a `criteria` ItemSearch field
  delete this.searchFields;

  /**
   * @member {TransactionSearchBasic} Search basic
   */
  this.basic = undefined;
};

util.inherits(TransactionSearch, SearchRecord);

/**
 * @override
 */
TransactionSearch.prototype.getAttributes = function() {
  var attrs = {
    'xsi:type': 'tranSales:TransactionSearch'
  };

  return attrs;
};

/**
 * @override
 */
TransactionSearch.prototype.getXml = function() {
  // Need to override in a different way than parent `SearchRecord`
  var xml = [];

  if (this.basic) {
    xml.push('<tranSales:basic>');
    xml.push(this.basic.getXml());
    xml.push('</tranSales:basic>');
  }

  return xml.join('');
};
