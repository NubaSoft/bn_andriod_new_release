import { I18nManager, StyleSheet } from "react-native"
import { calcHeight, calcWidth } from "../../utils/sizes"
import { COLORS } from "../../utils/theme"

export const styles = StyleSheet.create({
  container: {
    width: calcWidth(375),
    height: calcHeight(108),
    backgroundColor: COLORS.white,
    justifyContent: "flex-end",
    paddingBottom: calcHeight(8),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
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
    width: calcWidth(20),
    height: calcWidth(20),
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
  },
  logo: {
    width: calcWidth(24),
    height: calcWidth(24),
  },
  image: {
    width: calcWidth(36),
    height: calcHeight(36),

    resizeMode: "stretch",
  },
})
