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
    marginTop: calcHeight(64),
    paddingVertical: calcHeight(16),
  },
  genderContainer: {
    width: calcWidth(277),
  },
  genderView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  genderItemContainer: {
    width: calcWidth(120),
    borderRadius: calcWidth(16),
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: calcHeight(12),
  },
  genderItemImage: {
    width: calcWidth(36),
    height: calcHeight(36),
    resizeMode: "stretch",
    marginBottom: calcHeight(8),
  },

  buttonContainer: {
    marginTop: calcHeight(24),
  },
})
export default styles
