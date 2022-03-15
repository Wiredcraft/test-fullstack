"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const middlewares_1 = require("./middlewares");
const memoryDB_1 = require("../DB/memoryDB");
;
const meetingRoutes = [
    {
        method: 'get',
        path: '/meeting/:meetingID',
        middleware: [middlewares_1.requestLogger],
        handler: (req, res) => {
            const meetingID = req.params.meetingID;
            if (memoryDB_1.memoryDB.has(meetingID)) {
                const meeting = memoryDB_1.memoryDB.get(meetingID);
                res.status(200).send(meeting);
            }
            else {
                res.status(404).send({
                    error: {
                        path: req.path,
                        status: 404,
                        message: "meeting not found in database"
                    }
                });
            }
        },
    },
    {
        method: 'post',
        path: '/meeting',
        middleware: [middlewares_1.requestLogger],
        handler: (req, res) => {
            const { meetingID, user } = req.body;
            if (!memoryDB_1.memoryDB.has(meetingID)) {
                const newMeeting = {
                    meetingID,
                    talks: [],
                    orgnizer: [user],
                    allUsers: [user]
                };
                memoryDB_1.memoryDB.put(meetingID, newMeeting);
                res.status(200).send(newMeeting);
            }
            else {
                res.status(400).send({
                    error: {
                        path: req.path,
                        status: 400,
                        message: `meetingID ${meetingID} has existed in DB`
                    }
                });
            }
        }
    }
];
const talkRoutes = [
    {
        method: 'post',
        path: '/talk/:meetingID',
        middleware: [middlewares_1.requestLogger],
        handler: (req, res) => {
            const meetingID = req.params.meetingID;
            const { title, description, user } = req.body;
            const meeting = memoryDB_1.memoryDB.get(meetingID);
            const newTalk = {
                talkID: (new Date()).getTime().toString(),
                title,
                description,
                polledUser: [user]
            };
            meeting.talks.push(newTalk);
            meeting.talks.sort((t1, t2) => t2.polledUser.length - t1.polledUser.length);
            memoryDB_1.memoryDB.put(meetingID, meeting);
            return res.status(200).send("talk created");
        }
    }
];
const otherRoutes = [
    {
        method: 'put',
        path: '/poll/:meetingID',
        middleware: [middlewares_1.requestLogger],
        handler: (req, res) => {
            const meetingID = req.params.meetingID;
            const { talkID, user } = req.body;
            const meeting = memoryDB_1.memoryDB.get(meetingID);
            const talk = meeting.talks.find(t => t.talkID === talkID);
            let newPolledUser = talk.polledUser.slice();
            newPolledUser.push(user);
            newPolledUser = Array.from(new Set(newPolledUser));
            talk.polledUser = newPolledUser;
            meeting.talks.sort((t1, t2) => t2.polledUser.length - t1.polledUser.length);
            return res.status(200).send(meeting);
        }
    },
    {
        method: 'put',
        path: '/user/:meetingID',
        middleware: [middlewares_1.requestLogger],
        handler: (req, res) => {
            console.log("user/:meetingID");
            const meetingID = req.params.meetingID;
            const { user } = req.body;
            const meeting = memoryDB_1.memoryDB.get(meetingID);
            meeting.allUsers.push(user);
            memoryDB_1.memoryDB.put(meetingID, meeting);
            return res.status(200).send(meeting);
        }
    }
];
exports.routes = [
    ...meetingRoutes,
    ...talkRoutes,
    ...otherRoutes
];
