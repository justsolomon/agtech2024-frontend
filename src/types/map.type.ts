import { LatLngExpression } from 'leaflet';

export interface PenMarkerInfo {
  coord: LatLngExpression;
  number: number;
  animalType: string;
  animalCount: number;
  feedType: string;
  feedTonnage: number;
}

export interface FarmIssue {
  type: 'Issue' | 'Observation';
  description: string;
  loggedBy: string;
  createdAt: string;
  coord: LatLngExpression;
}
