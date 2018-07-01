let dbPromise = idb.open('currency', 1, function (upgradeDb) {
    var currencyStore = upgradeDb.createObjectStore('listcurrency');
    currencyStore.put('Nigeria', 'country');
})

//To read and write
dbPromise.then(function (db) {
    var tx = db.transaction('listcurrency', 'readwrite');
    var currencyStore = tx.objectStore('listcurrency');
    currencyStore.put('America', 'countried');

    return tx.complete;

}).then(function(){
    console.log('Added America')
});


dbPromise.then(function(db) {
    var tx = db.transaction('listcurrency', 'readwrite');
    var peopleStore = tx.objectStore('listcurrency');

    peopleStore.put({
        name: 'Sam Munoz',
        age: 25,
        favoriteAnimal: 'dog'
    },'name');

    peopleStore.put({
        name: 'Susan Keller',
        age: 34,
        favoriteAnimal: 'cat'
    },'name');

    return tx.complete;

}).then(function(){
    console.log('Added other America')
});
