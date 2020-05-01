import * as React from 'react';

import styles from './signup-phone-validation.module.css';

const SignupFormValidation: React.FC<{ validate: (code: string) => Promise<void> }> = ({ validate }) => {
    const [code, setCode] = React.useState('');

    const canValidate = React.useMemo<boolean>(() => code.length === 6, [code]);

    const handleChange = (e) => {
        setCode(e.target.value);
    };

    return (
        <div className={styles.container}>
            <div>Please enter verification code from SMS</div>
            <input
                type="text"
                name="token"
                id="token"
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete="one-time-code"
                placeholder="******"
                maxLength={6}
                value={code}
                onChange={handleChange}
            />
            <div>
                <button className="btn" disabled={!canValidate} onClick={() => validate(code)}>
                    👍 Validate
                </button>
            </div>
        </div>
    );
};

export { SignupFormValidation };
