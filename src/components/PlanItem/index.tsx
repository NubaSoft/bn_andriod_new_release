import React from "react"
import { TouchableOpacity, Image, View, ImageBackground, I18nManager } from "react-native"
import { styles } from "./styles"
import AppText from "../AppText"
import { calcFont, calcHeight, calcWidth } from "../../utils/sizes"
import { COLORS, FONTS } from "../../utils/theme"
import { IMAGES } from "../../assets/Images"

interface PlanItemProps {
  onPress?: () => void
  item?: any
  index?: number
}

// "subscriptionName":"WL 1200 3+2",
// "subscriptionNameAr":"نزول وزن 1200 3+2   "

const PlanItem: React.FC<PlanItemProps> = ({ onPress, item, index }) => {
  return (
    <TouchableOpacity onPress={onPress} key={index}>
      <ImageBackground
        source={IMAGES.testMealDetails}
        style={styles.container}
        imageStyle={styles.containerImage}
        key={index}>
        <AppText
          title={I18nManager.isRTL ? item?.subscriptionNameAr : item?.subscriptionName}
          fontSize={calcFont(24)}
          fontFamily={FONTS.bold}
          color={COLORS.white}
          lineHeight={calcHeight(20)}
          textAlign={"center"}
          width={calcWidth(120)}
          numberOfLines={3}
        />
      </ImageBackground>
    </TouchableOpacity>
  )
}

export default PlanItem
