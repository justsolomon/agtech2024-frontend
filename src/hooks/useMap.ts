import { LatLngExpression } from 'leaflet';
import { useEffect, useState } from 'react';
import { useGeolocation } from 'react-use';
import { PenMarkerInfo } from 'types';

const useMap = () => {
  const [coord, setCoord] = useState<LatLngExpression>([
    50.45146511942108, -104.64112900161464,
  ]);
  const [markers, setMarkers] = useState<PenMarkerInfo[]>([]);
  const [displayedMarkers, setDisplayedMarkers] = useState<PenMarkerInfo[]>([]);
  const location = useGeolocation();
  const [clickedMarkerCoord, setClickedMarkerCoord] =
    useState<LatLngExpression | null>(null);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      setCoord([location.latitude, location.longitude]);
    }
  }, [location]);

  useEffect(() => {
    setDisplayedMarkers(markers);
  }, [markers]);

  const addMarker = (markerInfo: PenMarkerInfo) => {
    if (clickedMarkerCoord) {
      setMarkers((prev) => [
        ...prev,
        { ...markerInfo, coord: clickedMarkerCoord },
      ]);
      setClickedMarkerCoord(null);
    }
  };

  const filterDisplayedMarkers = (filters: Partial<PenMarkerInfo>) => {
    if (Object.keys(filters).length === 0) {
      setDisplayedMarkers(markers);
      return;
    }

    setDisplayedMarkers(
      markers.filter((marker) => marker.animalType === filters.animalType),
    );
  };

  return {
    coord,
    markers,
    displayedMarkers,
    filterDisplayedMarkers,
    addMarker,
    setClickedMarkerCoord,
  };
};

export default useMap;
