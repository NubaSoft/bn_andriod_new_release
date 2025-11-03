import React from "react"
import { TouchableOpacity, Image, View, ViewStyle } from "react-native"
import { styles } from "./styles"
import AppText from "../AppText"
import { calcFont, calcHeight, calcWidth } from "../../utils/sizes"
import { COLORS, FONTS } from "../../utils/theme"
import { IMAGES } from "../../assets/Images"

interface AppHeaderProps {
  containerStyle?: ViewStyle
  onPressBack?: () => void
  title?: string
  fontSize?: number
  image?: string | any
  back?: boolean
  icon1?: string | any
  icon2?: string | any
  language?: string
  onPress1?: () => void
  onPress2?: () => void
  onLanguage?: () => void
}

const AppHeaderDefault: React.FC<AppHeaderProps> = ({
  containerStyle,
  onPressBack,
  title,
  fontSize,
  image,
  back,
  icon1,
  icon2,
  onPress1,
  onPress2,
  language,
  onLanguage,
}) => (
  <View style={[styles.container, containerStyle]}>
    {title ? (
      <View style={styles.view}>
        {back && (
          <View style={[styles.imageView, { justifyContent: "flex-start" }]}>
            <TouchableOpacity onPress={onPressBack}>
              <Image source={IMAGES.back} style={styles.icon} />
            </TouchableOpacity>
          </View>
        )}
        <AppText
          title={title}
          fontSize={fontSize || calcFont(18)}
          fontFamily={FONTS.bold}
          color={COLORS.textDark}
          lineHeight={calcHeight(20)}
        />
        <View style={[styles.imageView, { justifyContent: "flex-end" }]}>
          {icon1 && (
            <TouchableOpacity onPress={onPress1}>
              <Image source={icon1} style={styles.icon} />
            </TouchableOpacity>
          )}
          {icon2 && (
            <TouchableOpacity onPress={onPress2}>
              <Image source={icon2} style={[styles.icon, { marginStart: calcWidth(8) }]} />
            </TouchableOpacity>
          )}
          {language && (
            <TouchableOpacity onPress={onLanguage}>
              <AppText
                title={language}
                fontSize={calcFont(15)}
                fontFamily={FONTS.bold}
                color={COLORS.primary}
                lineHeight={calcHeight(20)}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    ) : image ? (
      <View style={styles.view}>
        <View style={[styles.imageView, { justifyContent: "flex-start" }]}>
          {back && (
            <TouchableOpacity onPress={onPressBack}>
              <Image source={IMAGES.back} style={styles.icon} />
            </TouchableOpacity>
          )}
        </View>

        <Image source={image} style={styles.image} />
        <View style={[styles.imageView, { justifyContent: "flex-end" }]}>
          {icon1 && (
            <TouchableOpacity onPress={onPress1}>
              <Image source={icon1} style={styles.icon} />
            </TouchableOpacity>
          )}
          {icon2 && (
            <TouchableOpacity onPress={onPress2}>
              <Image source={icon2} style={[styles.icon, { marginStart: calcWidth(8) }]} />
            </TouchableOpacity>
          )}
          {language && (
            <TouchableOpacity onPress={onLanguage} style={{ backgroundColor: "red" }}>
              <AppText
                title={language}
                fontSize={calcFont(14)}
                fontFamily={FONTS.bold}
                color={COLORS.primary}
                lineHeight={calcHeight(20)}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    ) : null}
  </View>
)

export default AppHeaderDefault
