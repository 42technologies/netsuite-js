'use strict'

NetSuite = require '../'
_ = require 'lodash'


class NetSuiteAPI

    constructor: (credentials, options = {}) ->
        @config = new NetSuite.Configuration(credentials)
        @service = new NetSuite.Service(@config)
        @pageSize = options.pageSize or 1000

    init: (skipDiscovery=true) ->
        console.log 'Creating NetSuite connection'
        @service.init(skipDiscovery)

    searchMoreWithId: (searchId, pageIndex, rows) ->
        console.log "Page: #{pageIndex} #{rows.length}"
        @service.searchMoreWithId(searchId, pageIndex)
        .then (data, raw, soapHeader) =>
            searchResult = data.searchResult
            rows = rows.concat searchResult.searchRowList.searchRow.map(@extractValues)
            return rows if searchResult.pageIndex is searchResult.totalPages
            @searchMoreWithId(searchResult.searchId, searchResult.pageIndex + 1, rows)

    getCustomers: (savedSearchId) ->
        search = new NetSuite.Search.CustomerSearchAdvanced()
        search.savedSearchId = savedSearchId
        return search

    getAccounts: (savedSearchId) ->
        search = new NetSuite.Search.AccountSearchAdvanced()
        search.savedSearchId = savedSearchId
        return search

    getItems: (savedSearchId) ->
        search = new NetSuite.Search.ItemSearchAdvanced()
        search.savedSearchId = savedSearchId
        return search

    getInvoices: (savedSearchId) ->
        search = new NetSuite.Search.TransactionSearchAdvanced()
        search.savedSearchId = savedSearchId

        transactionSearch = new NetSuite.Search.TransactionSearch()
        transactionSearchBasic = new NetSuite.Search.TransactionSearchBasic()

        searchField = new NetSuite.Search.Fields.SearchDateField()
        searchField.field = 'lastModifiedDate';
        searchField.operator = 'within';
        searchField.searchValue = '2016-12-20T00:00:00';
        searchField.searchValue2 = '2016-12-26T00:00:00';

        transactionSearchBasic.searchFields.push(searchField)

        transactionSearch.basic = transactionSearchBasic
        search.criteria = transactionSearch

        return search

    getCustomList: (name) ->
        search = new NetSuite.Search.CustomListSearchBasic()

        searchField = new NetSuite.Search.Fields.SearchStringField()
        searchField.field = 'name';
        searchField.operator = 'is';
        searchField.searchValue = name;
        search.searchFields.push(searchField);

        return search

    savedSearch: (search) ->
        @.init()
        .then () =>
            preferences = new NetSuite.Search.SearchPreferences()
            preferences.pageSize = @pageSize
            @service.setSearchPreferences(preferences)
            @service.search(search)
        .then (data, raw, soapHeader) =>
            searchResult = data.searchResult
            if searchResult.status.$attributes.isSuccess isnt 'true'
                console.error 'Error'
                console.error searchResult.status.statusDetail

            totalRecords = searchResult.totalRecords

            console.log "Records found: #{totalRecords}"

            result = searchResult.searchRowList.searchRow.map(@extractValues)
            return result if searchResult.pageIndex is searchResult.totalPages
            result = @searchMoreWithId(searchResult.searchId, searchResult.pageIndex + 1, result)
            return result


    searchBasic: (search, bodyFieldsOnly = false) ->
        @.init()
        .then () =>
            preferences = new NetSuite.Search.SearchPreferences()
            preferences.pageSize = @pageSize
            preferences.bodyFieldsOnly = bodyFieldsOnly
            @service.setSearchPreferences(preferences)
            @service.search(search)
        .then (data, raw, soapHeader) =>
            searchResult = data.searchResult
            if searchResult.status.$attributes.isSuccess isnt 'true'
                console.error 'Error'
                console.error searchResult.status.statusDetail

            totalRecords = searchResult.totalRecords

            console.log "Records found: #{totalRecords}"

            result = searchResult.recordList.record[0].customValueList.customValue
            return result if searchResult.pageIndex is searchResult.totalPages
            result = @searchMoreWithId(searchResult.searchId, searchResult.pageIndex + 1, result)
            return result


    extractValues: (data) ->

        getLeafValue = (node) ->
            return node if typeof(node) isnt 'object'
            key = Object.keys(node)
            return getLeafValue(node[key])

        return {} if typeof(data) isnt 'object'
        basic = data['basic']

        result = {}

        Object.keys(basic).map (key) ->
            value = basic[key]
            if key is 'customFieldList'
                values = value.customField
                if _.isArray(values)
                    value.customField.reduce (result, item) ->
                        property = item.$attributes.scriptId
                        result[property] = item.searchValue.$attributes?.internalId or item.searchValue
                        return result
                    , result
                else
                    property = values.$attributes.scriptId
                    result[property] = values.searchValue.$attributes?.internalId or values.searchValue

            result[key] = getLeafValue(value)
        return result


module.exports = NetSuiteAPI