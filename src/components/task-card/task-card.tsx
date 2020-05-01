import * as React from 'react';

import { TaskCardProps as Props } from './types';

import { Card } from '~/components/common/card';

const TaskCard: React.FC<Props> = ({ title, description }) => {
    return (
        <Card>
            <div>{title}</div>
            <div>{description}</div>
        </Card>
    );
};

export { TaskCard };
