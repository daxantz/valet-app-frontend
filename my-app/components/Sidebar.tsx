import { Image } from "expo-image";
import { View, Text } from "react-native";
import SidebarButton from "./SidebarButton";
import { Car } from "@/types/types";

export default function Sidebar({ car }: { car: Car }) {
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
        <SidebarButton text="Edit Details" icon="bell" />
        <SidebarButton text="Check Out" icon="bell" />
      </View>
    </View>
  );
}
