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
  profileContainer: {
    width: calcWidth(343),
    height: calcHeight(54),
    borderRadius: calcHeight(12),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: calcHeight(16),
    backgroundColor: COLORS.diamondLight,
  },
  profileImage: {
    width: calcWidth(120),
    height: calcHeight(120),
    resizeMode: "stretch",
    marginBottom: calcHeight(16),
  },
  menuContainer: {
    width: calcWidth(375),
    paddingHorizontal: calcWidth(24),
    marginTop: calcHeight(16),
  },
  mediaContainer: {
    width: calcWidth(343),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: calcHeight(12),
    marginBottom: calcHeight(24),
  },
  mediaImage: {
    width: calcWidth(28),
    height: calcHeight(28),
    resizeMode: "stretch",
    marginHorizontal: calcWidth(10),
  },
})
export default styles
