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

export interface LocalFarmRun {
  feedType: string;
  weightUsed?: number;
}

export interface FarmRun {
  feedType: string;
  weightUsed: number;
}

export interface PenDump extends PenMarkerInfo {
  lat: number;
  lng: number;
  startTime: string;
  endTime: string;
  feedTonnageDispensed: number;
}

export interface ActiveRun {
  data: LocalFarmRun;
  penDumps: PenDump[];
}

export interface InitialDriverState {
  isSearchPensModalOpen: boolean;
  isFilterPensModalOpen: boolean;
  inIssuePinMode: boolean;
  isFilterActive: boolean;
  activeRun: ActiveRun | null;
}
