import { I18nManager, StyleSheet } from "react-native"
import { calcHeight, calcWidth } from "../../utils/sizes"
import { COLORS } from "../../utils/theme"

export const styles = StyleSheet.create({
  container: {
    width: calcWidth(160),
    height: calcHeight(150),
    marginStart: calcWidth(24),
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  containerImage: {
    width: calcWidth(160),
    height: calcHeight(150),
    borderRadius: calcWidth(24),
  },
  image: {
    width: calcWidth(65),
    height: calcHeight(64),
    resizeMode: "cover",
    borderRadius: calcWidth(8),
  },
  dataContainer: {
    width: calcWidth(94),
    height: calcHeight(64),
  },
  nameContainer: {
    width: calcWidth(94),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: calcHeight(4),
  },
  count: {
    paddingHorizontal: calcWidth(6),
    height: calcHeight(16),
    borderRadius: calcHeight(8),
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  detailsContainer: {
    width: calcWidth(94),
  },
  detailsItemContainer: {
    width: calcWidth(94),
    height: calcHeight(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: calcWidth(1),
    borderStartWidth: 2,
    marginBottom: calcHeight(4),
  },
})
