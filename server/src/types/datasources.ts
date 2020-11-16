import {
    CreateTalkInput,
    LoginUserInput, Maybe,
    Pagination,
    RegisterUserInput,
    Talk,
    TalkConnection,
    TalkOrder,
    TalkSearchFilter,
    User, VoteConnection
} from "./index";
import SelectionTree from "./SelectionTree";

export interface UserDataSource {
    create(tree: SelectionTree, input: RegisterUserInput): Promise<User>;

    load(tree: SelectionTree, id: string): Promise<User>;

    find(tree: SelectionTree, input: LoginUserInput): Promise<User>
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
