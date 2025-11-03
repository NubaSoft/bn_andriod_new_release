import { StyleSheet } from "react-native"
import { calcHeight, calcWidth } from "../../utils/sizes"
import { COLORS } from "../../utils/theme"
const styles = StyleSheet.create({
  container: {
    // height: calcHeight(420),
    width: calcWidth(375),
    paddingTop: calcHeight(6),
    backgroundColor: COLORS.white,
    borderTopLeftRadius: calcWidth(16),
    borderTopRightRadius: calcWidth(16),
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: calcWidth(20),
    paddingBottom: calcHeight(32),
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },
  image: {
    width: calcWidth(362),
    minHeight: calcHeight(320),
    resizeMode: "stretch",
    borderRadius: calcWidth(20),
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
  detailsView: {
    width: calcWidth(64),
    height: calcHeight(64),
    borderWidth: 1.6,
    borderRadius: calcWidth(8),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: calcHeight(4),
  },
  detailsIcon: {
    width: calcWidth(36),
    height: calcHeight(36),
    resizeMode: "stretch",
    marginBottom: calcHeight(4),
  },
})
export default styles
