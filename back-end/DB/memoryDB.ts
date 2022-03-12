/**
 * use flat-file-db as in-memory DB, it will also persists data on a local File
 * https://www.npmjs.com/package/flat-file-db
 */

var path = require("path");
const dataFilePath = path.normalize('DB/data.json');

var flatfile = require('flat-file-db');
var db = flatfile(dataFilePath);

// db.put('hey', {world:2}, function() {
//     // 'hey' is now fully persisted
// });

db.on('open', function() {
    db.put('1234', {
        meetingID: 1234,
        talks: [
            {
                title: 'first test',
                discription: 'hello world'
            }
        ],
        allUser: ["CJ", "RK"],
        // onlineUser: [],
        polledUser: ["CJ"]
    });
});

export {
    db as memoryDB
}