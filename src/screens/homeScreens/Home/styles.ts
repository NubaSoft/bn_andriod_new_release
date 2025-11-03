import { StyleSheet } from "react-native"
import { COLORS } from "../../../utils/theme"
import { calcHeight, calcWidth } from "../../../utils/sizes"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  sliderContainer: {
    height: calcHeight(280),
    marginBottom: calcHeight(24),
  },
  sliderItemContainer: {
    width: calcWidth(375),
    height: calcWidth(280),
  },
  sliderImage: {
    width: calcWidth(375),
    height: calcWidth(300),
    resizeMode: "stretch",
    borderBottomRightRadius: calcHeight(48),
  },
  sliderPageContainer: {
    width: calcWidth(375),
    height: calcHeight(300),
  },
  sliderItemView: {
    width: calcWidth(327 - 32),
    height: calcHeight(100),
    alignSelf: "center",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    marginTop: calcHeight(24),
  },
  sliderTopContainer: {
    width: calcWidth(375),
    height: calcHeight(300),
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: calcHeight(16),
  },
  sliderTopProfileContainer: {
    width: calcWidth(375),
    height: calcHeight(100),
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: calcWidth(16),
    paddingBottom: calcHeight(8),
  },
  sliderTopProfileView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: calcHeight(44),
  },
  sliderTopProfileIconView: {
    width: calcWidth(44),
    height: calcHeight(44),
    borderRadius: calcWidth(22),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(9, 116, 104, 0.8)",
    marginEnd: calcWidth(4),
  },
  sliderTopProfileIcon: {
    width: calcWidth(30),
    height: calcHeight(30),
    resizeMode: "stretch",
  },
  sliderTopProfileNotification: {
    width: calcWidth(22),
    height: calcHeight(22),
    resizeMode: "stretch",
    marginBottom: calcHeight(6),
  },
  sliderBointsContainer: {
    width: calcWidth(375),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: calcWidth(16),
  },
  sliderBointSelect: {
    width: calcWidth(24),
    height: calcWidth(6),
    marginHorizontal: calcWidth(3),
    borderRadius: calcWidth(6),
    backgroundColor: COLORS.primary,
  },
  sliderBointUnSelect: {
    width: calcWidth(6),
    height: calcWidth(6),
    marginHorizontal: calcWidth(3),
    borderRadius: calcWidth(3),
    backgroundColor: COLORS.textLight,
  },
  wePlannedContainer: {
    height: calcHeight(205),
    marginTop: calcHeight(24),
  },
  newMenuContainer: {
    // width: calcWidth(375),
    height: calcHeight(300),
  },
  tabsContainer: {
    width: calcWidth(327),
    height: calcHeight(32),
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    borderBottomColor: COLORS.gray,
    borderBottomWidth: calcHeight(1),
  },
  itemTabContainer: {
    height: calcHeight(24),
    justifyContent: "center",
    paddingHorizontal: calcWidth(8),
    marginBottom: -calcHeight(1),
  },
})
export default styles
