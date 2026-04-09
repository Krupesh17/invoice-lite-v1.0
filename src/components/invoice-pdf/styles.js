import { Font, StyleSheet } from "@react-pdf/renderer";

Font.register({
  family: "Geist",
  fonts: [
    { src: "/fonts/geist/Geist-Regular.ttf", fontWeight: "normal" },
    { src: "/fonts/geist/Geist-Medium.ttf", fontWeight: "medium" },
    { src: "/fonts/geist/Geist-SemiBold.ttf", fontWeight: "semiBold" },
    { src: "/fonts/geist/Geist-Bold.ttf", fontWeight: "bold" },
  ],
});

const styles = StyleSheet.create({
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
});

export default styles;
