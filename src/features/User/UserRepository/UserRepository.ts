import { GQLUser, GQLUserInput, GQLUserUpdateInput } from '~/types/gql';
import { Repository } from '~/abstracts/Repository';
import createUserMutation from '../../../graphql/create_user.graphql';
import currentUserQuery from '../../../graphql/current_user.graphql';
import userUpdateMutation from '../../../graphql/update_user.graphql';

export class UserRepository extends Repository {
    public createUser = async (input: GQLUserInput): Promise<boolean> => {
        const { data } = await this.apollo.client.mutate({
            mutation: createUserMutation,
            variables: {
                input,
            },
        });

        return Boolean(data.createUser?.id);
    };

    public getCurrentUser = async (): Promise<GQLUser> => {
        const { data } = await this.apollo.client.query({
            query: currentUserQuery,
        });
        return data.user;
    };

    public updateUser = async (input: GQLUserUpdateInput): Promise<GQLUser> => {
        const { data } = await this.apollo.client.query({
            query: userUpdateMutation,
            variables: {
                input,
            },
        });
        return data.user;
    };
}
