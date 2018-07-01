const dbPromise = idb.open('converter', 9, upgradeDB => {
    let currencyStore = upgradeDB.createObjectStore('currencies');
    currencyStore.put('Currency',{keyPath: 'id'});
});


function openDatabase() {
    // If the browser doesn't support service worker,
    // we don't care about having a database
    if (!navigator.serviceWorker) {
        return Promise.resolve();
    }

    return idb.open('wittr', 1, upgradeDB => {
        var store = upgradeDb.createObjectStore('wittrs', {
            keyPath: 'id'
        });
        store.createIndex('by-date', 'time');
    });
}