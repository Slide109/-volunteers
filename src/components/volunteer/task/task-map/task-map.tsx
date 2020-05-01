import * as React from 'react';
import dynamic from 'next/dynamic';

import styles from './task-map.module.css';
import { Card } from '~/components/common/card';
import { LngLatLike } from 'mapbox-gl';

const DynamicComponent = dynamic(() => import('~/components/common/map').then((mod) => mod.MapComponent), {
    ssr: false,
});

interface TaskMapProps {
    coordinates?: LngLatLike;
}

const TaskMap: React.FC<TaskMapProps> = ({ coordinates }) => {
    return (
        <div className={styles.wrapper}>
            <Card padding="0">
                <DynamicComponent
                    {...{
                        clickable: false,
                        coordinates,
                    }}
                />
            </Card>
        </div>
    );
};

export { TaskMap };
