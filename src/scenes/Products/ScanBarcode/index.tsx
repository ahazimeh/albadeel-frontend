import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useEffect, useState } from "react";
import { Button, View, useWindowDimensions } from "react-native";
import Text from "../../../components/Text";

interface Props {
  scanBarcodeFn: any;
}

export const ScanBarcode: React.FC<Props> = ({ scanBarcodeFn }) => {
  const [hasPermission, setHasPermission] = useState<any>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);
  const { height } = useWindowDimensions();

  const handleBarCodeScanned = ({ type, data }) => {
    // setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    scanBarcodeFn(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{}}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        // style={StyleSheet.absoluteFillObject}

        style={{
          // width: "100%",
          height: "100%",
          transform: [
            {
              // scale: 1.25,
              scale: 1,
            },
          ],
        }}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
};
