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
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

/* ---------- Paleta (mesma do resto do app) ---------- */
const YELLOW = "#FFD900";
const YELLOW_LIGHT = "#FFE94A";
const DARK = "#050505";
const GRAY_LIGHT = "#E5E5E5";
const GRAY_MEDIUM = "#A6A6A6";
const GREEN = "#2ECC71";

const FAVORITES = [
  {
    id: "1",
    name: "ChargeOn Highway Hub",
    distance: "1.6 km",
    power: "60kW DC",
  },
  {
    id: "2",
    name: "ChargeGrid Faria Lima",
    distance: "0.8 km",
    power: "22kW AC",
  },
];

export default function StartCharging() {
  const [code, setCode] = useState("");

  function handleConfirmCode() {
    if (!code) {
      Alert.alert("Atenção", "Digite o código do carregador.");
      return;
    }
    // Aqui entraria a chamada pra API validando o código do carregador
    router.push("/home");
  }

  function handleSelectFavorite(station) {
    // Aqui entraria a navegação pra tela de confirmação/início de sessão
    Alert.alert("Iniciar carregamento", `Conectar com ${station.name}?`);
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Faixa amarela decorativa do topo, igual ao resto do app */}
      <View style={styles.topBlobRight} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Feather name="chevron-left" size={20} color={DARK} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Iniciar carregamento</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Área do scanner de QR Code */}
        <View style={styles.scannerArea}>
          <View style={styles.scannerFrame}>
            <View style={[styles.corner, styles.cornerTopLeft]} />
            <View style={[styles.corner, styles.cornerTopRight]} />
            <View style={[styles.corner, styles.cornerBottomLeft]} />
            <View style={[styles.corner, styles.cornerBottomRight]} />

            <Feather name="camera" size={30} color={GRAY_MEDIUM} />
          </View>

          <Text style={styles.scannerHint}>
            Aponte a câmera para o QR Code no carregador
          </Text>

          {/*
            Ao integrar a câmera de verdade, troque essa View pelo
            componente da lib (ex: CameraView do expo-camera) mantendo
            o styles.scannerFrame como moldura visual por cima.
          */}
        </View>

        {/* Divisor */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ou digite o código manualmente</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Input de código manual */}
        <View style={styles.inputWrapper}>
          <Feather name="hash" size={18} color={GRAY_MEDIUM} style={{ marginRight: 8 }} />
          <TextInput
            style={styles.input}
            placeholder="Código do carregador"
            placeholderTextColor={GRAY_MEDIUM}
            autoCapitalize="characters"
            value={code}
            onChangeText={setCode}
          />
        </View>

        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmCode}>
          <Text style={styles.confirmButtonText}>Confirmar código</Text>
          <Feather name="arrow-right" size={18} color={DARK} />
        </TouchableOpacity>

        {/* Carregadores favoritos */}
        <Text style={styles.sectionTitle}>Carregadores favoritos</Text>

        <FlatList
          data={FAVORITES}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={{ gap: 10 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.favoriteCard}
              activeOpacity={0.85}
              onPress={() => handleSelectFavorite(item)}
            >
              <View style={styles.favoriteIconWrap}>
                <Feather name="zap" size={18} color={DARK} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.favoriteName}>{item.name}</Text>
                <Text style={styles.favoriteMeta}>
                  {item.power} · {item.distance}
                </Text>
              </View>
              <Feather name="chevron-right" size={18} color={GRAY_MEDIUM} />
            </TouchableOpacity>
          )}
        />
      </ScrollView>
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

  scrollContent: {
    paddingBottom: 32,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 44,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: GRAY_LIGHT,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: DARK,
  },

  scannerArea: {
    alignItems: "center",
    marginTop: 26,
  },

  scannerFrame: {
    width: 240,
    height: 240,
    borderRadius: 24,
    backgroundColor: "#F7F7F7",
    borderWidth: 1,
    borderColor: GRAY_LIGHT,
    alignItems: "center",
    justifyContent: "center",
  },

  corner: {
    position: "absolute",
    width: 28,
    height: 28,
    borderColor: YELLOW,
  },

  cornerTopLeft: {
    top: -1,
    left: -1,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 16,
  },

  cornerTopRight: {
    top: -1,
    right: -1,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 16,
  },

  cornerBottomLeft: {
    bottom: -1,
    left: -1,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 16,
  },

  cornerBottomRight: {
    bottom: -1,
    right: -1,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 16,
  },

  scannerHint: {
    fontSize: 13,
    color: GRAY_MEDIUM,
    textAlign: "center",
    marginTop: 16,
    paddingHorizontal: 20,
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 28,
    gap: 10,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: GRAY_LIGHT,
  },

  dividerText: {
    fontSize: 12,
    color: GRAY_MEDIUM,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    borderWidth: 1,
    borderColor: GRAY_LIGHT,
    borderRadius: 14,
    paddingHorizontal: 14,
    marginTop: 20,
    backgroundColor: "#FFFFFF",
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: DARK,
    height: "100%",
  },

  confirmButton: {
    flexDirection: "row",
    height: 54,
    borderRadius: 14,
    backgroundColor: YELLOW,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 14,
  },

  confirmButtonText: {
    fontSize: 15,
    fontWeight: "800",
    color: DARK,
    letterSpacing: 0.5,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: DARK,
    marginTop: 30,
    marginBottom: 12,
  },

  favoriteCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: GRAY_LIGHT,
    borderRadius: 16,
    padding: 14,
    gap: 12,
  },

  favoriteIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: YELLOW_LIGHT,
    alignItems: "center",
    justifyContent: "center",
  },

  favoriteName: {
    fontSize: 14,
    fontWeight: "700",
    color: DARK,
  },

  favoriteMeta: {
    fontSize: 12,
    color: GRAY_MEDIUM,
    marginTop: 2,
  },
});