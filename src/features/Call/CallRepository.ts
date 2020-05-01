import { Repository } from '~/abstracts/Repository';
import callQuery from '../../graphql/call.graphql';
import { GQLCallInput } from '~/types/gql';

export class CallRepository extends Repository {
    public callAssignee = async (input: GQLCallInput): Promise<boolean> => {
        const { data } = await this.apollo.client.query({
            query: callQuery,
            variables: input,
        });

        return data?.success || false;
    };
}
