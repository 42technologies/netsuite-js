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
var ItemSearchAdvanced = module.exports = function ItemSearchAdvanced() {
  SearchRecord.call(this);

  // Strangely, inherits from SearchRecord but does NOT have a `searchFields` field.
  // Instead has a `criteria` ItemSearch field
  delete this.searchFields;

  /**
   * @member {ItemSearch} Search criteria
   */
  this.criteria = undefined;

  /**
   * @member {ItemSearchRow} Columns to return
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

util.inherits(ItemSearchAdvanced, SearchRecord);

/**
 * @override
 */
ItemSearchAdvanced.prototype.getAttributes = function() {
  var attrs = {
    'xsi:type': 'listAcct:ItemSearchAdvanced'
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
ItemSearchAdvanced.prototype.getUnserializablePropertyNames = function() {
  return ['savedSearchId', 'savedSearchScriptId'];
};

/**
 * @override
 */
ItemSearchAdvanced.prototype.getXml = function() {
  // Need to override in a different way than parent `SearchRecord`
  var xml = [];

  if (this.criteria) {
    xml.push('<listAcct:criteria>');
    xml.push(this.criteria.getXml());
    xml.push('</listAcct:criteria>');
  }

  if (this.columns) {
    xml.push('<listAcct:columns>');
    xml.push(this.columns.getXml());
    xml.push('</listAcct:columns>');
  }

  return xml.join('');
};
