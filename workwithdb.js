// const dbPromise = idb.open('converter', 2, upgradeDB => {
//
//     switch(upgradeDb.oldVersion) {
//         case 0:
//             let currencyStore = upgradeDB.createObjectStore('currencies');
//             currencyStore.put('Currency', {keyPath: 'id'});
//         case 1:
//            // upgradeDb.createObjectStore('people', {keyPath: 'name'});
//             var currencyStore = upgradeDb.transaction.objectStore('currencies');
//
//     }
// });


const dbPromise = idb.open('test-db', 1, upgradeDB => {
    let currencyStore = upgradeDB.createObjectStore('currencyVal');
    currencyStore.put('world','hello');
});

//
// //to store while checking
// function createDB() {
//     idb.open('currencies', 1, function(upgradeDB) {
//         var store = upgradeDB.createObjectStore('rates', {
//             keyPath: 'id'
//         });
//         store.put({id: 11122, from: 'NGN',  to: 'PHP', rate: 1.999781});
//     });
// }