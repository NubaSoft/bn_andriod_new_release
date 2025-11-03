import { StyleSheet } from "react-native"
import { calcFont, calcHeight } from "../../utils/sizes"
import { FONTS } from "../../utils/theme"
const styles = StyleSheet.create({
  icon: {
    width: calcHeight(20),
    height: calcHeight(20),
    marginTop: -calcHeight(48),
  },
  tabBarStyle: {
    height: calcHeight(66),
  },
  tabBarLabelStyle: {
    marginTop: -calcHeight(18),
    fontSize: calcFont(13),
    fontFamily: FONTS.bold,
    lineHeight: calcHeight(15),
    textTransform: "capitalize",
  },
})
export default styles
