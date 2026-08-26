import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Redirect } from "expo-router";

import { getStations } from "../../services/api";

export default function Home() {
  return <Redirect href="/SplashScreen" />;
}