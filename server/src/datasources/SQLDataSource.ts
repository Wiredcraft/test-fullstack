import {DataSource, DataSourceConfig} from 'apollo-datasource';
import Knex, {QueryBuilder} from "knex";
import snakeCase from "lodash.snakecase";
import snakecaseKeys from "snakecase-keys";
import SelectionTree from "../types/SelectionTree";

export interface SQLDataSourceConfig {
    // Table name in MySql database
    readonly table: string;

    // maps association fields to their key fields.
    // for example, when query Talk.author requires Talk.authorId and for database loading it loads talks.author_id column.
    // the configuration for that should be:
    // ```
    // {
    //   ...
    //   alternatives: {
    //     author: "authorId",
    //   }
    // }
    // ```
    readonly relations?: Record<string, string>;

    // default page size when pagination.
    readonly defaultPageSize?: number;
}

export const createSelectionMap = (fields: string[], relations?: Record<string, string>): Record<string, string> => {
    const map: Record<string, string> = {
        id: "id"
    };

    if (!fields) {
        return map;
    }

    for (const f of fields) {
        if (f.startsWith("__")) {
            continue;
        }

        if (!relations || !relations[f]) {
            map[f] = snakeCase(f);
            continue;
        }

        const a = relations[f];
        map[a] = snakeCase(a);
    }

    return map
}

export default abstract class SQLDataSource<Model, CreateInput> extends DataSource {
    protected _db?: Knex

    protected constructor(protected config: SQLDataSourceConfig) {
        super();
        this.config = config;
    }

    // Invoked by Apollo GraphQL server.
    public initialize(config: DataSourceConfig<any>): void | Promise<void> {
        if (!config.context.config.db) {
            throw new Error(`knex instance is required`);
        }
        this._db = config.context.config.db;
    }

    protected table<Result = Model[]>(): QueryBuilder<Model, Result> {
        return this.db<Model, Result>(this.config.table)
    }

    protected get db(): Knex {
        if (this._db === undefined) {
            throw Error("DataSource not initialized.")
        }
        return this._db
    }

    protected createSelectionMap(tree: SelectionTree): Record<string, string> {
        return createSelectionMap(tree?.fields(), this.config.relations);
    }

    protected async load(tree: SelectionTree, id: string): Promise<Model> {
        const map = this.createSelectionMap(tree);
        const [record] = await this.table().select<Model[]>(map).where("id", id).limit(1);
        return record as Model;
    }

    public async create(tree: SelectionTree, input: CreateInput): Promise<Model> {
        const row: any = snakecaseKeys(input);
        const [id] = await this.table().insert(row);
        return this.load(tree, id.toString());
    }
}
