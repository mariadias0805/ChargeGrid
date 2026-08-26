import { useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  DARK,
  YELLOW,
  GREEN,
  GRAY_LIGHT,
  GRAY_MEDIUM,
  WHITE,
} from "../constants/theme";

const TAX_RATE = 0.05; // 5% sobre o custo de energia
const PLATFORM_FEE = 10.0; // taxa fixa da plataforma

function formatMoney(value) {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}

function formatDate(date) {
  const d = date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const t = date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${d} · ${t}`;
}

function formatDuration(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m} Min ${s} Seg`;
}

export default function SessionSummary() {
  const params = useLocalSearchParams();

  const chargerName = params.chargerName || "ChargeOn Highway Hub";
  const gunLabel = params.gunLabel || "Conector A";
  const powerType = params.powerType || "CCS2 · 60kW";
  const kwh = params.kwh ? parseFloat(params.kwh) : 0;
  const seconds = params.seconds ? parseInt(params.seconds, 10) : 0;
  const energyCost = params.energyCost ? parseFloat(params.energyCost) : 0;
  const walletBalance = params.walletBalance
    ? parseFloat(params.walletBalance)
    : null;

  const { taxes, platformFee, total, sessionDate } = useMemo(() => {
    const taxes = energyCost * TAX_RATE;
    const platformFee = PLATFORM_FEE;
    const total = energyCost + taxes + platformFee;
    return { taxes, platformFee, total, sessionDate: new Date() };
  }, [energyCost]);

  function handleClose() {
    router.replace("/wallet");
  }

  function handleDownloadInvoice() {
    // TODO: gerar/baixar PDF da fatura
  }

  function handleShareReceipt() {
    // TODO: compartilhar recibo (expo-sharing / Share API)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Feather name="x" size={20} color={WHITE} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Resumo da Sessão</Text>
        <View style={{ width: 20 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.center}>
          <View style={styles.successCircle}>
            <Feather name="check" size={32} color={GREEN} />
          </View>
          <Text style={styles.successText}>Carregamento Concluído</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Carregador</Text>
            <Text style={styles.value}>{chargerName}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>Data</Text>
            <Text style={styles.value}>{formatDate(sessionDate)}</Text>
          </View>
        </View>

        <View style={styles.gridCard}>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>Energia Entregue</Text>
            <Text style={styles.gridValue}>{kwh.toFixed(1)} kWh</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>Duração</Text>
            <Text style={styles.gridValue}>{formatDuration(seconds)}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>Tipo de Potência</Text>
            <Text style={styles.gridValue}>{powerType}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Custo de Energia</Text>
            <Text style={styles.value}>{formatMoney(energyCost)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>Taxas</Text>
            <Text style={styles.value}>{formatMoney(taxes)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>Taxa da Plataforma</Text>
            <Text style={styles.value}>{formatMoney(platformFee)}</Text>
          </View>
        </View>

        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total Pago</Text>
          <Text style={styles.totalValue}>{formatMoney(total)}</Text>
        </View>

        <View style={styles.paymentCard}>
          <View style={styles.paymentIconWrap}>
            <Feather name="credit-card" size={16} color={YELLOW} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.paymentLabel}>Pago via Carteira</Text>
            {walletBalance !== null && (
              <Text style={styles.paymentSub}>
                Saldo restante: {formatMoney(walletBalance)}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleDownloadInvoice}
        >
          <Text style={styles.primaryButtonText}>Baixar Fatura</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleShareReceipt}
        >
          <Text style={styles.secondaryButtonText}>Compartilhar Recibo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: DARK },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 8,
  },
  closeButton: { padding: 4 },
  headerTitle: { fontSize: 16, fontWeight: "800", color: WHITE },
  scroll: { flex: 1, paddingHorizontal: 20 },
  scrollContent: { paddingBottom: 24 },
  center: { alignItems: "center", marginTop: 12, marginBottom: 20 },
  successCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(46,204,113,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  successText: { fontSize: 15, fontWeight: "800", color: WHITE },

  card: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  divider: { height: 1, backgroundColor: "rgba(255,255,255,0.08)" },
  label: { fontSize: 13, color: GRAY_MEDIUM },
  value: { fontSize: 13, fontWeight: "700", color: WHITE },

  gridCard: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
  },
  gridItem: { flex: 1, alignItems: "center", gap: 4 },
  gridLabel: { fontSize: 11, color: GRAY_MEDIUM, textAlign: "center" },
  gridValue: { fontSize: 13, fontWeight: "800", color: WHITE },

  totalCard: {
    alignItems: "center",
    paddingVertical: 16,
    marginBottom: 14,
  },
  totalLabel: { fontSize: 12, color: GRAY_MEDIUM, marginBottom: 4 },
  totalValue: { fontSize: 30, fontWeight: "800", color: WHITE },

  paymentCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 16,
    padding: 14,
  },
  paymentIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(255,217,0,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  paymentLabel: { fontSize: 13, fontWeight: "700", color: WHITE },
  paymentSub: { fontSize: 11, color: GRAY_MEDIUM, marginTop: 2 },

  footer: { paddingHorizontal: 20, paddingBottom: 24, paddingTop: 8, gap: 10 },
  primaryButton: {
    backgroundColor: YELLOW,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
  },
  primaryButtonText: { fontSize: 14, fontWeight: "800", color: DARK },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
  },
  secondaryButtonText: { fontSize: 14, fontWeight: "800", color: WHITE },
});