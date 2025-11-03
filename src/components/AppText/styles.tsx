import { StyleSheet } from "react-native"
import { COLORS, FONTS } from "../../utils/theme"
import { calcFont, calcHeight, calcWidth } from "../../utils/sizes"

export const styles = StyleSheet.create({
  button: {
    alignSelf: "stretch",
    height: calcHeight(50),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primaryGradient,
    flexDirection: "row",
    borderRadius: calcWidth(7),
  },
  title: {
    fontSize: calcFont(16),
    color: COLORS.textDark,
    fontStyle: "normal",
    fontFamily: FONTS.medium,
  },
  required: {
    fontSize: calcFont(18),
    fontFamily: FONTS.extra_bold,
    color: "red",
    lineHeight: calcHeight(18),
    marginHorizontal: calcWidth(4),
    textAlign: "left",
  },
})
