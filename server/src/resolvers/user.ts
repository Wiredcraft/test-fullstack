import {MutationResolvers, Resolvers} from "../types";
import SelectionTree from "../types/SelectionTree";

const register: MutationResolvers["register"] = async (parent, args, context, info) => {
    const tree = SelectionTree.fromResolve(info);
    const user = await context.dataSources!.users.create(tree.subtree("user"), args.input);
    return {
        token: context.sign(user.id),
        user,
    };
}

const login: MutationResolvers["login"] = async (parent, args, context, info) => {
    const tree = SelectionTree.fromResolve(info);
    const user = await context.dataSources!.users.find(tree.subtree("user"), args.input);

    return {
        token: context.sign(user.id),
        user,
    };
}

const resolvers: Resolvers = {
    Mutation: {
        register,
        login,
    }
}

export default resolvers;
