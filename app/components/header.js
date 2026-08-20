import { Image, StyleSheet, Text, View } from "react-native";

export default function Header({ eyebrow, title, description, logo }) {
    return (
        <View style={styles.container}>
            <View style={styles.containerTexto}>
                <Text style={styles.eyebrow}>{eyebrow}</Text>
                <Text style={styles.titulo}>
                    {title}
                </Text>
                <Text style={styles.descricao}>{description}</Text>
            </View>

            {logo && (
                <View style={styles.logoContainer}
                >
                    <Image
                        source={logo}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "flex-start",
        padding: 5,
    },

    containerTexto: {
        flex: 1,
        gap: 8,
        marginRight: 12,
    },

    eyebrow: {
        fontSize: 11,
        fontWeight: "700",
        letterSpacing: 1.5,
        textTransform: "uppercase",
        color: "#65B9B1",
    },

    titulo: {
        fontSize: 22,
        lineHeight: 28,
        fontWeight: "800",
        color: "#1C2B2A"
    },

    descricao: {
        fontSize: 14,
        lineHeight: 21,
        color: "#71817F"
    },

    logoContainer: {
        width: 46,
        height: 46,
        borderRadius: 18,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },

    logo: {
        width: 36,
        height: 36,
    },
})