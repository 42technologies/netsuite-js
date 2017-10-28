'use strict';

var util = require('util'),
  SearchRecord = require('./searchRecord');

/**
 * https://system.netsuite.com/help/helpcenter/en_US/srbrowser/Browser2014_2/schema/search/ItemSearch.html?mode=package
 *
 * @class
 * @extends SearchRecord
 * @return {ItemSearch}
 */
var ItemSearch = module.exports = function ItemSearch() {
  SearchRecord.call(this);

  // Strangely, inherits from SearchRecord but does NOT have a `searchFields` field.
  // Instead has a `criteria` ItemSearch field
  delete this.searchFields;

  /**
   * @member {ItemSearchBasic} Search basic
   */
  this.basic = undefined;
};

util.inherits(ItemSearch, SearchRecord);

/**
 * @override
 */
ItemSearch.prototype.getAttributes = function() {
  var attrs = {
    'xsi:type': 'listAcct:ItemSearch'
  };

  return attrs;
};

/**
 * @override
 */
ItemSearch.prototype.getXml = function() {
  // Need to override in a different way than parent `SearchRecord`
  var xml = [];

  if (this.basic) {
    xml.push('<listAcct:basic>');
    xml.push(this.basic.getXml());
    xml.push('</listAcct:basic>');
  }

  return xml.join('');
};
