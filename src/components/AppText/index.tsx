import React from "react"
import { Text } from "react-native"
import { styles } from "./styles"

interface AppButtonProps {
  title?: string | any
  fontSize?: number
  fontFamily?: string
  textAlign?: string | any
  color?: string | any
  lineHeight?: number
  marginBottom?: number
  width?: number
  numberOfLines?: number
  textDecorationLine?: string
  textTransform?: boolean
  required?: boolean
}

const AppText: React.FC<AppButtonProps> = ({
  title,
  fontSize,
  fontFamily,
  textAlign,
  color,
  lineHeight,
  marginBottom,
  width,
  numberOfLines,
  textDecorationLine,
  textTransform,
  required,
}) => (
  <Text
    style={{
      fontSize,
      fontFamily,
      textAlign,
      color,
      lineHeight,
      marginBottom,
      width,
      textTransform: textTransform ? "none" : "capitalize",
      textDecorationLine: textDecorationLine || "none",
    }}
    numberOfLines={numberOfLines || 1}>
    {title}
    {required && <Text style={styles.required}>*</Text>}
  </Text>
)

export default AppText
