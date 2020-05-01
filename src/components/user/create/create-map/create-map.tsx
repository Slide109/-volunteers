import * as React from 'react';
import dynamic from 'next/dynamic';

import { Card } from '~/components/common/card';
import { LngLatLike } from 'mapbox-gl';

interface CreateTaskMapProps {
    setCoordinates: (val: LngLatLike) => void;
}

const DynamicComponent = dynamic(() => import('~/components/common/map').then((mod) => mod.MapComponent), {
    ssr: false,
});

const CreateTaskMap: React.FC<CreateTaskMapProps> = ({ setCoordinates }) => {
    const props = {
        clickable: true,
        setCoordinates,
    };

    return (
        <Card padding="0">
            <DynamicComponent {...props} />
        </Card>
    );
};

export { CreateTaskMap };
