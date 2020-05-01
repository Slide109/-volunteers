import * as React from 'react';

import styles from './task-user-data.module.css';

import { Card } from '~/components/common/card';
import { GQLUser, GQLUserGender, GQLUserRole } from '~/types/gql';

interface TaskUserDataProps {
    role: GQLUserRole;
    user?: GQLUser;
}

const getUserName = (firstName: string, lastName?: string): string => {
    return lastName ? `${firstName} ${lastName}` : firstName;
};

const TaskUserData: React.FC<TaskUserDataProps> = ({ user, role }) => {
    return (
        <Card>
            <h3>{role === GQLUserRole.User ? 'Volunteer info' : 'User info'}</h3>
            <div className={styles.container}>
                {role === GQLUserRole.User && !user?.firstName && (
                    <div className="text-gray" style={{ gridColumn: '1 / -1' }}>
                        No assigned user yet
                    </div>
                )}
                {user?.firstName && (
                    <div className={styles.row}>
                        <div>Name</div>
                        <div>{getUserName(user.firstName, user.lastName)}</div>
                    </div>
                )}
                {user?.age && (
                    <div className={styles.row}>
                        <div>Age</div>
                        <div>{user.age}</div>
                    </div>
                )}
                {user?.gender && (
                    <div className={styles.row}>
                        <div>Gender</div>
                        <div>
                            {user.gender === GQLUserGender.Female
                                ? '👩'
                                : user.gender === GQLUserGender.Male
                                ? '👨'
                                : '-'}
                        </div>
                    </div>
                )}
                {user?.bio && (
                    <div className={styles.row}>
                        <div>Bio</div>
                        <div>{user.bio}</div>
                    </div>
                )}
            </div>
        </Card>
    );
};

export { TaskUserData };
