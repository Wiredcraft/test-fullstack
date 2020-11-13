import {mergeResolvers} from '@graphql-tools/merge';

import user from "./user"

const resolvers = [user];

export default mergeResolvers(resolvers);
