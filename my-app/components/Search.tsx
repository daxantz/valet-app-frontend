import { Text, View, TextInput } from "react-native";
import CarList from "./CarList";
import * as Device from "expo-device";
import { DeviceType } from "expo-device";
export type SearchProps = {
  query: string;
  setQuery: (query: string) => void;
  setBrand: (make: string) => void;
  selectedBrand?: string;
};
export default function Search({
  query,
  setQuery,
  setBrand,
  selectedBrand,
}: SearchProps) {
  return (
    <View
      className={`bg-white   ${Device.deviceType === DeviceType.TABLET && " w-1/4 h-screen "}`}
    >
      <View className="p-6  flex-row items-center gap-4">
        <Text
          className={`text-2xl ${Device.deviceType === DeviceType.TABLET && "text-4xl"}`}
        >
          Search
        </Text>
      </View>

      <TextInput
        className={`p-2 border border-gray-400 rounded-2xl text-2xl ${Device.deviceType === DeviceType.PHONE && " mx-6"}`}
        placeholder="Search..."
        onChangeText={setQuery}
        value={query}
      />
      <CarList setBrand={setBrand} selectedBrand={selectedBrand} />
    </View>
  );
}
