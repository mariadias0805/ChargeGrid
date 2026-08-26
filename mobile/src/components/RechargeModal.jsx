import { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Pressable, Keyboard,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { DARK, YELLOW, YELLOW_LIGHT, GRAY_LIGHT, GRAY_MEDIUM, WHITE } from "../constants/theme";

const PRESET_VALUES = [20, 50, 100, 200];

export default function RechargeModal({ visible, onClose, onConfirm }) {
  const [selected, setSelected] = useState(null);
  const [customValue, setCustomValue] = useState("");

  function handleSelectPreset(value) {
    setSelected(value);
    setCustomValue("");
    Keyboard.dismiss();
  }

  function handleCustomChange(text) {
    setCustomValue(text.replace(/[^0-9,]/g, ""));
    setSelected(null);
  }

  function getAmount() {
    if (selected) return selected;
    if (customValue) return parseFloat(customValue.replace(",", "."));
    return 0;
  }

  function reset() {
    setSelected(null);
    setCustomValue("");
  }

  function handleConfirm() {
    const amount = getAmount();
    if (!amount || amount <= 0) return;
    onConfirm(amount);
    reset();
  }

  function handleClose() {
    reset();
    onClose();
  }

  const amount = getAmount();

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <Pressable style={styles.backdrop} onPress={handleClose}>
        <Pressable style={styles.sheet} onPress={() => {}}>
          <View style={styles.handle} />

          <View style={styles.headerRow}>
            <Text style={styles.title}>Adicionar saldo</Text>
            <TouchableOpacity onPress={handleClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Feather name="x" size={20} color={GRAY_MEDIUM} />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Escolha um valor</Text>
          <View style={styles.presetsRow}>
            {PRESET_VALUES.map((value) => (
              <TouchableOpacity
                key={value}
                style={[styles.presetChip, selected === value && styles.presetChipActive]}
                onPress={() => handleSelectPreset(value)}
              >
                <Text style={styles.presetChipText}>R$ {value}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Ou digite um valor</Text>
          <View style={styles.inputWrap}>
            <Text style={styles.inputPrefix}>R$</Text>
            <TextInput
              style={styles.input}
              placeholder="0,00"
              placeholderTextColor={GRAY_MEDIUM}
              keyboardType="decimal-pad"
              value={customValue}
              onChangeText={handleCustomChange}
            />
          </View>

          <TouchableOpacity
            style={[styles.confirmButton, amount <= 0 && styles.confirmButtonDisabled]}
            disabled={amount <= 0}
            onPress={handleConfirm}
          >
            <Text style={styles.confirmButtonText}>
              {amount > 0 ? `Adicionar R$ ${amount.toFixed(2).replace(".", ",")}` : "Adicionar saldo"}
            </Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" },
  sheet: {
    backgroundColor: WHITE,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 32,
  },
  handle: { width: 40, height: 4, borderRadius: 2, backgroundColor: GRAY_LIGHT, alignSelf: "center", marginBottom: 16 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  title: { fontSize: 18, fontWeight: "800", color: DARK },
  label: { fontSize: 12, fontWeight: "700", color: GRAY_MEDIUM, marginBottom: 10 },
  presetsRow: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 20 },
  presetChip: { paddingHorizontal: 18, paddingVertical: 12, borderRadius: 12, borderWidth: 1, borderColor: GRAY_LIGHT },
  presetChipActive: { backgroundColor: YELLOW_LIGHT, borderColor: YELLOW },
  presetChipText: { fontSize: 14, fontWeight: "700", color: DARK },
  inputWrap: {
    flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: GRAY_LIGHT,
    borderRadius: 14, paddingHorizontal: 16, paddingVertical: 4, marginBottom: 24, gap: 6,
  },
  inputPrefix: { fontSize: 16, fontWeight: "700", color: GRAY_MEDIUM },
  input: { flex: 1, fontSize: 16, fontWeight: "700", color: DARK, paddingVertical: 12 },
  confirmButton: { backgroundColor: YELLOW, borderRadius: 14, paddingVertical: 16, alignItems: "center" },
  confirmButtonDisabled: { backgroundColor: GRAY_LIGHT },
  confirmButtonText: { fontSize: 15, fontWeight: "800", color: DARK },
});