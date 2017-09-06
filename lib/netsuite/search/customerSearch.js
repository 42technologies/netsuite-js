'use strict';

var util = require('util'),
  SearchRecord = require('./searchRecord');

/**
 * https://system.netsuite.com/help/helpcenter/en_US/srbrowser/Browser2014_2/schema/search/CustomerSearch.html?mode=package
 *
 * @class
 * @extends SearchRecord
 * @return {CustomerSearch}
 */
var CustomerSearch = module.exports = function CustomerSearch() {
  SearchRecord.call(this);

  // Strangely, inherits from SearchRecord but does NOT have a `searchFields` field.
  // Instead has a `criteria` ItemSearch field
  delete this.searchFields;

  /**
   * @member {CustomerSearchBasic} Search basic
   */
  this.basic = undefined;
};

util.inherits(CustomerSearch, SearchRecord);

/**
 * @override
 */
CustomerSearch.prototype.getAttributes = function() {
  var attrs = {
    'xsi:type': 'listRel:CustomerSearch'
  };

  return attrs;
};

/**
 * @override
 */
CustomerSearch.prototype.getXml = function() {
  // Need to override in a different way than parent `SearchRecord`
  var xml = [];

  if (this.basic) {
    xml.push('<listRel:basic>');
    xml.push(this.basic.getXml());
    xml.push('</listRel:basic>');
  }

  return xml.join('');
};
