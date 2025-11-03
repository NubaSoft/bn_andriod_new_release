import { StyleSheet } from "react-native"
import { COLORS } from "../../../utils/theme"
import { calcHeight, calcWidth } from "../../../utils/sizes"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  detailsContainer: {
    width: calcWidth(343),
    marginTop: calcHeight(24),
  },
  detailsView: {
    width: calcWidth(343),
    marginTop: calcHeight(8),
    borderWidth: 1,
    borderColor: COLORS.textLight,
    borderRadius: calcHeight(16),
    paddingVertical: calcHeight(16),
    paddingHorizontal: calcWidth(16),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  detailsDataView: {},
  detailsEdit: {
    width: calcWidth(36),
    height: calcHeight(36),
    resizeMode: "stretch",
  },
  codeContainer: {
    width: calcWidth(343),
    marginTop: calcHeight(28),
  },
  codeView: {
    width: calcWidth(343),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  paymentContainer: {
    width: calcWidth(343),
    marginTop: calcHeight(28),
  },
  paymentItemContainer: {
    width: calcWidth(343),
    height: calcHeight(54),
    borderWidth: 1,
    borderRadius: calcHeight(8),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: calcWidth(16),
    marginBottom: calcHeight(16),
  },
  paymentItemView: {
    flexDirection: "row",
    alignItems: "center",
  },
  paymentItemImage: {
    width: calcWidth(28),
    height: calcHeight(28),
    resizeMode: "stretch",
    marginEnd: calcWidth(8),
  },
  paymentItemIcon: {
    width: calcWidth(24),
    height: calcHeight(24),
    resizeMode: "stretch",
  },
  buttonPay: {
    marginTop: calcHeight(48),
  },
})
export default styles
