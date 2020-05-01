import * as React from 'react';
import { useRouter } from 'next/router';
import { store } from 'react-notifications-component';

import styles from './signup.module.css';

import { EmptyLayout } from '~/components/layout/empty-layout';
import { SignupHeading } from '~/components/signup/signup-heading';
import { SignupForm } from '~/components/signup/signup-form';
import { SignupFormValidation } from '~/components/signup/signup-phone-validation';
import { SignupFooter } from '~/components/signup/signup-footer';

import { AuthorizationRepository } from '~/features/Authorization';
import { UserRepository } from '~/features/User/UserRepository';
import { GQLUserRole } from '~/types/gql';

const authorizationRepository = new AuthorizationRepository();
const repository = new UserRepository();

enum Components {
    Form = 'Form',
    Validation = 'Validation',
}

interface SignupForm {
    firstName: string;
    role: GQLUserRole;
    phone: string;
    password: string;
    lastName?: string;
}

const initialForm: SignupForm = {
    role: GQLUserRole.User,
    firstName: '',
    phone: '',
    password: '',
    lastName: undefined,
};

const reducer = (state: SignupForm, action) => {
    switch (action.type) {
        case 'updateFirstName':
            return { ...state, firstName: action.payload };
        case 'updateRole':
            return { ...state, role: action.payload };
        case 'updatePhone':
            return { ...state, phone: action.payload };
        case 'updateLastName':
            return { ...state, lastName: action.payload };
        case 'updatePassword':
            return { ...state, password: action.payload };
        default:
            return state;
    }
};

const SignupPage: React.FC = () => {
    const [state, dispatch] = React.useReducer(reducer, initialForm);
    const [active, setActive] = React.useState<Components>(Components.Form);
    const router = useRouter();

    const handleClick = async (e: React.MouseEvent): Promise<void> => {
        e.preventDefault();

        try {
            const success = await authorizationRepository.sendPhoneValidationCode(state.phone);
            if (success) {
                store.addNotification({
                    type: 'success',
                    title: 'Validation code sent',
                    message: 'We sent a validation code. Please check your phone',
                    container: 'top-right',
                    dismiss: {
                        duration: 5000,
                    },
                });
                setActive(Components.Validation);
            }
        } catch (e) {
            store.addNotification({
                type: 'danger',
                title: 'Error',
                message: e.message,
                container: 'top-right',
                dismiss: {
                    duration: 2000,
                },
            });
        }
    };

    const createUser = async () => {
        const success = await repository.createUser(state as any);
        success && (await router.push('/a/profile'));
    };

    const validateNumber = async (code: string) => {
        try {
            const isValid = await authorizationRepository.validatePhoneNumber({
                phone: state.phone,
                code,
            });
            isValid && (await createUser());
        } catch (e) {
            store.addNotification({
                type: 'danger',
                title: 'Error',
                message: e.message,
                container: 'top-right',
                dismiss: {
                    duration: 2000,
                },
            });
        }
    };

    return (
        <EmptyLayout image={require('~/assets/images/signup.jpg')}>
            <div className={styles.container}>
                <SignupHeading />
                {active === Components.Form && (
                    <SignupForm
                        firstName={state.firstName}
                        lastName={state.lastName}
                        role={state.role}
                        phone={state.phone}
                        password={state.password}
                        updateFirstName={(val: string) => dispatch({ type: 'updateFirstName', payload: val })}
                        updateRole={(val: string) => dispatch({ type: 'updateRole', payload: val })}
                        updatePhone={(val: string) => dispatch({ type: 'updatePhone', payload: val })}
                        updateLastName={(val: string) => dispatch({ type: 'updateLastName', payload: val })}
                        updatePassword={(val: string) => dispatch({ type: 'updatePassword', payload: val })}
                        handleClick={handleClick}
                    />
                )}
                {active === Components.Validation && <SignupFormValidation validate={validateNumber} />}
                <SignupFooter />
            </div>
        </EmptyLayout>
    );
};

export default SignupPage;
