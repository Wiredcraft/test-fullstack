import { IMeeting } from "./type";

const BACKEND_URL = 'http://localhost:3001/';
const defaultHeader = {
    'Content-Type': 'application/json'
};

export async function getMeetingByID(meetingID: string): Promise<IMeeting> {
    const response = await fetch(`${BACKEND_URL}meeting/${meetingID}`, {
        method: 'get',
        mode:'cors',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'max-age=0'
        }
    });
    const currentMeeting = await response.json() as IMeeting;
    return currentMeeting;
}

export async function postMeeting(meetingID: string, user: string): Promise<IMeeting> {
    const response = await fetch(`${BACKEND_URL}meeting`, {
        method: 'post',
        mode:'cors',
        headers: defaultHeader,
        body: JSON.stringify({
            meetingID,
            user
        })
    });
    const newMeeting = await response.json() as IMeeting;
    return newMeeting;
}

export async function putUser(meetingID: string, user: string) {
    const response = await fetch(`${BACKEND_URL}user/${meetingID}`, {
        method: 'put',
        mode:'cors',
        headers: defaultHeader,
        body: JSON.stringify({
            user
        })
    });
    const newMeeting = await response.json();
    return newMeeting;
}

export async function putPoll(meetingID: string, user: string, talkID: string) {
    const response = await fetch(`${BACKEND_URL}poll/${meetingID}`, {
        method: 'put',
        mode:'cors',
        headers: defaultHeader,
        body: JSON.stringify({
            user,
            talkID
        })
    });
    const newMeeting = await response.json();
    return newMeeting;
}

interface IPostTalk {
    user: string,
    title: string,
    description: string
}
export async function postTalk(meetingID: string, obj: IPostTalk) {
    const response = await fetch(`${BACKEND_URL}talk/${meetingID}`, {
        method: 'post',
        mode:'cors',
        headers: defaultHeader,
        body: JSON.stringify(obj)
    });
    const newMeeting = await response.json();
    return newMeeting;
}
