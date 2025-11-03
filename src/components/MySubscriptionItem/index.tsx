import React from "react"
import { TouchableOpacity, Image, View } from "react-native"
import { styles } from "./styles"
import AppText from "../AppText"
import { calcFont, calcHeight, calcWidth } from "../../utils/sizes"
import { COLORS, FONTS } from "../../utils/theme"
import { IMAGES } from "../../assets/Images"
import { Trans } from "../../translation"

interface MySubscriptionItemProps {
  item?: any
  onPress?: () => void
}

const MySubscriptionItem: React.FC<MySubscriptionItemProps> = ({ item, onPress }) => {
  console.log("item--MySubscriptionItem------------", item)
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <AppText
        title={item?.subscriptionName}
        fontSize={calcFont(20)}
        fontFamily={FONTS.extra_bold}
        color={COLORS.primary}
        textAlign={"left"}
        width={calcWidth(311)}
        numberOfLines={2}
        marginBottom={calcHeight(6)}
      />
      <View style={styles.dateContainer}>
        <AppText
          title={Trans("startDate")}
          fontSize={calcFont(18)}
          fontFamily={FONTS.medium}
          color={COLORS.textDark}
          lineHeight={calcHeight(18)}
          textAlign={"left"}
        />
        <AppText
          title={item?.subscriptionStartDate}
          fontSize={calcFont(18)}
          fontFamily={FONTS.bold}
          color={COLORS.primary}
          lineHeight={calcHeight(18)}
          textAlign={"left"}
        />
      </View>
      <View style={styles.dateContainer}>
        <AppText
          title={Trans("endDate")}
          fontSize={calcFont(18)}
          fontFamily={FONTS.medium}
          color={COLORS.textDark}
          lineHeight={calcHeight(18)}
          textAlign={"left"}
        />
        <AppText
          title={item?.subscriptionEndDate}
          fontSize={calcFont(18)}
          fontFamily={FONTS.bold}
          color={COLORS.primary}
          lineHeight={calcHeight(18)}
          textAlign={"left"}
        />
      </View>
    </TouchableOpacity>
  )
}

export default MySubscriptionItem
