import { I18nManager, StyleSheet } from "react-native"
import { calcHeight, calcWidth } from "../../utils/sizes"
import { COLORS } from "../../utils/theme"

export const styles = StyleSheet.create({
  container: {
    width: calcWidth(343),
    height: calcHeight(36),
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: calcHeight(10),
    // backgroundColor: COLORS.whiteGray,
    paddingHorizontal: calcWidth(16),
    // borderRadius: calcHeight(12),
  },
  dataContainer: {
    height: calcHeight(40),
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: calcWidth(24),
    height: calcHeight(24),
    resizeMode: "stretch",
    marginEnd: calcWidth(12),
  },
  view: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: calcWidth(375),
    height: calcHeight(36),
    paddingHorizontal: calcWidth(24),
  },
  imageView: {
    width: calcWidth(48),
    height: calcWidth(28),
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    width: calcWidth(16),
    height: calcWidth(16),
    transform: [{ scaleX: I18nManager.isRTL ? 1 : -1 }],
  },
  logo: {
    width: calcWidth(24),
    height: calcWidth(24),
  },
})
