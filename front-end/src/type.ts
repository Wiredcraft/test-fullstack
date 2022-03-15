export interface IMeeting {
    meetingID: string;
    talks: ITalk[],
    orgnizer: User[],
    allUsers: User[];
}

export interface ITalk {
    talkID: string,
    title: string,
    description: string,
    polledUser: string[]
}

export type User = string;