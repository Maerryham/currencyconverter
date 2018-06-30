const url = 'https://free.currencyconverterapi.com/api/v5/countries';


let optFromt = document.getElementById('fromCurrency');
let optTot = document.getElementById('toCurrency');

//Try and store responses as you fetch from db
//Check if database exist to check first before fetching
fetch(url).then(response => {
    if (response.status !== 200){
        alert(" problem plenty die!!! ");
        return;
    }
    return response.json();
})
    .then(results => {
        for (const result in results){

//to loop through the json
            for (const sm in results[result]){
                document.getElementById('fromCurrency').innerHTML+= `<option value='${results[result][sm]["currencyId"]}' >${results[result][sm]["currencyId"]}</option>`;
                document.getElementById('toCurrency').innerHTML+= `<option value='${results[result][sm]["currencyId"]}' >${results[result][sm]["currencyId"]}</option>`;

//to declare the variable
                const objects = `{
                    id: id,
                    CurrencyId = "${results[result][sm]["currencyId"]}"
                }`;

//to store the data to database ater
//                 dbPromise.then(db => {
//                     const tx = db.transaction('objs', 'readwrite');
//                     tx.objectStore('objs').put(objects);
//                     return tx.complete;
//                 });

            }
        }
    })
    .catch(err => console.log("something went wrong", err));

