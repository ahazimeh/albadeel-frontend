import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/store";
import Main from "./src/scenes/Main";
import { MainNavigator } from "./src/MainNavigator";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";

export default function App() {
  let persist = persistStore(store);
  const [fontsLoaded] = useFonts({
    Avenir_Black: require("./assets/fonts/Avenir/Avenir_Black/Avenir_Black.ttf"),
    Avenir_Book: require("./assets/fonts/Avenir/Avenir_Book/Avenir_Book.ttf"),
    Avenir_Heavy: require("./assets/fonts/Avenir/Avenir_Heavy/Avenir_Heavy.ttf"),
    Avenir_Light: require("./assets/fonts/Avenir/Avenir_Light/Avenir_Light.ttf"),
    Avenir_Regular: require("./assets/fonts/Avenir/Avenir_Regular/Avenir_Regular.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      {/* <View style={styles.container} onLayout={onLayoutRootView}> */}
      {/* <Text style={{ fontFamily: "Avenir Book", fontSize: 30 }}>
        Inter Black
      </Text> */}
      {/* </View> */}
      <Provider store={store}>
        {/* <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </View> */}
        {/* <Main /> */}
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <PersistGate persistor={persist} loading={null}>
            <StatusBar style="light" translucent={false} />
            <MainNavigator />
          </PersistGate>
        </View>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
