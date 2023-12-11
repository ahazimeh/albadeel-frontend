import React from "react";
import { Image, View } from "react-native";
import Text from "../../../components/Text";

interface Props {
  product: any;
}

export const ScannedProduct: React.FC<Props> = ({ product }) => {
  if (!product) return;
  return (
    <View style={{ marginTop: 14 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          // paddingHorizontal: 20,
          gap: 14,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: "700", lineHeight: 22 }}>
            {product.name}
          </Text>
          {!!product.manufacturer && (
            <Text style={{}}>
              Manufacturer:{" "}
              <Text style={{ fontWeight: "600" }}>Electrolux</Text>
            </Text>
          )}
          {!!product.brand && (
            <Text style={{}}>
              Brand: <Text style={{ fontWeight: "600" }}>Electrolux</Text>
            </Text>
          )}
          <Text style={{}}>
            Barcode:{" "}
            <Text style={{ fontWeight: "600" }}>
              {product.barcode ? product.barcode : product.ean}
            </Text>
          </Text>
        </View>
        <View>
          {!!product.imageUrl && (
            <Image
              resizeMode="cover"
              style={{ flex: 1, width: 100 }}
              source={{
                uri: product.imageUrl,
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
};
