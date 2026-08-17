import { Image, StyleSheet, Text, View } from "react-native";

export default function Header({eyebrow, title, description, logo}) {
    return (
        <View style={styles.container}>
            <View style={styles.containerTexto}>
                <Text style={styles.eyebrow}>{eyebrow}</Text>
                <Text style={styles.titulo}>
                    {title}
                </Text>
                <Text style={styles.description}>{description}</Text>
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
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 28,
    },

    content: {
        flex: 1,
        paddingRight: 15,
    },

    eyebrow: {
        fontSize: 11,
        fontWeight: "700",
        letterSpacing: 1.5,
        textTransform: "uppercase",
        color: "#65B9B1",
        marginBottom: 8,
    },

    title: {
        fontSize: 32,
        lineHeight: 38,
        fontWeight: "800",
        color: "#1C2B2A"
    },

    description: {
        marginTop: 9,
        fontSize: 14,
        lineHeight: 21,
        color: "#71817F"
    },

    logoContainer: {
        width: 52,
        height: 52,
        borderRadius: 18,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#64817e",
        
    },

    logo: {
        width: 36,
        height: 36,
    },
})