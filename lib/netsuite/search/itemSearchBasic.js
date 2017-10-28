'use strict';

var util = require('util'),
  SearchRecord = require('./searchRecord');

/**
 * https://system.netsuite.com/help/helpcenter/en_US/srbrowser/Browser2014_2/schema/search/employeesearchbasic.html?mode=package
 *
 * @class
 * @extends SearchRecord
 * @return {ItemSearchBasic}
 */
var ItemSearchBasic = module.exports = function ItemSearchBasic() {
  SearchRecord.call(this);
};

util.inherits(ItemSearchBasic, SearchRecord);

/**
 * @override
 */
ItemSearchBasic.prototype.getAttributes = function() {
  var attrs = {
    'xsi:type': 'platformCommon:ItemSearchBasic'
  };

  return attrs;
};

/**
 * @override
 */
ItemSearchBasic.prototype.getXml = function() {
  var xml = '';
  this.searchFields.forEach(function(searchField) {
    xml += searchField.getXml();
  });

  return xml;
};
