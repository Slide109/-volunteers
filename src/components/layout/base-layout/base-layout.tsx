import * as React from 'react';
import ReactNotification from 'react-notifications-component';

const BaseLayout: React.FC<{ className?: string }> = ({ children, className }) => (
    <div className={className}>
        {children}
        <ReactNotification />
    </div>
);

export { BaseLayout };
