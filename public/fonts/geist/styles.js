import { Font, StyleSheet } from "@react-pdf/renderer";

Font.register({
  family: "Geist",
  fonts: [
    { src: "/fonts/geist/Geist-Regular.ttf", fontWeight: "normal" }, // Normal weight
    { src: "/fonts/geist/Geist-Thin.ttf", fontWeight: "thin" }, // Thin weight
    { src: "/fonts/geist/Geist-ExtraLight.ttf", fontWeight: "extraLight" }, // ExtraLight weight
    { src: "/fonts/geist/Geist-Light.ttf", fontWeight: "light" }, // Light weight
    { src: "/fonts/geist/Geist-Medium.ttf", fontWeight: "medium" }, // Medium weight
    { src: "/fonts/geist/Geist-SemiBold.ttf", fontWeight: "semiBold" }, // SemiBold weight
    { src: "/fonts/geist/Geist-Bold.ttf", fontWeight: "bold" }, // Bold weight
    { src: "/fonts/geist/Geist-ExtraBold.ttf", fontWeight: "extraBold" }, // ExtraBold weight
    { src: "/fonts/geist/Geist-Black.ttf", fontWeight: "black" }, // Black weight
  ],
});

const style = StyleSheet.create({
  page: {
    fontFamily: "Geist",
    backgroundColor: "#ffffff",
    color: "#000000",
  },
  table: {
    flex: 1,
    fontFamily: "Geist",
    backgroundColor: "#ffffff",
    color: "#000000",
    border: 0,
  },
  background: {
    backgroundColor: "#FFFFFF",
  },
  foreground: {
    color: "#000000",
  },
  text_primary: {
    color: "#FF6000",
  },
  bg_primary: {
    backgroundColor: "#FF6000",
  },
  bg_primary_foreground: {
    color: "#FFFFFF",
  },
  muted_foreground: {
    color: "#737373",
  },
  width_full: {
    width: "100%",
  },
  height_full: {
    height: "100%",
  },
  height_screen: {
    height: "100vh",
  },
  height_dvh: {
    height: "100dvh",
  },
  height_svh: {
    height: "100svh",
  },
  height_lvh: {
    height: "100lvh",
  },
  border: {
    border: "1px solid #e5e5e5",
  },
  border_top: {
    borderTop: "1px solid #e5e5e5",
  },
  border_bottom: {
    borderBottom: "1px solid #e5e5e5",
  },
  border_left: {
    borderLeft: "1px solid #e5e5e5",
  },
  border_right: {
    borderRight: "1px solid #e5e5e5",
  },
  text_xxxs: {
    fontSize: "0.5rem", // 8px
  },
  text_xxs: {
    fontSize: "0.625rem", // 10px
  },
  text_xs: {
    fontSize: "0.75rem", // 12px
  },
  text_sm: {
    fontSize: "0.875rem", // 14px
  },
  text_base: {
    fontSize: "1rem", // 16px
  },
  text_lg: {
    fontSize: "1.125rem", // 18px
  },
  text_xl: {
    fontSize: "1.25rem", // 20px
  },
  text_2xl: {
    fontSize: "1.5rem", // 24px
  },
  text_3xl: {
    fontSize: "1.875rem", // 30px
  },
  text_4xl: {
    fontSize: "2.25rem", // 36px
  },
  text_5xl: {
    fontSize: "3rem", // 48px
  },
  text_6xl: {
    fontSize: "3.75rem", // 60px
  },
  text_7xl: {
    fontSize: "4.5rem", // 72px
  },
  text_8xl: {
    fontSize: "6rem", // 96px
  },
  text_9xl: {
    fontSize: "8rem", // 128px
  },
  font_normal: {
    fontWeight: "normal",
  },
  font_thin: {
    fontWeight: "thin",
  },
  font_extra_light: {
    fontWeight: "extraLight",
  },
  font_light: {
    fontWeight: "light",
  },
  font_medium: {
    fontWeight: "medium",
  },
  font_semibold: {
    fontWeight: "semibold",
  },
  font_bold: {
    fontWeight: "bold",
  },
  font_extra_bold: {
    fontWeight: "extraBold",
  },
  font_black: {
    fontWeight: "black",
  },
  flex: {
    display: "flex",
  },
  flex_row: {
    flexDirection: "row",
  },
  flex_row_revers: {
    flexDirection: "row-reverse",
  },
  flex_col: {
    flexDirection: "column",
  },
  flex_col_revers: {
    flexDirection: "column-reverse",
  },
  shrink_0: {
    flexShrink: 0,
  },
});

export default style;
