import { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    Alert,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import Header from "../components/header";

// Em produção, uma chave de API não deveria morar direto no código do
// app (dá pra extrair de qualquer APK/IPA instalado). Aqui, como é uma
// API pública de estudo, deixamos direto no código pra simplificar.
const API_KEY = "cv_Hl8dpaXYosNehGc9ZMhLg-MnSia5QreHaY_In1KWxcPbUMNurusmFg4gt4V4W3HP";

// Mesma instância do axios usada nas outras telas, com o header já
// configurado — toda chamada feita com "api" já sai autenticada.
const api = axios.create({
    baseURL: "https://api-ds.codeverse.dev.br",
    headers: {
        "x-api-key": API_KEY,
    },
});

// ---------- PUT: editar um herói existente ----------
// Pra editar, primeiro precisamos saber QUAL herói — por isso a tela
// começa mostrando a lista e só depois de tocar em um item é que
// aparece o formulário, já preenchido com os dados atuais.
export default function DestinosEditarScreen() {
    const [destinos, setDestinos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    // null = mostra a lista; objeto = mostra o formulário de edição
    const [selecionado, setSelecionado] = useState(null);

    const [titulo, setTitulo] = useState("");
    const [imagemUrl, setImagemUrl] = useState("");
    const [pais, setPais] = useState("");
    const [tipoDestino, setTipoDestino] = useState("");
    const [melhorEpoca, setMelhorEpoca] = useState("");
    const [custoMedio, setCustoMedio] = useState("");
    const [salvando, setSalvando] = useState(false);

    async function buscarDestinos() {
        setCarregando(true);
        setErro(null);
        try {
            const resposta = await api.get("/api/destinos", {
                params: { limit: 50 },
            });
            setDestinos(resposta.data.data);
        } catch (e) {
            setErro("Não foi possível carregar os destinos. Tenta de novo em instantes.");
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        buscarDestinos();
    }, []);

    function selecionarDestino(destino) {
        setSelecionado(destino);
        setTitulo(destino.title ?? "");
        setImagemUrl(destino.imageUrl ?? "");
        setPais(destino.pais ?? "");
        setTipoDestino(destino.tipo_destino ?? "");
        setMelhorEpoca(destino.melhor_epoca ?? "");
        setCustoMedio(destino.custo_medio ?? "");
    }

    async function salvarEdicao() {
        if (!selecionado) return;
        if (!titulo) {
            Alert.alert("Preencha pelo menos o título.");
            return;
        }

        setSalvando(true);
        try {
            // PUT substitui o registro inteiro — mandamos todos os campos de
            // novo. O id vai na URL, não no corpo.
            const resposta = await api.put(`/api/destinos/${selecionado.id}`, {
                title: titulo,
                imageUrl: imagemUrl,
                pais: pais,
                tipo_destino: tipoDestino,
                melhor_epoca: melhorEpoca,
                custo_medio: custoMedio,
            });

            // Esta API devolve o registro atualizado dentro de "data".
            Alert.alert("Destino atualizado!", resposta.data.data.title);

            setSelecionado(null);
            buscarDestinos(); // recarrega a lista com o dado novo
        } catch (e) {
            Alert.alert(
                "Não deu pra atualizar o destino",
                "A API respondeu com erro. Confere se todos os campos estão certinhos e tenta de novo."
            );
        } finally {
            setSalvando(false);
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.conteudo}>
                <Header eyebrow="verbo put - api"
                    title="Editar destino ✏️"
                    description="Atualizando um destino existente através de uma requisição PUT" />

                <View style={styles.main}>

                    {!selecionado && (
                        <>
                            <Text style={styles.instrucao}>Toque em um destino pra editar:</Text>

                            {carregando && <ActivityIndicator style={{ marginVertical: 16 }} />}
                            {erro && <Text style={styles.erro}>{erro}</Text>}

                            {!carregando &&
                                destinos.map((item) => (
                                    <Pressable key={item.id} style={styles.linha} onPress={() => selecionarDestino(item)}>
                                        <Text style={styles.linhaTitulo}>{item.title}</Text>
                                        <Text style={styles.linhaSeta}>editar ›</Text>
                                    </Pressable>
                                ))}
                        </>
                    )}

                    {selecionado && (
                        <>
                            <Pressable onPress={() => setSelecionado(null)} style={styles.voltar}>
                                <Text style={styles.voltarTexto}>‹ voltar pra lista</Text>
                            </Pressable>

                            <Text style={styles.rotulo}>Título</Text>
                            <TextInput
                                style={styles.campo}
                                value={titulo}
                                onChangeText={setTitulo}
                                placeholder="Ex: Tokyo"
                            />

                            <Text style={styles.rotulo}>URL da imagem</Text>
                            <TextInput
                                style={styles.campo}
                                value={imagemUrl}
                                onChangeText={setImagemUrl}
                                placeholder="Ex: https://exemplo.com/tokyo.jpg"
                            />

                            <Text style={styles.rotulo}>País</Text>
                            <TextInput
                                style={styles.campo}
                                value={pais}
                                onChangeText={setPais}
                                placeholder="Ex: Japão"
                            />

                            <Text style={styles.rotulo}>Tipo de destino</Text>
                            <View style={styles.opcoes}>
                                {["Cidade", "Montanha", "Natureza", "Praia"].map(
                                    (opcao) => (
                                        <Pressable
                                            key={opcao}
                                            style={[
                                                styles.opcao,
                                                tipoDestino === opcao && styles.opcaoSelecionada,
                                            ]}
                                            onPress={() => setTipoDestino(opcao)}
                                        >
                                            <Text
                                                style={[
                                                    styles.opcaoTexto,
                                                    tipoDestino === opcao &&
                                                    styles.opcaoTextoSelecionada,
                                                ]}
                                            >
                                                {opcao}
                                            </Text>
                                        </Pressable>
                                    )
                                )}
                            </View>

                            <Text style={styles.rotulo}>Melhor época para visitar</Text>
                            <TextInput
                                style={styles.campo}
                                value={melhorEpoca}
                                onChangeText={setMelhorEpoca}
                                placeholder="Ex: Verão"
                            />

                            <Text style={styles.rotulo}>Custo médio (R$)</Text>
                            <TextInput
                                style={styles.campo}
                                value={custoMedio}
                                onChangeText={setCustoMedio}
                                placeholder="Ex: 8000"
                            />

                            <Pressable style={styles.botao} onPress={salvarEdicao} disabled={salvando}>
                                <Text style={styles.botaoTexto}>{salvando ? "Salvando..." : "Salvar alterações"}</Text>
                            </Pressable>
                        </>
                    )}

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

    instrucao: {
        fontSize: 14,
        color: "#71817F",
        marginBottom: 8
    },

    erro: {
        color: "#c62828",
        marginTop: 12
    },

    linha: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 8,
        marginVertical: 8,
        backgroundColor: "#fff",
        borderRadius: 14,
        overflow: "hidden",
        paddingHorizontal: 14,
        paddingVertical: 14,
        marginVertical: 8,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },

    linhaTitulo: {
        fontSize: 15,
        fontWeight: "700",
        color: "#102542"
    },

    linhaSeta: {
        fontSize: 13,
        color: "#579E98",
        fontWeight: "600"
    },

    voltar: {
        marginBottom: 16
    },

    voltarTexto: {
        color: "#579E98",
        fontWeight: "700"
    },

    rotulo: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1D2B2A",
        marginVertical: 8,
    },

    campo: {
        borderWidth: 1,
        borderColor: "#DDE8E6",
        borderRadius: 15,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 12,
        backgroundColor: "#fff",
        color: "#1D2B2A",
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
        fontSize: 13,
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