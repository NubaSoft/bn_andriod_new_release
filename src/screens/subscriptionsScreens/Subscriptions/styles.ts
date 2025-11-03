import { StyleSheet } from "react-native"
import { COLORS } from "../../../utils/theme"
import { calcHeight, calcWidth } from "../../../utils/sizes"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.white,
  },

  bibliographyContainer: {
    width: calcWidth(343),
    alignItems: "center",
  },
  bibliographyItemContainer: {
    width: calcWidth(311),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: calcHeight(4),
  },
  bibliographyItemView: {
    width: calcWidth(16),
    height: calcHeight(16),
    borderRadius: calcHeight(16),
    resizeMode: "stretch",
    marginEnd: calcWidth(8),
  },
  daysPeriodContainer: {
    width: calcWidth(311),
    paddingVertical: calcHeight(12),
    alignSelf: "center",
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: calcHeight(16),
    marginVertical: calcHeight(16),
    alignItems: "center",
  },
  daysPeriodView: {
    paddingHorizontal: calcWidth(16),
    paddingVertical: calcHeight(8),
    borderRadius: calcHeight(8),
    backgroundColor: COLORS.lightPrimary,
  },
  buttonContainer: {
    marginTop: calcHeight(16),
  },
  calendarContainer: {
    width: calcWidth(343),
    marginTop: calcHeight(16),
  },
})
export default styles
