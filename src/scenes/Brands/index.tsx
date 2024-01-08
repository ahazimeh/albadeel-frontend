import React, { useEffect, useRef, useState } from "react";
import {
  BackHandler,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {
  useGetBrandInfoQuery,
  useGetBrandsQuery,
  useLazyGetAlternativeBrandQuery,
  useLazyGetAlternativeQuery,
} from "../../store/configureStore";
import { useDebounce } from "../../../hooks/useDebounce";
import { Product } from "../Products/Product";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { Colors } from "../../constants";
import { Shadow } from "react-native-shadow-2";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Autocomplete from "react-native-autocomplete-input";
import { Button } from "../../components/Button";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Text from "../../components/Text";
import { SupportText } from "../../components/SupportText";

interface Props {}

export const Brands: React.FC<Props> = () => {
  // const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [brand, setBrand] = useState("");
  const debounceBrand = useDebounce(brand, 300);
  const { data } = useGetBrandsQuery(debounceBrand, { skip: !debounceBrand });
  const { data: brandInfo } = useGetBrandInfoQuery(value, { skip: !value });
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);
  useEffect(() => {
    let itemsD: any = [];
    for (let i = 0; i < data?.brands?.length; i++) {
      itemsD.push({ label: data.brands[i].name, value: data.brands[i].name });
    }
    setItems(itemsD);
  }, [data]);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setBrand(value || "");
  //   }, 500);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [value]);
  const [id, setId] = useState(0);

  const page = useRef<number>(1);
  const [products, setProducts] = useState([]);
  const [fetchAlt, { error }] = useLazyGetAlternativeBrandQuery();
  const navigation = useNavigation();
  const goBackHandler = () => {
    navigation.dispatch((state) => ({
      ...CommonActions.goBack(),
      target: state.key,
    }));
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", goBackHandler);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", goBackHandler);
    };
  }, []);
  useEffect(() => {
    navigation.setOptions({
      headerLeft: null,
      header: () => {
        //
        return (
          // <Shadow style={{ width: "100%" }}>
          <View
            style={{
              backgroundColor: Colors.purple,
              height: 80,
              justifyContent: "center",
            }}
          >
            <View
              style={{
                backgroundColor: Colors.purple,
                height: 80,
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {/* arrow-back */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 5,
                }}
              >
                <MaterialIcons
                  name="arrow-back"
                  size={20}
                  // color={"white"}
                  style={{ padding: 15 }}
                  onPress={() => {
                    navigation.dispatch((state) => ({
                      ...CommonActions.goBack(),
                      target: state.key,
                    }));
                  }}
                />
                <Text
                  style={{
                    // color: Colors.white,
                    fontSize: 20,
                    fontWeight: "700",
                  }}
                >
                  Branding
                </Text>
              </View>
            </View>
          </View>
          // </Shadow>
        );
      },
    });
  }, []);

  useEffect(() => {
    if (id === 0) {
      setProducts([]);
      return;
    }
    fetchAlt(`page=${1}&id=${id}`).then((res) => {
      setProducts(res.data?.productBrand);
    });
    page.current = 1;
  }, [id]);
  useEffect(() => {
    if (!brandInfo) {
      return;
    }
    fetchAlt(`page=${1}&id=${brandInfo?.brand?.id}`).then((res) => {
      setProducts(res.data?.productBrand);
    });
    page.current = 1;
  }, [brandInfo]);
  // const [query, setQuery] = useState("");
  const [showList, setShowList] = useState(false);
  return (
    <>
      {/* <DropDownPicker
        style={{
          borderWidth: 0,
          borderRadius: 0,
        }}
        containerStyle={{}}
        searchable
        listMode="SCROLLVIEW"
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onChangeSearchText={(text) => {
          setBrand(text);
        }}
      /> */}
      <View
        style={[
          styles.autocompleteContainer,
          { backgroundColor: Colors.white },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            marginTop: 8,
            marginLeft: 8,
          }}
        >
          <Autocomplete
            hideResults={!showList || !brand}
            onPressOut={() => {
              setShowList((oldState) => !oldState);
            }}
            data={items}
            value={brand}
            onChangeText={(text) => setBrand(text)}
            flatListProps={{
              keyExtractor: (_, idx) => idx,
              renderItem: ({ item }) => {
                return (
                  <>
                    <Pressable
                      style={{ padding: 4 }}
                      onPress={() => {
                        setShowList(false);
                        setBrand("");
                        setValue(item.value); // do this after I click a button
                      }}
                    >
                      <Text>{item.value}</Text>
                    </Pressable>
                  </>
                );
              },
            }}
          />
          <Button
            style={{ height: 42, padding: 0, width: 42, marginHorizontal: 8 }}
            onPress={() => {
              setValue(brand);
              setShowList(false);
              setBrand("");
            }}
          >
            <MaterialCommunityIcons
              name="barcode-scan"
              size={20}
              color={Colors.white}
            />
          </Button>
        </View>
      </View>
      <FlatList
        contentContainerStyle={{ marginTop: 48 }}
        onEndReached={() => {
          let currentPage = page.current;
          fetchAlt(`page=${currentPage + 1}&id=${brandInfo?.brand?.id}`).then(
            (res) => {
              if (!res.data?.productBrand?.length) {
                return;
              }
              setProducts((oldProducts) => {
                if (currentPage === page.current) {
                  page.current += 1;
                  return [...oldProducts, ...res.data?.productBrand];
                }
                return oldProducts;
              });
            }
          );
        }}
        data={brandInfo?.brand ? products : []}
        // style={{ marginTop: 50 }}
        keyExtractor={(item) => item.id}
        ListFooterComponent={() => {
          return <View style={{ marginTop: 48 + 20 }}></View>;
        }}
        ListHeaderComponent={() => {
          return (
            <>
              <View style={{ marginHorizontal: 8 }}>
                {brandInfo?.brand && (
                  <Text style={{ marginTop: 8 }}>
                    {brandInfo?.brand.supports ? (
                      <SupportText
                        // text={`"${brandInfo.brand.name}" supports Israel`}
                        text="Attention! Please refer to the badeel"
                        supports={true}
                      />
                    ) : (
                      <SupportText
                        // text={`"${brandInfo.brand.name}" does not supports Israel`}
                        text="You can proceed with this brand"
                        supports={false}
                      />
                    )}
                  </Text>
                )}

                {!brandInfo?.brand && brandInfo?.success && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 14,
                      flexWrap: "wrap",
                    }}
                  >
                    <SupportText
                      text="You can proceed buying this product"
                      supports={false}
                    />
                  </View>
                )}
                {!!id && brandInfo.brand && (
                  <Text
                    style={{ fontSize: 16, fontWeight: "700", marginTop: 10 }}
                  >
                    Here are some alternatives:
                  </Text>
                )}
              </View>
            </>
          );

          //   <Text style={{ color: "red" }}>
          //     This brand supports Israel
          //   </Text>
        }}
        renderItem={(item) => {
          return <Product product={item?.item?.product} />;
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1,
  },
});
