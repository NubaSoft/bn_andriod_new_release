import React from "react"
import { ViewStyle, TouchableOpacity, Image, View } from "react-native"
import styles from "./styles"
import AppText from "../AppText"
import { calcFont, calcHeight } from "../../utils/sizes"
import { COLORS, FONTS } from "../../utils/theme"
import { IMAGES } from "../../assets/Images"

export interface Props {
  containerStyle?: ViewStyle | null
  viewStyle?: ViewStyle | null
  onPress: () => void
  title?: string | undefined
  fontSize?: number
  fontFamily?: string
  value?: string | undefined
  select?: boolean
  error?: boolean
  errorMessage?: string
  required?: boolean
}
export const PickerSelect: React.FC<Props> = ({
  containerStyle,
  viewStyle,
  onPress,
  title,
  fontSize,
  fontFamily,
  value,
  select,
  error,
  errorMessage,
  required,
}) => {
  return (
    <View style={containerStyle}>
      <AppText
        title={title}
        fontSize={fontSize || calcFont(14)}
        fontFamily={fontFamily || FONTS.medium}
        color={COLORS.textDark}
        lineHeight={calcHeight(23)}
        textAlign={"left"}
        required={required}
      />
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.container,
          { borderColor: error ? COLORS.red : select ? COLORS.primary : COLORS.borderLight },
          viewStyle,
        ]}>
        <AppText
          title={value}
          fontFamily={select ? FONTS.bold : FONTS.medium}
          fontSize={calcFont(16)}
          textAlign={"left"}
          // color={select ? COLORS.textDark : COLORS.textLight}
          color={COLORS.textDark}
          lineHeight={calcHeight(24)}
        />
        <Image source={IMAGES.more} style={styles.icon} />
      </TouchableOpacity>
      {error && (
        <AppText
          title={errorMessage}
          fontSize={calcFont(14)}
          color={COLORS.red}
          fontFamily={FONTS.medium}
          textTransform
          textAlign={"right"}
          lineHeight={calcHeight(16)}
        />
      )}
    </View>
  )
}
export default PickerSelect
