import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const YELLOW = "#FFD400";
const YELLOW_LIGHT = "#FFF3B0";
const DARK = "#111111";

const STATIONS = [
  {
    id: "1",
    name: "ChargeGrid Faria Lima",
    distance: "0.8 km",
    price: "R$ 1,89/kWh",
    available: 3,
    total: 6,
    top: "28%",
    left: "62%",
  },
  {
    id: "2",
    name: "ChargeGrid Pinheiros",
    distance: "1.4 km",
    price: "R$ 2,10/kWh",
    available: 1,
    total: 4,
    top: "46%",
    left: "22%",
  },
  {
    id: "3",
    name: "ChargeGrid Vila Olímpia",
    distance: "2.1 km",
    price: "R$ 1,95/kWh",
    available: 5,
    total: 8,
    top: "64%",
    left: "68%",
  },
  {
    id: "4",
    name: "ChargeGrid Itaim",
    distance: "2.9 km",
    price: "R$ 2,05/kWh",
    available: 0,
    total: 4,
    top: "18%",
    left: "30%",
  },
];

const FILTERS = ["Disponíveis", "Rápido", "Grátis", "Tesla"];

export default function MapScreen() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("Disponíveis");
  const [selectedStation, setSelectedStation] = useState(STATIONS[0]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Mapa (placeholder visual) */}
      <View style={styles.map}>
        <View style={styles.mapGridOverlay} />

        {STATIONS.map((station) => {
          const isSelected = selectedStation.id === station.id;
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
              onPress={() => setSelectedStation(station)}
              activeOpacity={0.85}
            >
              <Feather
                name="zap"
                size={16}
                color={isSelected ? "#FFFFFF" : isEmpty ? "#AAAAAA" : DARK}
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
        <Feather name="search" size={18} color="#9A9A9A" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar estação ou endereço"
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity style={styles.filterIconButton}>
          <Feather name="sliders" size={16} color="#111111" />
        </TouchableOpacity>
      </View>

      {/* Chips de filtro */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterRow}
        contentContainerStyle={{ gap: 8, paddingRight: 24 }}
      >
        {FILTERS.map((filter) => {
          const isActive = filter === activeFilter;
          return (
            <TouchableOpacity
              key={filter}
              style={[styles.chip, isActive && styles.chipActive]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                {filter}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Botões flutuantes de ação */}
      <View style={styles.floatingActions}>
        <TouchableOpacity style={styles.fabButton}>
          <Feather name="layers" size={18} color="#111111" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.fabButton}>
          <Feather name="navigation" size={18} color="#111111" />
        </TouchableOpacity>
      </View>

      {/* Cartão inferior com a estação selecionada */}
      <View style={styles.bottomSheet}>
        <View style={styles.sheetHandle} />

        <View style={styles.sheetHeader}>
          <View style={styles.sheetIconWrap}>
            <Feather name="zap" size={22} color={DARK} />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.sheetTitle}>{selectedStation.name}</Text>
            <View style={styles.sheetMetaRow}>
              <Feather name="map-pin" size={12} color="#888" />
              <Text style={styles.sheetMetaText}>{selectedStation.distance}</Text>
              <Text style={styles.sheetDot}>•</Text>
              <Text style={styles.sheetMetaText}>{selectedStation.price}</Text>
            </View>
          </View>

          <View style={styles.sheetAvailability}>
            <Text style={styles.sheetAvailableNum}>
              {selectedStation.available}
            </Text>
            <Text style={styles.sheetAvailableOf}>/{selectedStation.total}</Text>
          </View>
        </View>

        <View style={styles.sheetActions}>
          <TouchableOpacity style={styles.secondaryButton}>
            <Feather name="navigation" size={16} color="#111111" />
            <Text style={styles.secondaryButtonText}>Rota</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Reservar vaga</Text>
            <Feather name="arrow-right" size={16} color="#111111" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
    borderColor: "#FFFFFF",
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
    backgroundColor: "#DDDDDD",
  },

  userDot: {
    position: "absolute",
    top: "52%",
    left: "48%",
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "rgba(255,212,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },

  userDotCore: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#1E88FF",
    borderWidth: 2,
    borderColor: "#FFFFFF",
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
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#111111",
  },

  filterIconButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: YELLOW,
    alignItems: "center",
    justifyContent: "center",
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
    backgroundColor: "#FFFFFF",
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
    color: "#555555",
  },

  chipTextActive: {
    color: YELLOW,
  },

  floatingActions: {
    position: "absolute",
    right: 20,
    bottom: 280,
    gap: 10,
  },

  fabButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 28,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: -4 },
    elevation: 6,
  },

  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#DDDDDD",
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
    color: "#888888",
  },

  sheetDot: {
    fontSize: 12,
    color: "#CCCCCC",
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
    color: "#999999",
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
    borderColor: "#DDDDDD",
  },

  secondaryButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111111",
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

  primaryButtonText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#111111",
  },
});