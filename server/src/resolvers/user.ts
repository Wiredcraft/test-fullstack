import {MutationResolvers, QueryResolvers, Resolvers} from "../types";
import SelectionTree from "../types/SelectionTree";

const me: QueryResolvers["me"] = async (_, args, context, info) => {
    if (!context.userId) {
        return null;
    }
    const tree = SelectionTree.fromResolve(info);
    return context.dataSources!.users.load(tree, context.userId);
}

const register: MutationResolvers["register"] = async (_, args, context, info) => {
    const tree = SelectionTree.fromResolve(info);
    const user = await context.dataSources!.users.create(tree.subtree("user"), args.input);
    return {
        token: context.sign(user.id),
        user,
    };
}

const login: MutationResolvers["login"] = async (_, args, context, info) => {
    const tree = SelectionTree.fromResolve(info);
    const user = await context.dataSources!.users.find(tree.subtree("user"), args.input);
    return {
        token: context.sign(user.id),
        user,
    };
}

const resolvers: Resolvers = {
    Query: {
        me,
    },
    Mutation: {
        register,
        login,
    }
}

export default resolvers;
