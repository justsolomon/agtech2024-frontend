import { LatLngExpression } from 'leaflet';

export interface PenMarkerInfo {
  coord: LatLngExpression;
  number: number;
  animalType: string;
  animalCount: number;
  feedType: string;
  feedTonnage: number;
}
