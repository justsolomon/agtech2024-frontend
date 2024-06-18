import { LatLngExpression } from 'leaflet';
import { useEffect, useState } from 'react';
import { useGeolocation } from 'react-use';
import { FarmIssue, PenMarkerInfo } from 'types';
import useAuth from './useAuth';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setFilterActive } from 'redux/slices';

const useMap = () => {
  const [coord, setCoord] = useState<LatLngExpression>([
    50.45146511942108, -104.64112900161464,
  ]);
  const [markers, setMarkers] = useState<PenMarkerInfo[]>([]);
  const [issueMarkers, setIssueMarkers] = useState<FarmIssue[]>([]);
  const [displayedMarkers, setDisplayedMarkers] = useState<PenMarkerInfo[]>([]);
  const location = useGeolocation();
  const [clickedMarkerCoord, setClickedMarkerCoord] =
    useState<LatLngExpression | null>(null);
  const { userType } = useAuth();
  const { inIssuePinMode } = useAppSelector((state) => state.driver);
  const dispatch = useAppDispatch();

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

  const addIssueMarker = (issue: FarmIssue) => {
    if (clickedMarkerCoord) {
      setIssueMarkers((prev) => [
        ...prev,
        {
          ...issue,
          loggedBy: userType,
          createdAt: new Date().toLocaleTimeString(),
          coord: clickedMarkerCoord,
        },
      ]);
      setClickedMarkerCoord(null);
    }
  };

  const filterDisplayedMarkers = (filters: Partial<PenMarkerInfo>) => {
    if (Object.keys(filters).length === 0) {
      setDisplayedMarkers(markers);
      dispatch(setFilterActive(false));
      return;
    }

    setDisplayedMarkers(
      markers.filter((marker) => marker.animalType === filters.animalType),
    );
    dispatch(setFilterActive(true));
  };

  return {
    coord,
    markers,
    issueMarkers,
    displayedMarkers,
    inIssuePinMode,
    addMarker,
    addIssueMarker,
    setClickedMarkerCoord,
    filterDisplayedMarkers,
  };
};

export default useMap;
