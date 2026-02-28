"use client";

import Link from "next/link";
import styles from "../styles/index.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>🎨 AI Photo Reviewer</h1>
      <p style={{ marginBottom: 32, color: "#666" }}>
        Turborepo 跨平台应用 · Web & Native 共享 UI
      </p>
      
      <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Link href="/messages" style={linkStyle}>💬 消息</Link>
        <Link href="/feed" style={linkStyle}>🌊 瀑布流</Link>
        <Link href="/ai-core" style={linkStyle}>✨ AI 锐评</Link>
        <Link href="/cards" style={linkStyle}>🃏 卡片</Link>
        <Link href="/profile" style={linkStyle}>👤 我的</Link>
      </nav>
    </div>
  );
}

const linkStyle = {
  padding: "12px 24px",
  backgroundColor: "#f0f0f0",
  borderRadius: 8,
  textDecoration: "none",
  color: "#333",
  fontSize: 16,
  fontWeight: 500,
  textAlign: "center" as const,
  transition: "background 0.2s",
};
