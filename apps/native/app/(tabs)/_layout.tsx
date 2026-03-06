import { Tabs } from "expo-router";
import { TabIcon, LiquidTabBar } from "@repo/ui";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <LiquidTabBar {...props} />}
      screenOptions={{
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
