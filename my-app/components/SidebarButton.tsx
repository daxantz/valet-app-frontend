import { Image } from "expo-image";
import { Text, TouchableOpacity } from "react-native";

const icons: Record<string, any> = {
  bell: require("@/assets/images/bell.png"),
  edit: require("@/assets/images/pencil.png"),
  check: require("@/assets/images/black-check.png"),
  search: require("@/assets/images/search.png"),
  arrival: require("@/assets/images/arrival.png"),
};

export default function SidebarButton({
  text,
  icon,
  onPress,
  size = "lg",
}: {
  text: string;
  icon: keyof typeof icons;
  onPress?: () => void;
  size?: "sm" | "lg";
}) {
  const isSm = size === "sm";
  return (
    <TouchableOpacity
      className={`border border-gray-400 rounded-2xl flex-row items-center ${isSm ? "m-2 p-3 gap-2" : "m-4 p-4 gap-4"}`}
      onPress={onPress}
    >
      <Image
        source={icons[icon]}
        style={{ width: isSm ? 16 : 20, height: isSm ? 16 : 20 }}
      />
      <Text className={`font-medium ${isSm ? "text-base" : "text-3xl"}`}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
