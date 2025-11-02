import { useLocation } from "@/context/LocationContext";

import { View, Text } from "react-native";

export default function Main() {
  const { selectedEntrance } = useLocation();

  return (
    <View>
      <Text className="text-6xl">{selectedEntrance}</Text>
    </View>
  );
}
