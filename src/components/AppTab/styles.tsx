import { StyleSheet } from "react-native"
import { calcHeight, calcWidth } from "../../utils/sizes"
import { COLORS } from "../../utils/theme"

export const styles = StyleSheet.create({
  containerSelect: {
    height: calcHeight(36),
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: calcWidth(8),
    borderRadius: calcHeight(8),
    borderWidth: 1.4,
    borderColor: COLORS.primary,
  },
  containerUnSelect: {
    height: calcHeight(36),
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: calcWidth(8),
    borderRadius: calcHeight(8),
    borderWidth: 1.4,
    borderColor: COLORS.primary,
  },
})
