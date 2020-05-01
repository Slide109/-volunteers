import { onError, ErrorHandler, ErrorResponse } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { GraphQLError } from 'graphql';
import { ServerError, ServerParseError } from 'apollo-link-http-common';

type handleGraphqlErrorArguments = {
    error: ErrorResponse['networkError'];
    operationName: string;
};

const handleGraphqlError = (error: GraphQLError) => {
    console.error(error);
};

const handleNetworkError = ({ error, operationName }: handleGraphqlErrorArguments) => {
    console.error(error);

    let message = 'Ошибка выполения';

    if ((error as ServerError | ServerParseError).response) {
        const response = (error as ServerError | ServerParseError).response;

        switch (response.status) {
            case 422:
                message = 'Ошибка запроса';
                break;
            case 404:
                message = 'Данные не найдены';
                break;
            case 500:
            case 501:
            case 503:
                message = 'Ошибка сервера';
                break;
            default:
                message = 'Ошибка выполения';
        }
    }

    // notify({
    // 	type: 'info',
    // 	title: `Операция ${operationName} не выполнена`,
    // 	message,
    // })
};

const createErrorHandler: ErrorHandler = (errorResponse: ErrorResponse) => {
    const { graphQLErrors, networkError, forward, operation } = errorResponse;
    // Позволяет прокинуть ошибку в метод
    if (operation.getContext()?.errorSkip) {
        return forward(operation);
    }
    // Обрабатываем ошибки Graphql
    if (graphQLErrors && graphQLErrors.length) {
        graphQLErrors.map(handleGraphqlError);
    }
    // Обрабатываем ошибки сети
    if (networkError) {
        handleNetworkError({ error: networkError, operationName: operation.operationName });
    }
};

const getErrorLink = (): ApolloLink => {
    return onError((errorResponse) => createErrorHandler(errorResponse));
};

export { getErrorLink };
