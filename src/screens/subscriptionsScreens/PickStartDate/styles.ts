import { StyleSheet } from "react-native"
import { COLORS } from "../../../utils/theme"
import { calcHeight, calcWidth } from "../../../utils/sizes"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.white,
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
    marginTop: calcHeight(160),
  },
})
export default styles
