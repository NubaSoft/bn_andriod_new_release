import React, { useState } from "react"
import { ImageBackground, View } from "react-native"
import styles from "./styles"
import { StatusBar } from "react-native"
import AppInput from "../../../components/AppInput"
import { calcFont, calcHeight, calcWidth } from "../../../utils/sizes"
import { COLORS, FONTS } from "../../../utils/theme"
import { Trans } from "../../../translation"
import AppButtonDefault from "../../../components/AppButtonDefault"
import { useNavigation } from "@react-navigation/native"
import { RootState, useAppDispatch } from "../../../redux/store/store"
import { IMAGES } from "../../../assets/Images"
import AppHeaderDefault from "../../../components/AppHeaderDefault"
import AppLoading from "../../../components/AppLoading"
import { resetPassword } from "../../../middleware/authentication/forgetPassword"
import { useSelector } from "react-redux"

const ResetPassword: React.FC<{}> = (params: any) => {
  const navigation = useNavigation<any>()
  const dispatch = useAppDispatch()
  const { forgotPasswordLoader } = useSelector((store: RootState) => store?.forgotPassword)

  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [errorPassword, setErrorPassword] = useState<string>(Trans("passwordRequired"))
  const [errorConfirmPassword, setErrorConfirmPassword] = useState<string>(
    Trans("confirmPasswordRequired"),
  )
  const [checkPassword, setCheckPassword] = useState<boolean>(false)
  const [checkConfirmPassword, setCheckConfirmPassword] = useState<boolean>(false)

  const headerSection = () => {
    return (
      <AppHeaderDefault
        containerStyle={{ backgroundColor: "rgba(255, 168, 10, 0)" }}
        back
        title={Trans("createPassword")}
        onPressBack={() => navigation.goBack()}
        fontSize={calcFont(20)}
      />
    )
  }

  const bodySection = () => {
    const onChangePassword = (password?: string | any) => {
      setPassword(password)
      if (password == "") {
        setCheckPassword(true)
      } else {
        setCheckPassword(false)
      }
    }

    const onChangeConfirmPassword = (confirmPassword?: string | any) => {
      setConfirmPassword(confirmPassword)
      if (confirmPassword == "") {
        setCheckConfirmPassword(true)
      } else {
        setCheckConfirmPassword(false)
      }
    }

    const onResetPassword = () => {
      if (password == "") {
        setCheckPassword(true)
        setErrorPassword(Trans("passwordRequired"))
      } else if (confirmPassword == "") {
        setCheckConfirmPassword(true)
        setErrorConfirmPassword(Trans("confirmPasswordRequired"))
      } else if (confirmPassword != password) {
        setCheckConfirmPassword(true)
        setErrorConfirmPassword(Trans("twoPasswordsNotMatch"))
      } else {
        dispatch(resetPassword({ password, navigation }))
      }
    }

    return (
      <View style={styles.bodyContainer}>
        <AppInput
          containerStyle={{ width: calcWidth(277), marginTop: calcHeight(12) }}
          title={Trans("password")}
          secret
          fontSize={calcFont(14)}
          fontFamily={FONTS.bold}
          placeholder={Trans("password")}
          value={password}
          onChangeText={(text: string) => onChangePassword(text)}
          inputContainer={{
            width: calcWidth(277),
            borderColor: 0 ? COLORS.red : COLORS.borderLight,
          }}
          errorMessage={errorPassword}
          error={checkPassword}
          required
        />
        <AppInput
          containerStyle={{ width: calcWidth(277), marginTop: calcHeight(12) }}
          title={Trans("confirmPassword")}
          secret
          fontSize={calcFont(14)}
          fontFamily={FONTS.bold}
          placeholder={Trans("confirmPassword")}
          value={confirmPassword}
          onChangeText={(text: string) => onChangeConfirmPassword(text)}
          inputContainer={{
            width: calcWidth(277),
            borderColor: 0 ? COLORS.red : COLORS.borderLight,
          }}
          errorMessage={errorConfirmPassword}
          error={checkConfirmPassword}
          required
        />

        <AppButtonDefault
          onPress={() => onResetPassword()}
          width={calcWidth(277)}
          height={calcHeight(45)}
          backgroundColor={COLORS.primary}
          title={Trans("create")}
          fontFamily={FONTS.extra_bold}
          fontSize={calcFont(16)}
          titleColor={COLORS.textDark}
          buttonStyle={styles.buttonContainer}
        />
      </View>
    )
  }

  const loadingSection = () => {
    return <AppLoading margin_top={calcHeight(400)} size={"large"} visible={forgotPasswordLoader} />
  }

  return (
    <ImageBackground source={IMAGES.background} style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      {headerSection()}
      {bodySection()}
      {loadingSection()}
    </ImageBackground>
  )
}
export default ResetPassword
