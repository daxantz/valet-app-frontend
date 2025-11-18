import { Image } from "expo-image";
import { View, Text } from "react-native";
import SidebarButton from "./SidebarButton";
import { Car } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function deleteCar(
  locationId: string,
  entranceId: string,
  carId: number
) {
  try {
    console.log("Deleting car", { locationId, entranceId, carId });
    const res = await fetch(
      `http://localhost:3000/v1/location/${locationId}/entrance/${entranceId}/car/${carId}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      console.log("res", res.body);
      throw new Error("Failed to delete car");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error deleting car", error);
    throw error;
  }
}

type SidebarProps = {
  car: Car;
  locationId: string;
  entranceId: string;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedCar: React.Dispatch<React.SetStateAction<Car | null>>;
};

export default function Sidebar({
  car,
  locationId,
  entranceId,
  setModalVisible,
  setSelectedCar,
}: SidebarProps) {
  const queryClient = useQueryClient();

  // useMutation for deleting a car
  const deleteCarMutation = useMutation({
    mutationFn: () => deleteCar(locationId, entranceId, car.id),
    onSuccess: () => {
      // After successful delete, invalidate the "cars" query so the UI refreshes
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      console.log("✅ Car deleted successfully");
    },
    onError: (error) => {
      console.error("❌ Failed to delete car:", error);
    },
  });
  return (
    <View className=" w-full bg-white h-screen">
      <View className="p-6">
        <Image source={require("@/assets/images/car.png")} />
        <Text className="text-3xl">Car Details</Text>
      </View>
      <View className="p-6">
        <View>
          <Text className="text-2xl">Make</Text>
          <Text className="text-2xl">{car?.make}</Text>
        </View>
        <View>
          <Text className="text-2xl">Color</Text>
          <Text className="text-2xl">{car?.color}</Text>
        </View>
        <View>
          <Text className="text-2xl">Phone Number</Text>
          <Text className="text-2xl">{car?.phoneNumber}</Text>
        </View>
        <View>
          <Text className="text-2xl">Parked At</Text>
          <Text className="text-2xl">{car?.createdAt}</Text>
        </View>
      </View>
      <View>
        <SidebarButton text="Request Car" icon="bell" />
        <SidebarButton
          text="Edit Details"
          icon="bell"
          onPress={() => setModalVisible((prev) => !prev)}
        />
        <SidebarButton
          text="Check Out"
          icon="bell"
          onPress={() => {
            deleteCarMutation.mutate();
            setSelectedCar(null);
          }}
        />
      </View>
    </View>
  );
}
