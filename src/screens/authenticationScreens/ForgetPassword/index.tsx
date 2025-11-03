import React, { useState } from "react"
import { ImageBackground, View } from "react-native"
import styles from "./styles"
import { StatusBar } from "react-native"
import AppInput from "../../../components/AppInput"
import { calcFont, calcHeight, calcWidth } from "../../../utils/sizes"
import { COLORS, FONTS } from "../../../utils/theme"
import { Trans } from "../../../translation"
import AppText from "../../../components/AppText"
import AppButtonDefault from "../../../components/AppButtonDefault"
import { useNavigation } from "@react-navigation/native"
import { RootState, useAppDispatch } from "../../../redux/store/store"
import { IMAGES } from "../../../assets/Images"
import AppHeaderDefault from "../../../components/AppHeaderDefault"
import AppLoading from "../../../components/AppLoading"
import { userPersonlInfo_ForgotPassword } from "../../../middleware/authentication/forgetPassword"
import { useSelector } from "react-redux"

const ForgetPassword: React.FC<{}> = (params: any) => {
  const navigation = useNavigation<any>()
  const dispatch = useAppDispatch()
  const { forgotPasswordLoader } = useSelector((store: RootState) => store?.forgotPassword)
  const [phone, setPhone] = useState<string>("")
  const [checkPhone, setCheckPhone] = useState<boolean>(false)

  const headerSection = () => {
    return (
      <AppHeaderDefault
        containerStyle={{ backgroundColor: "rgba(255, 168, 10, 0)" }}
        back
        title={Trans("forgetPassword2")}
        onPressBack={() => navigation.goBack()}
        fontSize={calcFont(20)}
      />
    )
  }

  const bodySection = () => {
    const onChangePhone = (phone?: string | any) => {
      setPhone(phone)
      if (phone == "") {
        setCheckPhone(true)
      } else {
        setCheckPhone(false)
      }
    }

    const onForgotPassword = () => {
      if (phone == "") {
        setCheckPhone(true)
      } else {
        dispatch(userPersonlInfo_ForgotPassword({ mobileNumber: phone, navigation }))
      }
    }
    return (
      <View style={styles.bodyContainer}>
        <AppInput
          containerStyle={{ width: calcWidth(277), marginTop: calcHeight(12) }}
          title={Trans("phoneNumber")}
          fontSize={calcFont(14)}
          fontFamily={FONTS.bold}
          placeholder={Trans("phoneNumber")}
          value={phone}
          onChangeText={(text: string) => onChangePhone(text)}
          inputContainer={{
            width: calcWidth(277),
            borderColor: checkPhone ? COLORS.red : COLORS.borderLight,
          }}
          errorMessage={Trans("phoneNumberRequired")}
          error={checkPhone}
          required
        />

        <AppButtonDefault
          onPress={() => onForgotPassword()}
          width={calcWidth(277)}
          height={calcHeight(45)}
          backgroundColor={COLORS.primary}
          title={Trans("sendCode")}
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
export default ForgetPassword
