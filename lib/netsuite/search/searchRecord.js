'use strict';

var util = require('util'),
  BaseObject = require('../baseObject');

/**
 * Abstract base class for searches.
 * https://system.netsuite.com/help/helpcenter/en_US/srbrowser/Browser2014_2/schema/other/searchrecord.html?mode=package
 *
 * @class
 * @extends BaseObject
 * @return {SearchRecord}
 */
var SearchRecord = module.exports = function SearchRecord() {
  BaseObject.call(this);

  /**
   * @member {SearchStringField[]} The search field for this search. Required.
   */
  this.searchFields = [];
};

util.inherits(SearchRecord, BaseObject);

/**
 * @override
 */
SearchRecord.prototype.getSOAPType = function() {
  // Always searchRecord
  return 'searchRecord';
};

/**
 * Do not auto serialize `searchFields`. @see geXml
 * @override
 */
SearchRecord.prototype.getUnserializablePropertyNames = function() {
  return ['searchFields'];
};

/**
 * `node-soap` doesn't set the child namespace correctly so must override all XML.
 * @override
 */
SearchRecord.prototype.getXml = function() {
  throw new Error('Must be implemented by subclass');
};
