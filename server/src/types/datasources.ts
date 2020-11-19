import {
    CreateTalkInput,
    Maybe,
    Pagination,
    Talk,
    TalkConnection,
    TalkOrder,
    TalkSearchFilter,
    User,
    UserInput
} from "./index";
import SelectionTree from "./SelectionTree";

export interface UserDataSource {
    create(tree: SelectionTree, input: UserInput): Promise<User>;

    load(tree: SelectionTree, id: string): Promise<User>;

    find(tree: SelectionTree, input: UserInput): Promise<User>
}

export interface TalkDataSource {
    search(tree: SelectionTree, filter?: Maybe<TalkSearchFilter>, order?: Maybe<TalkOrder>, pagination?: Maybe<Pagination>): Promise<TalkConnection>;

    create(tree: SelectionTree, input: CreateTalkInput): Promise<Talk>;

    upvote(tree: SelectionTree, id: string, by: string): Promise<Talk>;
}

export interface DataSources {
    talks: TalkDataSource
    users: UserDataSource
}
