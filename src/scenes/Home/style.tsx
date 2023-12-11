import { StyleSheet } from "react-native";
import { Colors } from "../../constants";

export const HomeStyle = StyleSheet.create({
  container: {
    backgroundColor: "#F2F2F0",
    flex: 1,
    width: "100%",
  },
  homeBackground: {
    height: "auto",
  },
  titleDiv: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  title: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#555555",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  homeImg: {
    borderRadius: 15,
    marginBottom: 10,
  },
  whiteText: {
    color: Colors.white,
    alignSelf: "flex-start",
    fontSize: 18,
    fontWeight: "bold",
  },
  articleText: {
    fontSize: 12,
    alignSelf: "flex-start",
    color: Colors.white,
    marginVertical: 15,
  },
  articleGrayleText: {
    color: "#555555",
  },
  grayDiv: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    marginTop: 30,
  },
  grayDivTitle: {
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "flex-start",
    paddingLeft: 20,
    marginTop: 20,
  },
  flatContainer: {
    width: "100%",
    marginBottom: "-4%",
  },
  horizontalScroll: {
    width: "100%",
    paddingLeft: 20,
    paddingRight: 30,
  },
  verticalScroll: {
    width: "100%",
  },
  pending_game: {
    height: 250,
  },
  pending_game_div: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mid_div: {
    display: "flex",
    alignItems: "center",
    marginVertical: 15,
  },
  mid_butn: {
    display: "flex",
    justifyContent: "center",
    paddingRight: 50,
  },
  ImgDiv: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
});
