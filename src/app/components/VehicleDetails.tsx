import { Vehicle } from "../page";

interface VehicleDetailsProps {
  vehicle: Vehicle;
}

function VehicleDetails({ vehicle }: VehicleDetailsProps) {
  return (
    <div className="mt-6 bg-gray-50 p-6 rounded-md shadow-md space-y-3 border border-gray-200">
      <p>
        <span className="font-semibold">License:</span> {vehicle.license}
      </p>
      <p>
        <span className="font-semibold">Latitude:</span> {vehicle.latitude}
      </p>
      <p>
        <span className="font-semibold">Longitude:</span> {vehicle.longitude}
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
      <p>
        <span className="font-semibold">Driver First Name:</span>{" "}
        {vehicle.driverFirstName}
      </p>
      <p>
        <span className="font-semibold">Driver Last Name:</span>{" "}
        {vehicle.driverLastName}
      </p>
      <p>
        <span className="font-semibold">Driver Login:</span>{" "}
        {vehicle.driverLogin}
      </p>
      {vehicle.positionLastUpdated && (
        <p>
          <span className="font-semibold">Position Updated:</span>{" "}
          {vehicle.positionLastUpdated}
        </p>
      )}
    </div>
  );
}

export default VehicleDetails;
