import { I18nManager, StyleSheet } from "react-native"
import { calcHeight, calcWidth } from "../../utils/sizes"
import { COLORS } from "../../utils/theme"

export const styles = StyleSheet.create({
  container: {
    width: calcWidth(154),
    marginStart: calcHeight(24),
    marginBottom: calcHeight(20),
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: calcWidth(16),
  },
  image: {
    width: calcWidth(152),
    height: calcHeight(120),
    resizeMode: "cover",
    borderTopLeftRadius: calcWidth(16),
    borderTopRightRadius: calcWidth(16),
  },
  dataContainer: {
    width: calcWidth(144),
    alignSelf: "center",
  },
  nameView: {
    marginTop: calcHeight(4),
    height: calcHeight(30),
  },
  nameContainer: {
    width: calcWidth(144),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: calcHeight(8),
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
    borderTopColor: COLORS.textLight,
    borderTopWidth: 0.4,
    width: calcWidth(144),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: calcHeight(4),
  },
  detailsItemContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    height: calcHeight(26),
    marginBottom: calcHeight(4),
  },
})
