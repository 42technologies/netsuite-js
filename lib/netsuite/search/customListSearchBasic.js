'use strict';

var util = require('util'),
  SearchRecord = require('./searchRecord');

/**
 * https://system.netsuite.com/help/helpcenter/en_US/srbrowser/Browser2014_2/schema/search/CustomListSearchBasic.html?mode=package
 *
 * @class
 * @extends SearchRecord
 * @return {CustomListSearchBasic}
 */
var CustomListSearchBasic = module.exports = function CustomListSearchBasic() {
  SearchRecord.call(this);
};

util.inherits(CustomListSearchBasic, SearchRecord);

/**
 * @override
 */
CustomListSearchBasic.prototype.getAttributes = function() {
  var attrs = {
    'xsi:type': 'platformCommon:CustomListSearchBasic'
  };

  return attrs;
};

/**
 * @override
 */
CustomListSearchBasic.prototype.getXml = function() {
  var xml = '';
  this.searchFields.forEach(function(searchField) {
    xml += searchField.getXml();
  });

  return xml;
};
