import { useLocation } from "@/context/LocationContext";
import { Entrance } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface EntranceModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

async function fetchEntrances(locationId: string) {
  try {
    const res = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/v1/location/${locationId}/entrance/`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch entrances");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching entrances:", error);
    throw error;
  }
}

export function EntranceModal({
  modalVisible,
  setModalVisible,
}: EntranceModalProps) {
  const { setSelectedEntrance, locationId } = useLocation();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["entrances"],
    queryFn: () => fetchEntrances(locationId!),
  });

  function selectEntrance(name: string) {
    setSelectedEntrance(name);
    router.replace("/main");
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      className="flex-1 justify-center items-center"
    >
      {isPending && <Text>Loading...</Text>}
      {isError && <Text>{error.message}</Text>}
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 12,
          padding: 20,
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.25,
          shadowRadius: 10,
          elevation: 10,
        }}
        className="w-[75%] self-center h-[75%] my-auto"
      >
        <View className=" w-[75%] self-center ">
          <View>
            <View className="mt-4 gap-3">
              {data?.entrances.map((ent: Entrance) => (
                <Text
                  className=" text-5xl bg-[#F3F3F5] pl-9 py-3"
                  key={ent.name}
                  onPress={() => selectEntrance(ent.id.toString())}
                >
                  {ent.name}
                </Text>
              ))}
            </View>

            <TouchableOpacity
              className="bg-[#030213] w-[80%] p-3 rounded-lg items-center mx-auto mt-4 py-6"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-white font-medium text-3xl">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
