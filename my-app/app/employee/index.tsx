import { Image } from "expo-image";
import { useState } from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useLocation } from "@/context/LocationContext";

const EmployeeLoginScreen = () => {
  const [passcode, setPasscode] = useState("");

  const { locationId, token } = useLocation();
  async function handleLogin(pin: string) {
    // Implement login logic here
    console.log(passcode);
    try {
      const data = await fetch(
        `http://localhost:3000/v1/location/${locationId}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({ pin }),
        }
      );
      console.log(token);

      const res = await data.json();
      router.replace("/main");
      console.log("data", res);
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white w-full">
      <Button title="Go Back" onPress={() => router.back()} />
      <View className="items-center gap-4">
        <Image
          source={require("@/assets/images/login.svg")}
          className="w-16 h-14"
        />
        <Text className=" text-4xl font-semibold">Valet Parking System</Text>
        <Text className="text-2xl text-[#4A5565] ">
          Enter Employee access code
        </Text>
      </View>

      <TextInput
        keyboardType="number-pad"
        className="w-[80%] border border-gray-400 rounded-md py-6 mt-5"
        onChangeText={setPasscode}
      />

      <TouchableOpacity
        className="bg-[#030213] w-[80%] p-3 rounded-lg items-center mt-4 py-6 "
        onPress={() => handleLogin(passcode)}
      >
        <Text className="text-white font-medium text-3xl">Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EmployeeLoginScreen;
