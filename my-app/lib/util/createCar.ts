export default async function handleCreateCar(
  carData: {
    ticket: string;
    phoneNumber: string;
    make: string;
    color: string;
  },
  locationId: string,
  selectedEntrance: string
) {
  try {
    console.log("Creating car with data:", carData);
    const res = await fetch(
      `http://192.168.1.18:3000/v1/location/${locationId}/entrance/${selectedEntrance}/car/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(carData),
      }
    );
    const data = await res.json();

    console.log("Create car response:", data);
  } catch (error) {
    console.error("Error creating car:", error);
    throw error;
  }
}
