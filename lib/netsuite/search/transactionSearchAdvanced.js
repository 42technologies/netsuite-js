'use strict';

var util = require('util'),
  SearchRecord = require('./searchRecord');

/**
 * https://system.netsuite.com/help/helpcenter/en_US/srbrowser/Browser2014_2/schema/search/customersearchadvanced.html?mode=package
 *
 * @class
 * @extends SearchRecord
 * @return {CustomerSearchAdvanced}
 */
var TransactionSearchAdvanced = module.exports = function TransactionSearchAdvanced() {
  SearchRecord.call(this);

  // Strangely, inherits from SearchRecord but does NOT have a `searchFields` field.
  // Instead has a `criteria` ItemSearch field
  delete this.searchFields;

  /**
   * @member {TransactionSearch} Search criteria
   */
  this.criteria = undefined;

  /**
   * @member {TransactionSearchRow} Columns to return
   */
  this.columns = undefined;

  /**
   * @member {String|Number}
   */
  this.savedSearchId = null;

  /**
   * @member {String|Number}
   */
  this.savedSearchScriptId = null;
};

util.inherits(TransactionSearchAdvanced, SearchRecord);

/**
 * @override
 */
TransactionSearchAdvanced.prototype.getAttributes = function() {
  var attrs = {
    'xsi:type': 'tranSales:TransactionSearchAdvanced'
  };

  if (this.savedSearchId) {
    attrs.savedSearchId = this.savedSearchId;
  }

  if (this.savedSearchScriptId) {
    attrs.savedSearchScriptId = this.savedSearchScriptId;
  }

  return attrs;
};

/**
 * @override
 */
TransactionSearchAdvanced.prototype.getUnserializablePropertyNames = function() {
  return ['savedSearchId', 'savedSearchScriptId'];
};

/**
 * @override
 */
TransactionSearchAdvanced.prototype.getXml = function() {
  // Need to override in a different way than parent `SearchRecord`
  var xml = [];

  if (this.criteria) {
    xml.push('<tranSales:criteria>');
    xml.push(this.criteria.getXml());
    xml.push('</tranSales:criteria>');
  }

  if (this.columns) {
    xml.push('<tranSales:columns>');
    xml.push(this.columns.getXml());
    xml.push('</tranSales:columns>');
  }

  return xml.join('');
};
