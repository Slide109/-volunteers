import * as React from 'react';
import styles from './login-form.module.css';
import { LoginFormProps as Props } from './types';
import { createMask } from 'imask';

const masker = createMask({
    mask: /^\+\d*$/,
});

const LoginForm: React.FC<Props> = ({ phone, password, setPhone, setPassword, handleClick }) => {
    const [isPassword, setIsPassword] = React.useState<boolean>(true);

    const handleInput = (e) => {
        e.preventDefault();
        switch (e.target.id) {
            case 'phone': {
                const maskedPhone = masker.resolve(e.target.value);
                setPhone(maskedPhone);
                break;
            }
            case 'password': {
                setPassword(e.target.value);
                break;
            }
        }
    };

    return (
        <form>
            <div className="form-group">
                <label className="form-label" htmlFor="phone">
                    Phone
                </label>
                <input
                    className="form-input"
                    type="text"
                    id="phone"
                    placeholder="Enter phone"
                    value={phone}
                    onChange={(e) => handleInput(e)}
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
                <button className="btn" onClick={(e) => handleClick(e)}>
                    🔒 Login
                </button>
            </div>
        </form>
    );
};

export { LoginForm };
