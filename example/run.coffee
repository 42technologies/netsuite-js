
_ = require 'lodash'
fs = require 'fs'
Promise = require 'bluebird'

Netsuite = require './netsuite'


credentials = require './credentials.json'
netsuite = new Netsuite(credentials)

writeFile = (filename, data) ->
    file = fs.createWriteStream(filename)
    data.map (line) ->
        file.write "#{JSON.stringify(line)}\n"
    file.end()

customerSearch = netsuite.getCustomers('2460')
itemSearch = netsuite.getItems('2456')
invoiceSearch = netsuite.getInvoices('2458')
accountSearch = netsuite.getAccounts('2461')

customListSearch = netsuite.getCustomList('Brand')
customListSearch2 = netsuite.getCustomList('Business Unit')

# Promise.all([
#     netsuite.savedSearch(itemSearch)
# ], { concurrency: 1 }
# ).then ([items]) ->
#     console.log "Items #{items.length}"
#     writeFile('items.json', items)


# Promise.all([
#     netsuite.savedSearch(customerSearch)
# ], { concurrency: 1 }
# ).then ([customers]) ->
#     console.log "Customers #{customers.length}"
#     writeFile('customers.json', customers)


# Promise.all([
#     netsuite.savedSearch(invoiceSearch)
# ], { concurrency: 1 }
# ).then ([invoices]) ->
#     console.log "Invoices #{invoices.length}"
#     writeFile('invoices.json', invoices)


Promise.mapSeries([
    netsuite.searchBasic(customListSearch)
    netsuite.searchBasic(customListSearch2)
], (search) -> search
).then ([brand, business_unit]) ->
    console.log "Brand #{brand.length}"
    writeFile('brand.json', brand)
    console.log "Business Unit #{business_unit.length}"
    writeFile('business_unit.json', business_unit)
