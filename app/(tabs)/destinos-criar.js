import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const API_KEY = "cv_GA3uDkB8t-EaguWxGHtrlVO7Q2j64GijQ6emkIYRA7Vtm0a3S950xbifuBsVDuqH";

const api = axios.create({
  baseURL: "https://api-ds.codeverse.dev.br",
  headers: {
    "x-api-key": API_KEY,
  },
});

export default function DestinosCriarScreen() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [pais, setPais] = useState("");
  const [clima, setClima] = useState("");
  const [tipo, setTipo] = useState("");
  const [status, setStatus] = useState("");

  const [enviando, setEnviando] = useState(false);

  async function criarDestino() {
    if (!titulo) {
      Alert.alert("Preencha pelo menos o título.");
      return;
    }

    if (!pais || !clima || !tipo || !status) {
      Alert.alert(
        "Atenção",
        "Preencha todos os campos específicos do destino."
      );
      return;
    }

    setEnviando(true);

    try {
      const resposta = await api.post("/api/herois", {
        title: titulo,
        description: descricao,
        imageUrl: imagemUrl,
        pais,
        clima,
        tipo,
        status,
      });

      Alert.alert("Destino criado!", resposta.data.title);
      setTitulo("");
      setDescricao("");
      setImagemUrl("");
      setPais("");
      setClima("");
      setTipo("");
      setStatus("");
    } catch (e) {
      Alert.alert(
        "Não deu pra criar o destino",
        "A API respondeu com erro. Confere se todos os campos estão certinhos e tenta de novo."
      );
    } finally {
      setEnviando(false);
    }
  }

    return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.conteudo}
      >
        <View style={styles.header}>
          <Text style={styles.tituloPagina}>
            Criar destino
          </Text>

          <Text style={styles.subtitulo}>
            POST /api/destinos
          </Text>
        </View>

        <Text style={styles.rotulo}>Título</Text>

        <TextInput
          style={styles.campo}
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Ex: Tokyo"
          placeholderTextColor="#9AABAA"
        />

        <Text style={styles.rotulo}>Descrição</Text>

        <TextInput
          style={[styles.campo, styles.campoDescricao]}
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Ex: Tokyo em uma versão simplificada."
          placeholderTextColor="#9AABAA"
          multiline
        />

        <Text style={styles.rotulo}>URL da imagem</Text>

        <TextInput
          style={styles.campo}
          value={imagemUrl}
          onChangeText={setImagemUrl}
          placeholder="Ex: https://exemplo.com/imagem.jpg"
          placeholderTextColor="#9AABAA"
          autoCapitalize="none"
        />

        <Text style={styles.rotulo}>País</Text>

        <TextInput
          style={styles.campo}
          value={pais}
          onChangeText={setPais}
          placeholder="Ex: Japão"
          placeholderTextColor="#9AABAA"
        />

        <Text style={styles.rotulo}>Clima</Text>

        <TextInput
          style={styles.campo}
          value={clima}
          onChangeText={setClima}
          placeholder="Ex: Temperado"
          placeholderTextColor="#9AABAA"
        />

        <Text style={styles.rotulo}>Tipo</Text>

        <View style={styles.opcoes}>
          {["Cidade", "Montanha", "Natureza", "Praia"].map(
            (opcao) => (
              <Pressable
                key={opcao}
                style={[
                  styles.opcao,
                  tipo === opcao && styles.opcaoSelecionada,
                ]}
                onPress={() => setTipo(opcao)}
              >
                <Text
                  style={[
                    styles.opcaoTexto,
                    tipo === opcao &&
                      styles.opcaoTextoSelecionada,
                  ]}
                >
                  {opcao}
                </Text>
              </Pressable>
            )
          )}
        </View>

        <Text style={styles.rotulo}>Status</Text>

        <View style={styles.opcoes}>
          {["Classico", "Em alta", "Premium"].map(
            (opcao) => (
              <Pressable
                key={opcao}
                style={[
                  styles.opcao,
                  status === opcao &&
                    styles.opcaoSelecionada,
                ]}
                onPress={() => setStatus(opcao)}
              >
                <Text
                  style={[
                    styles.opcaoTexto,
                    status === opcao &&
                      styles.opcaoTextoSelecionada,
                  ]}
                >
                  {opcao}
                </Text>
              </Pressable>
            )
          )}
        </View>

        <Pressable
          style={styles.botao}
          onPress={criarDestino}
          disabled={enviando}
        >
          <Text style={styles.botaoTexto}>
            {enviando ? "Enviando..." : "Criar destino"}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },

  conteudo: {
    padding: 24,
    paddingBottom: 48,
  },

  header: {
    marginBottom: 16,
  },

  tituloPagina: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1D2B2A",
  },

  subtitulo: {
    fontSize: 14,
    color: "#758482",
    marginTop: 2,
  },

  rotulo: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1D2B2A",
    marginBottom: 4,
  },

  campo: {
    borderWidth: 1,
    borderColor: "#DDE8E6",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
    color: "#1D2B2A",
  },

  campoDescricao: {
    minHeight: 80,
    textAlignVertical: "top",
  },

  opcoes: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },

  opcao: {
    borderWidth: 1,
    borderColor: "#DDE8E6",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 9,
    backgroundColor: "#fff",
  },

  opcaoSelecionada: {
    backgroundColor: "#65B9B1",
    borderColor: "#65B9B1",
  },

  opcaoTexto: {
    fontSize: 12,
    fontWeight: "600",
    color: "#758482",
  },

  opcaoTextoSelecionada: {
    color: "#fff",
  },

  botao: {
    alignSelf: "center",
    backgroundColor: "#65B9B1",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,

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
});