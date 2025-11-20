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
}: {
  text: string;
  icon: keyof typeof icons;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      className="border border-gray-400 rounded-2xl m-4 p-4 flex-row items-center gap-4"
      onPress={onPress}
    >
      <Image source={icons[icon]} style={{ width: 20, height: 20 }} />
      <Text className=" font-medium text-3xl">{text}</Text>
    </TouchableOpacity>
  );
}
