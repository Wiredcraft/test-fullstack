export interface Meeting {
    meetingID: string;
    talks: Talk[],
    orgnizer: User[],
    allUsers: User[];
}

export interface Talk {
    talkID: string,
    title: string,
    description: string,
    polledUser: string[]
}

export type User = string;