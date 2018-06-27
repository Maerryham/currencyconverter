<script src="https://github.com/jakearchibald/idb/blob/master/lib/idb.js"></script>

const dbPromise = idb.open('currency', 1, upgradeDB => {
    var currencyStore = upgradeDB.createObjectStore('keyval');
    currencyStore.put('NGN','owo');
    return currencyStore.get('keyval');
}).then(function(val) {
    console.log('The value of "hello" is:', val);
});
