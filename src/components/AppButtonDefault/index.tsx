import React from "react"
import { TouchableOpacity, ViewStyle } from "react-native"
import { styles } from "./styles"
import AppText from "../AppText"
import { calcFont, calcHeight, calcWidth } from "../../utils/sizes"
import { COLORS, FONTS } from "../../utils/theme"

interface AppButtonProps {
  border?: boolean
  onPress?: () => void
  buttonStyle?: ViewStyle | any
  width?: number
  height?: number
  backgroundColor?: string
  title?: string
  fontFamily?: string
  fontSize?: number
  titleColor?: string
  borderColor?: string
  borderWidth?: number
  borderRadius?: number
}

const AppButtonDefault: React.FC<AppButtonProps> = ({
  border,
  onPress,
  buttonStyle,
  width,
  height,
  backgroundColor,
  title,
  fontFamily,
  fontSize,
  titleColor,
  borderColor,
  borderWidth,
  borderRadius,
}) => {
  return (
    <>
      {border ? (
        <TouchableOpacity
          onPress={onPress}
          style={[
            styles.container,
            buttonStyle,
            {
              width: width || calcWidth(343),
              height: height || calcHeight(45),
              borderColor: borderColor || COLORS.primary,
              borderWidth: borderWidth || 1,
              borderRadius: borderRadius || calcHeight(24),
            },
          ]}>
          <AppText
            title={title}
            fontFamily={fontFamily || FONTS.bold}
            fontSize={fontSize || calcFont(16)}
            textAlign={"center"}
            color={titleColor || COLORS.textDark}
            lineHeight={calcHeight(24)}
            textTransform
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={onPress}
          style={[
            styles.container,
            buttonStyle,
            {
              width: width || calcWidth(343),
              height: height || calcHeight(45),
              backgroundColor: backgroundColor || COLORS.primary,
            },
          ]}>
          <AppText
            title={title}
            fontFamily={fontFamily || FONTS.bold}
            fontSize={fontSize || calcFont(16)}
            textAlign={"center"}
            color={titleColor || COLORS.textDark}
            lineHeight={calcHeight(24)}
            textTransform
          />
        </TouchableOpacity>
      )}
    </>
  )
}

export default AppButtonDefault
