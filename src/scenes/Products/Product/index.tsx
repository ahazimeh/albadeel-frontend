import React, { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { Shadow } from "react-native-shadow-2";
import { Colors } from "../../../constants";
import Text from "../../../components/Text";
import Modal from "react-native-modal";
import { ProductsDetails } from "../ProductsDetails";

interface Props {
  product: any;
  setVisible: any;
}

export const Product: React.FC<Props> = ({ product, setVisible }) => {
  // console.log("asdasdas", product.imageUrl);
  const { width } = useWindowDimensions();
  // const [visible, setVisible] = useState(false);
  return (
    <>
      <Shadow
        style={{ width }}
        sides={{ bottom: true, end: false, start: false, top: false }}
      >
        <Pressable
          style={styles.wrapper}
          onPress={() => {
            setVisible(product);
            //           Alert.alert(
            //             "Albadeel Product",
            //             `${`Name: ${product.name}`}
            // Barcode:
            // Category:
            // Manufacturer:`
            //           );
          }}
        >
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
              {!!product.imageUrl && (
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
              )}
            </View>
            <View style={{ paddingHorizontal: 20, flex: 2 }}>
              <ProductsDetails product={product} numberOfLines={1} />
            </View>
          </View>
        </Pressable>
      </Shadow>
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
