import React from "react"
import { styles } from "./styles"
import AppText from "../AppText"
import { Image, TouchableOpacity, View, ViewStyle } from "react-native"
import { COLORS, FONTS } from "../../utils/theme"
import { calcFont, calcHeight } from "../../utils/sizes"

interface AppTextLineProps {
  containerStyle?: ViewStyle | any
  title?: string | any
  fontFamily?: string
  fontSize?: number
  more?: string | any
  onPress?: () => void
  font?: string
  moreColor?: string
  fontSizeMore?: number
  image?: any
  open?: boolean
}

const AppTextLine: React.FC<AppTextLineProps> = ({
  containerStyle,
  title,
  fontFamily,
  fontSize,
  more,
  onPress,
  font,
  moreColor,
  fontSizeMore,
  image,
  open,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <AppText
        title={title}
        fontSize={fontSize || calcFont(18)}
        fontFamily={fontFamily || FONTS.extra_bold}
        color={COLORS.textDark}
        textAlign={"center"}
        lineHeight={calcHeight(20)}
      />
      <TouchableOpacity onPress={onPress} style={styles.moreView}>
        {image ? (
          <Image
            source={image}
            style={[styles.image, { transform: [{ rotate: open ? "180deg" : "0deg" }] }]}
          />
        ) : null}
        {more ? (
          <AppText
            title={more}
            fontSize={fontSizeMore ? fontSizeMore : calcFont(13)}
            fontFamily={font ? font : FONTS.extra_bold}
            color={moreColor ? moreColor : COLORS.textDark}
            textAlign={"center"}
            lineHeight={calcHeight(20)}
          />
        ) : null}
      </TouchableOpacity>
    </View>
  )
}

export default AppTextLine
