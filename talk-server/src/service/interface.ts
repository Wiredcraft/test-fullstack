import { InMemoryDBEntity } from "@nestjs-addons/in-memory-db";

export interface TalkEntity extends InMemoryDBEntity {
    id: string;
    title: string;
    description: string;
    submittedTime: Date;
    userName: string;
    userId: string;
    votedTimes: number;
}

export interface UserEntity extends InMemoryDBEntity {
    id: string;
    userId: string;
    userName: string;
}

export interface IPagination<T> {
    pageIndex: number;
    pageSize: number;
    total: number;
    list: T[];
}

export interface ITalkService {
    create(params: TalkEntity): Promise<TalkEntity>;
    query(): Promise<TalkEntity[]>;
    getById(param: string): Promise<TalkEntity>;
    update(params: TalkEntity): Promise<TalkEntity>;
}

export interface IUserService {
    create(user: UserEntity): Promise<UserEntity>;
}