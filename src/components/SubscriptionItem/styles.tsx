import { StyleSheet } from "react-native"
import { calcHeight, calcWidth } from "../../utils/sizes"
import { COLORS } from "../../utils/theme"

export const styles = StyleSheet.create({
  container: {
    width: calcWidth(343),
    marginTop: calcWidth(16),
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: calcWidth(12),
    backgroundColor: COLORS.primaryGray,
    paddingVertical: calcHeight(12),
    alignItems: "center",
  },
  listContainer: {
    width: calcWidth(311),
    marginTop: calcHeight(3),
    marginBottom: calcHeight(8),
  },
  headerContainer: {
    width: calcWidth(311),
    flexDirection: "row",
    justifyContent: "center",
  },
  headerView: {
    width: calcWidth(80),
    borderWidth: 0.6,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.primary,
    height: calcHeight(32),
    alignItems: "center",
    justifyContent: "center",
  },
  headerView2: {
    width: calcWidth(140),
    borderWidth: 0.6,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.primary,
    height: calcHeight(32),
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    width: calcWidth(311),
    flexDirection: "row",
    justifyContent: "center",
  },
  itemView: {
    width: calcWidth(80),
    borderWidth: 0.6,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.white,
    height: calcHeight(36),
    alignItems: "center",
    justifyContent: "center",
  },
  itemView2: {
    width: calcWidth(140),
    borderWidth: 0.6,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.white,
    height: calcHeight(36),
    alignItems: "center",
    justifyContent: "center",
  },
})
