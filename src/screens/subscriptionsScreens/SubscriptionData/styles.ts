import { StyleSheet } from "react-native"
import { COLORS } from "../../../utils/theme"
import { calcHeight, calcWidth } from "../../../utils/sizes"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  dietTypeContainer: {
    width: calcWidth(343),
    marginTop: calcHeight(16),
  },
  dietTypeDaysContainer: {
    width: calcWidth(343),
    marginTop: calcHeight(12),
  },
  dietTypeDaysItemContainer: {
    width: calcWidth(80),
    height: calcHeight(32),
    borderWidth: 1.4,
    borderRadius: calcHeight(8),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: calcWidth(4),
    marginEnd: calcWidth(6),
    marginBottom: calcHeight(12),
  },
  dietTypeDaysItemIcon: {
    width: calcWidth(16),
    height: calcHeight(16),
    resizeMode: "stretch",
  },
  firstDaySubscriptionContainer: {
    width: calcWidth(343),
    marginTop: calcHeight(16),
  },
  calenderContainer: {
    width: calcWidth(343),
    height: calcHeight(320),
    backgroundColor: COLORS.white,
    borderRadius: calcWidth(16),
    alignItems: "center",
    alignSelf: "center",
    paddingTop: calcHeight(16),
  },
  buttonContainer: {
    marginTop: calcHeight(16),
  },
})
export default styles
