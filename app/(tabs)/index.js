import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/header";
import Card from "../components/card";

const gabiLogo = require("../../assets/gabi-logo.png");

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>

        <Header eyebrow="Meu portfólio"
          title="Olá, eu sou a Gabi"
          description="Desenvolvedora em formação apaixonada por tecnologia"
          logo={gabiLogo} />

        <View style={styles.hero}>
          <View style={styles.badge}>
            <Text style={styles.badgeTexto}>Desenvolvedora em formação</Text>
          </View>

          <Text style={styles.heroTituto}>Criando experiencias digitais com codigo de verdade</Text>

          <Text style={styles.heroSubtitulo}>
            Esse app reune um pouco sobre mim e os projetos que estou desenvolvendo
          </Text>
        </ View>

        <Card
          icon=""
          title="Teecnologia + criatividade"
          description="Desenvolvimento de aplicações, interfaces e experiencias digitais"
        />

        <Link href="/sobre" asChild>
          <Pressable style={styles.botao}>
            <Text style={styles.botaoTexto}>Conheça mais sobre mim</Text>
          </Pressable>
        </Link>

        <Text style={styles.footer}>Gabi Yamamoto - 2026 </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fbff",
  },

  container: {
    flex: 1,
    paddingHorizontal: 22,
    paddingVertical: 24,
    justifyContent: "center",
  },

  hero: {
    padding: 24,
    borderRadius: 24,
    marginBottom: 14,
    backgroundColor: "#fff",
  },

  badge: {
    alignSelf: "center",
    backgroundColor: "#E3F3F1",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginBottom: 16,
  },

  badgeTexto: {
    fontSize: 11,
    fontWeight: "700",
    color: "#579E98",
  },

  heroTitulo: {
    fontSize: 23,
    lineHeight: 29,
    fontWeight: "800",
    color: "#1D2B2A",
    marginBottom: 10,
  },

  heroSubtitulo: {
    fontSize: 13,
    color: "#758482",
    lineHeight: 20,
  },

  botao: {
    height: 52,
    borderRadius: 18,
    backgroundColor: "#65B9B1",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },

  botaoTexto: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
  },

  footer: {
    textAlign: "center",
    fontSize: 11,
    color: "#9AABAA",
    marginTop: 24,
  },
});
