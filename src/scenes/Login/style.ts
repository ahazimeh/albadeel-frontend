import { StyleSheet } from "react-native";
import { Colors } from "../../constants";
// import {BACKGROUND_COLOR, ORANGE_COLOR, RED_COLOR} from '@env';

export const LoginStyle = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    maxHeight: "100%",
    backgroundColor: "#F2F2F2",
    marginBottom: 20,
    paddingBottom: 20,
  },
  image: {
    height: 330,
  },
  backIcon: {
    paddingTop: "15%",
    paddingLeft: "5%",
  },
  title: {
    textAlign: "center",
    fontSize: 27,
    fontWeight: "bold",
    marginBottom: 30,
  },
  inputDiv: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 20,
    marginTop: "10%",
  },
  inputInnerDiv: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    backgroundColor: "#E6E6E6",
    borderRadius: 12,
    height: 50,
    width: "85%",
    paddingLeft: 20,
  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    backgroundColor: "#E6E6E6",
    // width: "78%",
    marginLeft: 0,
    width: "90%",
  },
  inputPassword: {
    width: "78%",
  },
  divIcon: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    color: "#999",
  },
  checkboxDiv: {
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    flexDirection: "row",
    width: "85%",
  },
  checkboxIcon: {
    width: 20,
    height: 20,
    color: "red",
  },
  rememberMe: {
    fontSize: 12,
    fontWeight: "bold",
  },
  buttonDiv: {
    width: "85%",
  },
  button: {
    backgroundColor: "#FF7A00",
    borderRadius: 60,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: "bold",
  },
  forgetPass: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
  lastText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  grayText: {
    color: "#999",
  },
  orangeText: {
    color: "#FF7A00",
  },
  responseMessageStyle: {
    borderColor: "#FF7A00",
    borderWidth: 1,
    borderRadius: 12,
    width: "85%",
    paddingLeft: 20,
    height: 50,
    display: "flex",
    justifyContent: "center",
  },
  responseMessageStyleText: {
    color: "#FF7A00",
    textTransform: "capitalize",
  },
  Redinput: {
    borderColor: "#FF7A00",
    borderWidth: 1,
  },
});
