import { useMemo, useState } from "react";
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
  YELLOW_LIGHT,
  GRAY_LIGHT,
  GRAY_MEDIUM,
  GREEN,
  RED,
  WHITE,
} from "../constants/theme";

const GUNS = [
  {
    id: "a",
    label: "Conector A",
    type: "CCS2 · 60kW DC",
    status: "available",
    power: 60,
  },
  {
    id: "b",
    label: "Conector B",
    type: "CCS1 · 60kW DC",
    status: "occupied",
    power: 60,
  },
];

const CHARGING_TYPES = [
  {
    id: "standard",
    label: "Padrão",
    description: "Velocidade normal do carregador.",
    icon: "zap",
    multiplier: 1,
  },
  {
    id: "priority",
    label: "Prioritário",
    description: "Prioridade na fila e carregamento mais rápido.",
    icon: "fast-forward",
    multiplier: 1.2,
    tag: "+20%",
  },
  {
    id: "solar",
    label: "Solar",
    description: "Energia 100% renovável.",
    icon: "sun",
    multiplier: 0.85,
    tag: "-15%",
  },
];

const TARGET_PRESETS = [
  { id: "10", label: "10 kWh", kwh: 10 },
  { id: "20", label: "20 kWh", kwh: 20 },
  { id: "30", label: "30 kWh", kwh: 30 },
  { id: "full", label: "Carregar tudo", kwh: null },
];

export default function SelectCharger() {
  const params = useLocalSearchParams();
  const chargerName = params.chargerName || "ChargeOn Highway Hub";
  const chargerAddress = params.chargerAddress || null;
  const basePrice = params.pricePerKwh ? parseFloat(params.pricePerKwh) : 0.89;

  const [selectedGun, setSelectedGun] = useState(null);
  const [selectedType, setSelectedType] = useState(CHARGING_TYPES[0].id);
  const [selectedTarget, setSelectedTarget] = useState("20");

  const canContinue = !!selectedGun;

  const gun = GUNS.find((g) => g.id === selectedGun);
  const type = CHARGING_TYPES.find((t) => t.id === selectedType);
  const target = TARGET_PRESETS.find((t) => t.id === selectedTarget);
  const finalPrice = basePrice * type.multiplier;

  const availableCount = GUNS.filter((g) => g.status === "available").length;

  const estimate = useMemo(() => {
    if (!target?.kwh || !gun) return null;
    const minutes = Math.round((target.kwh / gun.power) * 60);
    const cost = target.kwh * finalPrice;
    return { minutes, cost };
  }, [target, gun, finalPrice]);

  function handleContinue() {
    if (!canContinue) return;

    router.push({
      pathname: "/charging-session",
      params: {
        chargerName,
        pricePerKwh: String(finalPrice.toFixed(2)),
        gunLabel: gun.label,
        chargingTypeLabel: type.label,
        // sem meta ("Carregar tudo") não manda targetKwh -> sessão para só manualmente
        ...(target.kwh ? { targetKwh: String(target.kwh) } : {}),
      },
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Feather name="arrow-left" size={26} color={YELLOW} />
        </TouchableOpacity>

        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>Selecionar Conector</Text>
          <Text style={styles.headerSubtitle}>
            Escolha como deseja carregar
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.sectionSubtitle, { marginTop: 20 }]}>
          Escolha um conector disponível
        </Text>

        <View style={{ gap: 10, marginTop: 12 }}>
          {GUNS.map((gun) => {
            const isOccupied = gun.status === "occupied";
            const isSelected = selectedGun === gun.id;
            return (
              <TouchableOpacity
                key={gun.id}
                style={[
                  styles.gunCard,
                  isSelected && styles.gunCardSelected,
                  isOccupied && styles.gunCardDisabled,
                ]}
                onPress={() => !isOccupied && setSelectedGun(gun.id)}
                disabled={isOccupied}
                activeOpacity={0.85}
              >
                <View
                  style={[
                    styles.gunIconWrap,
                    isSelected && { backgroundColor: YELLOW },
                  ]}
                >
                  <Feather
                    name="zap"
                    size={18}
                    color={isSelected ? DARK : GRAY_MEDIUM}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.gunLabel}>{gun.label}</Text>
                  <Text style={styles.gunType}>{gun.type}</Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: isOccupied ? "#FFF1F0" : "#E9FBF0" },
                  ]}
                >
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: isOccupied ? RED : GREEN },
                    ]}
                  />
                  <Text
                    style={[
                      styles.statusText,
                      { color: isOccupied ? RED : GREEN },
                    ]}
                  >
                    {isOccupied ? "Ocupado" : "Disponível"}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={[styles.sectionSubtitle, { marginTop: 28 }]}>
          Tipo de carregamento
        </Text>

        <View style={{ gap: 10, marginTop: 12 }}>
          {CHARGING_TYPES.map((type) => {
            const isSelected = selectedType === type.id;
            return (
              <TouchableOpacity
                key={type.id}
                style={[styles.typeCard, isSelected && styles.typeCardSelected]}
                onPress={() => setSelectedType(type.id)}
                activeOpacity={0.85}
              >
                <View
                  style={[
                    styles.gunIconWrap,
                    isSelected && { backgroundColor: YELLOW },
                  ]}
                >
                  <Feather
                    name={type.icon}
                    size={18}
                    color={isSelected ? DARK : GRAY_MEDIUM}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.typeLabelRow}>
                    <Text style={styles.gunLabel}>{type.label}</Text>
                    {type.tag && (
                      <View style={styles.typeTag}>
                        <Text style={styles.typeTagText}>{type.tag}</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.gunType}>{type.description}</Text>
                </View>
                <View
                  style={[styles.radio, isSelected && styles.radioSelected]}
                >
                  {isSelected && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={[styles.sectionSubtitle, { marginTop: 28 }]}>
          Quanto carregar
        </Text>

        <View style={styles.targetRow}>
          {TARGET_PRESETS.map((preset) => {
            const isSelected = selectedTarget === preset.id;
            return (
              <TouchableOpacity
                key={preset.id}
                style={[
                  styles.targetChip,
                  isSelected && styles.targetChipSelected,
                ]}
                onPress={() => setSelectedTarget(preset.id)}
              >
                <Text
                  style={[
                    styles.targetChipText,
                    isSelected && styles.targetChipTextSelected,
                  ]}
                >
                  {preset.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {estimate ? (
          <View style={styles.estimateCard}>
            <View style={styles.estimateItem}>
              <Feather name="clock" size={16} color={GRAY_MEDIUM} />
              <Text style={styles.estimateText}>~{estimate.minutes} min</Text>
            </View>
            <View style={styles.estimateDivider} />
            <View style={styles.estimateItem}>
              <Feather name="dollar-sign" size={16} color={GRAY_MEDIUM} />
              <Text style={styles.estimateText}>
                ~R$ {estimate.cost.toFixed(2).replace(".", ",")}
              </Text>
            </View>
          </View>
        ) : (
          <Text style={styles.estimateFullText}>
            Carrega até você parar manualmente — sem tempo estimado.
          </Text>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !canContinue && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!canContinue}
        >
          <Text style={styles.continueButtonText}>
            {canContinue ? "Continuar" : "Selecione um conector"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 55,
    paddingBottom: 12,
  },

  backButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },

  headerText: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: DARK,
  },

  headerSubtitle: {
    fontSize: 12,
    color: GRAY_MEDIUM,
    marginTop: 3,
  },

  container: { flex: 1, backgroundColor: WHITE },
  scroll: { flex: 1, paddingHorizontal: 24 },
  scrollContent: { paddingBottom: 24 },

  chargerName: { fontSize: 16, fontWeight: "800", color: DARK },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 3,
  },
  addressText: { fontSize: 11, color: GRAY_MEDIUM },
  availabilityBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  availabilityText: { fontSize: 10, fontWeight: "700" },

  sectionSubtitle: {
    fontSize: 12,
    fontWeight: "700",
    color: GRAY_MEDIUM,
    marginTop: 4,
  },

  gunCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: GRAY_LIGHT,
    borderRadius: 16,
    padding: 14,
  },
  gunCardSelected: {
    borderColor: YELLOW,
    backgroundColor: YELLOW_LIGHT + "22",
  },
  gunCardDisabled: { opacity: 0.5 },

  gunIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  gunLabel: { fontSize: 14, fontWeight: "700", color: DARK },
  gunType: { fontSize: 12, color: GRAY_MEDIUM, marginTop: 2 },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 10, fontWeight: "700" },

  typeCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: GRAY_LIGHT,
    borderRadius: 16,
    padding: 14,
  },
  typeCardSelected: {
    borderColor: YELLOW,
    backgroundColor: YELLOW_LIGHT + "22",
  },
  typeLabelRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  typeTag: {
    backgroundColor: "#F5F5F5",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  typeTagText: { fontSize: 10, fontWeight: "800", color: GRAY_MEDIUM },

  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: GRAY_LIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: { borderColor: YELLOW },
  radioDot: { width: 11, height: 11, borderRadius: 6, backgroundColor: YELLOW },

  footer: { paddingHorizontal: 24, paddingBottom: 24, paddingTop: 8 },
  continueButton: {
    backgroundColor: YELLOW,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
  },
  continueButtonDisabled: { backgroundColor: GRAY_LIGHT },
  continueButtonText: { fontSize: 15, fontWeight: "800", color: DARK },

  targetRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 12,
  },
  targetChip: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: GRAY_LIGHT,
  },
  targetChipSelected: {
    backgroundColor: YELLOW,
    borderColor: YELLOW,
  },
  targetChipText: {
    fontSize: 13,
    fontWeight: "700",
    color: DARK,
  },
  targetChipTextSelected: {
    color: DARK,
  },
  estimateCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: "#F8F8F8",
  },
  estimateItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  estimateText: {
    fontSize: 13,
    fontWeight: "700",
    color: DARK,
  },
  estimateDivider: {
    width: 1,
    height: 16,
    backgroundColor: GRAY_LIGHT,
  },
  estimateFullText: {
    fontSize: 12,
    color: GRAY_MEDIUM,
    marginTop: 12,
    textAlign: "center",
  },
});
