export default async function handleCreateCar(
  carData: {
    ticket: string;
    phoneNumber: string;
    make?: string;
    color?: string;
    photos?: string[];
  },
  locationId: string,
  selectedEntrance: string
) {
  try {
    const formData = new FormData();
    formData.append("ticket", carData.ticket);
    formData.append("phoneNumber", carData.phoneNumber);
    if (carData.make) formData.append("make", carData.make);
    if (carData.color) formData.append("color", carData.color);
    if (carData.photos) {
      carData.photos.forEach((photo, index) => {
        formData.append("images", {
          uri: photo,
          name: `photo_${index}.jpg`,
          type: "image/jpeg",
        } as any);
      });
    }
    const res = await fetch(
      `http://192.168.1.31:3000/v1/location/${locationId}/entrance/${selectedEntrance}/car/`,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      }
    );
    const data = await res.json();
    console.log("Create car response:", data);
  } catch (error) {
    console.error("Error creating car:", error);
    throw error;
  }
}
