import { Tabs } from "expo-router"; import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#65B9B1",
        tabBarInactiveTintColor: "#9AABAA",

        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          headerTitle: "Início",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="sobre"
        options={{
          title: "Sobre",
          headerTitle: "Sobre",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="destinos-listar"
        options={{
          title: "GET",
          headerTitle: "Conteúdo - Get",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="list-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="destinos-criar"
        options={{
          title: "POST",
          headerTitle: "Conteúdo - Post",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="add-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="destinos-deletar"
        options={{
          title: "DELETE",
          headerTitle: "Conteúdo - Delete",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="trash-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
