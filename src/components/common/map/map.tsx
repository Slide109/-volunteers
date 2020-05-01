import * as React from 'react';
import { Marker, Map, MapboxOptions, GeolocateControl } from 'mapbox-gl';
import getConfig from 'next/config';

import styles from './map.module.css';

import { MapComponentProps as Props } from './types';

const { publicRuntimeConfig } = getConfig();

const options: MapboxOptions = {
    accessToken: publicRuntimeConfig.mapToken,
    container: '',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-79.38, 43.65],
    zoom: 12.5,
};

const MapComponent: React.FC<Props> = ({ coordinates, setCoordinates, clickable }) => {
    const container = React.useRef<HTMLDivElement>(null);

    let map;

    const marker = React.useMemo(
        () =>
            new Marker(map, {
                pitchAlignment: 'map',
                anchor: 'center',
                offset: [0, 0],
            }),
        [map],
    );

    const geolocate = React.useMemo(() => {
        return new GeolocateControl({
            showAccuracyCircle: false,
        });
    }, []);

    const handleMapClick = ({ lngLat }) => {
        setCoordinates(lngLat);
        marker.setLngLat(lngLat).addTo(map);
    };

    const handleMapWithCoordinatesLoad = () => {
        map.setCenter(coordinates);
        marker.setLngLat(coordinates).addTo(map);
    };

    const handleMapLoaded = () => {
        coordinates ? handleMapWithCoordinatesLoad() : geolocate.trigger();
    };

    React.useEffect(() => {
        map = new Map({
            ...options,
            container: container.current,
        });
        if (clickable) {
            map.on('click', handleMapClick);
        }
        map.addControl(geolocate);
        map.on('load', handleMapLoaded);
    }, [coordinates]);

    return <div className={styles.map} ref={container} />;
};

export { MapComponent };
