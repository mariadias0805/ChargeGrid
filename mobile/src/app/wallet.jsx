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
import { router } from "expo-router";
import BottomNav from "../components/BottomNav";

/* ---------- Paleta (mesma do login / splash / home) ---------- */
const YELLOW = "#FFD900";
const YELLOW_LIGHT = "#FFE94A";
const DARK = "#050505";
const GRAY_LIGHT = "#E5E5E5";
const GRAY_MEDIUM = "#A6A6A6";
const GREEN = "#2ECC71";
const RED = "#FF5A52";

const PAYMENT_METHODS = [
  {
    id: "1",
    label: "Pix",
    detail: "Padrão para recarga instantânea",
    icon: "zap",
    tag: "Padrão",
  },
  {
    id: "2",
    label: "Cartão de crédito",
    detail: "•••• •••• •••• 4832",
    icon: "credit-card",
    tag: null,
  },
];

const TRANSACTIONS = [
  {
    id: "1",
    type: "credit",
    title: "Recarga de saldo",
    date: "22 ago 2026 · 14:32",
    value: "+ R$ 200,00",
  },
  {
    id: "2",
    type: "debit",
    title: "ChargeOn Highway Hub",
    date: "20 fev 2026 · 09:10",
    value: "- R$ 5,00",
  },
  {
    id: "3",
    type: "debit",
    title: "ChargeGrid Faria Lima",
    date: "12 fev 2026 · 18:05",
    value: "- R$ 3,33",
  },
  {
    id: "4",
    type: "credit",
    title: "Cashback de indicação",
    date: "05 fev 2026 · 11:47",
    value: "+ R$ 15,00",
  },
];

export default function Wallet() {
  const [balance] = useState("1.250,00");

  return (
    <SafeAreaView style={styles.container}>
      {/* Faixa amarela decorativa do topo, igual às outras telas */}
      <View style={styles.topBlobRight} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Cabeçalh */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Image
              source={require("../images/logo.png")}
              style={styles.avatarLogo}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Card de saldo, em destaque */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Saldo disponível</Text>
          <Text style={styles.balanceValue}>R$ {balance}</Text>

          <TouchableOpacity style={styles.addButton}>
            <Feather name="plus" size={16} color={DARK} />
            <Text style={styles.addButtonText}>Adicionar saldo</Text>
          </TouchableOpacity>
        </View>

        {/* Ações rápidas */}
        <View style={styles.quickActionsRow}>
          <QuickAction icon="arrow-up-right" label="Enviar" />
          <QuickAction icon="repeat" label="Pix" />
          <QuickAction icon="file-text" label="Extrato" />
          <QuickAction icon="tag" label="Cupons" />
        </View>

        {/* Formas de pagamento */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Formas de pagamento</Text>
          <TouchableOpacity>
            <Text style={styles.sectionLink}>Adicionar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={PAYMENT_METHODS}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={{ gap: 10 }}
          renderItem={({ item }) => (
            <View style={styles.methodCard}>
              <View style={styles.methodIconWrap}>
                <Feather name={item.icon} size={18} color={DARK} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.methodLabel}>{item.label}</Text>
                <Text style={styles.methodDetail}>{item.detail}</Text>
              </View>
              {item.tag && (
                <View style={styles.methodTag}>
                  <Text style={styles.methodTagText}>{item.tag}</Text>
                </View>
              )}
            </View>
          )}
        />

        {/* Histórico de transações */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Histórico</Text>
          <TouchableOpacity>
            <Text style={styles.sectionLink}>Ver tudo</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={TRANSACTIONS}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={{ gap: 10 }}
          renderItem={({ item }) => (
            <View style={styles.transactionCard}>
              <View
                style={[
                  styles.transactionIconWrap,
                  {
                    backgroundColor:
                      item.type === "credit" ? "#E9FBF0" : "#FFF1F0",
                  },
                ]}
              >
                <Feather
                  name={
                    item.type === "credit"
                      ? "arrow-down-left"
                      : "arrow-up-right"
                  }
                  size={16}
                  color={item.type === "credit" ? GREEN : RED}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.transactionTitle}>{item.title}</Text>
                <Text style={styles.transactionDate}>{item.date}</Text>
              </View>
              <Text
                style={[
                  styles.transactionValue,
                  { color: item.type === "credit" ? GREEN : DARK },
                ]}
              >
                {item.value}
              </Text>
            </View>
          )}
        />
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
}

function QuickAction({ icon, label }) {
  return (
    <TouchableOpacity style={styles.quickAction}>
      <View style={styles.quickActionIconWrap}>
        <Feather name={icon} size={18} color={DARK} />
      </View>
      <Text style={styles.quickActionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
    marginLeft: 265,
  },

  avatarLogo: {
    width: "100%",
    height: "100%",
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

  balanceCard: {
    backgroundColor: DARK,
    borderRadius: 20,
    padding: 22,
    marginTop: 22,
    alignItems: "center",
  },

  balanceLabel: {
    fontSize: 13,
    color: "#AAAAAA",
  },

  balanceValue: {
    fontSize: 32,
    fontWeight: "800",
    color: "#FFFFFF",
    marginTop: 6,
  },

  addButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: YELLOW,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginTop: 18,
  },

  addButtonText: {
    fontSize: 13,
    fontWeight: "800",
    color: DARK,
  },

  quickActionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 22,
  },

  quickAction: {
    alignItems: "center",
    gap: 6,
  },

  quickActionIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: YELLOW_LIGHT,
    alignItems: "center",
    justifyContent: "center",
  },

  quickActionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: DARK,
  },

  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 28,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: DARK,
  },

  sectionLink: {
    fontSize: 12,
    fontWeight: "700",
    color: DARK,
    textDecorationLine: "underline",
    textDecorationColor: YELLOW,
  },

  methodCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: GRAY_LIGHT,
    borderRadius: 16,
    padding: 14,
    gap: 12,
  },

  methodIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: YELLOW_LIGHT,
    alignItems: "center",
    justifyContent: "center",
  },

  methodLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: DARK,
  },

  methodDetail: {
    fontSize: 12,
    color: GRAY_MEDIUM,
    marginTop: 2,
  },

  methodTag: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  methodTagText: {
    fontSize: 10,
    fontWeight: "700",
    color: GRAY_MEDIUM,
  },

  transactionCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: GRAY_LIGHT,
    borderRadius: 16,
    padding: 14,
    gap: 12,
  },

  transactionIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  transactionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: DARK,
  },

  transactionDate: {
    fontSize: 11,
    color: GRAY_MEDIUM,
    marginTop: 2,
  },

  transactionValue: {
    fontSize: 13,
    fontWeight: "800",
  },

});
