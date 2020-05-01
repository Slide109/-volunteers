import { MouseEvent } from 'react';
import { GQLUserRole } from '~/types/gql';

export interface SignupFormProps {
    firstName: string;
    role: GQLUserRole;
    phone: string;
    lastName: string;
    password: string;
    updateFirstName: (val: string) => void;
    updateRole: (val: GQLUserRole) => void;
    updatePhone: (val: string) => void;
    updateLastName: (val: string) => void;
    updatePassword: (val: string) => void;
    handleClick: (e: MouseEvent) => void;
}
