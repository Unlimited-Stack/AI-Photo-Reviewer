/**
 * Sidebar.tsx — Web 端液态玻璃侧边栏
 *
 * 特性：
 *   - 点击顶部 Logo / 展开按钮可切换 展开(icon+文字) / 收起(仅icon) 两种模式
 *   - 展开收起过程中药丸、标签、宽度均有平滑过渡动画
 *   - 图标与 Native 端共享同一套 react-native-svg 组件（通过 Web stub 渲染为 HTML SVG）
 *   - 选中项使用液态玻璃药丸高亮，切换 tab 时药丸纵向平滑滑动
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useMemo } from "react";
import {
  MessageIcon, CommunityIcon, PlusCircleIcon, CompassIcon, PersonIcon,
  PaletteIcon, SidebarToggleIcon,
} from "@repo/ui";

/* ================================================================
 * 导航项配置——与 Native 端 LiquidTabBar 的 TABS 保持一致
 * ================================================================ */
const NAV_ITEMS = [
  { href: "/messages", Icon: MessageIcon,    label: "消息" },
  { href: "/feed",     Icon: CommunityIcon,  label: "社区" },
  { href: "/ai-core",  Icon: PlusCircleIcon, label: "锐评" },
  { href: "/cards",    Icon: CompassIcon,    label: "发现" },
  { href: "/profile",  Icon: PersonIcon,     label: "我的" },
];

// 每个导航项的高度 + 间距，用于计算药丸 translateY
const ITEM_HEIGHT = 44;
const ITEM_GAP = 4;
const PILL_STEP = ITEM_HEIGHT + ITEM_GAP;

/* ================================================================
 * Sidebar 组件
 * ================================================================ */
interface SidebarProps {
  isDark: boolean;
}

export function Sidebar({ isDark }: SidebarProps) {
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();

  // 当前激活项索引
  const activeIndex = useMemo(() => {
    const idx = NAV_ITEMS.findIndex((item) => pathname.startsWith(item.href));
    return idx >= 0 ? idx : 0;
  }, [pathname]);

  // 药丸 Y 偏移
  const pillY = activeIndex * PILL_STEP;

  // 图标颜色——根据主题和激活状态决定
  const activeColor = isDark ? "#FF375F" : "#FF2D55";
  const inactiveColor = isDark ? "#9e9ea3" : "#666";

  // 组合 class
  const sidebarClass = [
    "sidebar",
    isDark ? "dark" : "",
    expanded ? "expanded" : "",
  ].filter(Boolean).join(" ");

  return (
    <aside className={sidebarClass}>
      {/* 顶部区域：Logo + 展开/收起按钮 */}
      <div className="sidebar-header">
        <button
          className="sidebar-logo-btn"
          onClick={() => setExpanded(!expanded)}
          title={expanded ? "收起侧边栏" : "展开侧边栏"}
        >
          <PaletteIcon size={28} color={isDark ? "#e0e0e0" : "#333"} />
        </button>
        {/* 展开时显示切换按钮 */}
        <button
          className="sidebar-collapse-btn"
          onClick={() => setExpanded(!expanded)}
          title={expanded ? "收起侧边栏" : "展开侧边栏"}
        >
          <SidebarToggleIcon size={20} color={isDark ? "#b0b0b5" : "#666"} flipped={expanded} />
        </button>
      </div>

      {/* 导航列表 */}
      <nav className="sidebar-nav">
        {/* 液态玻璃药丸——随 tab 切换纵向滑动，随展开收起横向拉伸 */}
        <div
          className={`sidebar-pill${isDark ? " dark" : ""}`}
          style={{ transform: `translateY(${pillY}px)` }}
        />

        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname.startsWith(item.href) ||
            (pathname === "/" && item.href === "/messages");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-item${isActive ? " active" : ""}`}
            >
              <span className="sidebar-icon">
                <item.Icon size={24} color={isActive ? activeColor : inactiveColor} />
              </span>
              <span className="sidebar-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
