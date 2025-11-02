import { Image } from "expo-image";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useLocation } from "@/context/LocationContext";
import { LoginResponse } from "@/types/types";

const LoginScreen = () => {
  const [passcode, setPasscode] = useState("");
  const { setLocationId, setToken } = useLocation();
  const [error, setError] = useState<any | null>(null);
  async function handleLogin(name: string) {
    // Implement login logic here
    console.log(passcode);
    try {
      const data = await fetch("http://localhost:3000/v1/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name }),
      });

      const res: LoginResponse = await data.json();
      console.log("response", res);
      console.log("state", error);
      if (!res.location) {
        setError(
          error instanceof Error ? error.message : "Invalid location code"
        );
      } else {
        setLocationId(res.location.id);
        setToken(res.token);
        setError(null);
        console.log("token", res.token);
        router.replace("/employee");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
      console.error("Error during login:", error);
    }
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white w-full">
      <View className="items-center gap-4">
        <Image
          source={require("@/assets/images/login.svg")}
          className="w-16 h-14"
        />
        <Text className=" text-4xl font-semibold">Valet Parking System</Text>
        <Text className="text-2xl text-[#4A5565] ">
          Enter location access code
        </Text>
        {error && <Text className="text-red-500">{error}</Text>}
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

export default LoginScreen;
