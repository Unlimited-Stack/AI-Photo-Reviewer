import { StyleSheet, Text, View } from "react-native";

export function AiCoreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>✨</Text>
      <Text style={styles.title}>AI 锐评核心</Text>
      <Text style={styles.badge}>CORE</Text>
      <Text style={styles.subtitle}>
        上传相片 · 选择风格 · 获取 AI 多模态点评{"\n"}
        🔥 毒舌吐槽 &nbsp; 🌈 彩虹屁 &nbsp; 🧐 专业摄影师
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF0F3",
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
    color: "#FF2D55",
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
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 40,
    lineHeight: 22,
  },
});
