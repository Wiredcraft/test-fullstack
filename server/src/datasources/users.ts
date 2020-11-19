import {UserInputError} from "apollo-server";
import bcrypt from "bcrypt"
import {UserInput, User} from "../types";
import {UserDataSource} from "../types/datasources";
import SelectionTree from "../types/SelectionTree";
import SQLDataSource, {SQLDataSourceConfig} from "./SQLDataSource";

const saltRounds = 10

const config: SQLDataSourceConfig = {
    table: "users",
    defaultPageSize: 100,
}

export default class UserSQLDataSource extends SQLDataSource<User, UserInput> implements UserDataSource {
    public constructor() {
        super(config);
    }

    public async create(tree: SelectionTree, input: UserInput): Promise<User> {
        input.password = bcrypt.hashSync(input.password, saltRounds);
        return super.create(tree, input);
    }

    public async find(tree: SelectionTree, input: UserInput): Promise<User> {
        const map = this.createSelectionMap(tree);
        map.password = "password";
        const [row] = await this.table().select(map).where("name", input.name).limit(1);

        if (row === undefined || !bcrypt.compareSync(input.password, row.password)) {
            throw new UserInputError("not found");
        }

        delete row.password;
        return row as User;
    }

    public async load(tree: SelectionTree, id: string): Promise<User> {
        const map = this.createSelectionMap(tree);
        const [user] = await this.table().select<User[]>(map).where("id", id);
        return user;
    }
}
