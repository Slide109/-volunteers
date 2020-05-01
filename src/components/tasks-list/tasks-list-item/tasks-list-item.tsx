import * as React from 'react';
import Link from 'next/link';
import styles from './tasks-list-item.module.css';
import { GQLTaskStatus } from '~/types/gql';

interface Props {
    id: string;
    title: string;
    description: string;
    created: string;
    status: GQLTaskStatus;
}

const TasksListItem: React.FC<Props> = ({ id, title, description, created, status }) => {
    return (
        <Link href={`/a/task/[id]`} as={`/a/task/${id}`} shallow>
            <div className={styles.item}>
                <div className={styles.avatar}>
                    <img src="http://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg" />
                </div>
                <div className={styles.title}>{title}</div>
                <div className={styles.description}>{description}</div>
                <div className={styles.date}>{new Intl.DateTimeFormat().format(new Date(created))}</div>
                <div className={`label ${styles[status]}`}>{status}</div>
            </div>
        </Link>
    );
};

export { TasksListItem };
