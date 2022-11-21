export interface TalkType {
    id: number;
    author: string;
    content: string;
    date_created: string;
    title: string;
    poll:number;
    polled_by_me: boolean;
}

export type TalksListType = TalkType[];