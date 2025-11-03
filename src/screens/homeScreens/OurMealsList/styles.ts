import { StyleSheet } from "react-native"
import { COLORS } from "../../../utils/theme"
import { calcHeight, calcWidth } from "../../../utils/sizes"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  tabsContainer: {
    width: calcWidth(375),
    height: calcHeight(50),
    justifyContent: "center",
    paddingTop: calcHeight(7),
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 0.4,
  },
  listContainer: {
    width: calcWidth(343),
  },
  itemContainer: {
    marginBottom: calcHeight(0),
    marginTop: calcHeight(12),
    marginStart: calcWidth(0),
    marginEnd: calcWidth(34),
  },
})
export default styles
