'use strict';

/**
 * NetSuite Search
 * @return {Search}
 */
var Search = module.exports = {};

Search.SearchPreferences = require('./searchPreferences');

// Search.Fields namespace
Search.Fields = require('./fields');

// Search types
Search.SearchRecord = require('./searchRecord');
Search.SearchRowBasic = require('./searchRowBasic');

Search.AccountSearchBasic = require('./accountSearchBasic');
Search.AccountSearchAdvanced = require('./accountSearchAdvanced');
Search.BudgetSearchBasic = require('./budgetSearchBasic');
Search.CustomerSearchAdvanced = require('./customerSearchAdvanced');
Search.CustomerSearch = require('./customerSearch');
Search.CustomerSearchBasic = require('./customerSearchBasic');
Search.CustomerSearchRow = require('./customerSearchRow');
Search.CustomerSearchRowBasic = require('./customerSearchRowBasic');
Search.EmployeeSearchBasic = require('./employeeSearchBasic');
Search.CustomListSearchBasic = require('./customListSearchBasic');
Search.ItemSearchAdvanced = require('./itemSearchAdvanced');
Search.ItemSearchBasic = require('./itemSearchBasic');
Search.TaskSearchBasic = require('./taskSearchBasic');
Search.TransactionSearchAdvanced = require('./transactionSearchAdvanced');
Search.TransactionSearchBasic = require('./transactionSearchBasic');
Search.TransactionSearch = require('./transactionSearch');
Search.TimeBillSearchBasic = require('./timeBillSearchBasic');
Search.TimeEntrySearchBasic = require('./timeEntrySearchBasic');
Search.TimeSheetSearchBasic = require('./timeSheetSearchBasic');
