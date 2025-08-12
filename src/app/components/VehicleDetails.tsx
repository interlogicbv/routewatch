"use client";

import { useEffect, useState } from "react";
import { Vehicle } from "../page";
import { getETA } from "../lib/openRouteService";

interface VehicleDetailsProps {
  vehicle: Vehicle;
}

const BUFFER: number = 15; // Buffer time in minutes

function VehicleDetails({ vehicle }: VehicleDetailsProps) {
  const [eta, setEta] = useState<string>("Loading...");

  useEffect(() => {
    async function fetchETA() {
      try {
        const settingsRes = await fetch("/api/settings");
        if (!settingsRes.ok) throw new Error("Failed to load settings");
        const settings = await settingsRes.json();

        const endLat = settings.destinationLat;
        const endLon = settings.destinationLng;

        const result = await getETA(
          vehicle.latitude,
          vehicle.longitude,
          endLat,
          endLon
        );

        setEta(
          `${result.durationMinutes + BUFFER} min (${result.distanceKm} km)`
        );
      } catch (err) {
        console.error(err);
        setEta("Not available");
      }
    }

    if (vehicle.latitude && vehicle.longitude) {
      fetchETA();
    }
  }, [vehicle.latitude, vehicle.longitude]);

  return (
    <div className="mt-6 bg-gray-50 p-6 rounded-md shadow-md space-y-3 border border-gray-200">
      <p>
        <span className="font-semibold">License:</span> {vehicle.license}
      </p>
      <p>
        <a
          href={`https://maps.google.com/?q=${vehicle.latitude},${vehicle.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:underline"
        >
          View Location on Map
        </a>
      </p>
      {vehicle.positionLastUpdate && (
        <p className="text-sm text-gray-800">
          <span className="font-semibold">Last Update:</span>{" "}
          {new Date(vehicle.positionLastUpdate).toLocaleString()}
        </p>
      )}
      <p>
        <span className="font-semibold">Driver:</span>{" "}
        {`${vehicle.driverFirstName} ${vehicle.driverLastName}`}
      </p>
      <p>
        <span className="font-semibold">Driver Login:</span>{" "}
        {new Date(vehicle.driverLogin).toLocaleString()}
      </p>
      <p>
        <span className="font-semibold">ETA:</span> {eta}
      </p>
    </div>
  );
}

export default VehicleDetails;
