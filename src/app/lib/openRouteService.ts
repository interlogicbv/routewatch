export async function getETA(
  startLat: number,
  startLon: number,
  endLat: number,
  endLon: number
) {
  const API_KEY = process.env.NEXT_PUBLIC_ORS_API_KEY;

  const response = await fetch(
    `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${API_KEY}&start=${startLon},${startLat}&end=${endLon},${endLat}`
  );

  if (!response.ok) {
    throw new Error(`ORS API error: ${response.statusText}`);
  }

  const data = await response.json();
  const durationSeconds = data.features[0].properties.summary.duration;
  const durationMinutes = Math.round(durationSeconds / 60);
  const distanceKm = (
    data.features[0].properties.summary.distance / 1000
  ).toFixed(1);

  return {
    durationMinutes,
    distanceKm,
  };
}
