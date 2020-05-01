import * as React from 'react';
import { NextPage } from 'next';

import styles from './profile.module.css';

import { AppLayout } from '~/components/layout/app-layout';
import { AppContainer } from '~/components/layout/container';
import { privateRoute } from '~/components/privateRoute';
import { ProfileUserData } from '~/components/profile/profile-user-data';
import { GQLUser, GQLUserUpdateInput } from '~/types/gql';

import { UserRepository } from '~/features/User/UserRepository';

const repository = new UserRepository();

const reducer = (state: GQLUser, action): GQLUser => {
    switch (action.type) {
        case 'updateFirstName':
            return { ...state, firstName: action.payload };
        case 'updateLastName':
            return { ...state, lastName: action.payload };
        case 'updateEmail':
            return { ...state, email: action.payload };
        case 'updateBio':
            return { ...state, bio: action.payload };
        case 'updateAge':
            return { ...state, age: action.payload };
        case 'updateGender':
            return { ...state, gender: action.payload };
        case 'updateState':
            return action.payload;
        default:
            throw new Error();
    }
};

const mapUserToUserInput = (user: GQLUser): GQLUserUpdateInput => ({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    age: user.age ? Number(user.age) : null,
    bio: user.bio,
    gender: user.gender,
});

const ProfilePage: NextPage<{ user: GQLUser }> = ({ user }) => {
    const [state, dispatch] = React.useReducer(reducer, user);

    const updateUser = async () => {
        const input = mapUserToUserInput(state);
        const user = await repository.updateUser(input);
        if (user) {
            dispatch({ type: 'updateState', payload: user });
        }
    };

    return (
        <AppLayout user={user}>
            <AppContainer className={styles.container}>
                <ProfileUserData user={state} dispatch={dispatch} updateUser={updateUser} />
            </AppContainer>
        </AppLayout>
    );
};

export default privateRoute(ProfilePage);
