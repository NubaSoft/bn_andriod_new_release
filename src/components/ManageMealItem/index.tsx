import React from "react"
import { TouchableOpacity, Image, View, I18nManager, ViewStyle } from "react-native"
import { styles } from "./styles"
import AppText from "../AppText"
import { calcFont, calcHeight, calcWidth } from "../../utils/sizes"
import { COLORS, FONTS } from "../../utils/theme"
import { IMAGES } from "../../assets/Images"
import { Trans } from "../../translation"

interface ManageMealItemProps {
  index?: number
  item?: any
  onPress?: () => void
  styleContainer?: ViewStyle | any
  select?: boolean
  disabled?: boolean
}

const ManageMealItem: React.FC<ManageMealItemProps> = ({
  index,
  item,
  onPress,
  styleContainer,
  select,
  disabled,
}) => {
  const DETAILS: any = [
    {
      id: 1,
      title: Trans("proteins"),
      value: item?.proteins,
    },
    {
      id: 2,
      title: Trans("calories"),
      value: item?.calories,
    },
    {
      id: 3,
      title: Trans("carbs"),
      value: item?.carbs,
    },
    {
      id: 4,
      title: Trans("fats"),
      value: item?.fats,
    },
  ]
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.container,
        styleContainer,
        { backgroundColor: select ? COLORS.primaryLight : COLORS.white },
      ]}
      key={index}>
      <Image source={{ uri: item?.mealImage }} defaultSource={IMAGES.logo} style={styles.image} />
      <View style={styles.dataContainer}>
        <View style={styles.nameView}>
          <AppText
            title={I18nManager.isRTL ? item?.titleAr : item?.titleEn}
            fontSize={calcFont(15)}
            fontFamily={FONTS.bold}
            color={COLORS.textDark}
            lineHeight={calcHeight(14)}
            textAlign={"left"}
            width={calcWidth(150)}
            numberOfLines={2}
          />
        </View>
        <View style={styles.detailsContainer}>
          {DETAILS.map((item: any) => {
            return (
              <View style={styles.detailsItemContainer} key={item?.id}>
                <AppText
                  title={item?.title}
                  fontSize={calcFont(12)}
                  fontFamily={FONTS.bold}
                  color={COLORS.textDark}
                  lineHeight={calcHeight(10)}
                  textAlign={"center"}
                />
                <AppText
                  title={item?.value}
                  fontSize={calcFont(12)}
                  fontFamily={FONTS.bold}
                  color={COLORS.textLight}
                  lineHeight={calcHeight(10)}
                  textAlign={"center"}
                />
              </View>
            )
          })}
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ManageMealItem
