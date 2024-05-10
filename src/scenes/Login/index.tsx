// @ts-nocheck
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TextInput,
  Image,
  Pressable,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { LoginStyle } from "./style";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { AuthContext } from "../../Context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faEnvelope,
  faLock,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { useLoginMutation } from "../../store/configureStore";
import { useSelector } from "react-redux";
import { selectUserStatus } from "../../store/api/selectors";
import { Colors } from "../../constants";
import { Shadow } from "react-native-shadow-2";
// import Checkbox from 'expo-checkbox';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { CommonActions } from "@react-navigation/native";
import Text from "../../components/Text";

const Login = ({ navigation }) => {
  const [login] = useLoginMutation();

  const userSelector = useSelector(selectUserStatus);
  // const navigation = useNavigation();
  useEffect(() => {
    if (!userSelector) {
      return;
    }
    // @ts-ignore
    navigation.navigate("Products");
  }, [userSelector]);
  //   const {login, responseMessage, responseStatus, setResponseMessage, setResponseStatus} = useContext(AuthContext)

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
                justifyContent: "center",
                marginLeft: 20,
              }}
            >
              <View
                style={{
                  backgroundColor: Colors.white,
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
                  <Text
                    style={{
                      // color: Colors.white,
                      fontSize: 20,
                      fontWeight: "700",
                    }}
                  >
                    Login
                  </Text>
                </View>
              </View>
            </View>
          </Shadow>
        );
      },
    });
  }, []);

  const [hidePass, setHidePass] = useState(true);
  // const [isChecked, setChecked] = useState(false);
  const [CheckInputs, setCheckInputs] = useState(false);
  const [Email, setEmail] = useState(null);
  const [Password, setPass] = useState(null);
  const [loginError, setLoginError] = useState(false);

  const handleSubmit = () => {
    //   if(Email !== null && Password !== null ){
    //     login(Email.toLowerCase().trim(), Password)
    //   }
    //   else{
    //     setCheckInputs(true)
    //   }
    login({ email: Email, password: Password }).then((res) => {
      if (res.data?.success) {
        setLoginError(false);
        navigation.navigate("Products");
        return;
      }
      setLoginError(true);
    });
  };

  const signUpNavigate = () => {
    setEmail(null);
    setPass(null);
    //   setResponseMessage(null);
    //   setResponseStatus(null);
    navigation.navigate("Register");
  };

  // useEffect(()=>{
  //  if(responseStatus !== null && responseStatus === 400){
  //     setEmail(null),
  //     setPass(null),
  //     setCheckInputs(true)
  //   }
  // },[responseMessage])

  return (
    <>
      {/* <Loader/> */}

      <KeyboardAwareScrollView style={LoginStyle.container}>
        <ImageBackground
          source={require("../../../assets/al-badeel-logo-purple.jpg")}
          resizeMode="cover"
          style={LoginStyle.image}
        >
          {/* <Pressable onPress={()=> console.log("backkkk")} style={LoginStyle.backIcon}>
                <Image source={require('../../assets/wave-arrow-left.png')}/>
            </Pressable> */}
        </ImageBackground>
        <Text style={LoginStyle.title}>Login to Your Account</Text>
        <View style={LoginStyle.inputDiv}>
          <View
            style={[
              LoginStyle.inputInnerDiv,
              (CheckInputs && Email === null) || loginError
                ? LoginStyle.Redinput
                : "",
            ]}
          >
            <FontAwesomeIcon icon={faEnvelope} style={LoginStyle.icon} />
            <TextInput
              style={LoginStyle.input}
              keyboardType="email-address"
              placeholder="Email"
              require
              onChangeText={(text) => setEmail(text)}
              value={Email}
            />
          </View>
          <View
            style={[
              LoginStyle.inputInnerDiv,
              (CheckInputs && Password === null) || loginError
                ? LoginStyle.Redinput
                : "",
            ]}
          >
            <FontAwesomeIcon icon={faLock} style={LoginStyle.icon} />
            <TextInput
              style={[LoginStyle.input, LoginStyle.inputPassword]}
              secureTextEntry={hidePass}
              placeholder="Password"
              require
              onChangeText={(text) => setPass(text)}
              value={Password}
            />
            <Pressable
              onPress={() => setHidePass(!hidePass)}
              style={LoginStyle.divIcon}
            >
              <FontAwesomeIcon
                icon={hidePass ? faEyeSlash : faEye}
                style={LoginStyle.icon}
              />
            </Pressable>
          </View>
          {/* <View style={LoginStyle.checkboxDiv}>
                <Checkbox onValueChange={setChecked} style={LoginStyle.checkboxIcon} tintColors={{ true: 'red', false: 'yellow' }} value={isChecked}/>
                <Text style={LoginStyle.rememberMe}>Remember me</Text>
            </View> */}
          {/* {responseMessage !== null ?
                <View style={LoginStyle.responseMessageStyle}>
                  <Text style={LoginStyle.responseMessageStyleText}>{responseMessage}</Text>
                </View>
                : null} */}
          <View style={LoginStyle.buttonDiv}>
            <TouchableOpacity
              style={[
                LoginStyle.button,
                {
                  backgroundColor: Colors.purple,
                  borderRadius: 12,
                },
              ]}
              onPress={handleSubmit}
            >
              <Text style={LoginStyle.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          {/* <Text style={LoginStyle.forgetPass}>Forget the password?</Text> */}
          <View style={LoginStyle.lastText}>
            <Text style={LoginStyle.grayText}>Don't have an account? </Text>
            <TouchableOpacity onPress={signUpNavigate}>
              <Text
                style={[
                  LoginStyle.orangeText,
                  {
                    color: Colors.purple,
                  },
                ]}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

export default Login;
