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
    marginTop: calcHeight(100),
    paddingVertical: calcHeight(16),
  },
  buttonContainer: {
    marginTop: calcHeight(44),
  },
  bodyAccount: {
    width: calcWidth(277),
    marginTop: calcHeight(4),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bodyAccountAction: {
    marginTop: calcHeight(2),
    marginHorizontal: calcWidth(4),
  },
  calenderContainer: {
    width: calcWidth(343),
    height: calcHeight(320),
    backgroundColor: COLORS.white,
    borderRadius: calcWidth(16),
    alignItems: "center",
    alignSelf: "center",
    paddingTop: calcHeight(16),
  },
})
export default styles
