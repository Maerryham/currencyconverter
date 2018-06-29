const dbPromise = idb.open('test-db', 1, upgradeDB => {
    let currencyStore = upgradeDB.createObjectStore('currencyVal');
     currencyStore.put('world','hello');
});


//to store while checking
function createDB() {
    idb.open('currencies', 1, function(upgradeDB) {
        var store = upgradeDB.createObjectStore('rates', {
            keyPath: 'id'
        });
        store.put({id: 11122, from: 'NGN',  to: 'PHP', rate: 1.999781});
    });
}