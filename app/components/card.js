import { StyleSheet, Text, View } from "react-native";

export default function Card({ title, description, icon, variant = "white" }) {
  return (
    <View style={[styles.card, styles[variant]]}>
      {icon && (
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>
            {icon}
          </Text>
        </View>
      )}

      <Text style={styles.titulo}>
        {title}
      </Text>

      <Text style={styles.descricao}>
        {title}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 20,
  },

  white: {
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

  green: {
    backgroundColor: "#E3F3F1",
  },

  pink: {
    backgroundColor: "#FCEBEB",
  },

  iconContainer: {
    width: 42,
    height: 42,
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

  icon: {
    fontSize: 20,
  },

  titulo: {
    fontSize: 17,
    fontWeight: "700",
    color: "#253332",
    marginBottom: 6,
  },

  descricao: {
    fontSize: 13,
    lineHeight: 19,
    color: "#758482",
  },
})