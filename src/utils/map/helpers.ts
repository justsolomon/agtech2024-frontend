import { LatLngExpression } from 'leaflet';

export const calcDistance = (
  origin: LatLngExpression,
  destination: LatLngExpression,
) => {
  /**
   * Calculate the Haversine distance.
   *
   * Parameters
   * ----------
   * origin : tuple of float
   *     (lat, long)
   * destination : tuple of float
   *     (lat, long)
   *
   * Returns
   * -------
   * distance_in_km : float
   *
   * Examples
   * --------
   * >>> const origin = [48.1372, 11.5756];  // Munich
   * >>> const destination = [52.5186, 13.4083];  // Berlin
   * >>> console.log(round(distance(origin, destination), 1));
   * 504.2
   */

  //@ts-ignore
  const [lat1, lon1] = origin;
  //@ts-ignore
  const [lat2, lon2] = destination;
  const radius = 6371; // km

  const toRadians = (degrees: number): number => degrees * (Math.PI / 180);

  const dlat = toRadians(lat2 - lat1);
  const dlon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dlat / 2) * Math.sin(dlat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dlon / 2) *
      Math.sin(dlon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = radius * c;

  return d;
};

export const moveCoordinates = (
  startLat: number,
  startLng: number,
  distanceMeters: number,
  bearingDegrees: number,
): [number, number] => {
  const R = 6371e3; // Earth's radius in meters

  const toRadians = (degrees: number): number => degrees * (Math.PI / 180);
  const toDegrees = (radians: number): number => radians * (180 / Math.PI);

  const lat1 = toRadians(startLat);
  const lng1 = toRadians(startLng);
  const bearing = toRadians(bearingDegrees);

  const newLat = Math.asin(
    Math.sin(lat1) * Math.cos(distanceMeters / R) +
      Math.cos(lat1) * Math.sin(distanceMeters / R) * Math.cos(bearing),
  );

  const newLng =
    lng1 +
    Math.atan2(
      Math.sin(bearing) * Math.sin(distanceMeters / R) * Math.cos(lat1),
      Math.cos(distanceMeters / R) - Math.sin(lat1) * Math.sin(newLat),
    );

  return [toDegrees(newLat), toDegrees(newLng)];
};
