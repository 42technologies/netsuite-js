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
    preferences.pageSize = 30;
    service.setSearchPreferences(preferences);

    // var search = new NetSuite.Search.TransactionSearchAdvanced();
    // search.savedSearchId = '2270';
    // var search = new NetSuite.Search.ItemSearchAdvanced();
    // search.savedSearchId = '2651';
    var search = new NetSuite.Search.CustomerSearchAdvanced();
    search.savedSearchId = '2269';

    var customerSearch = new NetSuite.Search.CustomerSearch();
    var customerSearchBasic = new NetSuite.Search.CustomerSearchBasic();

    // var transactionSearch = new NetSuite.Search.TransactionSearch();
    // var transactionSearchBasic = new NetSuite.Search.TransactionSearchBasic();

    // var searchField = new NetSuite.Search.Fields.SearchStringField();
    // searchField.field = 'tranId';
    // searchField.operator = 'contains';
    // searchField.searchValue = '442908';

    // transactionSearchBasic.searchFields.push(searchField);

    // var searchField2 = new NetSuite.Search.Fields.SearchDoubleField();
    // searchField2.field = 'amount';
    // searchField2.operator = 'between';
    // searchField2.searchValue = '395';
    // searchField2.searchValue2 = '400';

    // transactionSearchBasic.searchFields.push(searchField2);

    var searchField3 = new NetSuite.Search.Fields.SearchDateField();
    searchField3.field = 'lastModifiedDate';
    searchField3.operator = 'within';
    searchField3.searchValue = '2017-08-25T00:00:00';
    searchField3.searchValue2 = '2017-08-26T00:00:00';

    customerSearchBasic.searchFields.push(searchField3);
    customerSearch.basic = customerSearchBasic
    search.criteria = customerSearch

    // transactionSearchBasic.searchFields.push(searchField3);
    // transactionSearch.basic = transactionSearchBasic
    // search.criteria = transactionSearch

    console.log('Performing SearchAdvanced to retrieve data');
    return service.search(search);
  })
  .then(function(result, raw, soapHeader) {
    if (result.searchResult.status.$attributes.isSuccess !== 'true') {
      console.error('Error');
      console.error(result.searchResult.status.statusDetail);
    }

    var totalRecords = result.searchResult.totalRecords
    console.log('Records found: ' + totalRecords);
    if (totalRecords) {
      console.log(JSON.stringify(result.searchResult.searchRowList.searchRow, null, 2));
    }
    console.log('Last Request:');
    console.log(service.config.client.lastRequest);
  })
  .catch(function(err) {
    console.error(err);
    console.error('Last Request:');
    console.error(service.config.client.lastRequest);
  });
