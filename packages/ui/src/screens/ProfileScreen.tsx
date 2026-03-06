/**
 * ProfileScreen.tsx
 * 「我的」页面，当前包含：
 *   - 页面基本信息展示
 *   - 外观设置区：ThemeSwitcher 主题切换器
 *
 * ThemeSwitcher 设计参考液态玻璃风格：
 *   半透明容器 + 弹簧滑动药丸 + 触摸反馈（activeOpacity）
 */

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

// 三个主题选项的静态配置，顺序即切换器从左到右的排列顺序
const MODES: { key: ThemeMode; label: string }[] = [
  { key: "system", label: "系统" },
  { key: "light",  label: "浅色" },
  { key: "dark",   label: "深色" },
];

// ── 切换器尺寸常量 ─────────────────────────────────────────────────────
const SWITCHER_HEIGHT = 44;         // 整体控件高度
const SWITCHER_BORDER_RADIUS = 14;  // 圆角半径
const PILL_MARGIN = 3;              // 药丸距容器边缘的间距

/**
 * ThemeSwitcher
 * 三段式主题选择控件，样式参考 iOS 分段控制器（Segmented Control）。
 * - 容器：半透明背景 + 细边框，颜色跟随当前主题
 * - 药丸：白色（浅色模式）/ 深灰（深色模式），弹簧动画横向滑动
 * - 触摸反馈：activeOpacity=0.6 点按时轻微变暗
 */
function ThemeSwitcher() {
  const { mode, setMode, colors, isDark } = useTheme();

  // 容器实际宽度，通过 onLayout 在首次渲染后获取
  const [switcherWidth, setSwitcherWidth] = useState(0);
  // 等到宽度测量完毕再显示药丸，避免首帧位置错误
  const [pillReady, setPillReady] = useState(false);

  // 药丸宽度 = 容器宽 / 3 - 两侧 margin
  const pillWidth = switcherWidth > 0 ? switcherWidth / 3 - PILL_MARGIN * 2 : 0;
  // 当前激活项的下标（用于 onLayout 时初始化药丸位置）
  const currentIndex = MODES.findIndex((m) => m.key === mode);

  // 药丸 X 轴动画值（不进 state，避免触发不必要的 re-render）
  const pillX = useRef(new Animated.Value(0)).current;

  // 容器布局完成：初始化药丸位置（直接赋值，无动画）
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

  // 点击某个选项：更新主题模式 + 启动药丸弹簧滑动
  const handlePress = useCallback(
    (index: number, key: ThemeMode) => {
      setMode(key);
      if (switcherWidth > 0) {
        const tw = switcherWidth / 3;
        Animated.spring(pillX, {
          toValue: index * tw + PILL_MARGIN,
          damping: 18,    // 阻尼：控制弹性收敛速度
          stiffness: 180, // 刚度：控制弹簧硬度
          mass: 0.9,      // 质量：控制运动的轻盈感
          useNativeDriver: true, // 动画在原生线程执行，性能最优
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
          backgroundColor: colors.switcherBg,     // 半透明背景跟随主题
          borderColor: colors.switcherBorder,      // 边框色跟随主题
        },
      ]}
      onLayout={handleLayout}
    >
      {/* 液态药丸：宽度测量完成后才渲染 */}
      {pillReady && pillWidth > 0 && (
        <Animated.View
          style={[
            styles.switcherPill,
            {
              width: pillWidth,
              // 深色模式下药丸用深灰色，浅色模式下用纯白
              backgroundColor: isDark ? "rgba(99,99,102,0.6)" : "#FFFFFF",
              transform: [{ translateX: pillX }],
            },
          ]}
        />
      )}

      {/* 三个可点击的选项 */}
      {MODES.map((item, index) => {
        const isActive = mode === item.key;
        return (
          <TouchableOpacity
            key={item.key}
            style={styles.switcherTab}
            onPress={() => handlePress(index, item.key)}
            activeOpacity={0.6} // 按下时轻微变暗，提供点击反馈
          >
            <Text
              style={[
                styles.switcherLabel,
                {
                  // 激活项：主文字色 + 加粗；未激活项：副文字色 + 正常字重
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

/**
 * ProfileScreen
 * 「我的」页面主体，背景和文字颜色全部通过 useTheme() 动态取值，
 * 确保在深色/浅色模式切换时实时响应。
 */
export function ProfileScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text style={styles.emoji}>👤</Text>
      <Text style={[styles.title, { color: colors.text }]}>我的主页</Text>
      <Text style={[styles.subtitle, { color: colors.subtitle }]}>
        个人设置与历史锐评记录
      </Text>

      {/* 外观设置分区 */}
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
  // 页面根容器：居中布局，背景色由主题动态传入
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
  // 设置分区包装：垂直居中对齐，子元素间距 10
  section: {
    alignItems: "center",
    gap: 10,
  },
  // 分区标题（如"外观"）
  sectionLabel: {
    fontSize: 13,
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  // 切换器外层容器：横向排列，固定宽高，圆角，细边框
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
  // 药丸选中框：绝对定位叠在选项按钮下层
  switcherPill: {
    position: "absolute",
    height: SWITCHER_HEIGHT - PILL_MARGIN * 2,
    top: PILL_MARGIN,
    borderRadius: SWITCHER_BORDER_RADIUS - 2,
    // 轻微阴影增强药丸的浮起感
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  // 单个选项触摸区域（占 flex: 1，三等分）
  switcherTab: {
    flex: 1,
    height: SWITCHER_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
  // 选项文字（激活/非激活样式通过内联覆盖）
  switcherLabel: {
    fontSize: 14,
  },
});
