import React, { useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Platform,
  StyleSheet,
  LayoutChangeEvent,
} from "react-native";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Route {
  key: string;
  name: string;
}

interface NavigationState {
  index: number;
  routes: Route[];
}

export interface LiquidTabBarProps {
  state: NavigationState;
  navigation: {
    navigate: (name: string) => void;
    emit: (event: { type: string; target?: string; canPreventDefault?: boolean }) => { defaultPrevented: boolean };
  };
}

const TABS = [
  { name: "index", icon: "💬", label: "消息" },
  { name: "feed", icon: "🌊", label: "瀑布流" },
  { name: "ai-core", icon: "✨", label: "锐评" },
  { name: "cards", icon: "🃏", label: "神评" },
  { name: "profile", icon: "👤", label: "我的" },
];

const PILL_VERTICAL_MARGIN = 8;
const PILL_HEIGHT = 48;
const PILL_HORIZONTAL_PADDING = 4;
const CONTAINER_HEIGHT = PILL_HEIGHT + PILL_VERTICAL_MARGIN * 2;

export function LiquidTabBar({ state, navigation }: LiquidTabBarProps) {
  const insets = useSafeAreaInsets();
  const [containerWidth, setContainerWidth] = useState(0);
  const [pillVisible, setPillVisible] = useState(false);

  const tabWidth = containerWidth > 0 ? containerWidth / state.routes.length : 0;

  const pillX = useRef(new Animated.Value(0)).current;

  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const width = e.nativeEvent.layout.width;
      setContainerWidth(width);
      const tw = width / state.routes.length;
      // Set pill position immediately without animation on first layout
      pillX.setValue(state.index * tw + PILL_HORIZONTAL_PADDING);
      setPillVisible(true);
    },
    [state.index, state.routes.length, pillX]
  );

  const handleTabPress = useCallback(
    (routeName: string, routeKey: string, index: number) => {
      const isFocused = state.index === index;
      const event = navigation.emit({
        type: "tabPress",
        target: routeKey,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(routeName);
      }

      // Animate pill to new position
      if (tabWidth > 0) {
        Animated.spring(pillX, {
          toValue: index * tabWidth + PILL_HORIZONTAL_PADDING,
          damping: 18,
          stiffness: 180,
          mass: 0.9,
          useNativeDriver: true,
        }).start();
      }
    },
    [state.index, navigation, pillX, tabWidth]
  );

  const pillWidth = tabWidth > 0 ? tabWidth - PILL_HORIZONTAL_PADDING * 2 : 0;

  const isAndroid = Platform.OS === "android";

  return (
    <View
      style={[
        styles.wrapper,
        { bottom: 12 + insets.bottom },
      ]}
    >
      {isAndroid ? (
        <View style={[styles.container, styles.androidContainer]}>
          {renderInner()}
        </View>
      ) : (
        <BlurView
          intensity={70}
          tint="systemUltraThinMaterial"
          style={styles.container}
        >
          {renderInner()}
        </BlurView>
      )}
    </View>
  );

  function renderInner() {
    return (
      <View style={styles.innerRow} onLayout={handleLayout}>
        {/* Sliding pill */}
        {pillVisible && tabWidth > 0 && (
          <Animated.View
            style={[
              styles.pill,
              {
                width: pillWidth,
                transform: [{ translateX: pillX }],
              },
            ]}
          />
        )}

        {/* Tab items */}
        {state.routes.map((route, index) => {
          const tab =
            TABS.find((t) => t.name === route.name) ?? TABS[index] ?? TABS[0];
          const isFocused = state.index === index;

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tab}
              onPress={() => handleTabPress(route.name, route.key, index)}
              activeOpacity={0.7}
            >
              <Text style={styles.icon}>{tab.icon}</Text>
              <Text
                style={[styles.label, isFocused && styles.labelActive]}
                numberOfLines={1}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 16,
    right: 16,
    zIndex: 999,
  },
  container: {
    borderRadius: 32,
    overflow: "hidden",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.6)",
    // Shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 16,
  },
  androidContainer: {
    backgroundColor: "rgba(245,245,245,0.93)",
  },
  innerRow: {
    flexDirection: "row",
    height: CONTAINER_HEIGHT,
    alignItems: "center",
    paddingHorizontal: 0,
  },
  pill: {
    position: "absolute",
    height: PILL_HEIGHT,
    top: PILL_VERTICAL_MARGIN,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.38)",
    // Subtle inner highlight
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.8)",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: CONTAINER_HEIGHT,
  },
  icon: {
    fontSize: 22,
    lineHeight: 26,
  },
  label: {
    fontSize: 10,
    color: "rgba(100,100,100,0.7)",
    marginTop: 1,
    fontWeight: "500",
  },
  labelActive: {
    color: "#FF2D55",
    fontWeight: "700",
  },
});
