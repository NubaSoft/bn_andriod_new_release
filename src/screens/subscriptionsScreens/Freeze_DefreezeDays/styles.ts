import { StyleSheet } from "react-native"
import { COLORS } from "../../../utils/theme"
import { calcHeight, calcWidth } from "../../../utils/sizes"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  subscriptionContainer: {
    width: calcWidth(343),
    marginTop: calcHeight(16),
  },
  daysContainer: {
    width: calcWidth(311),
    height: calcHeight(32),
    borderRadius: calcHeight(8),
    backgroundColor: COLORS.primaryGray,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: calcHeight(16),
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
  freezContainer: {
    width: calcWidth(160),
    height: calcHeight(48),
    borderRadius: calcHeight(8),
    backgroundColor: COLORS.primaryGray,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: calcHeight(16),
  },
  buttonContainer: {
    marginTop: calcHeight(120),
  },
})
export default styles
