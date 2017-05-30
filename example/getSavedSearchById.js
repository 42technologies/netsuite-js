/*
 * netsuite-js
 * https://github.com/CrossLead/netsuite-js
 *
 * Copyright (c) 2015 Christian Yang
 * Licensed under the Apache license.
 */

'use strict';

var denodeify = require('denodeify');
var NetSuite = require('../');

var credentials = require('./credentials.json');
var config = new NetSuite.Configuration(credentials);
var service = new NetSuite.Service(config);

console.log('Creating NetSuite connection');

service
  .init(true /* skipDiscovery */ )
  .then(function( /*client*/ ) {
    console.log('WSDL processed');

    var preferences = new NetSuite.Search.SearchPreferences();
    preferences.pageSize = 5;
    service.setSearchPreferences(preferences);

    var search = new NetSuite.Search.TransactionSearchAdvanced();
    search.savedSearchId = '2458';
    // var search = new NetSuite.Search.ItemSearchAdvanced();
    // search.savedSearchId = '2456';

    var transactionSearch = new NetSuite.Search.TransactionSearch();
    var transactionSearchBasic = new NetSuite.Search.TransactionSearchBasic();

    var searchField = new NetSuite.Search.Fields.SearchStringField();
    searchField.field = 'tranId';
    searchField.operator = 'contains';
    searchField.searchValue = '442908';

    transactionSearchBasic.searchFields.push(searchField);

    var searchField2 = new NetSuite.Search.Fields.SearchDoubleField();
    searchField2.field = 'amount';
    searchField2.operator = 'between';
    searchField2.searchValue = '395';
    searchField2.searchValue2 = '1000';

    transactionSearchBasic.searchFields.push(searchField2);

    var searchField3 = new NetSuite.Search.Fields.SearchDateField();
    searchField3.field = 'lastModifiedDate';
    searchField3.operator = 'after';
    searchField3.searchValue = '2013-09-25T00:00:00';

    transactionSearchBasic.searchFields.push(searchField3);

    transactionSearch.basic = transactionSearchBasic
    search.criteria = transactionSearch

    console.log('Performing SearchAdvanced to retrieve data');
    return service.search(search);
  })
  .then(function(result, raw, soapHeader) {
    if (result.searchResult.status.$attributes.isSuccess !== 'true') {
      console.error('Error');
      console.error(result.searchResult.status.statusDetail);
    }
    console.log('Records found: ' + result.searchResult.totalRecords);
    console.log(JSON.stringify(result.searchResult, null, 2));
    console.log('Last Request:');
    console.log(service.config.client.lastRequest);
  })
  .catch(function(err) {
    console.error(err);
    console.error('Last Request:');
    console.error(service.config.client.lastRequest);
  });
