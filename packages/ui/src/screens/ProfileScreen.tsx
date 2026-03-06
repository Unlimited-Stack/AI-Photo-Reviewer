import { useRef, useState, useCallback } from "react";
import {
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme, type ThemeMode } from "../theme/ThemeContext";

const MODES: { key: ThemeMode; label: string }[] = [
  { key: "system", label: "系统" },
  { key: "light", label: "浅色" },
  { key: "dark", label: "深色" },
];

const SWITCHER_HEIGHT = 44;
const SWITCHER_BORDER_RADIUS = 14;
const PILL_MARGIN = 3;

function ThemeSwitcher() {
  const { mode, setMode, colors, isDark } = useTheme();
  const [switcherWidth, setSwitcherWidth] = useState(0);
  const [pillReady, setPillReady] = useState(false);

  const pillWidth = switcherWidth > 0 ? switcherWidth / 3 - PILL_MARGIN * 2 : 0;
  const currentIndex = MODES.findIndex((m) => m.key === mode);

  const pillX = useRef(new Animated.Value(0)).current;

  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const w = e.nativeEvent.layout.width;
      setSwitcherWidth(w);
      const tw = w / 3;
      pillX.setValue(currentIndex * tw + PILL_MARGIN);
      setPillReady(true);
    },
    [currentIndex, pillX]
  );

  const handlePress = useCallback(
    (index: number, key: ThemeMode) => {
      setMode(key);
      if (switcherWidth > 0) {
        const tw = switcherWidth / 3;
        Animated.spring(pillX, {
          toValue: index * tw + PILL_MARGIN,
          damping: 18,
          stiffness: 180,
          mass: 0.9,
          useNativeDriver: true,
        }).start();
      }
    },
    [setMode, switcherWidth, pillX]
  );

  return (
    <View
      style={[
        styles.switcherContainer,
        {
          backgroundColor: colors.switcherBg,
          borderColor: colors.switcherBorder,
        },
      ]}
      onLayout={handleLayout}
    >
      {pillReady && pillWidth > 0 && (
        <Animated.View
          style={[
            styles.switcherPill,
            {
              width: pillWidth,
              backgroundColor: isDark ? "rgba(99,99,102,0.6)" : "#FFFFFF",
              transform: [{ translateX: pillX }],
            },
          ]}
        />
      )}

      {MODES.map((item, index) => {
        const isActive = mode === item.key;
        return (
          <TouchableOpacity
            key={item.key}
            style={styles.switcherTab}
            onPress={() => handlePress(index, item.key)}
            activeOpacity={0.6}
          >
            <Text
              style={[
                styles.switcherLabel,
                {
                  color: isActive ? colors.text : colors.subtitle,
                  fontWeight: isActive ? "700" : "400",
                },
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export function ProfileScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text style={styles.emoji}>👤</Text>
      <Text style={[styles.title, { color: colors.text }]}>我的主页</Text>
      <Text style={[styles.subtitle, { color: colors.subtitle }]}>
        个人设置与历史锐评记录
      </Text>

      <View style={styles.section}>
        <Text style={[styles.sectionLabel, { color: colors.subtitle }]}>
          外观
        </Text>
        <ThemeSwitcher />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 40,
    marginBottom: 40,
  },
  section: {
    alignItems: "center",
    gap: 10,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  switcherContainer: {
    flexDirection: "row",
    height: SWITCHER_HEIGHT,
    width: 240,
    borderRadius: SWITCHER_BORDER_RADIUS,
    borderWidth: 0.5,
    overflow: "hidden",
    position: "relative",
    alignItems: "center",
  },
  switcherPill: {
    position: "absolute",
    height: SWITCHER_HEIGHT - PILL_MARGIN * 2,
    top: PILL_MARGIN,
    borderRadius: SWITCHER_BORDER_RADIUS - 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  switcherTab: {
    flex: 1,
    height: SWITCHER_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
  switcherLabel: {
    fontSize: 14,
  },
});
