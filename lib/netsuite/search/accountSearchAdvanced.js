'use strict';

var util = require('util'),
  SearchRecord = require('./searchRecord');

/**
 * https://system.netsuite.com/help/helpcenter/en_US/srbrowser/Browser2014_2/schema/search/AccountSearchAdvanced.html?mode=package
 *
 * @class
 * @extends SearchRecord
 * @return {AccountSearchAdvanced}
 */
var AccountSearchAdvanced = module.exports = function AccountSearchAdvanced() {
  SearchRecord.call(this);

  // Strangely, inherits from SearchRecord but does NOT have a `searchFields` field.
  // Instead has a `criteria` CustomerSearch field
  delete this.searchFields;

  /**
   * @member {CustomerSearch} Search criteria
   */
  this.criteria = undefined;

  /**
   * @member {CustomerSearchRow} Columns to return
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

util.inherits(AccountSearchAdvanced, SearchRecord);

/**
 * @override
 */
AccountSearchAdvanced.prototype.getAttributes = function() {
  var attrs = {
    'xsi:type': 'listAcct:AccountSearchAdvanced'
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
AccountSearchAdvanced.prototype.getUnserializablePropertyNames = function() {
  return ['savedSearchId', 'savedSearchScriptId'];
};

/**
 * @override
 */
AccountSearchAdvanced.prototype.getXml = function() {
  // Need to override in a different way than parent `SearchRecord`
  var xml = [];

  if (this.criteria) {
    // TODO: serialize criteria
  }

  if (this.columns) {
    xml.push('<listRel:columns>');
    xml.push(this.columns.getXml());
    xml.push('</listRel:columns>');
  }

  return xml.join('');
};
