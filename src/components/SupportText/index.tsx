import React from "react";
import Text from "../Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../constants";
import { StyleProp, TextStyle } from "react-native";

interface Props {
  supports: boolean;
  text: string;
  style?: StyleProp<TextStyle>;
}

export const SupportText: React.FC<Props> = ({ supports, text, style }) => {
  return (
    <Text
      style={[
        {
          color: supports ? "red" : Colors.green,
          fontSize: 16,
          fontWeight: "700",
        },
        style,
      ]}
    >
      {text}
      <MaterialCommunityIcons
        name={supports ? "close" : "check-circle"}
        size={20}
        color={supports ? "red" : Colors.green}
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </Text>
  );
};
