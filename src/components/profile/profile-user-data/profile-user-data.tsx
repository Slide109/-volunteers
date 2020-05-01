import * as React from 'react';
import { Card } from '~/components/common/card';
import { GQLUser, GQLUserGender } from '~/types/gql';
import styles from './profile-user-data.module.css';

interface Props {
    user: GQLUser;
    dispatch: Function;
    updateUser: () => Promise<void>;
}

const ProfileUserData: React.FC<Props> = ({ user, dispatch, updateUser }) => {
    const handleInput = (e) => {
        e.preventDefault();
        switch (e.target.id) {
            case 'firstName': {
                dispatch({ type: 'updateFirstName', payload: e.target.value });
                break;
            }
            case 'lastName': {
                dispatch({ type: 'updateLastName', payload: e.target.value });
                break;
            }
            case 'email': {
                dispatch({ type: 'updateEmail', payload: e.target.value });
                break;
            }
            case 'bio': {
                dispatch({ type: 'updateBio', payload: e.target.value });
                break;
            }
            case 'age': {
                dispatch({ type: 'updateAge', payload: e.target.value });
                break;
            }
        }
    };

    const handleGenderChange = (e: React.ChangeEvent, value: GQLUserGender) => {
        dispatch({ type: 'updateGender', payload: value });
    };

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        await updateUser();
    };

    return (
        <Card>
            <h2>User data</h2>
            <div className={styles.container}>
                <div className={styles.subheading}>
                    You can add some personal information. People would appreciate to know you a little bit better
                </div>
                <form>
                    <div className="form-group">
                        <label className="form-label" htmlFor="firstName">
                            First Name
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            id="firstName"
                            placeholder="Name"
                            value={user.firstName}
                            onChange={handleInput}
                        />
                        <label className="form-label" htmlFor="lastName">
                            Last Name
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            id="lastName"
                            placeholder="Name"
                            value={user.lastName}
                            onChange={handleInput}
                        />
                        <label className="form-label" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="form-input"
                            type="email"
                            id="email"
                            placeholder="enter your email"
                            value={user.email}
                            onChange={handleInput}
                        />
                        <label className="form-label" htmlFor="bio">
                            Your bio
                        </label>
                        <textarea
                            className="form-input"
                            rows={5}
                            id="bio"
                            placeholder="Tell us about yourself"
                            value={user.bio}
                            onChange={handleInput}
                        />
                        <label className="form-label" htmlFor="bio">
                            Your age
                        </label>
                        <input
                            className="form-input"
                            type="number"
                            id="age"
                            min={18}
                            max={110}
                            placeholder="enter your age"
                            value={user.age}
                            onChange={handleInput}
                        />
                        <div className="form-group">
                            <label className="form-label">Gender</label>
                            <label className="form-radio">
                                <input
                                    type="radio"
                                    name="gender"
                                    checked={user.gender === GQLUserGender.Male}
                                    onChange={(e) => handleGenderChange(e, GQLUserGender.Male)}
                                />
                                <i className="form-icon"></i> Male
                            </label>
                            <label className="form-radio">
                                <input
                                    type="radio"
                                    name="gender"
                                    checked={user.gender === GQLUserGender.Female}
                                    onChange={(e) => handleGenderChange(e, GQLUserGender.Female)}
                                />
                                <i className="form-icon"></i> Female
                            </label>
                        </div>
                    </div>
                    <div className={styles.controls}>
                        <button className="btn" onClick={handleClick}>
                            👌 Update
                        </button>
                    </div>
                </form>
            </div>
        </Card>
    );
};

export { ProfileUserData };
