import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { router } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleLogin() {
    if (!email || !password) {
      Alert.alert("Atenção", "Preencha e-mail e senha.");
      return;
    }

    // Usuário mockado
    if (email === "usuario@chargegrid.com" && password === "123456") {
      router.replace("/home");
      return;
    }

    Alert.alert("Login inválido", "E-mail ou senha incorretos.");
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Faixa amarela decorativa do topo */}

      <View style={styles.scroll}>
        {/* Cabeçalho: logo + imagem do carro/carregador */}
        <View style={styles.header}>

          <Image
            source={require("../images/flowk-boneco.png")}
            style={styles.headerImage}
            resizeMode="cover"
          />
        </View>

        {/* Boas-vindas */}
        <View style={styles.welcome}>
          <Text style={styles.welcomeTitle}>Bem-vindo !</Text>
          <Text style={styles.welcomeSubtitle}>
            Faça login para continuar no ChargeGrid Intelligence
          </Text>
        </View>

        {/* Formulário */}
        <View style={styles.form}>
          <Text style={styles.label}>E-mail</Text>
          <View style={styles.inputWrapper}>
            <Feather name="mail" size={18} color="#9A9A9A" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Digite seu e-mail"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <Text style={styles.label}>Senha</Text>
          <View style={styles.inputWrapper}>
            <Feather name="lock" size={18} color="#9A9A9A" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, styles.inputWithEye]}
              placeholder="Digite sua senha"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword((prev) => !prev)}
              style={styles.eyeButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Feather
                name={showPassword ? "eye-off" : "eye"}
                size={18}
                color="#9A9A9A"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() =>
              Alert.alert(
                "Recuperação",
                "Funcionalidade será implementada posteriormente."
              )
            }
          >
            <Text style={styles.forgotText}>Esqueci minha senha</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>ENTRAR</Text>
            <Feather name="arrow-right" size={18} color="#111111" />
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Ainda não tem uma conta?</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() =>
              Alert.alert(
                "Cadastro",
                "Tela de cadastro será implementada posteriormente."
              )
            }
          >
            <Text style={styles.registerText}>Criar conta</Text>
            <Feather name="arrow-right" size={18} color="#111111" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const YELLOW = "#FFD400";
const YELLOW_LIGHT = "#FFE998";
const DARK = "#111111";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scroll: {
    flex: 1,
    paddingHorizontal: 24,
  },

  header: {
    paddingTop: 34,
  },

  headerImage: {
    width: "75%",
    height: 180,
    borderRadius: 16,
    marginTop: 80,
    marginLeft: 40,
  },

  welcome: {
    //marginTop: -10,
  },
 
  welcomeTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: DARK,
  },

  welcomeSubtitle: {
    fontSize: 14,
    color: "#666666",
    marginTop: 6,
    lineHeight: 20,
  },

  form: {
    width: "100%",
    marginTop: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#222222",
    marginBottom: 8,
    marginTop: 14,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 14,
    paddingHorizontal: 14,
    backgroundColor: "#FFFFFF",
  },

  inputIcon: {
    marginRight: 8,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: "#111111",
    height: "100%",
  },

  inputWithEye: {
    paddingRight: 8,
  },

  eyeButton: {
    paddingLeft: 8,
  },

  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: 12,
  },

  forgotText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111111",
    textDecorationLine: "underline",
    textDecorationColor: YELLOW,
  },

  button: {
    flexDirection: "row",
    height: 54,
    borderRadius: 14,
    backgroundColor: YELLOW,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 26,
  },

  buttonText: {
    color: "#111111",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 22,
    gap: 10,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E2E2E2",
  },

  dividerText: {
    fontSize: 13,
    color: "#777777",
  },

  registerButton: {
    flexDirection: "row",
    height: 54,
    borderRadius: 14,
    backgroundColor: YELLOW_LIGHT,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 16,
    marginBottom: 20,
  },

  registerText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111111",
  },
});