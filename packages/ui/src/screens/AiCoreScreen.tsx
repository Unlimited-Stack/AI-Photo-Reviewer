/**
 * AiCoreScreen.tsx
 * 「AI 锐评」页面，背景和文字颜色通过 useTheme() 响应深浅色模式切换。
 * accent 标题色和 badge 背景色（#FF2D55）固定使用品牌红，不随主题变化。
 */
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme/ThemeContext";

export function AiCoreScreen() {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text style={styles.emoji}>✨</Text>
      <Text style={[styles.title, { color: colors.accent }]}>AI 锐评核心</Text>
      <Text style={styles.badge}>CORE</Text>
      <Text style={[styles.subtitle, { color: colors.subtitle }]}>
        上传相片 · 选择风格 · 获取 AI 多模态点评{"\n"}
        🔥 毒舌吐槽 &nbsp; 🌈 彩虹屁 &nbsp; 🧐 专业摄影师
      </Text>
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
    fontSize: 72,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  badge: {
    backgroundColor: "#FF2D55",
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 40,
    lineHeight: 22,
  },
});
