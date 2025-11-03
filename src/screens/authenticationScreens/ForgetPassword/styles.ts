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
    backgroundColor: COLORS.white,
    borderRadius: calcWidth(24),
    borderWidth: 1.6,
    borderColor: COLORS.borderLight,
    alignItems: "center",
    marginTop: calcHeight(200),
    paddingVertical: calcHeight(16),
  },
  buttonContainer: {
    marginTop: calcHeight(44),
  },
})
export default styles
