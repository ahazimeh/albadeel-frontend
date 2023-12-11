import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "../scenes/Main";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../scenes/Login";
import Register from "../scenes/Register";
import { Products } from "../scenes/Products";
import { Brands } from "../scenes/Brands";

const Stack = createStackNavigator();

interface Props {}
export const MainNavigator: React.FC<Props> = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="Brands" component={Brands} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Home" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
