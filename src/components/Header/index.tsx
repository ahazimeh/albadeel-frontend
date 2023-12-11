import React from "react";
import { View, Image } from "react-native";

import { HeaderStyle } from "./styles";
import Text from "../Text";

const Header = ({ title }) => {
  return (
    <View style={HeaderStyle.whiteDiv}>
      {/* <View style={HeaderStyle.innerDiv}> */}
      <View>
        <Image
          style={HeaderStyle.logoImg}
          source={require("../../../assets/logo1.png")}
        />
        <Text style={HeaderStyle.title}>{title}</Text>
      </View>
    </View>
  );
};
export default Header;
