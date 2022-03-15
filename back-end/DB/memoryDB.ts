/**
 * use flat-file-db as in-memory DB, it will also persists data on a local File
 * https://www.npmjs.com/package/flat-file-db
 */

import { Meeting } from "../types";

var path = require("path");
const dataFilePath = path.normalize('DB/data.json');

var flatfile = require('flat-file-db');
var db = flatfile(dataFilePath);

// db.put('hey', {world:2}, function() {
//     // 'hey' is now fully persisted
// });

const mockedMeeting: Meeting = {
    meetingID: '1234',
    talks: [
        {
            talkID: (new Date()).getTime().toString(),
            title: 'hello world',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta reiciendis deserunt doloribus consequatur, laudantium odio dolorum laboriosam.',
            polledUser: ["CJ"]
        }
    ],
    orgnizer: ["CJ"],
    allUsers: ["CJ", "RK"]
};

db.on('open', function() {
    db.put('1234', mockedMeeting);
    console.log('init DB with', mockedMeeting)
});

export {
    db as memoryDB
}