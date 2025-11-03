import React from "react"
import { styles } from "./styles"
import AppText from "../AppText"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { COLORS, FONTS } from "../../utils/theme"
import { calcFont, calcHeight } from "../../utils/sizes"

interface AppTabProps {
  onPress?: () => void
  containerStyle?: ViewStyle
  select?: boolean
  title?: string | any
  fontSize?: any
}

const AppTab: React.FC<AppTabProps> = ({ onPress, containerStyle, select, title, fontSize }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[select ? styles.containerSelect : styles.containerUnSelect, containerStyle]}>
        <AppText
          title={title}
          fontSize={fontSize | calcFont(15)}
          fontFamily={FONTS.bold}
          color={select ? COLORS.white : COLORS.primary}
          textAlign={"center"}
          lineHeight={calcHeight(20)}
        />
      </View>
    </TouchableOpacity>
  )
}

export default AppTab
