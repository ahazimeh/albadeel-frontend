import React, { useState, useEffect, useContext, useRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Pressable,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  FlatList,
  useWindowDimensions,
} from "react-native";

import { RegisterStyle } from "./styles";
// import { HomeStyle } from "../..//Home/HomeStyle";

// import Header from "../../components/Header/Header";

// import DateTimePicker from '@react-native-community/datetimepicker';
// import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faUser,
  faCalendarAlt,
  faEarthAsia,
  faLock,
  faEyeSlash,
  faEye,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
// import {API_LINK} from '@env';
// import { AuthContext } from "../../Context/AuthContext";
import { HomeStyle } from "../Home/style";
import Header from "../../components/Header";
import axios from "axios";
import { Logs } from "expo";
import { useRegisterMutation } from "../../store/configureStore";
import { useSelector } from "react-redux";
import { selectUserStatus } from "../../store/api/selectors";
import { Colors } from "../../constants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Shadow } from "react-native-shadow-2";
import { CommonActions } from "@react-navigation/native";
import Text from "../../components/Text";
// import CountryPicker, { CountryCode } from "react-native-country-picker-modal";

Logs.enableExpoCliLogging();

const Register = ({ navigation }, props) => {
  const isFocused = useIsFocused();
  //   const {register, responseMessage, responseStatus, teamsArray, setResponseMessage} = useContext(AuthContext)
  // console.log("asdsad");
  // useEffect(() => {
  //   fetch("https://scanbot.io/wp-json/upc/v1/lookup/065400001651")
  //     .then((response) => response.json())
  //     .then((data) => console.log("aa", data));
  // }, []);

  const [hidePass, setHidePass] = useState(true);
  const [hideRepeatPass, setHideRepeatPass] = useState(true);
  const [FavoriteDisplay, setFavoriteDisplay] = useState(false);
  const [CheckInputs, setCheckInputs] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [filterItem, setFilterItem] = useState([]);

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState(null);
  const [Email, setEmail] = useState(null);
  const [password, setPass] = useState(null);
  const [repeatPass, setRepeatPass] = useState(null);
  const [favoriteTeam, setFavoriteTeam] = useState(null);
  const [register] = useRegisterMutation();

  const handleSubmit = () => {
    if (
      firstName !== null &&
      lastName !== null &&
      Email !== null &&
      password !== null &&
      repeatPass !== null &&
      password === repeatPass
    ) {
      checkExistingEmail(Email);
      // if(responseMessage === "well done"){
      //   setFavoriteDisplay(true);
      //   setResponseMessage(null);
      // }
      // else{
      //   setFavoriteDisplay(false);
      // }
    } else {
      setCheckInputs(true);
      setFavoriteDisplay(false);
    }
  };

  const checkExistingEmail = async (email) => {
    try {
      register({
        email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        city: city,
        country: country,
      })
        .then((res) => {
          console.log("dddd", res);
          if (res.data?.success) navigation.navigate("Products");
        })
        .catch((err) => console.log(err));

      // await axios
      //   .post(`${"https://94aa-94-187-0-33.ngrok-free.app"}/register`, {
      //     email,
      //     firstName: firstName,
      //     lastName: lastName,
      //     password: password,
      //     city: city,
      //     country: country,
      //   })
      //   .then((res) => {
      //     console.log("asdjasdsajdkl");
      //     //   setResponseMessage(res.data.message);
      //   });
    } catch (e) {}
  };
  const userSelector = useSelector(selectUserStatus);

  useEffect(() => {
    if (!userSelector) {
      return;
    }
    // @ts-ignore
    navigation.navigate("Products");
  }, [userSelector]);
  const { width } = useWindowDimensions();

  const [visible, setVisible] = useState(false);
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
                    Register
                  </Text>
                </View>
              </View>
            </View>
          </Shadow>
        );
      },
    });
  }, []);
  // const [countryCode, setCountryCode] = useState<CountryCode>("LB");
  // useEffect(()=>{
  //   if(searchValue === '')
  //     setFilterItem(teamsArray)
  //   else{
  //     setFilterItem(teamsArray.filter(each=>each.name.toLowerCase().includes(searchValue.toLowerCase())))

  //   }

  // },[searchValue])

  //   useEffect(()=>{
  //     setFavoriteDisplay(false)
  //     setCheckInputs(false)
  //     setFilterItem(teamsArray)
  //   },[props, isFocused])

  //   useEffect(()=>{
  //     if(responseStatus !== null && responseStatus === 200){
  //       navigation.navigate('Home');
  //     }
  //     else if(responseStatus !== null && responseStatus === 400){
  //       setEmail(null),
  //       setPass(null);
  //       setCheckInputs(true)
  //       setFavoriteDisplay(false)
  //     }
  //   },[responseMessage])
  const onSelect = (country: Country) => {
    // setCountryCode(country.cca2);
    setCountry(country.cca2);
  };
  return (
    <>
      {filterItem === 0 ? (
        <View style={HomeStyle.ImgDiv}>
          <Image
            style={HomeStyle.ImgLogo}
            source={require("../../../assets/logo1.png")}
          />
        </View>
      ) : (
        <>
          {FavoriteDisplay ? <Header title={"Favorite Team"} /> : ""}
          {!FavoriteDisplay ? (
            <KeyboardAwareScrollView>
              <ScrollView style={RegisterStyle.container}>
                <View style={RegisterStyle.firstDiv}>
                  <Image
                    source={require("../../../assets/al-badeel-logo-purple.jpg")}
                    resizeMode="cover"
                    style={{ width: "100%", height: 200 }}
                    // style={RegisterStyle.image}
                  />
                  {/* <Pressable
                      onPress={() => navigation.navigate("Login")}
                      style={RegisterStyle.backIcon}
                    >
                      <Image
                        source={require("../../../assets/wave-arrow-left.png")}
                      />
                    </Pressable> */}
                  {/* </ImageBackground> */}
                </View>
                <View>
                  <View style={RegisterStyle.inputDiv}>
                    <Text style={RegisterStyle.title}>Create New Account</Text>
                    {/* About You */}
                    <Text style={RegisterStyle.subTitle}>About You</Text>
                    <View
                      style={[
                        RegisterStyle.inputInnerDiv,
                        CheckInputs && firstName === null
                          ? RegisterStyle.Redinput
                          : "",
                      ]}
                    >
                      <FontAwesomeIcon
                        icon={faUser}
                        style={RegisterStyle.icon}
                      />
                      <TextInput
                        style={RegisterStyle.input}
                        placeholder="First Name"
                        onChangeText={(text) => setFirstName(text)}
                        value={firstName}
                      />
                    </View>
                    <View
                      style={[
                        RegisterStyle.inputInnerDiv,
                        CheckInputs && lastName === null
                          ? RegisterStyle.Redinput
                          : "",
                      ]}
                    >
                      <FontAwesomeIcon
                        icon={faUser}
                        style={RegisterStyle.icon}
                      />
                      <TextInput
                        style={RegisterStyle.input}
                        placeholder="Last Name"
                        onChangeText={(text) => setLastName(text)}
                        value={lastName}
                      />
                    </View>

                    {/* Your location */}
                    <Text style={RegisterStyle.subTitle}>Your Location</Text>
                    <Pressable
                      style={RegisterStyle.inputInnerDiv}
                      onPress={() => {
                        setVisible(true);
                      }}
                    >
                      {/* <FontAwesomeIcon
                        icon={faEarthAsia}
                        style={RegisterStyle.icon}
                      /> */}
                      <TextInput
                        style={RegisterStyle.input}
                        placeholder="Country (optinal)"
                        onChangeText={(text) => setCountry(text)}
                        value={country}
                      />
                      {/* <CountryPicker
                        {...{
                          countryCode: country,
                          onSelect,
                          containerButtonStyle: {
                            width: width - 80,
                            padding: 0,
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                          },
                        }}
                        visible={false}
                        onClose={() => {
                          setVisible(false);
                        }}
                      /> */}
                    </Pressable>
                    <View style={RegisterStyle.inputInnerDiv}>
                      <Image source={require("../../../assets/city.png")} />
                      <TextInput
                        style={RegisterStyle.input}
                        // placeholder="City (optional)"
                        onChangeText={(text) => setCity(text)}
                        value={city}
                      />
                    </View>
                    {/* Sign up */}
                    <Text style={RegisterStyle.subTitle}>Sign Up</Text>
                    <View
                      style={[
                        RegisterStyle.inputInnerDiv,
                        CheckInputs && Email === null
                          ? RegisterStyle.Redinput
                          : "",
                      ]}
                    >
                      <FontAwesomeIcon
                        icon={faUser}
                        style={RegisterStyle.icon}
                      />
                      <TextInput
                        style={RegisterStyle.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        require
                        onChangeText={(text) => setEmail(text)}
                        value={Email}
                      />
                    </View>
                    <View
                      style={[
                        RegisterStyle.inputInnerDiv,
                        CheckInputs &&
                        (password === null ||
                          (password !== null && repeatPass !== password))
                          ? RegisterStyle.Redinput
                          : "",
                      ]}
                    >
                      <FontAwesomeIcon
                        icon={faLock}
                        style={RegisterStyle.icon}
                      />
                      <TextInput
                        style={[
                          RegisterStyle.input,
                          RegisterStyle.inputPassword,
                        ]}
                        secureTextEntry={hidePass}
                        placeholder="Password"
                        require
                        onChangeText={(text) => setPass(text)}
                        value={password}
                      />
                      <Pressable
                        onPress={() => setHidePass(!hidePass)}
                        style={RegisterStyle.divIcon}
                      >
                        <FontAwesomeIcon
                          icon={hidePass ? faEyeSlash : faEye}
                          style={RegisterStyle.icon}
                        />
                      </Pressable>
                    </View>
                    <View
                      style={[
                        RegisterStyle.inputInnerDiv,
                        CheckInputs &&
                        (repeatPass === null || repeatPass !== password)
                          ? RegisterStyle.Redinput
                          : "",
                      ]}
                    >
                      <FontAwesomeIcon
                        icon={faLock}
                        style={RegisterStyle.icon}
                      />
                      <TextInput
                        style={[
                          RegisterStyle.input,
                          RegisterStyle.inputPassword,
                        ]}
                        secureTextEntry={hideRepeatPass}
                        placeholder="Repeat Password"
                        require
                        onChangeText={(text) => setRepeatPass(text)}
                      />
                      <Pressable
                        onPress={() => setHideRepeatPass(!hideRepeatPass)}
                        style={RegisterStyle.divIcon}
                      >
                        <FontAwesomeIcon
                          icon={hideRepeatPass ? faEyeSlash : faEye}
                          style={RegisterStyle.icon}
                        />
                      </Pressable>
                    </View>
                    {/* {responseMessage !== null &&  responseMessage !== 'well done'?
                    <View style={RegisterStyle.responseMessageStyle}>
                      <Text style={RegisterStyle.responseMessageStyleText}>{responseMessage}</Text>
                    </View>
                    : null} */}
                    <View style={[RegisterStyle.buttonDiv]}>
                      <TouchableOpacity
                        onPress={handleSubmit}
                        style={[
                          RegisterStyle.button,
                          { backgroundColor: Colors.purple, borderRadius: 12 },
                        ]}
                      >
                        <Text style={RegisterStyle.buttonText}>
                          Create Account
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      style={RegisterStyle.LoginTextView}
                      //onPress={() => navigation.navigate('Login')}
                    >
                      <Text style={RegisterStyle.grayText}>
                        You already have an account{" "}
                      </Text>
                      <TouchableOpacity
                        onPress={() => navigation.navigate("Login")}
                      >
                        <Text
                          style={[
                            RegisterStyle.orangeText,
                            { color: Colors.purple },
                          ]}
                        >
                          Login
                        </Text>
                      </TouchableOpacity>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </KeyboardAwareScrollView>
          ) : (
            <>
              <View style={RegisterStyle.grayDiv}>
                <Text style={RegisterStyle.subtitle2}>
                  Customise your in-app experience by selecting your favorite
                  team
                </Text>
                <View style={RegisterStyle.inputDiv}>
                  <View style={RegisterStyle.inputInnerDiv}>
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      style={RegisterStyle.icon}
                    />
                    <TextInput
                      style={RegisterStyle.input}
                      placeholder="Search"
                      value={searchValue}
                      onChangeText={(text) => setSearchValue(text)}
                    />
                  </View>
                </View>
                <ScrollView style={RegisterStyle.flatContainer}>
                  <View style={RegisterStyle.flatContainerDiv}>
                    {filterItem.map((item) => (
                      <TouchableOpacity
                        style={[
                          RegisterStyle.row,
                          favoriteTeam === item.id
                            ? RegisterStyle.favoriteTeamView
                            : "",
                        ]}
                        key={item.id}
                        onPress={() => setFavoriteTeam(item.id)}
                      >
                        <Image
                          source={{ uri: `${"API_LINK"}/${item.image}` }}
                          style={RegisterStyle.teamImage}
                        />
                        <Text
                          style={
                            favoriteTeam === item.id
                              ? RegisterStyle.favoriteTeamText
                              : ""
                          }
                        >
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>

                <View style={RegisterStyle.whiteDiv2}>
                  <TouchableOpacity
                    style={RegisterStyle.button}
                    onPress={
                      () => {}
                      //   register(
                      //     FirstName.trim(),
                      //     LastName.trim(),
                      //     null,
                      //     City,
                      //     Country,
                      //     Email.toLowerCase().trim(),
                      //     Password,
                      //     FavoriteTeam
                      //   )
                    }
                  >
                    <Text style={RegisterStyle.buttonText}>Select Team</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Register;
