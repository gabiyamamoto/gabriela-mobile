import { React, useState, useEffect } from "react"
import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet, Pressable, Alert } from "react-native"
import axios from "axios" // lib usada pra fazer chamadas HTTP para API
import { SafeAreaView } from "react-native-safe-area-context" // evita que conteudo fique embaixo do notch/barra do celular
import Header from "../components/header";

const API_KEY = "cv_bYHRA8sur-kBSNVqjjp7vKaFpAZe6T9q1VU5giN8AMZ9HzLAr6-JtmvsnNN44qto";

const api = axios.create({
  baseURL: "https://api-ds.codeverse.dev.br",
  headers: {
    "x-api-key": API_KEY,
  }
})

export default function DestinosExcluirScreen() {
  const [destinos, setDestinos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [excluindoId, setExcluindoId] = useState(null);

  async function buscarDestinos() {
    setCarregando(true)
    setErro(null)
    try {
      const resposta = await api.get("/api/destinos", {
        params: { limit: 50 }
      });

      setDestinos(resposta.data.data);
    } catch (error) {
      setErro("Não foi possivel carregar destinos");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarDestinos()
  }, [])

  function confirmarExclusao(destino) {
    Alert.alert(
      "Excluir herói",
      `Tem certeza que quer excluir "${destino.title}"? Essa ação não pode ser desfeita.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => excluirDestino(destino.id),
        },
      ]
    );
  }

  async function excluirDestino(id) {
    setExcluindoId(id);
    try {
      // DELETE não manda corpo — só o id na URL, identificando o que apagar.
      await api.delete(`/api/destinos/${id}`);

      // Em vez de buscar a lista de novo na API, só tiramos o item
      // apagado do estado local — a tela atualiza na hora.
      setDestinos((atual) => atual.filter((item) => item.id !== id));
    } catch (e) {
      Alert.alert(
        "Não deu pra excluir o destino",
        "A API respondeu com erro. Tenta de novo em instantes."
      );
    } finally {
      setExcluindoId(null);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <Header eyebrow="verbo delete - api"
          title="Excluir destino 🗑️"
          description="Removendo um destino através de uma requisição DELETE" />

        <View style={styles.main}>

          {carregando && <ActivityIndicator style={{ marginVertical: 16 }} />}

          {erro && <Text style={styles.erro}>{erro}</Text>}

          {!carregando &&
            destinos.map((destino) => (
              <View key={destino.id} style={styles.card}>
                <Image source={{ uri: destino.imageUrl }} style={styles.imagem} />

                <View style={styles.containerInfo}>

                  <View style={styles.info}>
                    <Text style={styles.titulo}>{destino.title}</Text>

                    <Text style={styles.detalhes}>
                      {destino.pais} · {destino.tipo_destino}
                    </Text>
                  </View>

                  <Pressable style={styles.botaoExcluir}
                    onPress={() => confirmarExclusao(destino)}
                    disabled={excluindoId === destino.id}>
                    <Text style={styles.botaoExcluirTexto}>{excluindoId === destino.id ? "..." : "Excluir"} </Text>
                  </Pressable>

                </View>
              </View>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fbff",
  },

  conteudo: {
    padding: 24,
    paddingBottom: 48,
  },

  main: {
    padding: 5,
  },

  erro: {
    color: "#c62828",
    marginTop: 12,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 24,
    overflow: "hidden",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },

  imagem: {
    width: 100,
    height: 120,
    borderRadius: 24,
    marginRight: 10,
  },

  containerInfo: {
    flex: 1,
  },

  info: {
    justifyContent: "center",
    padding: 8,
    gap: 6,
  },

  titulo: {
    fontSize: 16,
    fontWeight: "700",
    color: "#102542",
  },

  detalhes: {
    fontSize: 14,
    color: "#64748b",
  },

  botaoExcluir: {
    alignSelf: "flex-start",
    backgroundColor: "#cc3a3a",
    paddingHorizontal: 17,
    paddingVertical: 8,
    borderRadius: 12,
    marginTop: 5,
  },

  botaoExcluirTexto: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },
});