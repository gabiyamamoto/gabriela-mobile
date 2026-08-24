import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/header";
import Card from "../components/card";

const fotoPerfil = require("../../assets/foto-perfil.jpg");
const anoAtual = new Date().getFullYear();

export default function SobreScreen() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.container}>

                <Header eyebrow="Sobre mim"
                    title="Conheça mais sobre mim "
                    description="Um pouco sobre quem eu sou, o que gosto de fazer e o que venho aprendendo" />

                <View style={styles.cardPerfil}>
                    <Image
                        source={fotoPerfil}
                        style={styles.imagemPerfil}
                    />

                    <View style={styles.infoPerfil}>
                        <Text style={styles.nome}>Gabriela Emi Yamamoto</Text>
                    </View>

                    <Text style={styles.papel}>Estudante de Desenvolvimento de Sistemas</Text>
                </View>

                <View style={styles.secaoSobre} >
                    <Text style={styles.tituloSecao}>
                        Quem sou eu?
                    </Text>

                    <Text style={styles.textoSecao}>
                        Sou uma estudante do ensino médio integrado ao curso de Desenvolvimento de Sistemas no SENAI, gosto de unir tecnologia e criatividade para criar projetos digitais. Tenho interesse por programação, design e experiências digitais.
                    </Text>
                </View>

                <View style={styles.cardsSecao}>
                    <Card
                        icon="💻"
                        variant="green"
                        title="Tecnologia"
                        description="Javascript, React, React Native, Node.js, SQL e desenvolvimento de APIs"
                    />

                    <Card
                        icon="🎨"
                        variant="pink"
                        title="Criatividade"
                        description="Gosto de design, desenho, criação de interfaces e projetos que tenham bastante personalidade"
                    />
                </View>

                <View style={styles.secaoBotoes} >
                    <Text style={styles.tituloSecao}>
                        Vamos conversar?
                    </Text>

                    <Pressable style={styles.botaoPrincipal}>
                        <Text style={styles.botaoTextoPrincipal}>Ver meus projetos ➡️</Text>
                    </Pressable>

                    <Pressable style={styles.botaoSecundario}>
                        <Text style={styles.botaoTextoSecundario}>Entre em contato</Text>
                    </Pressable>
                </View>

                <Text style={styles.footer}>Gabi Yamamoto - {anoAtual} </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },

    container: {
        padding: 24,
        gap: 20,
        justifyContent: "center",
    },

    cardPerfil: {
        alignItems: "center",
        padding: 24,
        gap: 10,
        borderRadius: 24,
        backgroundColor: "#fff",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },

    imagemPerfil: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: "#65B9B1",
    },

    infoPerfil: {
        alignItems: "center",
    },

    nome: {
        fontSize: 20,
        fontWeight: "800",
        color: "#579E98",
        textAlign: "center",
    },

    papel: {
        fontSize: 13,
        fontWeight: "400",
        color: "#1D2B2A",
        textAlign: "center",
    },

    secaoSobre: {
        backgroundColor: "#E3F3F1",
        padding: 24,
        gap: 10,
        borderRadius: 24,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },

    tituloSecao: {
        fontSize: 18,
        fontWeight: "700",
        color: "#579E98",
    },

    textoSecao: {
        fontSize: 14,
        fontWeight: "400",
        color: "#758482",
    },


    cardsSecao: {
        gap: 10,
    },

    secaoBotoes: {
        alignItems: "center",
        backgroundColor: "#E3F3F1",
        padding: 24,
        gap: 10,
        borderRadius: 24,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },

    botaoPrincipal: {
        backgroundColor: "#65B9B1",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 18,
    },

    botaoTextoPrincipal: {
        fontSize: 14,
        fontWeight: "700",
        color: "#fff",
    },

    botaoSecundario: {
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 18,
        borderWidth: 2,
        borderColor: "#65B9B1",
    },

    botaoTextoSecundario: {
        fontSize: 14,
        fontWeight: "700",
        color: "#65B9B1",
    },

    botaoTextoSecundario: {
        fontSize: 14,
        fontWeight: "700",
        color: "#65B9B1",
    },

    footer: {
        textAlign: "center",
        fontSize: 11,
        color: "#9AABAA",
    },
});
