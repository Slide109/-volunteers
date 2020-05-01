import * as React from 'react';
import { createMask } from 'imask';

import styles from './signup-form.module.css';

import { SignupFormProps as Props } from './types';
import { GQLUserRole } from '~/types/gql';

const masker = createMask({
    mask: /^\+\d*$/,
});

const SignupForm: React.FC<Props> = (props) => {
    const {
        role,
        firstName,
        lastName,
        phone,
        password,
        updateRole,
        updateFirstName,
        updateLastName,
        updatePhone,
        updatePassword,
        handleClick,
    } = props;

    const [isPassword, setIsPassword] = React.useState<boolean>(true);

    const handleInput = (e) => {
        e.preventDefault();
        switch (e.target.id) {
            case 'firstName': {
                updateFirstName(e.target.value);
                break;
            }
            case 'lastName': {
                updateLastName(e.target.value);
                break;
            }
            case 'password': {
                updatePassword(e.target.value);
                break;
            }
            case 'phone': {
                const maskedPhone = masker.resolve(e.target.value);
                updatePhone(maskedPhone);
                break;
            }
        }
    };

    const canSave: boolean = React.useMemo<boolean>(() => {
        return Boolean(firstName.length) && Boolean(phone.length) && Boolean(password.length);
    }, [firstName, phone]);

    const handleRoleBtnClick = (e: React.MouseEvent, role: GQLUserRole) => {
        e.preventDefault();
        updateRole(role);
    };

    return (
        <form>
            <div className="form-group">
                <label className="form-label">Select your role</label>
                <div className="btn-group">
                    <button
                        className={`btn ${role === GQLUserRole.User ? ' btn-primary' : ''}`}
                        onClick={(e) => handleRoleBtnClick(e, GQLUserRole.User)}
                    >
                        👨‍💻 I need help
                    </button>
                    <button
                        className={`btn ${role === GQLUserRole.Volunteer ? ' btn-primary' : ''}`}
                        onClick={(e) => handleRoleBtnClick(e, GQLUserRole.Volunteer)}
                    >
                        🦸‍♀️ I want to help
                    </button>
                </div>
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="firstName">
                    First Name *
                </label>
                <input
                    className="form-input"
                    type="text"
                    id="firstName"
                    placeholder="Please enter your first name"
                    value={firstName}
                    onChange={handleInput}
                />
                <label className="form-label" htmlFor="lastName">
                    Last Name
                </label>
                <input
                    className="form-input"
                    type="text"
                    id="lastName"
                    placeholder="Please enter your last name"
                    value={lastName}
                    onChange={handleInput}
                />
                <label className="form-label" htmlFor="phone">
                    Phone *
                </label>
                <input
                    className="form-input"
                    type="text"
                    id="phone"
                    placeholder="+11112233"
                    value={phone}
                    onChange={handleInput}
                />
                <label className="form-label" htmlFor="password">
                    Password *
                </label>
                <div className="has-icon-right">
                    <input
                        className="form-input"
                        type={isPassword ? 'password' : 'text'}
                        id="password"
                        placeholder="******"
                        value={password}
                        onChange={handleInput}
                    />
                    <i
                        className="form-icon icon icon-edit"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setIsPassword(!isPassword)}
                    />
                </div>
            </div>
            <div className={styles.controls}>
                <button className="btn" disabled={!canSave} onClick={handleClick}>
                    👌 Sign up
                </button>
            </div>
        </form>
    );
};

export { SignupForm };
