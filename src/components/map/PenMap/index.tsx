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
import { MARKER_ICONS, DriverMarkerIcon, PenMarkerIcon } from 'utils';
import { useEffect } from 'react';
import SearchPensModal from '../SearchPensModal';
import { PenMarkerInfo, UserType } from 'types';
import FilterPensModal from '../FilterPensModal';
import ReportIssueModal from '../ReportIssueModal';
import MarkerPopup from '../MarkerPopup';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import EndRunButton from '../EndRunButton';
import AddDumpModal from '../AddDumpModal';

interface PenMapProps {
  userType: UserType;
}

const PenMap = ({ userType }: PenMapProps) => {
  const {
    coord: currPosition,
    penMarkers,
    displayedMarkers,
    issueMarkers,
    inIssuePinMode,
    closePen,
    addPenMarker,
    addPenDump,
    addIssueMarker,
    filterDisplayedMarkers,
    setClickedMarkerCoord,
    closeAddDumpModal,
  } = useMap();
  const addPenDisclosure = useDisclosure();
  const addIssueDisclosure = useDisclosure();
  const { activeRun } = useAppSelector((state) => state.driver);

  const goToPen = (pen: PenMarkerInfo) => {
    // console.log('Go to pen', pen);
  };

  const onMapClick = (coord: LatLngExpression) => {
    setClickedMarkerCoord(coord);

    if (inIssuePinMode) {
      addIssueDisclosure.onOpen();
      return;
    }

    if (userType === 'farmer') {
      addPenDisclosure.onOpen();
    }
  };

  return (
    <>
      <MapContainer
        center={currPosition}
        zoom={20}
        scrollWheelZoom={false}
        style={{ width: '100%', height: '100vh' }}
      >
        <MapEvents onMapClick={onMapClick} currPosition={currPosition} />
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
          >
            <MarkerPopup data={marker} />
          </Marker>
        ))}

        {issueMarkers.map((marker, index) => (
          <Marker
            position={marker.coord}
            icon={PenMarkerIcon}
            key={index}
            eventHandlers={{ click: () => {} }}
          >
            <MarkerPopup data={marker} />
          </Marker>
        ))}
      </MapContainer>

      {activeRun !== null ? <EndRunButton activeRun={activeRun} /> : null}
      {closePen !== null ? (
        <AddDumpModal
          pen={closePen}
          addDump={addPenDump}
          isOpen={closePen !== null}
          onClose={closeAddDumpModal}
        />
      ) : null}
      <AddPenModal {...addPenDisclosure} addPen={addPenMarker} />
      <SearchPensModal penMarkers={penMarkers} goToPen={goToPen} />
      <FilterPensModal applyFilters={filterDisplayedMarkers} />
      <ReportIssueModal {...addIssueDisclosure} addIssue={addIssueMarker} />
    </>
  );
};

export default PenMap;

interface MapEventsProps {
  currPosition: LatLngExpression;
  onMapClick: (coord: LatLngExpression) => void;
}

const MapEvents = ({ currPosition, onMapClick }: MapEventsProps) => {
  const map = useMapEvents({
    click(event) {
      onMapClick([event.latlng.lat, event.latlng.lng]);
    },
  });

  useEffect(() => {
    map.flyTo(currPosition);
  }, [currPosition]);

  return null;
};
