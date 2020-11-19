import {FragmentDefinitionNode, GraphQLResolveInfo, SelectionNode} from "graphql";


export default class SelectionTree {
    private readonly _subtrees: Record<string, SelectionTree>;
    private readonly _fields: Record<string, boolean>;

    // Construct from GraphQLResolveInfo.
    public static fromResolve(info: GraphQLResolveInfo) {
        const fields = info?.fieldNodes;
        if (!fields || fields.length !== 1) {
            throw new Error("requires a valid GraphQLResolveInfo");
        }

        const nodes = fields[0]?.selectionSet?.selections;
        if (!nodes) {
            throw new Error("requires a valid GraphQLResolveInfo");
        }

        return this.formSelectionNodes(nodes, info.fragments);
    }

    private static formSelectionNodes(nodes: readonly SelectionNode[], fragments: { [key: string]: FragmentDefinitionNode }) {
        const subtrees: Record<string, SelectionTree> = {};
        const fields: string[] = [];
        nodes.map(v => {
            if (v.kind === "Field") {
                fields.push(v.name.value);
                if (v.selectionSet !== undefined) {
                    subtrees[v.name.value] = this.formSelectionNodes(v.selectionSet.selections,fragments);
                }
            }
            if (v.kind === "FragmentSpread") {
                const frag = fragments[v.name.value]
                const ff = this.formSelectionNodes(frag.selectionSet.selections, fragments).fields();
                fields.push(...ff);
            }
        })
        return new SelectionTree(fields, subtrees);
    }

    public constructor(fields: string[], subtrees?: Record<string, SelectionTree>) {
        this._subtrees = subtrees || {};
        this._fields = fields.reduce<Record<string,boolean>>((prev, v) => {
            prev[v] = true
            return prev;
        }, {});
    }

    // Return the subtree of specified field.
    public subtree(field: string): SelectionTree {
        return this._subtrees[field];
    }

    // Return selected fields as array of string.
    public fields(): string[] {
        return Object.keys(this._fields);
    }

    // Check if specified field is selected by query or mutation.
    public selected(field: string): boolean {
        return this._fields[field]
    }

    // Check if any selection are specified by query or mutation.
    public empty(): boolean {
        return Object.keys(this._fields).length === 0
    }
}
