import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet';
import AddPenModal from '../AddPenModal';
import { useMap } from 'hooks';
import { useDisclosure } from '@chakra-ui/react';
import { LatLngExpression } from 'leaflet';
import {
  CattleMarkerIcon,
  ChickenMarkerIcon,
  DriverMarkerIcon,
  PigMarkerIcon,
  SheepMarkerIcon,
} from 'utils';
import { useEffect } from 'react';
import SearchPensModal from '../SearchPensModal';
import { PenMarkerInfo } from 'types';
import FilterPensModal from '../FilterPensModal';

const MARKER_ICONS = {
  Cattle: CattleMarkerIcon,
  Pig: PigMarkerIcon,
  Sheep: SheepMarkerIcon,
  Chicken: ChickenMarkerIcon,
};

const DriverMap = () => {
  const {
    coord: currPosition,
    markers,
    displayedMarkers,
    addMarker,
    filterDisplayedMarkers,
    setClickedMarkerCoord,
  } = useMap();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const goToPen = (pen: PenMarkerInfo) => {
    console.log('Go to pen', pen);
  };

  return (
    <>
      <MapContainer
        center={currPosition}
        zoom={20}
        scrollWheelZoom={false}
        style={{ width: '100%', height: '100vh' }}
      >
        <MapEvents
          openAddPenModal={(coord: LatLngExpression) => {
            setClickedMarkerCoord(coord);
            onOpen();
          }}
          currPosition={currPosition}
        />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {[currPosition].map((position, index) => (
          <Marker position={position} icon={DriverMarkerIcon} key={index}>
            <Popup>You are here</Popup>
          </Marker>
        ))}

        {displayedMarkers.map((marker, index) => (
          <Marker
            position={marker.coord}
            icon={MARKER_ICONS[marker.animalType as keyof typeof MARKER_ICONS]}
            key={index}
            eventHandlers={{ click: () => {} }}
          />
        ))}
      </MapContainer>

      <AddPenModal isOpen={isOpen} onClose={onClose} addPen={addMarker} />
      <SearchPensModal penMarkers={markers} goToPen={goToPen} />
      <FilterPensModal applyFilters={filterDisplayedMarkers} />
    </>
  );
};

export default DriverMap;

interface MapEventsProps {
  currPosition: LatLngExpression;
  openAddPenModal: (coord: LatLngExpression) => void;
}

const MapEvents = ({ currPosition, openAddPenModal }: MapEventsProps) => {
  const map = useMapEvents({
    click(event) {
      openAddPenModal([event.latlng.lat, event.latlng.lng]);
    },
  });

  useEffect(() => {
    map.flyTo(currPosition);
  }, [currPosition]);

  return null;
};
