import { Vehicle } from "../page";

interface VehicleSelectorProps {
  vehicles: Vehicle[];
  selectedLicense: string;
  onSelect: (license: string) => void;
}

function VehicleSelector({
  vehicles,
  selectedLicense,
  onSelect,
}: VehicleSelectorProps) {
  return (
    <div className="mb-6">
      <label
        htmlFor="vehicle-select"
        className="block mb-2 font-medium text-gray-700"
      >
        Choose a vehicle:
      </label>
      <select
        id="vehicle-select"
        value={selectedLicense}
        onChange={(e) => onSelect(e.target.value)}
        className="block w-full rounded-md border border-gray-300 px-3 py-2
                   text-base focus:border-indigo-500 focus:ring-indigo-500 focus:ring-1"
      >
        {vehicles.map((vehicle) => (
          <option key={vehicle.license} value={vehicle.license}>
            {vehicle.license} — {vehicle.driverFirstName}{" "}
            {vehicle.driverLastName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default VehicleSelector;
