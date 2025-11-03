import { StyleSheet } from "react-native"
import { COLORS } from "../../../utils/theme"
import { calcHeight, calcWidth } from "../../../utils/sizes"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: COLORS.white,
  },
  listContainer: {
    width: calcWidth(343),
    height: calcHeight(540),
  },
  buttonContainer: {
    marginTop: calcHeight(36),
  },
  modalView: {
    height: calcHeight(480),
    backgroundColor: COLORS.white,
    borderTopLeftRadius: calcWidth(16),
    borderTopRightRadius: calcWidth(16),
    alignItems: "center",
    paddingTop: calcHeight(24),
  },
  lineItemContainer: {
    width: calcWidth(343),
    paddingVertical: calcHeight(12),
    marginTop: calcHeight(12),
    borderRadius: calcHeight(8),
    backgroundColor: COLORS.primaryGray,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: calcWidth(12),
  },
  processItemContainer: {
    width: calcWidth(343),
    paddingHorizontal: calcWidth(16),
    paddingVertical: calcHeight(24),
    borderWidth: 2,
    borderRadius: calcHeight(12),
    marginTop: calcHeight(16),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  processItemView: {
    width: calcWidth(245),
  },
  processItemIcon: {
    width: calcWidth(36),
    height: calcHeight(36),
    resizeMode: "stretch",
  },
})
export default styles
