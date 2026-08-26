import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { DARK, YELLOW, GREEN, GRAY_MEDIUM, WHITE } from "../constants/theme";

const DEFAULT_PRICE_PER_KWH = 0.89;
const DEFAULT_CHARGER_NAME = "ChargeOn Highway Hub";

const INSERT_SIMULATION_DELAY = 250;
const CONNECTED_DISPLAY_TIME = 200;

// Velocidade simulada de carregamento
const CHARGING_SPEEDS = {
  Padrão: 0.08,
  Rápido: 0.2,
  "Ultra-rápido": 0.4,
};
export default function ChargingSession() {
  const params = useLocalSearchParams();
  const chargerName = params.chargerName || DEFAULT_CHARGER_NAME;
  const pricePerKwh = params.pricePerKwh
    ? parseFloat(params.pricePerKwh)
    : DEFAULT_PRICE_PER_KWH;
  const gunLabel = params.gunLabel || "Conector A";
  const chargingTypeLabel = params.chargingTypeLabel || "Padrão";
  const kwhPerSecond =
    CHARGING_SPEEDS[chargingTypeLabel] ?? CHARGING_SPEEDS.Padrão;
  const targetKwh = params.targetKwh ? parseFloat(params.targetKwh) : null;

  // fases: 'insert' -> 'connecting' -> 'connected' -> 'charging' -> 'finished'
  const [phase, setPhase] = useState("insert");
  const [kwh, setKwh] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const pulse = useRef(new Animated.Value(1)).current;

  // Simulação de inserção do carregador
  function handleSimulateInsert() {
    setPhase("connecting");
    setTimeout(() => {
      setPhase("connected");
      setTimeout(() => setPhase("charging"), CONNECTED_DISPLAY_TIME);
    }, INSERT_SIMULATION_DELAY);
  }

  // Navega para o resumo da sessão com os dados finais do carregamento
  function goToSummary(finalKwh, finalSeconds) {
    const energyCost = finalKwh * pricePerKwh;
    router.replace({
      pathname: "/SessionSummary",
      params: {
        chargerName,
        gunLabel,
        powerType: chargingTypeLabel,
        kwh: String(finalKwh.toFixed(2)),
        seconds: String(finalSeconds),
        energyCost: String(energyCost.toFixed(2)),
        // walletBalance: pode ser passado aqui quando houver WalletContext
      },
    });
  }

  function handleStopAt(finalKwh) {
    setPhase("finished");
    setTimeout(() => goToSummary(finalKwh, seconds), 600);
  }

  // Timer de carregamento — só roda na fase 'charging'
  useEffect(() => {
    if (phase !== "charging") return;

    const interval = setInterval(() => {
      setKwh((prev) => {
        const next = prev + kwhPerSecond;

        if (targetKwh && next >= targetKwh) {
          clearInterval(interval);
          handleStopAt(targetKwh);
          return targetKwh;
        }

        return next;
      });

      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [phase, targetKwh, kwhPerSecond]);

  // Pulso animado — ativo em insert/connecting/charging
  useEffect(() => {
    if (phase === "connected" || phase === "finished") return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.08,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [phase]);

  const value = kwh * pricePerKwh;

  function formatDuration(totalSeconds) {
    const m = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (totalSeconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  function handleStop() {
    if (phase === "finished") return;
    setPhase("finished");
    setTimeout(() => goToSummary(kwh, seconds), 600);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerLabel}>{headerLabelFor(phase)}</Text>
        <Text style={styles.chargerName}>{chargerName}</Text>
        <Text style={styles.subMeta}>
          {gunLabel} · {chargingTypeLabel}
          {targetKwh ? ` · Meta: ${targetKwh} kWh` : ""}
        </Text>{" "}
      </View>

      {/* Fase: insira o carregador */}
      {(phase === "insert" || phase === "connecting") && (
        <View style={styles.center}>
          <Animated.View
            style={[styles.pulseCircle, { transform: [{ scale: pulse }] }]}
          >
            <Feather name="plus-circle" size={40} color={YELLOW} />
          </Animated.View>
          <Text style={styles.instructionText}>
            {phase === "connecting"
              ? "Conectando ao carregador..."
              : "Insira o carregador no veículo"}
          </Text>
          {phase === "insert" && (
            <TouchableOpacity
              style={styles.simulateButton}
              onPress={handleSimulateInsert}
            >
              <Text style={styles.simulateButtonText}>Veículo Conectado</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Fase: carregador inserido */}
      {phase === "connected" && (
        <View style={styles.center}>
          <View
            style={[
              styles.pulseCircle,
              { backgroundColor: "rgba(46,204,113,0.15)" },
            ]}
          >
            <Feather name="check-circle" size={40} color={GREEN} />
          </View>
          <Text style={styles.instructionText}>Carregador inserido!</Text>
          <Text style={styles.subInstructionText}>
            Iniciando carregamento...
          </Text>
        </View>
      )}

      {/* Fase: carregando / finalizado */}
      {(phase === "charging" || phase === "finished") && (
        <View style={styles.center}>
          <Animated.View
            style={[
              styles.pulseCircle,
              { transform: [{ scale: phase === "finished" ? 1 : pulse }] },
            ]}
          >
            <Feather
              name="zap"
              size={40}
              color={phase === "finished" ? DARK : YELLOW}
            />
          </Animated.View>
          <Text style={styles.kwhValue}>{kwh.toFixed(2)} kWh</Text>
          <Text style={styles.priceValue}>
            R$ {value.toFixed(2).replace(".", ",")}
          </Text>
          <Text style={styles.duration}>{formatDuration(seconds)}</Text>
        </View>
      )}

      <View style={styles.footer}>
        {(phase === "charging" || phase === "finished") && (
          <TouchableOpacity
            style={[
              styles.stopButton,
              phase === "finished" && styles.stopButtonDisabled,
            ]}
            onPress={handleStop}
            disabled={phase === "finished"}
          >
            <Text style={styles.stopButtonText}>
              {phase === "finished" ? "Encerrado" : "Parar carregamento"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

function headerLabelFor(phase) {
  switch (phase) {
    case "insert":
    case "connecting":
      return "Conectando";
    case "connected":
      return "Conectado";
    case "charging":
      return "Carregando";
    case "finished":
      return "Sessão finalizada";
    default:
      return "";
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARK,
    justifyContent: "space-between",
  },
  header: { paddingTop: 60, paddingHorizontal: 24, alignItems: "center" },
  headerLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: YELLOW,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  chargerName: { fontSize: 18, fontWeight: "800", color: WHITE, marginTop: 6 },
  subMeta: { fontSize: 12, color: GRAY_MEDIUM, marginTop: 4 },
  center: { alignItems: "center", justifyContent: "center", gap: 8 },
  pulseCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "rgba(255,217,0,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  instructionText: {
    fontSize: 17,
    fontWeight: "800",
    color: WHITE,
    textAlign: "center",
  },
  subInstructionText: { fontSize: 13, color: GRAY_MEDIUM, marginTop: 4 },
  simulateButton: {
    marginTop: 24,
    backgroundColor: YELLOW,
    borderRadius: 14,
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  simulateButtonText: { fontSize: 14, fontWeight: "800", color: DARK },
  kwhValue: { fontSize: 40, fontWeight: "800", color: WHITE },
  priceValue: { fontSize: 18, fontWeight: "700", color: YELLOW, marginTop: 4 },
  duration: { fontSize: 13, color: GRAY_MEDIUM, marginTop: 10 },
  footer: { padding: 24, minHeight: 90 },
  stopButton: {
    backgroundColor: YELLOW,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
  },
  stopButtonDisabled: { backgroundColor: "rgba(255,217,0,0.4)" },
  stopButtonText: { fontSize: 15, fontWeight: "800", color: DARK },
});