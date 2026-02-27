import { StyleSheet, Text, View } from "react-native";

export default function CardsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🃏</Text>
      <Text style={styles.title}>随机神评卡片</Text>
      <Text style={styles.subtitle}>滑动卡片探索精选 AI 锐评语录</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4FF",
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
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    paddingHorizontal: 40,
  },
});
