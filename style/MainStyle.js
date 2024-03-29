import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    width: "100%",
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  maskedInput: {
    flexGrow: 1,
    height: 40,
    fontSize: 18,
    borderBottomColor: "#999",
    borderBottomWidth: 1,
    borderStyle: "solid",
    alignSelf: "flex-start",
  },
  containerMask: {
    flexDirection: "row",
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  errorMessage: {
    alignSelf: "flex-start",
    marginLeft: 15,
    color: "#f00",
    fontSize: 12,
  },
  cardInfo: {
    width: 350,
    height: 120,
    marginBottom: 5,
    marginTop: 10,
    marginLeft: 10,
  },
});

export default styles;
