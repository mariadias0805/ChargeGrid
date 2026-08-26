import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";


const YELLOW = "#FFD400";
const YELLOW_LIGHT = "#FFF3B0";
const DARK = "#111111";

const STATIONS = [
  {
    id: "1",
    name: "ChargeGrid Faria Lima",
    address: "Av. Brig. Faria Lima, 1200",
    distance: "0.8 km",
    price: "R$ 1,89/kWh",
    available: 3,
    total: 6,
  },
  {
    id: "2",
    name: "ChargeGrid Pinheiros",
    address: "R. dos Pinheiros, 450",
    distance: "1.4 km",
    price: "R$ 2,10/kWh",
    available: 1,
    total: 4,
  },
  {
    id: "3",
    name: "ChargeGrid Vila Olímpia",
    address: "R. Fidêncio Ramos, 302",
    distance: "2.1 km",
    price: "R$ 1,95/kWh",
    available: 5,
    total: 8,
  },
];

export default function Home() {
  const [search, setSearch] = useState("");

  function handleMapa() {
    router.replace("/map");
    return;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBlobRight} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Cabeçalho */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá, Yasmin </Text>
            <Text style={styles.greetingSub}>Vamos carregar hoje?</Text>
          </View>

          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="bell" size={20} color="#111111" />
              <View style={styles.iconDot} />
            </TouchableOpacity>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>M</Text>
            </View>
          </View>
        </View>

        {/* Busca */}
        <View style={styles.searchWrapper}>
          <Feather
            name="search"
            size={18}
            color="#9A9A9A"
            style={{ marginRight: 8 }}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar estação de carregamento"
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Feather name="sliders" size={16} color="#111111" />
          </TouchableOpacity>
        </View>

        {/* Card do veículo */}
        <View style={styles.vehicleCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.vehicleLabel}>Seu veículo</Text>
            <Text style={styles.vehicleName}>Tesla Model 3</Text>

            <View style={styles.batteryRow}>
              <View style={styles.batteryBarBg}>
                <View style={[styles.batteryBarFill, { width: "72%" }]} />
              </View>
              <Text style={styles.batteryPercent}>72%</Text>
            </View>

            <Text style={styles.vehicleRange}>Autonomia estimada: 312 km</Text>
          </View>

          <View style={styles.vehicleIconWrap}>
            <Feather name="zap" size={26} color={DARK} />
          </View>
        </View>

        {/* Mapa (placeholder) */}
        <TouchableOpacity style={styles.mapCard} activeOpacity={0.9}>
          <View style={styles.mapPlaceholder}>
            <Feather name="map" size={22} color="#777" />
            <Text style={styles.mapPlaceholderText}>Ver mapa de estações</Text>
          </View>
          <View style={styles.mapPin}>
            <Feather name="map-pin" size={16} color="#111111" />
          </View>
        </TouchableOpacity>

        {/* Estações próximas */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Estações próximas</Text>
          <TouchableOpacity>
            <Text style={styles.sectionLink}>Ver todas</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={STATIONS}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={{ gap: 12 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.stationCard} activeOpacity={0.85}>
              <View style={styles.stationIconWrap}>
                <Feather name="zap" size={20} color={DARK} />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.stationName}>{item.name}</Text>
                <Text style={styles.stationAddress}>{item.address}</Text>

                <View style={styles.stationMetaRow}>
                  <Feather name="map-pin" size={12} color="#888" />
                  <Text style={styles.stationMetaText}>{item.distance}</Text>
                  <Text style={styles.stationDot}>•</Text>
                  <Text style={styles.stationMetaText}>{item.price}</Text>
                </View>
              </View>

              <View style={styles.stationAvailability}>
                <Text style={styles.stationAvailableNum}>{item.available}</Text>
                <Text style={styles.stationAvailableOf}>/{item.total}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>

      {/* Barra de navegação inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="home" size={22} color={DARK} />
          <Text style={styles.navLabelActive}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={handleMapa}>
          <Feather name="map" size={22} color="#AAAAAA" />
          <Text style={styles.navLabel}>Mapa</Text>
          onc
        </TouchableOpacity>

        <TouchableOpacity style={styles.navCenterButton}>
          <Feather name="zap" size={24} color="#111111" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Feather name="credit-card" size={22} color="#AAAAAA" />
          <Text style={styles.navLabel}>Carteira</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Feather name="user" size={22} color="#AAAAAA" />
          <Text style={styles.navLabel}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    right: -90,
    width: 240,
    height: 200,
    backgroundColor: YELLOW_LIGHT,
    borderBottomLeftRadius: 200,
  },

  scroll: {
    flex: 1,
    paddingHorizontal: 24,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
  },

  greeting: {
    fontSize: 20,
    fontWeight: "800",
    color: DARK,
  },

  greetingSub: {
    fontSize: 13,
    color: "#777777",
    marginTop: 2,
  },

  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    alignItems: "center",
    justifyContent: "center",
  },

  iconDot: {
    position: "absolute",
    top: 8,
    right: 9,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FF3B30",
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: DARK,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: YELLOW,
    fontWeight: "800",
    fontSize: 15,
  },

  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 14,
    paddingHorizontal: 14,
    marginTop: 22,
    backgroundColor: "#FAFAFA",
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#111111",
  },

  filterButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: YELLOW,
    alignItems: "center",
    justifyContent: "center",
  },

  vehicleCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: DARK,
    borderRadius: 18,
    padding: 18,
    marginTop: 18,
  },

  vehicleLabel: {
    color: "#AAAAAA",
    fontSize: 12,
  },

  vehicleName: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
    marginTop: 2,
  },

  batteryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 8,
  },

  batteryBarBg: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#333333",
    overflow: "hidden",
  },

  batteryBarFill: {
    height: "100%",
    borderRadius: 4,
    backgroundColor: YELLOW,
  },

  batteryPercent: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  vehicleRange: {
    color: "#999999",
    fontSize: 12,
    marginTop: 8,
  },

  vehicleIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: YELLOW,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },

  mapCard: {
    marginTop: 16,
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  mapPlaceholder: {
    height: 120,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  mapPlaceholderText: {
    fontSize: 13,
    color: "#777777",
    fontWeight: "600",
  },

  mapPin: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: YELLOW,
    alignItems: "center",
    justifyContent: "center",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: DARK,
  },

  sectionLink: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111111",
    textDecorationLine: "underline",
    textDecorationColor: YELLOW,
  },

  stationCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 16,
    padding: 14,
  },

  stationIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: YELLOW_LIGHT,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  stationName: {
    fontSize: 14,
    fontWeight: "700",
    color: DARK,
  },

  stationAddress: {
    fontSize: 12,
    color: "#888888",
    marginTop: 2,
  },

  stationMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 6,
  },

  stationMetaText: {
    fontSize: 11,
    color: "#888888",
  },

  stationDot: {
    fontSize: 11,
    color: "#CCCCCC",
    marginHorizontal: 2,
  },

  stationAvailability: {
    flexDirection: "row",
    alignItems: "baseline",
    marginLeft: 8,
  },

  stationAvailableNum: {
    fontSize: 18,
    fontWeight: "800",
    color: DARK,
  },

  stationAvailableOf: {
    fontSize: 12,
    color: "#999999",
  },

  bottomNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: 76,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    backgroundColor: "#FFFFFF",
    paddingTop: 8,
  },

  navItem: {
    alignItems: "center",
    gap: 4,
  },

  navLabel: {
    fontSize: 10,
    color: "#AAAAAA",
    fontWeight: "600",
  },

  navLabelActive: {
    fontSize: 10,
    color: DARK,
    fontWeight: "700",
  },

  navCenterButton: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: YELLOW,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -28,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
});
