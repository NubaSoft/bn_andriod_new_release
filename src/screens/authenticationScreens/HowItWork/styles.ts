import { Platform, StyleSheet } from "react-native"
import { calcHeight, calcWidth } from "../../../utils/sizes"
import { COLORS } from "../../../utils/theme"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: Platform.OS == "ios" ? calcHeight(0) : calcHeight(0),
    backgroundColor: COLORS.white,
  },
  bodyContainer: {
    width: calcWidth(343),
    alignItems: "center",
    marginTop: calcHeight(12),
    paddingVertical: calcHeight(16),
  },
  image: {
    width: calcWidth(311),
    height: calcHeight(580),
    resizeMode: "stretch",
  },
  buttonContainer: {
    marginTop: calcHeight(16),
  },
})
export default styles
