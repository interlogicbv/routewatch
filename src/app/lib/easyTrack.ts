export async function getVehicleStatuses(): Promise<any[]> {
  try {
    const sessionResponse = await fetch(
      "https://api.easytrack.nl/rest/sessions/open",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          organisation: process.env.NEXT_PUBLIC_ORG,
          username: process.env.NEXT_PUBLIC_USER,
          password: process.env.NEXT_PUBLIC_PASS,
        }),
      }
    );

    if (!sessionResponse.ok) {
      throw new Error(
        `Error while fetching sessionKey: ${sessionResponse.statusText}`
      );
    }

    const sessionData = await sessionResponse.json();
    const sessionKey = sessionData.sessionId;
    if (!sessionKey) {
      throw new Error("Did not receive sessionKey");
    }

    // Get vehicle statuses
    const dataResponse = await fetch(
      "https://api.easytrack.nl/rest/vehicles/current-statuses",
      {
        method: "GET",
        headers: { SessionId: sessionKey },
      }
    );

    if (!dataResponse.ok) {
      throw new Error(
        `Error while fetching vehicle statuses: ${dataResponse.statusText}`
      );
    }

    const vehicleData = await dataResponse.json();
    return vehicleData;
  } catch (error) {
    console.error("Error while fetching vehicle statuses", error);
    throw error;
  }
}
