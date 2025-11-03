import { StyleSheet } from "react-native"
import { calcHeight, calcWidth } from "../../utils/sizes"
import { COLORS } from "../../utils/theme"
const styles = StyleSheet.create({
  container: {
    maxHeight: calcHeight(640),
    width: calcWidth(359),
    backgroundColor: COLORS.white,
    borderRadius: calcWidth(16),
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: calcWidth(16),
    paddingBottom: calcHeight(16),
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },
  closeContainer: {
    width: calcWidth(358),
    height: calcHeight(40),
    alignItems: "flex-end",
    justifyContent: "center",
    borderTopLeftRadius: calcWidth(16),
    borderTopRightRadius: calcWidth(16),
    paddingHorizontal: calcWidth(16),
    backgroundColor: COLORS.primaryLight,
    // position: "absolute",
  },
  closeIcon: {
    width: calcWidth(20),
    height: calcHeight(20),
    resizeMode: "stretch",
  },
  dataContainer: {
    width: calcWidth(327),
    marginTop: calcHeight(12),
  },
  nameView: {},
  detailsContainer: {
    width: calcWidth(327),
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: calcHeight(12),
  },
  detailsItemContainer: {},
})
export default styles
