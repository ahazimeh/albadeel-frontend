import React from "react";
import { Text as RnText, StyleSheet, StyleProp, TextStyle } from "react-native";
import { TextProps } from "react-native/Libraries/Text/Text";

type IProps = {
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
} & TextProps;
const Text = ({ style, children, onPress, ...rest }: IProps) => {
  let baseStyle = styles.medium;

  // Multiple styles may be provided.
  // This flag is used only to set default
  let flag = false;
  (Array.isArray(style) ? style : [style]).forEach((style) => {
    if (style && style.fontWeight) {
      flag = true;
      baseStyle =
        style.fontWeight === "bold" ||
        style.fontWeight === "600" ||
        style.fontWeight === "700"
          ? styles.bold
          : style.fontWeight === "900"
          ? styles.black
          : style.fontWeight === "500"
          ? styles.medium
          : style.fontWeight === "400" || style.fontWeight === "normal"
          ? styles.regular
          : style.fontWeight === "300"
          ? styles.light
          : styles.thin;
    } else if (!flag) baseStyle = styles.regular;
  });

  // We need to force fontWeight to match the right font family.
  return (
    <RnText
      style={[styles.regular, baseStyle, styles.commonStyle, style]}
      {...rest}
    >
      {children}
    </RnText>
  );
};

const styles = StyleSheet.create({
  commonStyle: {
    // color: Colors.text,
  },
  black: {
    fontFamily: "Avenir_Black",
  },
  bold: {
    fontFamily: "Avenir_Heavy",
  },
  medium: {
    fontFamily: "Avenir_Regular",
  },
  regular: {
    fontFamily: "Avenir_Regular",
  },
  light: {
    fontFamily: "Avenir_Book",
  },
  thin: {
    fontFamily: "Avenir_Light",
  },
});

export default Text;
