import React from "react";
import { Image, StyleSheet, View, useWindowDimensions } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { Colors } from "../../../constants";
import Text from "../../../components/Text";

interface Props {
  product: any;
}

export const Product: React.FC<Props> = ({ product }) => {
  // console.log("asdasdas", product.imageUrl);
  const { width } = useWindowDimensions();
  return (
    <Shadow
      style={{ width }}
      sides={{ bottom: true, end: false, start: false, top: false }}
    >
      <View style={styles.wrapper}>
        <View
          style={{
            // borderWidth: 0.7,
            flex: 1,
            flexDirection: "row",
            borderRadius: 3,
          }}
        >
          <View
            style={{
              // borderRightWidth: 0.7,
              flex: 1,
              borderTopLeftRadius: 3,
              borderBottomLeftRadius: 3,
            }}
          >
            {/* <Text>asdsad</Text> */}
            <Image
              style={{
                flex: 1,
                borderTopLeftRadius: 3,
                borderBottomLeftRadius: 3,
              }}
              source={{
                uri: product.imageUrl,
              }}
            />
          </View>
          <View style={{ paddingHorizontal: 20, flex: 2 }}>
            <Text
              style={[{ color: Colors.green }, styles.textStyle]}
              numberOfLines={1}
            >
              {product.name}
            </Text>
            <Text style={styles.textStyle} numberOfLines={1}>
              Barcode: {product.barcode}
            </Text>
            {product.category && (
              <Text style={styles.textStyle} numberOfLines={1}>
                Category: {product.category}
              </Text>
            )}
            {product.brand && (
              <Text style={styles.textStyle} numberOfLines={1}>
                Brand: {product.brand}
              </Text>
            )}
            {product.manufacturer && (
              <Text style={styles.textStyle} numberOfLines={1}>
                Manufacturer: {product.manufacturer}
              </Text>
            )}
          </View>
        </View>
      </View>
    </Shadow>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // paddingHorizontal: 20,
    maxWidth: 1000,
    marginTop: 20,
    backgroundColor: Colors.white,
  },
  textStyle: {
    lineHeight: 24,
  },
});
