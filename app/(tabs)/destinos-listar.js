import { useState, useEffect } from "react"
import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet, TextInput, Pressable, Keyboard } from "react-native"
import axios from "axios" // lib usada pra fazer chamadas HTTP para API
import { SafeAreaView } from "react-native-safe-area-context" // evita que conteudo fique embaixo do notch/barra do celular
import Header from "../components/header";

const API_KEY = "cv_Hl8dpaXYosNehGc9ZMhLg-MnSia5QreHaY_In1KWxcPbUMNurusmFg4gt4V4W3HP";

const api = axios.create({
  baseURL: "https://api-ds.codeverse.dev.br",
  headers: {
    "x-api-key": API_KEY // passo pelo header a key da API
  }
})

export default function DestinosListarScreen() {
  const [id, setId] = useState("");
  const [destino, setDestino] = useState(null);
  const [buscando, setBuscando] = useState(false);
  const [erroBusca, setErroBusca] = useState(null);
  const [naoEncontrado, setNaoEncontrado] = useState(false);

  const [destinos, setDestinos] = useState([]);
  const [erroLista, setErroLista] = useState(null);
  const [carregando, setCarregando] = useState(true);

  async function buscarPorId() {
    if (!id) {
      setErroBusca("Digite um id pra buscar.");
      return;
    }

    Keyboard.dismiss();
    setBuscando(true);
    setErroBusca(null);
    setNaoEncontrado(false);
    setDestino(null);

    try {
      // Sem params e sem .data.data: a rota de um item só devolve o
      // próprio objeto do destino direto no corpo da resposta.
      const resposta = await api.get(`/api/destinos/${id}`);
      setDestino(resposta.data);
    } catch (e) {
      if (e.response && e.response.status === 404) {
        setNaoEncontrado(true);
      } else {
        setErroBusca("Não foi possível buscar o destino. Tenta de novo em instantes.");
      }
    } finally {
      setBuscando(false);
    }
  }

  async function buscarDestinos() {
    setCarregando(true)
    setErroLista(null)
    try {
      const resposta = await api.get("/api/destinos", {
        params: { limit: 50 }
      });

      setDestinos(resposta.data.data);
    } catch (error) {
      setErroLista("Não foi possível carregar destinos");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarDestinos()
  }, [])

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <Header eyebrow="verbo get - api"
          title="Listagem de destinos 🔍"
          description="Buscando e exibindo destinos através de uma requisição GET" />

        <View style={styles.main}>
          <View style={styles.busca}>

            <Text style={styles.rotulo}>Digite o ID do destino</Text>
            <View style={styles.linhaBusca}>
              <TextInput
                style={styles.campo}
                value={id}
                onChangeText={setId}
                placeholder="Ex: 1"
                keyboardType="numeric"
              />
              <Pressable style={styles.botao} onPress={buscarPorId} disabled={buscando}>
                <Text style={styles.botaoTexto}>{buscando ? "..." : "Buscar"}</Text>
              </Pressable>
            </View>
          </View>

          {buscando && <ActivityIndicator style={{ marginVertical: 16 }} />}
          {erroBusca && <Text style={styles.erro}>{erroBusca}</Text>}

          {naoEncontrado && (
            <Text style={styles.avisoNaoEncontrado}>
              Nenhum destino encontrado com o id "{id}".
            </Text>
          )}

          {destino && (
            <View style={styles.card}>
              <Image source={{ uri: destino.imageUrl }} style={styles.imagem} />
              <View style={styles.info}>
                <Text style={styles.titulo}>{destino.title}</Text>

                <Text style={styles.detalhes}>
                  {destino.pais} · {destino.tipo_destino}
                </Text>

                <Text style={styles.detalhes}>
                  Melhor época: {destino.melhor_epoca}
                </Text>

                <Text style={styles.detalhesDestacado}>
                  Custo médio: {destino.custo_medio}
                </Text>
              </View>
            </View>
          )}

          <View style={styles.divisor} />

          <View style={styles.lista}>
            <Text style={styles.rotulo}>Todos os destinos</Text>
            {carregando && <ActivityIndicator style={{ marginVertical: 16 }} />}

            {erroLista && <Text style={styles.erro}>{erroLista}</Text>}

            {!carregando &&
              destinos.map((destino) => (
                <View key={destino.id} style={styles.card}>
                  <Image source={{ uri: destino.imageUrl }} style={styles.imagem} />

                  <View style={styles.info}>
                    <Text style={styles.titulo}>{destino.title}</Text>

                    <Text style={styles.detalhes}>
                      {destino.pais} · {destino.tipo_destino}
                    </Text>

                    <Text style={styles.detalhes}>
                      Melhor época: {destino.melhor_epoca}
                    </Text>

                    <Text style={styles.detalhesDestacado}>
                      Custo médio: {destino.custo_medio}
                    </Text>
                  </View>
                </View>
              ))}
          </View>
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
    gap: 16,
  },

  busca: {
    borderRadius: 24,
    gap: 8,
  },

  rotulo: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1D2B2A",
    marginVertical: 8,
  },

  linhaBusca: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },

  campo: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#DDE8E6",
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
    color: "#1D2B2A",
  },

  divisor: {
    flex: 1,
    height: 1,
    backgroundColor: "#DDE8E6",
    marginVertical: 16,
  },

  botao: {
    backgroundColor: "#65B9B1",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },

  botaoTexto: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
  },

  erro: {
    color: "#c62828",
    marginTop: 12,
  },

  card: {
    flexDirection: "row",
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

  info: {
    flex: 1,
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

  detalhesDestacado: {
    fontSize: 14,
    fontWeight: "700",
    color: "#579E98",
  },
});