import { Repository } from '~/abstracts/Repository';
import sendValidationCodeMutation from '../../graphql/send_validation_code.graphql';
import validateCodeMutation from '../../graphql/validate_phone.graphql';
import authorizationMutation from '../../graphql/aythorization.graphql';

export class AuthorizationRepository extends Repository {
    public sendPhoneValidationCode = async (phone: string): Promise<boolean> => {
        const { data } = await this.apollo.client.mutate({
            mutation: sendValidationCodeMutation,
            variables: {
                phone,
            },
        });

        return data?.sendValidationCode || false;
    };

    public validatePhoneNumber = async ({ phone, code }: { phone: string; code: string }): Promise<boolean> => {
        const { data } = await this.apollo.client.mutate({
            mutation: validateCodeMutation,
            variables: {
                phone,
                code,
            },
        });

        return data?.validatePhone || false;
    };

    public authorize = async ({ phone, password }: { phone: string; password: string }) => {
        const { data } = await this.apollo.client.mutate({
            mutation: authorizationMutation,
            variables: {
                phone,
                password,
            },
        });

        return data?.authorization;
    };
}
