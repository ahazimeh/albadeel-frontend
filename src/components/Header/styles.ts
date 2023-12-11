import { StyleSheet } from "react-native";
import { Colors } from "../../constants";
// import {BACKGROUND_COLOR, ORANGE_COLOR, RED_COLOR} from '@env';

export const HeaderStyle = StyleSheet.create({
  whiteDiv: {
    backgroundColor: Colors.white,
    height: 100,
    width: "100%",
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
    zIndex: 100,
    //   shadowOpacity: '15%',
    shadowColor: "#000000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    width: 150,
    textAlign: "center",
    textTransform: "capitalize",
  },
  logoImg: {
    width: 80,
    height: 80,
    position: "absolute",
    right: "115%",
    top: "-37%",
  },
});
