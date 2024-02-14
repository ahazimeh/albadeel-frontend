import React from "react";
import Text from "../../../components/Text";
import { Colors } from "../../../constants";
import { StyleSheet } from "react-native";

interface Props {
  product: any;
  numberOfLines: number;
}

export const ProductsDetails: React.FC<Props> = ({
  product,
  numberOfLines,
}) => {
  return (
    <>
      <Text
        style={[{ color: Colors.green }, styles.textStyle]}
        numberOfLines={numberOfLines}
      >
        {product.name}
      </Text>
      <Text style={styles.textStyle} numberOfLines={numberOfLines}>
        <Text style={{ fontWeight: "600" }}>Barcode:</Text> {product.barcode}
      </Text>
      {product.category && (
        <Text style={styles.textStyle} numberOfLines={numberOfLines}>
          <Text style={{ fontWeight: "600" }}>Category:</Text>{" "}
          {product.category}
        </Text>
      )}
      {product.brand && (
        <Text style={styles.textStyle} numberOfLines={numberOfLines}>
          <Text style={{ fontWeight: "600" }}>Brand:</Text> {product.brand}
        </Text>
      )}
      {product.manufacturer && (
        <Text style={styles.textStyle} numberOfLines={numberOfLines}>
          <Text style={{ fontWeight: "600" }}>Manufacturer:</Text>{" "}
          {product.manufacturer}
        </Text>
      )}
    </>
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
