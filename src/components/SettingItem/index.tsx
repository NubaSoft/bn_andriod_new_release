import React from "react"
import { TouchableOpacity, Image, View } from "react-native"
import { styles } from "./styles"
import AppText from "../AppText"
import { calcFont, calcHeight } from "../../utils/sizes"
import { COLORS, FONTS } from "../../utils/theme"
import { IMAGES } from "../../assets/Images"

interface SettingItemProps {
  onPress?: () => void
  icon?: string | any
  title?: string
  language?: string
}

const SettingItem: React.FC<SettingItemProps> = ({ onPress, icon, title, language }) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <View style={styles.dataContainer}>
      {/* <Image source={icon} style={styles.image} /> */}
      <AppText
        title={title}
        fontSize={calcFont(16)}
        fontFamily={FONTS.bold}
        color={COLORS.textDark}
        lineHeight={calcHeight(24)}
      />
    </View>
    {language ? (
      <AppText
        title={language}
        fontSize={calcFont(16)}
        fontFamily={FONTS.bold}
        color={COLORS.textDark}
        lineHeight={calcHeight(24)}
      />
    ) : (
      <Image source={IMAGES.back} style={styles.icon} />
    )}
  </TouchableOpacity>
)

export default SettingItem
