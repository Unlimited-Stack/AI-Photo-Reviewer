/**
 * Sidebar.tsx — Web 端液态玻璃侧边栏
 * 仿照 Native 端 LiquidTabBar 的视觉风格，以纯 CSS 实现：
 *   - backdrop-filter 毛玻璃效果
 *   - 选中项带平滑滑动的"液态药丸"指示器
 *   - 深色/浅色模式自动切换
 *
 * 布局参考：类似微信桌面端，左侧固定窄栏，图标 + 文字纵向排列。
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

// 导航项配置——与 Native 端 LiquidTabBar 的 TABS 保持一致
const NAV_ITEMS = [
  { href: "/messages", icon: "\u{1F4AC}", label: "\u6D88\u606F" },
  { href: "/feed",     icon: "\u{1F30A}", label: "\u7011\u5E03\u6D41" },
  { href: "/ai-core",  icon: "\u2728",    label: "\u9510\u8BC4" },
  { href: "/cards",    icon: "\u{1F0CF}", label: "\u795E\u8BC4" },
  { href: "/profile",  icon: "\u{1F464}", label: "\u6211\u7684" },
];

interface SidebarProps {
  isDark: boolean; // 当前是否深色模式
}

export function Sidebar({ isDark }: SidebarProps) {
  const pathname = usePathname();

  // 计算当前激活项的索引，用于定位药丸位置
  const activeIndex = useMemo(() => {
    const idx = NAV_ITEMS.findIndex((item) => pathname.startsWith(item.href));
    // 首页 "/" 默认高亮第一项
    return idx >= 0 ? idx : 0;
  }, [pathname]);

  // 药丸的 Y 轴偏移量：每项高度 52px + gap 2px = 54px 步进
  const pillY = activeIndex * 54;

  return (
    <aside className={`sidebar${isDark ? " dark" : ""}`}>
      {/* 顶部品牌标识 */}
      <div className="sidebar-brand">{"\u{1F3A8}"}</div>

      {/* 导航项列表 */}
      <nav className="sidebar-nav">
        {/* 液态药丸指示器——通过 translateY 平滑滑动到激活项位置 */}
        <div
          className={`sidebar-pill${isDark ? " dark" : ""}`}
          style={{ transform: `translateY(${pillY}px)` }}
        />

        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href) ||
            (pathname === "/" && item.href === "/messages");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-item${isActive ? " active" : ""}`}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
