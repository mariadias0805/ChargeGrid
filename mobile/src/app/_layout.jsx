import { Stack } from "expo-router";

export default function RootLayout() {
  return (
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          animationDuration: 260,
        }}
      >
        {/* Splash e login: fade suave, sem deslizar */}
        <Stack.Screen name="index" options={{ animation: "fade" }} />
        <Stack.Screen name="login" options={{ animation: "fade" }} />

        {/* Home: fade também, já que é o "destino" após o login/splash */}
        <Stack.Screen name="home" options={{ animation: "fade" }} />

        {/* Telas internas: deslizam da direita (navegação "pra frente") */}
        <Stack.Screen
          name="wallet"
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen name="map" options={{ animation: "slide_from_right" }} />

        {/* StartCharging funciona como uma ação rápida: sobe de baixo, como um modal */}
        <Stack.Screen
          name="StartCharging"
          options={{ animation: "slide_from_bottom" }}
        />
      </Stack>
  );
}
