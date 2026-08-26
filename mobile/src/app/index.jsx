import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { LogBox } from "react-native";

  LogBox.ignoreAllLogs();

export default function Home() {
  return <Redirect href="/SplashScreen" />;
}
