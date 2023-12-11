import React from "react";
import {
  GestureResponderEvent,
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Colors } from "../../constants";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface Props {
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  children: React.ReactNode;
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);
}

export const Button: React.FC<Props> = ({ onPress, children, style }) => {
  return (
    <Pressable
      style={[
        {
          backgroundColor: Colors.purple,
          padding: 16,
          borderRadius: 3,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          gap: 8,
        },
        style,
      ]}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
};
