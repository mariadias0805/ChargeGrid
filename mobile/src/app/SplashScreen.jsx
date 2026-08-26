import { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

export default function SplashScreen() {
  // valores animados: entrada do conteúdo e feedback de saída
  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideIn = useRef(new Animated.Value(24)).current;
  const exitFade = useRef(new Animated.Value(1)).current;
  const exitScale = useRef(new Animated.Value(1)).current;

  // animação de entrada quando a splash monta
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideIn, {
        toValue: 0,
        friction: 7,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // animação de saída antes de navegar pro login
  function handleStart() {
    Animated.parallel([
      Animated.timing(exitFade, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(exitScale, {
        toValue: 0.96,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.push("/login");
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Faixas amarelas decorativas do topo, iguais às do login */}
      <View style={styles.topBlobLeft} />
      <View style={styles.topBlobRight} />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: Animated.multiply(fadeIn, exitFade),
            transform: [{ translateY: slideIn }, { scale: exitScale }],
          },
        ]}
      >
        {/* Mascote */}
        <View style={styles.illustrationWrapper}>
          <Image
            source={require("../images/flowk.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        {/* Boas-vindas, mesmo padrão de texto do login */}
        <View style={styles.welcome}>
          <Text style={styles.welcomeTitle}>
            Carregue, monitore.{"\n"}e pague com segurança.
          </Text>
          <Text style={styles.welcomeSubtitle}>
            Acompanhe seu KWh em tempo real, controle sessões e pague na
            hora com carteira digital ou Pix
          </Text>
        </View>

        {/* Botão principal, mesmo estilo do botão "ENTRAR" do login */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleStart}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>COMEÇAR</Text>
          <Feather name="arrow-right" size={18} color={DARK} />
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

/* ---------- Paleta (mesma do login) ---------- */
const YELLOW = "#FFD900";
const YELLOW_LIGHT = "#FFE94A";
const DARK = "#050505";
const GRAY_DARK = "#333333";
const GRAY_MEDIUM = "#A6A6A6";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  topBlobLeft: {
    position: "absolute",
    top: -30,
    left: -20,
    width: 160,
    height: 160,
    backgroundColor: YELLOW,
    borderBottomRightRadius: 180,
    borderTopRightRadius: 80,
  },

  topBlobRight: {
    position: "absolute",
    top: -60,
    right: -80,
    width: 260,
    height: 220,
    backgroundColor: YELLOW,
    borderBottomLeftRadius: 220,
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },

  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    position: "absolute",
    top: 24,
    left: 24,
    zIndex: 2,
  },

  illustrationWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },

  logoImage: {
    width: width * 0.8,
    height: width * 0.8,
  },

  welcome: {
    marginTop: 6,
  },

  welcomeTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: DARK,
    textAlign: "center",
    lineHeight: 34,
  },

  welcomeSubtitle: {
    fontSize: 14,
    color: GRAY_MEDIUM,
    textAlign: "center",
    marginTop: 10,
    lineHeight: 20,
    paddingHorizontal: 8,
  },

  button: {
    flexDirection: "row",
    height: 54,
    borderRadius: 14,
    backgroundColor: YELLOW,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 32,
    marginBottom: 20,
  },

  buttonText: {
    color: DARK,
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});