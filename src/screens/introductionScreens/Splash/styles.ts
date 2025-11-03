import { StyleSheet } from "react-native"
import { calcHeight, calcWidth } from "../../../utils/sizes"
import { COLORS } from "../../../utils/theme"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray,
    alignItems: "center",
    justifyContent: "center",
    marginStart: calcWidth(0),
  },
  splashScreen: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  logo: {
    width: calcWidth(160),
    height: calcHeight(160),
    resizeMode: "stretch",
    marginTop: calcHeight(80),
    marginBottom: calcHeight(40),
    backgroundColor: "red",
  },
  button: {
    marginBottom: calcHeight(16),
  },
})
export default styles
