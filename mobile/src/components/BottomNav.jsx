import { useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Feather } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import {
  DARK,
  GRAY_LIGHT,
  GRAY_MEDIUM,
  YELLOW,
} from "../constants/theme";

const DEFAULT_TABS = [
  { key: "home", route: "/home", icon: "home", label: "" },
  { key: "map", route: "/map", icon: "map", label: "" },
  { key: "wallet", route: "/wallet", icon: "credit-card", label: "" },
  { key: "profile", route: "/profile", icon: "user", label: "" },
];

export default function BottomNav({
  tabs = DEFAULT_TABS,
  centerIcon = "zap",
  centerRoute = "/StartCharging",
  dark = false,
}) {
  const pathname = usePathname();

  const leftTabs = tabs.slice(0, 2);
  const rightTabs = tabs.slice(2);

  return (
    <View style={[styles.wrapper, dark && styles.wrapperDark]}>
      <View style={[styles.nav, dark && styles.navDark]}>

        {leftTabs.map((tab) => (
          <NavItem
            key={tab.key}
            tab={tab}
            active={pathname === tab.route}
            dark={dark}
          />
        ))}

        <CenterButton
          icon={centerIcon}
          route={centerRoute}
          dark={dark}
        />

        {rightTabs.map((tab) => (
          <NavItem
            key={tab.key}
            tab={tab}
            active={pathname === tab.route}
            dark={dark}
          />
        ))}

      </View>
    </View>
  );
}

function NavItem({ tab, active, dark }) {
  const scale = useRef(new Animated.Value(1)).current;

  function pressIn() {
    Animated.spring(scale, {
      toValue: 0.92,
      useNativeDriver: true,
    }).start();
  }

  function pressOut() {
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  }

  const inactiveColor = dark
    ? "rgba(255,255,255,0.45)"
    : GRAY_MEDIUM;

  const activeColor = dark ? YELLOW : DARK;

  return (
    <TouchableOpacity
      style={styles.navItem}
      activeOpacity={0.8}
      onPressIn={pressIn}
      onPressOut={pressOut}
      onPress={() => router.push(tab.route)}
    >
      <Animated.View
        style={[
          styles.iconWrapper,
          {
            transform: [{ scale }],
          },
        ]}
      >
        <Feather
          name={tab.icon}
          size={26}
          color={active ? activeColor : inactiveColor}
        />
      </Animated.View>

      <Text
        style={[
          styles.navLabel,
          {
            color: active ? activeColor : inactiveColor,
            fontWeight: active ? "700" : "500",
          },
        ]}
      >
        {tab.label}
      </Text>
    </TouchableOpacity>
  );
}

function CenterButton({ icon, route, dark }) {
  const scale = useRef(new Animated.Value(1)).current;

  function pressIn() {
    Animated.spring(scale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  }

  function pressOut() {
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  }

  return (
    <TouchableOpacity
      style={styles.centerWrapper}
      activeOpacity={0.85}
      onPressIn={pressIn}
      onPressOut={pressOut}
      onPress={() => router.push(route)}
    >
      <Animated.View
        style={[
          styles.navCenterButton,
          {
            transform: [{ scale }],
          },
        ]}
      >
        <Feather name={icon} size={26} color={DARK}/>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    paddingBottom: 0,
    paddingHorizontal: 0,
    backgroundColor: "#FFFFFF",
  },

  wrapperDark: {
    backgroundColor: DARK,
  },

  nav: {
    width: "100%",
    height: 85, // barra maior
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",

    backgroundColor: "#FFFFFF",

    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },

  navDark: {
    backgroundColor: DARK,
    borderTopColor: "rgba(255,255,255,0.08)",
  },

  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
  },

  iconWrapper: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },

  navLabel: {
    fontSize: 11,
  },

  // Área central do botão
  centerWrapper: {
    width: 76,
    height: 76,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 0,
  },

  // Botão do raio
  navCenterButton: {
    width: 60,
    height: 60,
    borderRadius: 27,
    backgroundColor: YELLOW,

    alignItems: "center",
    justifyContent: "center",

    // sobe o botão em relação à barra
    marginTop: -9,
  },
});