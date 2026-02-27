import { useLocation } from "@/context/LocationContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateCar() {
  const { locationId, selectedEntrance } = useLocation();
  const queryClient = useQueryClient();
  // Placeholder for create car logic
  async function createCar(data: any, locationId: string, entranceId: string) {
    // Implement car creation logic here
    const res = await fetch(
      `http://192.168.1.18:3000/v1/location/${locationId}/entrance/${entranceId}/car/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await res.json();
    return result;
  }
  const createCarMutation = useMutation({
    mutationFn: (data: any) =>
      createCar(data, locationId as string, selectedEntrance as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });
  return {
    createCarMutation,
  };
}
