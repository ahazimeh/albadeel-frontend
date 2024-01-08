import DropDownPicker from "react-native-dropdown-picker";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  BackHandler,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { Product } from "./Product";
import {
  useGetAlternativeQuery,
  useLazyGetAlternativeIdQuery,
  useLazyGetAlternativeProductsQuery,
  useLazyGetAlternativeQuery,
  useLazyGetBrandQuery,
  useLazyGetProductQuery,
} from "../../store/configureStore";
import { useDispatch } from "react-redux";
import { logout } from "../../store/counter";
import { ScanBarcode } from "./ScanBarcode";
import { ScannedProduct } from "./ScannedProduct";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { Button } from "../../components/Button";
import { Shadow } from "react-native-shadow-2";
import Text from "../../components/Text";
import { SupportText } from "../../components/SupportText";

interface Props {}

export const Products: React.FC<Props> = () => {
  const navigation = useNavigation();
  const [support, setSupports] = useState(false);
  const [getBrand] = useLazyGetBrandQuery();
  const [getAlternativeId] = useLazyGetAlternativeIdQuery();
  const goBackHandler = () => {
    return true;
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: null,
      header: () => {
        //
        return (
          <Shadow style={{ width: "100%" }}>
            <View
              style={{
                backgroundColor: Colors.purple,
                height: 80,
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  // color: Colors.white,
                  fontWeight: "700",
                  marginLeft: 20,
                  fontSize: 20,
                }}
              >
                Products
              </Text>

              <Image
                style={{ height: 60, width: 60 }}
                source={require("../../../assets/al-badeel-logo-purple.jpg")}
              />
            </View>
          </Shadow>
        );
      },
    });
  }, []);
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", goBackHandler);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", goBackHandler);
    };
  }, []);
  useEffect(() => {
    // navigation.setOptions({ header: () => <></> });
  }, []);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);
  const [products, setProducts] = useState([]);
  const page = useRef<number>(1);
  const [id, setId] = useState<any>(0);

  const [fetchAlt, {}] = useLazyGetAlternativeQuery();
  const [fetchAltProducts, { data, error }] =
    useLazyGetAlternativeProductsQuery();
  const [loading, setLoading] = useState(false);
  const [getProduct, { data: data1 }] = useLazyGetProductQuery();
  const [scanFailed, setScanFailed] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (id === 0) {
      setProducts([]);
      return;
    }
    fetchAltProducts(`page=${1}&id=${JSON.stringify(id)}`).then((res) => {
      setProducts(res.data?.productBrandSearch || []);
    });
    page.current = 1;
  }, [id]);
  // useEffect(() => {
  //   if (!data || products.length) {
  //     return;
  //   }
  //   console.log(data.alternative);
  //   setProducts((prevState) => {
  //     return [...prevState, ...data.alternative];
  //   });
  // }, [data]);
  const [scan, setScan] = useState(false);
  const [scannedProduct, setScannedProduct] = useState(null);
  const { height } = useWindowDimensions();

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        // Handle back button press
        // Return true to prevent default behavior (exit the app)
        // Return false to allow default behavior (navigate back)
        setScan(false);
      }
    );

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <>
      <View style={{ backgroundColor: Colors.white, flex: 1 }}>
        {!scan ? (
          <>
            {/* <Pressable
              onPress={() => {
                setScan(true);
              }}
            >
              <Text>ScanItem</Text>
              <Text>ScanItem</Text>
            </Pressable> */}
            {/* <DropDownPicker
              style={{ position: "absolute" }}
              searchable
              listMode="SCROLLVIEW"
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              onChangeSearchText={(text) => {
                console.log(text);
              }}
            /> */}

            <FlatList
              data={products}
              style={{ paddingTop: 14 }}
              keyExtractor={(item) => item.id}
              onEndReached={() => {
                let currentPage = page.current;

                if (!id) {
                  return;
                }
                fetchAltProducts(
                  `page=${currentPage + 1}&id=${JSON.stringify(id)}`
                ).then((res) => {
                  if (!res.data?.productBrandSearch?.length) {
                    return;
                  }
                  setProducts((oldProducts) => {
                    if (currentPage === page.current) {
                      page.current += 1;
                      return [...oldProducts, ...res.data?.productBrandSearch];
                    }
                    return oldProducts;
                  });
                });

                // fetchAltProducts(`page=${currentPage + 1}&id=${id}`).then(
                //   (res) => {
                //     if (!res.data.alternative?.length) {
                //       return;
                //     }
                //     setProducts((oldProducts) => {
                //       if (currentPage === page.current) {
                //         page.current += 1;
                //         return [...oldProducts, ...res.data?.alternative];
                //       }
                //       return oldProducts;
                //     });
                //   }
                // );
              }}
              // f7f2f9
              ListFooterComponent={() => {
                return <View style={{ marginBottom: 40 }}></View>;
              }}
              ListHeaderComponent={() => {
                return (
                  <>
                    <View
                      style={[
                        { marginHorizontal: 20 },
                        !scannedProduct && {
                          justifyContent: "center",
                          flex: 1,
                          height: height - 180,
                        },
                      ]}
                    >
                      <Button
                        onPress={() => {
                          setScan(true);
                        }}
                      >
                        <MaterialCommunityIcons
                          name="barcode-scan"
                          size={20}
                          color={Colors.white}
                        />
                        <Text style={{ color: Colors.white, fontSize: 14 }}>
                          Scan Item
                        </Text>
                      </Button>

                      <Button
                        onPress={() => {
                          navigation.navigate("Brands");
                        }}
                        style={{ marginTop: 10 }}
                      >
                        <Entypo
                          name="price-tag"
                          size={20}
                          color={Colors.white}
                        />
                        <Text style={{ color: Colors.white, fontSize: 14 }}>
                          Search by brand
                        </Text>
                      </Button>
                      {!!(scannedProduct && support) ? (
                        <>
                          <SupportText
                            style={{ marginTop: 8 }}
                            // text={"This brand supports Israel"}
                            text={"Attention! Please refer to the badeel"}
                            supports={true}
                          />
                        </>
                      ) : !!scannedProduct ? (
                        <>
                          <SupportText
                            style={{ marginTop: 14 }}
                            text={
                              // "There is no info that this brand supports Israel"
                              "You can proceed buying this product"
                            }
                            supports={false}
                          />
                        </>
                      ) : (
                        <></>
                      )}
                      <ScannedProduct product={scannedProduct} />
                      {!!products?.length && (
                        <Text style={{ marginTop: 20 }}>
                          {support ? "Alternatives" : "Similar Products"}:
                        </Text>
                      )}
                    </View>
                  </>
                );
              }}
              renderItem={(item) => {
                return <Product product={item?.item?.product} />;
              }}
            />
          </>
        ) : (
          <>
            <ScanBarcode
              scanBarcodeFn={async (result: any) => {
                // result = "3245060501006";
                try {
                  setScan(false);
                  setLoading(true);
                  let product: any = await getProduct(result);
                  if (product?.data?.product) {
                    setScannedProduct(product?.data?.product);
                    getBrand(product?.data?.product?.brand).then((res) => {
                      setSupports(!!res.data?.brand?.supports);
                    });
                  } else {
                    product = await axios.get(
                      `https://scanbot.io/wp-json/upc/v1/lookup/${result}`
                    );
                    setScannedProduct(product?.data?.product);
                    getBrand(product?.data?.product?.brand).then((res) => {
                      setSupports(!!res.data?.brand?.supports);
                    });
                  }
                  setLoading(false);
                  if (!product?.data?.product) {
                    setId(0);
                    setProducts([]);
                    // setScanFailed(true);
                    Alert.alert(
                      "could not find the scanned product!!",
                      "alternatively you can look for product by brand."
                    );
                  } else {
                    setScanFailed(false);
                    getAlternativeId(
                      // product?.data?.product.name
                      {
                        name: product?.data?.product?.name,
                        brand: scannedProduct?.brand,
                      }
                    ).then((res) => {
                      if (res.data?.success) {
                        // setId(res.data.alternativeId);
                        fetchAlt(`page=1&id=${res.data.alternativeId}`).then(
                          (res) => {
                            // console.log(
                            //   "asdasdsadasdasdsadasdas",
                            //   res.data.brandSearch
                            // );
                            let ids: string[] = [];
                            for (
                              let i = 0;
                              i < res.data.brandSearch.length;
                              i++
                            ) {
                              ids.push(res.data.brandSearch[i].id);
                            }
                            // setId(ids);
                            setId(ids);
                          }
                        );
                      }
                    });
                  }
                } catch (err) {}
              }}
            />
          </>
        )}
      </View>
    </>
  );
};
