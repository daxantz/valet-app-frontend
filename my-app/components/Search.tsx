import { Text, View, TextInput } from "react-native";
import CarList from "./CarList";
type SearchProps = {
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
    <View className="  bg-white h-screen  w-1/4 ">
      <View className="p-6  flex-row items-center gap-4">
        <Text className=" text-4xl">Search</Text>
      </View>

      <TextInput
        className="m-6 p-4 border border-gray-400 rounded-2xl text-2xl"
        placeholder="Search..."
        onChangeText={setQuery}
        value={query}
      />
      <CarList setBrand={setBrand} selectedBrand={selectedBrand} />
    </View>
  );
}
