import { Tabs } from "expo-router";
import { TabIcon } from "@repo/ui";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FF2D55",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0.5,
          borderTopColor: "#eee",
          height: 60,
          paddingBottom: 8,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "消息",
          tabBarIcon: ({ color }) => (
            <TabIcon label="💬" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: "瀑布流",
          tabBarIcon: ({ color }) => (
            <TabIcon label="🌊" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ai-core"
        options={{
          title: "锐评",
          tabBarIcon: ({ color }) => (
            <TabIcon label="✨" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cards"
        options={{
          title: "神评卡片",
          tabBarIcon: ({ color }) => (
            <TabIcon label="🃏" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "我的",
          tabBarIcon: ({ color }) => (
            <TabIcon label="👤" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
