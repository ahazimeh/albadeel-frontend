import React, { useEffect, useState } from "react";
import { Button, Pressable, StyleSheet, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Text from "../components/Text";

export default function Main() {
  //   return (
  //     <>
  //       <Text>asd</Text>
  //     </>
  //   );
  const [hasPermission, setHasPermission] = useState<any>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{}}>
      {/* <View>
        <Pressable
          aria-label="Increment value"
          onPress={() => dispatch(increment())}
        >
          <Text>Increment</Text>
        </Pressable>
        <Text>{count}</Text>
        <Pressable
          aria-label="Decrement value"
          onPress={() => dispatch(decrement())}
        >
          <Text>Decrement</Text>
        </Pressable>
      </View> */}
      <View style={{}}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          // style={StyleSheet.absoluteFillObject}

          style={{
            height: 640,
            flexDirection: "row",
          }}
        />
        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        )}
      </View>
    </View>
  );
}
