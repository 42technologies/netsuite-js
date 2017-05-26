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
    searchField2.operator = 'equalTo';
    searchField2.searchValue = '396';

    console.log(searchField2);

    transactionSearchBasic.searchFields.push(searchField2);

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


// TransactionSearchAdvanced tsa4 = new TransactionSearchAdvanced();
// tsa4.savedSearchId="57";

// TransactionSearch ts = new TransactionSearch();
// TransactionSearchBasic tsb = new TransactionSearchBasic();

// // condition 1: on SO only
// semsfTranType.searchValue = tranTypes;
// tsb.type = semsfTranType;

// ts.basic = tsb;
// tsa4.criteria = ts;
// nss.search(tsa4);