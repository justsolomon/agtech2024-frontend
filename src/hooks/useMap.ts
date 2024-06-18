import { calcDistance, moveCoordinates } from 'utils';
import { useGeolocation, useLocalStorage } from 'react-use';
import { useEffect, useState } from 'react';
import { LatLngExpression, LatLngTuple } from 'leaflet';
import { FarmIssue, PenDump, PenMarkerInfo } from 'types';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addNewPenDump, setFilterActive } from 'redux/slices';
import useAuth from './useAuth';

const useMap = () => {
  const [coord, setCoord] = useState<LatLngExpression>([
    50.45146511942108, -104.64112900161464,
  ]);
  const [penMarkers, setPenMarkers] = useLocalStorage<PenMarkerInfo[]>(
    'pens',
    [],
  );
  const [issueMarkers, setIssueMarkers] = useLocalStorage<FarmIssue[]>(
    'issues',
    [],
  );
  const [displayedMarkers, setDisplayedMarkers] = useState<PenMarkerInfo[]>([]);
  const location = useGeolocation();
  const [clickedMarkerCoord, setClickedMarkerCoord] =
    useState<LatLngExpression | null>(null);
  const { userType } = useAuth();
  const { inIssuePinMode, activeRun } = useAppSelector((state) => state.driver);
  const dispatch = useAppDispatch();
  const [closePen, setClosePen] = useState<PenMarkerInfo | null>(null);
  const [simulationInterval, setSimulationInterval] =
    useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      if (!activeRun) {
        setCoord([location.latitude, location.longitude]);
      }
    }
  }, [location, activeRun, closePen]);

  useEffect(() => {
    setDisplayedMarkers(penMarkers || []);
  }, [penMarkers]);

  let interval: NodeJS.Timeout;
  useEffect(() => {
    if (activeRun && !closePen) {
      interval = setInterval(simulateMovement, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeRun, closePen]);

  const simulateMovement = () => {
    const distanceMeters = 10; // Move 10 meters
    const bearingDegrees = 90; // Move east

    setCoord((prev) => {
      const [newLat, newLng] = moveCoordinates(
        (prev as LatLngTuple)[0],
        (prev as LatLngTuple)[1],
        distanceMeters,
        bearingDegrees,
      );

      checkClosePens(newLat, newLng);

      return [newLat, newLng];
    });
  };

  const addPenMarker = (markerInfo: PenMarkerInfo) => {
    if (clickedMarkerCoord) {
      setPenMarkers([
        ...(penMarkers || []),
        {
          ...markerInfo,
          coord: clickedMarkerCoord,
        },
      ]);

      setClickedMarkerCoord(null);
    }
  };

  const addIssueMarker = (issue: FarmIssue) => {
    if (clickedMarkerCoord) {
      setIssueMarkers([
        ...(issueMarkers || []),
        {
          ...issue,
          loggedBy: userType,
          createdAt: new Date().toISOString(),
          coord: clickedMarkerCoord,
        },
      ]);
      setClickedMarkerCoord(null);
    }
  };

  const filterDisplayedMarkers = (filters: Partial<PenMarkerInfo>) => {
    if (!penMarkers) return;

    if (Object.keys(filters).length === 0) {
      setDisplayedMarkers(penMarkers);
      dispatch(setFilterActive(false));
      return;
    }

    setDisplayedMarkers(
      penMarkers.filter((marker) => marker.animalType === filters.animalType),
    );
    dispatch(setFilterActive(true));
  };

  const addPenDump = (dump: PenDump) => {
    if (activeRun) {
      dispatch(addNewPenDump(dump));
      closeAddDumpModal();
    }
  };

  const checkClosePens = (lat: number, lng: number) => {
    if (!activeRun || !penMarkers) {
      return;
    }

    const closePens = [];
    const radius = 0.05; // 50 meter radius

    // find all pens within radius
    for (const marker of penMarkers) {
      const distance = calcDistance([lat, lng], marker.coord);
      if (distance < radius) {
        closePens.push({ ...marker, distance });
      }
    }

    closePens.sort((a, b) => a.distance - b.distance);

    //find closest pen not already recorded in active run
    for (const pen of closePens) {
      if (
        !activeRun.penDumps.some(
          (dump) =>
            dump.lat === ((pen.coord as LatLngTuple)[0] as number) &&
            dump.lng === (pen.coord as LatLngTuple)[1],
        )
      ) {
        if (interval) {
          clearInterval(interval);
        }

        setClosePen(pen);
        break;
      }
    }
  };

  const closeAddDumpModal = () => {
    setClosePen(null);
  };

  return {
    coord,
    penMarkers: penMarkers || [],
    issueMarkers: issueMarkers || [],
    displayedMarkers,
    inIssuePinMode,
    closePen,
    addPenMarker,
    addPenDump,
    addIssueMarker,
    setClickedMarkerCoord,
    filterDisplayedMarkers,
    closeAddDumpModal,
  };
};

export default useMap;
