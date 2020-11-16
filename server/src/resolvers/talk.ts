import {AuthenticationError} from "apollo-server";
import {MutationResolvers, QueryResolvers, Resolvers, TalkResolvers} from "../types";
import SelectionTree from "../types/SelectionTree";

const Talk: TalkResolvers = {
    author: async (parent, args, context, info) => {
        const tree = SelectionTree.fromResolve(info);
        return context.dataSources!.users.load(tree, parent.authorId);
    }
}

const allTalks: QueryResolvers["allTalks"] = async (parent, args, context, info) => {
    const tree = SelectionTree.fromResolve(info);
    return context.dataSources!.talks.search(tree, args.filter, args.order, args.pagination);
}

const createTalk: MutationResolvers["createTalk"] = async (parent, args, context, info) => {
    if (!context.userId) {
        throw new AuthenticationError("must login to create talks");
    }
    const tree = SelectionTree.fromResolve(info);
    args.input.authorId = context.userId;
    return context.dataSources!.talks.create(tree, args.input);
}

const upvoteTalk: MutationResolvers["upvoteTalk"] = async (parent, args, context, info) => {
    if (!context.userId) {
        throw new AuthenticationError("must login to upvote");
    }
    const tree = SelectionTree.fromResolve(info);
    return context.dataSources!.talks.upvote(tree, args.id, context.userId);
}

const resolvers: Resolvers = {
    Talk,
    Query: {
        allTalks,
    },
    Mutation: {
        createTalk,
        upvoteTalk,
    }
}


export default resolvers;
