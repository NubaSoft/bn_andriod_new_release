import { StyleSheet } from "react-native"
import { calcHeight, calcWidth } from "../../utils/sizes"

export const styles = StyleSheet.create({
  container: {
    width: calcWidth(343),
    alignItems: "center",
    justifyContent: "center",
    marginTop: calcHeight(180),
  },
  image: {
    width: calcWidth(160),
    height: calcHeight(160),
    resizeMode: "stretch",
    marginBottom: calcHeight(24),
  },
})
