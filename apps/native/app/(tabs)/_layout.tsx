/**
 * (tabs)/_layout.tsx
 * Tab 导航布局，职责：
 *   1. 将默认底部栏替换为自定义的 LiquidTabBar（液态玻璃风格）
 *   2. 声明五个 Tab 页面及其标题和图标配置
 *
 * 注意：tabBarIcon 仍保留配置，供未来有需要时 LiquidTabBar 通过 descriptors 读取；
 *       当前 LiquidTabBar 直接使用内置 TABS 静态配置，不从 descriptors 取图标。
 */
import { Tabs } from "expo-router";
import { TabIcon, LiquidTabBar } from "@repo/ui";

export default function TabLayout() {
  return (
    <Tabs
      // 用自定义液态玻璃 TabBar 替代 expo-router 默认底部栏
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
