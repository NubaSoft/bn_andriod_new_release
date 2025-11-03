import React, { useState } from "react"
import {
  TextStyle,
  ViewStyle,
  TouchableOpacity,
  Text,
  Image,
  ImageSourcePropType,
  TextInput,
  View,
  I18nManager,
} from "react-native"
import styles from "./styles"
import { COLORS, FONTS } from "../../utils/theme"
import { calcFont, calcHeight, calcWidth } from "../../utils/sizes"
import { IMAGES } from "../../assets/Images"
import { KeyboardType } from "react-native"
import AppText from "../AppText"

export interface Props {
  containerStyle?: ViewStyle
  inputContainer?: ViewStyle
  title?: string | undefined
  fontSize?: number
  fontFamily?: string
  value?: string
  image?: ImageSourcePropType
  placeholder?: string
  keyboardType?: KeyboardType
  onChangeText: (text: any) => void | undefined
  onFocus?: () => void
  onEndEditing?: () => void
  numberOfLines?: number
  secret?: boolean
  maxLength?: number
  editable?: boolean
  _textAligne?: boolean
  inputStyle?: ViewStyle | TextStyle
  errorMessage?: string
  error?: boolean
  marginBottom?: number
  multiline?: boolean
  required?: boolean
}
export const AppInput: React.FC<Props> = ({
  containerStyle,
  inputContainer,
  title,
  fontSize,
  fontFamily,
  value,
  image,
  placeholder,
  keyboardType,
  onChangeText,
  onFocus,
  onEndEditing,
  numberOfLines,
  secret,
  maxLength,
  editable,
  _textAligne,
  inputStyle,
  errorMessage,
  error,
  multiline,
  required,
}) => {
  const [hidePass, setHidePass] = useState<boolean>(true)
  return (
    <View style={[styles.container, containerStyle]}>
      {title && (
        <AppText
          title={title}
          fontSize={fontSize || calcFont(14)}
          fontFamily={fontFamily || FONTS.medium}
          color={COLORS.textDark}
          lineHeight={calcHeight(23)}
          textAlign={"left"}
          required={required}
        />
      )}
      <View style={[styles.inputContainer, inputContainer]}>
        {image && <Image source={image} style={styles.image} />}
        <TextInput
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType || "default"}
          onChangeText={onChangeText}
          placeholderTextColor={COLORS.textLight}
          numberOfLines={numberOfLines || 1}
          secureTextEntry={secret && hidePass ? true : false}
          editable={editable}
          onFocus={onFocus}
          multiline={multiline}
          onEndEditing={onEndEditing}
          maxLength={maxLength || undefined}
          style={[
            styles.input,
            inputStyle,
            {
              width: secret ? calcWidth(220) : calcWidth(289),
              textAlign: _textAligne ? "left" : I18nManager.isRTL ? "right" : "left",
            },
          ]}
        />
        {secret && (
          <TouchableOpacity onPress={() => setHidePass(!hidePass)}>
            <Image
              source={hidePass ? IMAGES.password_show : IMAGES.password_hidden}
              style={styles.secretImage}
            />
          </TouchableOpacity>
        )}
      </View>
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
export default AppInput
