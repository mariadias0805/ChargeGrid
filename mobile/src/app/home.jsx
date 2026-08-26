import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Svg, { Circle } from "react-native-svg";
import { router } from "expo-router";
import BottomNav from "../components/BottomNav";

/* ---------- Paleta (mesma do login / splash) ---------- */
const YELLOW = "#FFD900";
const YELLOW_LIGHT = "#FFE94A";
const DARK = "#050505";
const GRAY_LIGHT = "#E5E5E5";
const GRAY_MEDIUM = "#A6A6A6";
const GRAY_DARK = "#333333";
const GREEN = "#2ECC71";

const SESSIONS = [
  {
    id: "1",
    price: "R$ 3,33",
    kwh: "8.5 kWh",
    date: "12 fev 2026",
    duration: "42 min",
  },
  {
    id: "2",
    price: "R$ 5,00",
    kwh: "6.5 kWh",
    date: "20 fev 2026",
    duration: "40 min",
  },
];

export default function Home() {
  const [battery] = useState(62);

  function handleStartCharging() {
    router.push({
      pathname: "/select-charger",
      params: { chargerName: "ChargeOn Highway Hub", pricePerKwh: "0.89" },
    });
  }

  function handleWallet() {
    router.push("/wallet");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBlobRight} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Cabeçalh */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Boa noite, Yasmin !</Text>
          </View>
          <View style={styles.avatar}>
            <Image
              source={require("../images/logo.png")}
              style={styles.avatarLogo}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Medidor circular de bateria */}
        <View style={styles.batteryCard}>
          <View style={styles.gaugeWrapper}>
            <CircularProgress
              percentage={battery}
              size={168}
              strokeWidth={14}
            />
            <View style={styles.gaugeCenter}>
              <Text style={styles.gaugePercent}>{battery}%</Text>
              <Text style={styles.gaugeLabel}>22 km restantes</Text>
            </View>
            <View style={styles.healthBadge}>
              {/* Health bateria */}
              <Text style={styles.healthBadgeText}>88%</Text>
            </View>
          </View>
        </View>

        {/* Saldo da carteira */}
        <View style={styles.walletCard}>
          <View style={styles.walletIconWrap}>
            <Feather name="credit-card" size={20} color={YELLOW} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.walletLabel}>Saldo da carteira</Text>
            <Text style={styles.walletValue}>R$ 1.250,00</Text>
          </View>
          <TouchableOpacity
            style={styles.rechargeButton}
            onPress={handleWallet}
          >
            <Text style={styles.rechargeButtonText}>Recarregar</Text>
          </TouchableOpacity>
        </View>

        {/* Carregador mais próximo */}
        <Text style={styles.sectionTitle}>Carregador DC mais próximo</Text>

        <View style={styles.chargerCard}>
          <View style={styles.chargerHeaderRow}>
            <Text style={styles.chargerName}>ChargeOn Highway Hub</Text>
            <View style={styles.availableDot} />
          </View>

          <View style={styles.chargerMetaRow}>
            <Feather name="zap" size={13} color={GRAY_MEDIUM} />
            <Text style={styles.chargerMetaText}>60kW DC Fast</Text>
            <Text style={styles.chargerDot}>•</Text>
            <Feather name="map-pin" size={13} color={GRAY_MEDIUM} />
            <Text style={styles.chargerMetaText}>1.6 km de distância</Text>
          </View>

          <View style={styles.chargerFooterRow}>
            <Text style={styles.chargerPrice}>R$ 0,89 / kWh</Text>
            <TouchableOpacity
              style={styles.startButton}
              onPress={handleStartCharging}
            >
              <Text style={styles.startButtonText}>Iniciar carregamento</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Últimas sessões */}
        <Text style={styles.sectionTitle}>Última sessão de carregamento</Text>

        <FlatList
          data={SESSIONS}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={{ gap: 10 }}
          renderItem={({ item }) => (
            <View style={styles.sessionCard}>
              <View style={styles.sessionIconWrap}>
                <Feather name="clock" size={16} color={DARK} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.sessionPrice}>{item.price}</Text>
                <Text style={styles.sessionMeta}>
                  {item.kwh} · {item.date} · Duração {item.duration}
                </Text>
              </View>
            </View>
          )}
        />
      </ScrollView>

      {/* Barra de navegação inferior — puxada mais pra cima */}


      <BottomNav />
    </SafeAreaView>
  );
}

/* ---------- Medidor circular (SVG) ---------- */
function CircularProgress({ percentage, size, strokeWidth }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percentage / 100);

  return (
    <View style={{ transform: [{ rotate: "-90deg" }] }}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={GRAY_LIGHT}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={YELLOW}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          fill="none"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  topBlobRight: {
    position: "absolute",
    top: -70,
    right: 0,
    width: 240,
    height: 200,
    backgroundColor: YELLOW_LIGHT,
    borderBottomLeftRadius: 200,
  },

  scroll: {
    flex: 1,
    paddingHorizontal: 24,
  },

  scrollContent: {
    paddingBottom: 16,
  },

  /* Header mais pra baixo */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 30,
  },

  greeting: {
    fontSize: 19,
    fontWeight: "800",
    color: DARK,
  },

  greetingSub: {
    fontSize: 13,
    color: GRAY_MEDIUM,
    marginTop: 2,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 12,
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  avatarLogo: {
    width: "100%",
    height: "100%",
  },

  batteryCard: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 26,
  },

  gaugeWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },

  gaugeCenter: {
    position: "absolute",
    alignItems: "center",
  },

  gaugePercent: {
    fontSize: 34,
    fontWeight: "800",
    color: DARK,
  },

  gaugeLabel: {
    fontSize: 12,
    color: GRAY_MEDIUM,
    marginTop: 4,
  },

  healthBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: GREEN,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },

  healthBadgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },

  walletCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: DARK,
    borderRadius: 18,
    padding: 16,
    marginTop: 24,
    gap: 12,
  },

  walletIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(255,217,0,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },

  walletLabel: {
    fontSize: 12,
    color: "#AAAAAA",
  },

  walletValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
    marginTop: 2,
  },

  rechargeButton: {
    backgroundColor: YELLOW,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },

  rechargeButtonText: {
    fontSize: 12,
    fontWeight: "800",
    color: DARK,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: DARK,
    marginTop: 26,
    marginBottom: 12,
  },

  chargerCard: {
    borderWidth: 1,
    borderColor: GRAY_LIGHT,
    borderRadius: 18,
    padding: 16,
  },

  chargerHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  chargerName: {
    fontSize: 15,
    fontWeight: "800",
    color: DARK,
  },

  availableDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: GREEN,
  },

  chargerMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 8,
  },

  chargerMetaText: {
    fontSize: 12,
    color: GRAY_MEDIUM,
  },

  chargerDot: {
    fontSize: 12,
    color: GRAY_LIGHT,
    marginHorizontal: 2,
  },

  chargerFooterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
  },

  chargerPrice: {
    fontSize: 14,
    fontWeight: "800",
    color: DARK,
  },

  startButton: {
    backgroundColor: YELLOW,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  startButtonText: {
    fontSize: 12,
    fontWeight: "800",
    color: DARK,
  },

  sessionCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: GRAY_LIGHT,
    borderRadius: 16,
    padding: 14,
    gap: 12,
  },

  sessionIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: YELLOW_LIGHT,
    alignItems: "center",
    justifyContent: "center",
  },

  sessionPrice: {
    fontSize: 14,
    fontWeight: "800",
    color: DARK,
  },

  sessionMeta: {
    fontSize: 11,
    color: GRAY_MEDIUM,
    marginTop: 2,
  },

});
