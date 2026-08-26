import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Linking,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import BottomNav from "../components/BottomNav";
import {
  YELLOW,
  YELLOW_LIGHT,
  DARK,
  WHITE,
  GRAY_LIGHT,
  GRAY_MEDIUM,
} from "../constants/theme";

const STATIONS = [
  {
    id: "1",
    name: "ChargeGrid Faria Lima",
    distance: "0.8 km",
    priceLabel: "R$ 1,89/kWh",
    priceValue: 1.89,
    available: 3,
    total: 6,
    top: "28%",
    left: "62%",
    fast: true,
    free: false,
    tesla: false,
  },
  {
    id: "2",
    name: "ChargeGrid Pinheiros",
    distance: "1.4 km",
    priceLabel: "R$ 2,10/kWh",
    priceValue: 2.1,
    available: 1,
    total: 4,
    top: "46%",
    left: "22%",
    fast: false,
    free: true,
    tesla: false,
  },
  {
    id: "3",
    name: "ChargeGrid Vila Olímpia",
    distance: "2.1 km",
    priceLabel: "R$ 1,95/kWh",
    priceValue: 1.95,
    available: 5,
    total: 8,
    top: "64%",
    left: "68%",
    fast: true,
    free: false,
    tesla: true,
  },
  {
    id: "4",
    name: "ChargeGrid Itaim",
    distance: "2.9 km",
    priceLabel: "R$ 2,05/kWh",
    priceValue: 2.05,
    available: 0,
    total: 4,
    top: "18%",
    left: "30%",
    fast: false,
    free: false,
    tesla: false,
  },
];

const FILTERS = [
  { key: "Disponíveis", test: (s) => s.available > 0 },
  { key: "Rápido", test: (s) => s.fast },
  { key: "Grátis", test: (s) => s.free },
  { key: "Tesla", test: (s) => s.tesla },
];

export default function MapScreen() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("Disponíveis");
  const [selectedId, setSelectedId] = useState(STATIONS[0].id);

  const activeFilterDef = FILTERS.find((f) => f.key === activeFilter);

  const filteredStations = STATIONS.filter((station) => {
    const matchesFilter = activeFilterDef ? activeFilterDef.test(station) : true;
    const matchesSearch = station.name.toLowerCase().includes(search.trim().toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const selectedStation =
    filteredStations.find((s) => s.id === selectedId) ?? filteredStations[0] ?? null;

  // Se o filtro/busca mudar e a estação selecionada sumir da lista, seleciona a primeira disponível
  useEffect(() => {
    if (selectedStation && selectedStation.id !== selectedId) {
      setSelectedId(selectedStation.id);
    }
  }, [filteredStations.length]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleToggleFilter(key) {
    setActiveFilter((prev) => (prev === key ? null : key));
  }

  function handleReservar() {
    if (!selectedStation || selectedStation.available === 0) return;
    router.push({
      pathname: "/charging-session",
      params: {
        chargerName: selectedStation.name,
        pricePerKwh: String(selectedStation.priceValue),
      },
    });
  }

  function handleRota() {
    if (!selectedStation) return;
    const query = encodeURIComponent(`${selectedStation.name} São Paulo`);
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`);
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Área do mapa — ocupa o espaço disponível acima do sheet/footer */}
      <View style={styles.mapArea}>
        <View style={styles.map}>
          <View style={styles.mapGridOverlay} />

          {filteredStations.map((station) => {
            const isSelected = selectedStation?.id === station.id;
            const isEmpty = station.available === 0;

            return (
              <TouchableOpacity
                key={station.id}
                style={[
                  styles.pin,
                  { top: station.top, left: station.left },
                  isSelected && styles.pinSelected,
                  isEmpty && styles.pinEmpty,
                ]}
                onPress={() => setSelectedId(station.id)}
                activeOpacity={0.85}
              >
                <Feather
                  name="zap"
                  size={16}
                  color={isSelected ? WHITE : isEmpty ? "#AAAAAA" : DARK}
                />
              </TouchableOpacity>
            );
          })}

          {/* Localização do usuário */}
          <View style={styles.userDot}>
            <View style={styles.userDotCore} />
          </View>
        </View>

        {/* Busca flutuante */}
        <View style={styles.searchWrapper}>
          <Feather name="search" size={18} color={GRAY_MEDIUM} style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar estação ou endereço"
            placeholderTextColor={GRAY_MEDIUM}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Feather name="x" size={16} color={GRAY_MEDIUM} />
            </TouchableOpacity>
          )}
        </View>

        {/* Chips de filtro */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterRow}
          contentContainerStyle={{ gap: 8, paddingRight: 24 }}
        >
          {FILTERS.map((filter) => {
            const isActive = filter.key === activeFilter;
            return (
              <TouchableOpacity
                key={filter.key}
                style={[styles.chip, isActive && styles.chipActive]}
                onPress={() => handleToggleFilter(filter.key)}
              >
                <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                  {filter.key}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Botões flutuantes de ação */}
        <View style={styles.floatingActions}>
          <TouchableOpacity style={styles.fabButton}>
            <Feather name="layers" size={18} color={DARK} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.fabButton}>
            <Feather name="navigation" size={18} color={DARK} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Cartão com a estação selecionada (ou estado vazio) */}
      <View style={styles.bottomSheet}>
        <View style={styles.sheetHandle} />

        {selectedStation ? (
          <>
            <View style={styles.sheetHeader}>
              <View style={styles.sheetIconWrap}>
                <Feather name="zap" size={22} color={DARK} />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.sheetTitle} numberOfLines={1}>
                  {selectedStation.name}
                </Text>
                <View style={styles.sheetMetaRow}>
                  <Feather name="map-pin" size={12} color={GRAY_MEDIUM} />
                  <Text style={styles.sheetMetaText}>{selectedStation.distance}</Text>
                  <Text style={styles.sheetDot}>•</Text>
                  <Text style={styles.sheetMetaText}>{selectedStation.priceLabel}</Text>
                </View>
              </View>

              <View style={styles.sheetAvailability}>
                <Text
                  style={[
                    styles.sheetAvailableNum,
                    selectedStation.available === 0 && { color: GRAY_MEDIUM },
                  ]}
                >
                  {selectedStation.available}
                </Text>
                <Text style={styles.sheetAvailableOf}>/{selectedStation.total}</Text>
              </View>
            </View>

            <View style={styles.sheetActions}>
              <TouchableOpacity style={styles.secondaryButton} onPress={handleRota}>
                <Feather name="navigation" size={16} color={DARK} />
                <Text style={styles.secondaryButtonText}>Rota</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.primaryButton,
                  selectedStation.available === 0 && styles.primaryButtonDisabled,
                ]}
                onPress={handleReservar}
                disabled={selectedStation.available === 0}
              >
                <Text style={styles.primaryButtonText}>
                  {selectedStation.available === 0 ? "Sem vagas" : "Reservar vaga"}
                </Text>
                {selectedStation.available > 0 && (
                  <Feather name="arrow-right" size={16} color={DARK} />
                )}
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.emptyState}>
            <Feather name="map-pin" size={22} color={GRAY_MEDIUM} />
            <Text style={styles.emptyStateText}>Nenhuma estação encontrada</Text>
          </View>
        )}
      </View>

      {/* Barra de navegação inferior */}
      <View style={styles.bottomNavWrapper}>
        <BottomNav />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },

  mapArea: {
    flex: 1,
    position: "relative",
  },

  map: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#EFEFEF",
  },

  mapGridOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#F2F2F2",
  },

  pin: {
    position: "absolute",
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: YELLOW,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: WHITE,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  pinSelected: {
    backgroundColor: DARK,
    width: 42,
    height: 42,
    borderRadius: 14,
  },

  pinEmpty: {
    backgroundColor: GRAY_LIGHT,
  },

  userDot: {
    position: "absolute",
    top: "52%",
    left: "48%",
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "rgba(255,217,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },

  userDotCore: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#1E88FF",
    borderWidth: 2,
    borderColor: WHITE,
  },

  searchWrapper: {
    position: "absolute",
    top: 16,
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    borderRadius: 14,
    paddingHorizontal: 14,
    backgroundColor: WHITE,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: DARK,
  },

  filterRow: {
    position: "absolute",
    top: 78,
    left: 20,
    maxHeight: 40,
  },

  chip: {
    height: 34,
    paddingHorizontal: 16,
    borderRadius: 17,
    backgroundColor: WHITE,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  chipActive: {
    backgroundColor: DARK,
  },

  chipText: {
    fontSize: 12,
    fontWeight: "700",
    color: GRAY_MEDIUM,
  },

  chipTextActive: {
    color: YELLOW,
  },

  floatingActions: {
    position: "absolute",
    right: 20,
    bottom: 16,
    gap: 10,
  },

  fabButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: WHITE,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  bottomSheet: {
    backgroundColor: WHITE,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: -4 },
    elevation: 6,
    minHeight: 150,
    justifyContent: "center",
  },

  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: GRAY_LIGHT,
    alignSelf: "center",
    marginBottom: 16,
  },

  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  sheetIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: YELLOW_LIGHT,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  sheetTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: DARK,
  },

  sheetMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },

  sheetMetaText: {
    fontSize: 12,
    color: GRAY_MEDIUM,
  },

  sheetDot: {
    fontSize: 12,
    color: GRAY_LIGHT,
    marginHorizontal: 2,
  },

  sheetAvailability: {
    flexDirection: "row",
    alignItems: "baseline",
    marginLeft: 8,
  },

  sheetAvailableNum: {
    fontSize: 20,
    fontWeight: "800",
    color: DARK,
  },

  sheetAvailableOf: {
    fontSize: 13,
    color: GRAY_MEDIUM,
  },

  sheetActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },

  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    height: 52,
    width: 90,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: GRAY_LIGHT,
  },

  secondaryButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: DARK,
  },

  primaryButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 52,
    borderRadius: 14,
    backgroundColor: YELLOW,
  },

  primaryButtonDisabled: {
    backgroundColor: GRAY_LIGHT,
  },

  primaryButtonText: {
    fontSize: 14,
    fontWeight: "800",
    color: DARK,
  },

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 20,
  },

  emptyStateText: {
    fontSize: 13,
    fontWeight: "600",
    color: GRAY_MEDIUM,
  },

  bottomNavWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 18,
    paddingTop: 4,
    backgroundColor: WHITE,
  },
});