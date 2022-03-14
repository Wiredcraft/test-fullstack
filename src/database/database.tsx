const dbPromise =  new Promise<void>((resolve, reject) => {
    if(window.indexedDB) {
        // window.indexedDB.deleteDatabase('lightingtalks');
        var request = window.indexedDB.open('lightingtalks', '1.0');
        request.onerror = function (event) {
            console.log('cannot open database');
            reject('cannot open database');
        };

        request.onsuccess = function (event) {
            window.indb = request.result;
            console.log('open database successfully');
            resolve();
        };

        request.onupgradeneeded = function (event) {
            window.indb = event.target?.result;
            window.indb.createObjectStore('TALKS', { autoIncrement: true, keyPath: 'id' });
        }
    }
})

export{
    dbPromise
};