import { LatLngExpression } from 'leaflet';
import { useEffect, useState } from 'react';
import { calcDistance } from 'utils';

const useTruckSpeed = () => {
  const [startTime, setStartTime] = useState('');
  const [coords, setCoords] = useState<Record<string, LatLngExpression>>();
  const [speed, setSpeed] = useState(0);

  const calcSpeed = (
    currCoord: LatLngExpression,
    oldCoord: LatLngExpression,
  ) => {
    const distanceKm = calcDistance(currCoord, oldCoord);
    const timeElapsedInHrs = getTimeElapsedInHrs();

    setStartTime(new Date().toISOString());

    setSpeed(distanceKm / timeElapsedInHrs);
  };

  const getTimeElapsedInHrs = () => {
    const startMs = new Date(startTime).getTime();
    const nowMs = new Date().getTime();

    return Math.floor((nowMs - startMs) / 1000) / 3600;
  };

  const beginSpeedTracking = () => {
    setStartTime(new Date().toISOString());
  };

  return { speed, setCoords, calcSpeed, beginSpeedTracking };
};

export default useTruckSpeed;
