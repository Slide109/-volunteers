import { LngLatLike } from 'mapbox-gl';

export interface MapComponentProps {
    clickable: boolean;
    coordinates?: LngLatLike;
    setCoordinates?: (val: LngLatLike) => void;
}
