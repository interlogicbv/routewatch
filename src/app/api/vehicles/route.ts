import { NextResponse } from "next/server";
import { getVehicleStatuses } from "@/app/lib/easyTrack";

export async function GET() {
  try {
    const rawVehicles = await getVehicleStatuses();

    const vehicles = rawVehicles.map((v: any) => ({
      license: v.vehicle.code,
      driverFirstName: v.driver?.firstName.trim() || "",
      driverLastName: v.driver?.lastName.trim() || "",
      driverLogin: v.driverLogin,
      latitude: v.position.latitude,
      longitude: v.position.longitude,
      positionLastUpdate: v.positionLastUpdate,
    }));

    return NextResponse.json(vehicles);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
