import { StyleSheet, Text, View } from "react-native";

export function FeedScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🌊</Text>
      <Text style={styles.title}>灵感瀑布流</Text>
      <Text style={styles.subtitle}>社区精彩相片与 AI 点评双列信息流</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5F7",
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
