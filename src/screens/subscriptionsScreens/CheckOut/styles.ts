import { StyleSheet } from "react-native"
import { COLORS } from "../../../utils/theme"
import { calcHeight, calcWidth } from "../../../utils/sizes"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  webViewContainer: {
    width: calcWidth(375),
    height: calcHeight(710),
    backgroundColor: COLORS.red,
  },
  webView: {
    width: calcWidth(375),
    height: calcHeight(710),
  },
})
export default styles
