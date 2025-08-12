"use client";

import { useState, useEffect } from "react";
import VehicleSelector from "./components/VehicleSelector";
import VehicleDetails from "./components/VehicleDetails";

export interface Vehicle {
  license: string;
  driverFirstName: string;
  driverLastName: string;
  driverLogin: string;
  latitude: number;
  longitude: number;
  positionLastUpdated?: string;
}

export default function Home() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedLicense, setSelectedLicense] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("/api/vehicles")
      .then((res) => res.json())
      .then((data) => {
        setVehicles(data);
        if (data.length > 0) setSelectedLicense(data[0].license);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load vehicles");
        setLoading(false);
      });
  }, []);

  const selectedVehicle = vehicles.find((v) => v.license === selectedLicense);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Select Vehicle</h1>

      {loading && <p>Loading vehicles...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && vehicles.length > 0 && (
        <>
          <VehicleSelector
            vehicles={vehicles}
            selectedLicense={selectedLicense}
            onSelect={setSelectedLicense}
          />
          {selectedVehicle && <VehicleDetails vehicle={selectedVehicle} />}
        </>
      )}

      {!loading && !error && vehicles.length === 0 && <p>No vehicles found.</p>}
    </div>
  );
}
