import { I18nManager, StyleSheet } from "react-native"
import { calcHeight, calcWidth } from "../../utils/sizes"
import { COLORS } from "../../utils/theme"

export const styles = StyleSheet.create({
  container: {
    width: calcWidth(343),
    paddingVertical: calcHeight(16),
    borderRadius: calcWidth(12),
    marginTop: calcHeight(16),
    alignItems: "center",
    backgroundColor: COLORS.primaryGray,
  },
  dateContainer: {
    width: calcWidth(311),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: calcHeight(4),
  },
})
