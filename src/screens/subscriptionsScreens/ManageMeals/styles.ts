import { StyleSheet } from "react-native"
import { COLORS } from "../../../utils/theme"
import { calcHeight, calcWidth } from "../../../utils/sizes"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  calculatorContainer: {
    width: calcWidth(375),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 168, 10, 0.2)",
  },
  calculatorItemContainer: {
    width: calcWidth(80),
    height: calcHeight(54),
    alignItems: "center",
    justifyContent: "center",
  },
  categoriesContainer: {
    width: calcWidth(375),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary,
    height: calcHeight(48),
    paddingTop: calcHeight(6),
  },
  listContainer: {
    width: calcWidth(375),
    height: calcHeight(500),
    // backgroundColor: "red",
  },
  actionContainer: {
    width: calcWidth(375),
    borderTopColor: COLORS.primary,
    borderTopWidth: 1,
    paddingTop: calcHeight(12),
    alignItems: "center",
  },
  mealItemContainer: {
    marginTop: calcHeight(16),
    marginBottom: calcHeight(0),
  },
  //
  //
  //
  //
  //
  //

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
