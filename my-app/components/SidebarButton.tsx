import { Image } from "expo-image";
import { Text, TouchableOpacity } from "react-native";

const icons: Record<string, any> = {
  bell: require("@/assets/images/bell.png"),
  //   settings: require("@/assets/images/settings.png"),
  //   profile: require("@/assets/images/profile.png"),
};

export default function SidebarButton({
  text,
  icon,
}: {
  text: string;
  icon: keyof typeof icons;
}) {
  return (
    <TouchableOpacity className="border border-gray-400 rounded-2xl m-4 p-4 flex-row items-center gap-4">
      <Image source={icons[icon]} />
      <Text className=" font-medium text-3xl">{text}</Text>
    </TouchableOpacity>
  );
}
