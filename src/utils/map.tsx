import L from 'leaflet';
import TruckIcon from 'assets/icons/delivery-truck.png';
import MarkerIcon from 'assets/icons/marker.png';
import CowIcon from 'assets/icons/cow.png';
import GoatIcon from 'assets/icons/goat.png';
import Sheep from 'assets/icons/sheep.png';
import PigIcon from 'assets/icons/pig.png';
import ChickenIcon from 'assets/icons/chicken.png';

export const DriverMarkerIcon = new L.Icon({
  iconUrl: TruckIcon,
  iconRetinaUrl: TruckIcon,
  iconSize: new L.Point(35, 55),
  className: 'leaflet-div-icon',
});

export const PenMarkerIcon = new L.Icon({
  iconUrl: MarkerIcon,
  iconRetinaUrl: MarkerIcon,
  iconSize: new L.Point(25, 40),
  className: 'leaflet-div-icon',
});

export const CattleMarkerIcon = new L.Icon({
  iconUrl: CowIcon,
  iconRetinaUrl: CowIcon,
  iconSize: new L.Point(35, 30),
  className: 'leaflet-div-icon animal-marker',
});

export const SheepMarkerIcon = new L.Icon({
  iconUrl: Sheep,
  iconRetinaUrl: Sheep,
  iconSize: new L.Point(35, 30),
  className: 'leaflet-div-icon animal-marker',
});

export const PigMarkerIcon = new L.Icon({
  iconUrl: PigIcon,
  iconRetinaUrl: PigIcon,
  iconSize: new L.Point(35, 30),
  className: 'leaflet-div-icon animal-marker',
});

export const ChickenMarkerIcon = new L.Icon({
  iconUrl: ChickenIcon,
  iconRetinaUrl: ChickenIcon,
  iconSize: new L.Point(35, 30),
  className: 'leaflet-div-icon animal-marker',
});

export const GoatMarkerIcon = new L.Icon({
  iconUrl: GoatIcon,
  iconRetinaUrl: GoatIcon,
  iconSize: new L.Point(35, 30),
  className: 'leaflet-div-icon animal-marker',
});
