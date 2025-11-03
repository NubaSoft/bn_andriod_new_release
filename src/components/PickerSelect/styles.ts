import { I18nManager, StyleSheet } from "react-native"
import { calcFont, calcHeight, calcWidth } from "../../utils/sizes"
import { COLORS, FONTS } from "../../utils/theme"
const styles = StyleSheet.create({
  container: {
    width: calcWidth(343),
    height: calcHeight(45),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: calcWidth(8),
    borderWidth: 1.4,
    borderColor: COLORS.borderLight,
    paddingHorizontal: calcWidth(16),
  },
  icon: {
    width: calcWidth(16),
    height: calcWidth(16),
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
  },
})
export default styles
