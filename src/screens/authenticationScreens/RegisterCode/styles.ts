import { I18nManager, Platform, StyleSheet } from "react-native"
import { calcFont, calcHeight, calcWidth } from "../../../utils/sizes"
import { COLORS, FONTS } from "../../../utils/theme"

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
    marginTop: calcHeight(160),
    paddingVertical: calcHeight(16),
  },
  otpContainer: {
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    justifyContent: "space-between",
    width: calcWidth(311),
  },
  otpInput: {
    width: calcWidth(44),
    height: calcWidth(50),
    borderRadius: calcWidth(12),
    borderWidth: 1.4,
    textAlign: "center",
    color: COLORS.primary,
    fontFamily: FONTS.medium,
    fontSize: calcFont(32),
    marginTop: calcHeight(24),
    paddingTop: calcHeight(8),
  },
  bodyAccount: {
    width: calcWidth(277),
    marginTop: calcHeight(12),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bodyAccountAction: {
    marginTop: calcHeight(2),
    marginHorizontal: calcWidth(4),
  },
  buttonContainer: {
    marginTop: calcHeight(64),
  },
})
export default styles
