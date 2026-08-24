import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0f62fe",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          headerTitle: "Início",
        }}
      />
      <Tabs.Screen
        name="sobre"
        options={{
          title: "Sobre",
          headerTitle: "Sobre",
        }}
      />
      <Tabs.Screen
        name="destinos-listar"
        options={{
          title: "GET",
          headerTitle: "Conteúdo - Get",
        }}
      />
      <Tabs.Screen
        name="destinos-criar"
        options={{
          title: "POST",
          headerTitle: "Conteúdo - Post",
        }}
      />
    </Tabs>
  );
}
