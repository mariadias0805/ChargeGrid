import { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

import {
  DARK,
  YELLOW_LIGHT,
  GRAY_LIGHT,
  GRAY_MEDIUM,
} from "../constants/theme";

export default function Header({
  variant = "page",
  greeting,
  subtitle,
  title,
  logoSource,
  onBackPress,
  rightElement,
  showNotification = true,
  hasUnread = true,
  onNotificationPress,
  screenPadding = 24,
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-10)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        friction: 8,
        tension: 60,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const animatedStyle = {
    opacity,
    transform: [{ translateY }],
  };

  const bleedStyle = {
    marginHorizontal: -screenPadding,
    paddingHorizontal: screenPadding,
  };

  /**
   * BOTÃO DE NOTIFICAÇÃO
   */
  const notificationButton =
    showNotification && (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.iconButton}
        onPress={onNotificationPress}
        accessibilityRole="button"
        accessibilityLabel="Notificações"
        hitSlop={{
          top: 10,
          bottom: 10,
          left: 10,
          right: 10,
        }}
      >
        <Feather name="bell" size={19} color={DARK} />

        {hasUnread && <View style={styles.notificationDot} />}
      </TouchableOpacity>
    );

  /**
   * AVATAR / LOGO
   */
  const avatar =
    rightElement ?? (
      <View style={[styles.iconButton, styles.avatar]}>
        <Image
          source={logoSource ?? require("../images/logo.png")}
          style={styles.avatarLogo}
          resizeMode="contain"
        />
      </View>
    );

  /**
   * HOME FLAT
   *
   * Header sem fundo branco.
   */
  if (variant === "homeFlat") {
    return (
      <Animated.View style={[styles.flatContainer, animatedStyle]}>
        <View style={styles.homeContent}>
          <View style={styles.textContainer}>
            {!!greeting && (
              <Text style={styles.greeting} numberOfLines={1}>
                {greeting}
              </Text>
            )}

            {!!subtitle && (
              <Text style={styles.subtitle} numberOfLines={1}>
                {subtitle}
              </Text>
            )}
          </View>

          <View style={styles.actions}>
            {notificationButton}
            {avatar}
          </View>
        </View>
      </Animated.View>
    );
  }

  /**
   * HOME
   *
   * Header principal com fundo branco.
   */
  if (variant === "home") {
    return (
      <Animated.View
        style={[
          styles.header,
          styles.homeHeader,
          bleedStyle,
          animatedStyle,
        ]}
      >
        <View style={styles.homeContent}>
          <View style={styles.textContainer}>
            {!!greeting && (
              <Text style={styles.greeting} numberOfLines={1}>
                {greeting}
              </Text>
            )}

            {!!subtitle && (
              <Text style={styles.subtitle} numberOfLines={1}>
                {subtitle}
              </Text>
            )}
          </View>

          <View style={styles.actions}>
            {notificationButton}
            {avatar}
          </View>
        </View>
      </Animated.View>
    );
  }

  /**
   * PAGE
   *
   * Header para telas internas.
   */
  return (
    <Animated.View
      style={[
        styles.header,
        styles.pageHeader,
        bleedStyle,
        animatedStyle,
      ]}
    >
      <View style={styles.pageContent}>
        {/* Esquerda */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.iconButton}
          onPress={onBackPress ?? (() => router.back())}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
          hitSlop={{
            top: 10,
            bottom: 10,
            left: 10,
            right: 10,
          }}
        >
          <Feather name="chevron-left" size={21} color={DARK} />
        </TouchableOpacity>

        {/* Centro */}
        <View style={styles.titleContainer}>
          <Text
            style={styles.pageTitle}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
        </View>

        {/* Direita */}
        <View style={styles.rightSlot}>
          {rightElement ?? <View style={styles.emptySlot} />}
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  /**
   * =====================================================
   * HEADER BASE
   * =====================================================
   */

  header: {
    backgroundColor: "#FFFFFF",

    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,

    borderBottomWidth: 1,
    borderBottomColor: GRAY_LIGHT,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.055,
    shadowRadius: 14,

    elevation: Platform.OS === "android" ? 3 : 0,

    zIndex: 10,
  },

  /**
   * =====================================================
   * HOME
   * =====================================================
   */

  homeHeader: {
    paddingTop: 54,
    paddingBottom: 22,
    marginBottom: 20,
  },

  homeContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  textContainer: {
    flex: 1,
    marginRight: 16,
  },

  greeting: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: "800",
    color: DARK,
    letterSpacing: -0.3,
  },

  subtitle: {
    marginTop: 4,

    fontSize: 13,
    lineHeight: 18,

    color: GRAY_MEDIUM,

    fontWeight: "500",
  },

  /**
   * =====================================================
   * AÇÕES
   * =====================================================
   */

  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  iconButton: {
    width: 42,
    height: 42,

    borderRadius: 21,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: YELLOW_LIGHT,
  },

  /**
   * Bolinha de notificação
   */
  notificationDot: {
    position: "absolute",

    top: 7,
    right: 7,

    width: 8,
    height: 8,

    borderRadius: 4,

    backgroundColor: DARK,

    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },

  /**
   * =====================================================
   * AVATAR
   * =====================================================
   */

  avatar: {
    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: GRAY_LIGHT,

    overflow: "hidden",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 5,

    elevation: 1,
  },

  avatarLogo: {
    width: "70%",
    height: "70%",
  },

  /**
   * =====================================================
   * HOME FLAT
   * =====================================================
   */

  flatContainer: {
    paddingTop: 44,
    marginBottom: 20,
  },

  /**
   * =====================================================
   * PAGE HEADER
   * =====================================================
   */

  pageHeader: {
    paddingTop: 54,
    paddingBottom: 16,
    marginBottom: 18,
  },

  pageContent: {
    minHeight: 42,

    flexDirection: "row",
    alignItems: "center",

    position: "relative",
  },

  /**
   * Mantém o título visualmente centralizado
   * mesmo quando existe um elemento diferente
   * no lado direito.
   */
  titleContainer: {
    position: "absolute",

    left: 58,
    right: 58,

    alignItems: "center",
    justifyContent: "center",
  },

  pageTitle: {
    maxWidth: "90%",

    fontSize: 18,
    lineHeight: 23,

    fontWeight: "800",
    color: DARK,

    letterSpacing: -0.2,

    textAlign: "center",
  },

  rightSlot: {
    marginLeft: "auto",

    width: 42,
    height: 42,

    alignItems: "center",
    justifyContent: "center",
  },

  emptySlot: {
    width: 42,
    height: 42,
  },
});