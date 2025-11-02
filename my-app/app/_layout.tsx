import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "@/global.css";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LocationProvider } from "@/context/LocationContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const unstable_settings = {
  anchor: "(tabs)",
};
const queryClient = new QueryClient();
export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <LocationProvider>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack>
              {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
              <Stack.Screen
                name="index"
                options={{
                  headerTitle: "Location Login",
                  headerBackTitle: "Back",
                }}
              />
              <Stack.Screen
                name="employee/index"
                options={{
                  headerTitle: "Employee Login",
                  headerBackTitle: "Back",
                }}
              />
              <Stack.Screen
                name="main/index"
                options={{
                  headerTitle: "Dashboard",
                  headerBackTitle: "Back",
                }}
              />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </LocationProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
