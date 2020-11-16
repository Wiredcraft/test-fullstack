import {QueryBuilder} from "knex";
import snakeCase from "lodash.snakecase";
import {CreateTalkInput, Pagination, Talk, TalkConnection, TalkOrder, TalkSearchFilter, VoteConnection} from "../types";
import {TalkDataSource} from "../types/datasources";
import SelectionTree from "../types/SelectionTree";
import SQLDataSource, {createSelectionMap, SQLDataSourceConfig} from "./SQLDataSource";


const config: SQLDataSourceConfig = {
    table: "talks",
    defaultPageSize: 100,
    relations: {
        author: "authorId",
    }
}

export default class TalkSQLDataSource extends SQLDataSource<Talk, CreateTalkInput> implements TalkDataSource {
    public constructor() {
        super(config);
    }

    public async upvote(tree: SelectionTree, id: string, by: string): Promise<Talk> {
        await this.db.raw("INSERT IGNORE INTO talks_votes (talk_id, user_id) values (?, ?)", [id, by]);
        await this.db.raw("UPDATE talks SET votes = (SELECT COUNT(*) FROM talks_votes WHERE id = talks.id) WHERE id = ?", id);
        return this.load(tree, id);
    }


    public async search(tree: SelectionTree, filters?: TalkSearchFilter, order?: TalkOrder, page?: Pagination): Promise<TalkConnection> {
        const query = this.table();

        const totalCount = await this.getTotalCount(query, tree);
        if (!tree.selected("nodes")) {
            return totalCount;
        }

        const nodes = await this.getNodes(query, tree.subtree("nodes"), order, page);

        return {
            ...totalCount,
            nodes
        };
    };

    private async getTotalCount(query: QueryBuilder, tree: SelectionTree): Promise<TalkConnection> {
        if (!tree.selected("totalCount")) {
            return {} as TalkConnection;
        }
        query = query.clone();
        const [row] = await query.count("* as totalCount");
        return row;
    };

    private async getNodes(query: QueryBuilder, tree: SelectionTree, order?: TalkOrder, pagination?: Pagination): Promise<Talk[]> {
        if (!tree || tree.empty()) {
            return [];
        }

        const map = this.createSelectionMap(tree);
        query = query.select(map);

        query = this.appendPagination(query, pagination);
        query = this.appendOrder(query, order);

        return query;
    }

    private appendOrder(query: QueryBuilder, order?: TalkOrder) {
        if (!order) {
            return query;
        }

        const column = snakeCase(order.field);
        if (column === undefined) {
            return query;
        }

        return query.orderBy(column, order.direction);
    }

    private appendPagination(query: QueryBuilder, pagination?: Pagination) {
        const defaultPageSize = this.config.defaultPageSize || 100;
        const limit = pagination?.limit !== undefined ? pagination.limit : defaultPageSize;

        if (limit && limit !== Infinity) {
            query = query.limit(limit);
        }

        if (pagination?.offset) {
            query = query.offset(pagination.offset);
        }

        return query;
    };
}
