import { StyleSheet, Text, View } from "react-native";

export default function Card({
  title,
  description,
  icon,
  variant = "white",
}) {
  return (
    <View style={[styles.card, styles[variant]]}>
      {icon && (
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{icon}</Text>
        </View>
      )}

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 20,
  },

  white: {
    backgroundColor: "#FFFFFF",

    shadowColor: "#64817E",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 3,
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
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  icon: {
    fontSize: 19,
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#253332",
    marginBottom: 6,
  },

  description: {
    fontSize: 13,
    lineHeight: 19,
    color: "#71817F",
  },
});