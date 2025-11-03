import React, { useState } from "react"
import { ImageBackground, TouchableOpacity, View } from "react-native"
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
import { userPersonlInfo } from "../../../middleware/authentication/login"
import { IMAGES } from "../../../assets/Images"
import AppHeaderDefault from "../../../components/AppHeaderDefault"
import AppLoading from "../../../components/AppLoading"
import { useSelector } from "react-redux"

const Login: React.FC<{}> = (params: any) => {
  const navigation = useNavigation<any>()
  const dispatch = useAppDispatch()
  const { loginLoader } = useSelector((store: RootState) => store?.login)
  const [phone, setPhone] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [checkPhone, setCheckPhone] = useState<boolean>(false)
  const [checkPassword, setCheckPassword] = useState<boolean>(false)

  const headerSection = () => {
    return (
      <AppHeaderDefault
        containerStyle={{ backgroundColor: "rgba(255, 168, 10, 0)" }}
        back
        title={Trans("login")}
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

    const onChangePassword = (password?: string | any) => {
      setPassword(password)
      if (password == "") {
        setCheckPassword(true)
      } else {
        setCheckPassword(false)
      }
    }

    const onLogin = () => {
      if (phone == "") {
        setCheckPhone(true)
      } else if (password == "") {
        setCheckPassword(true)
      } else {
        const data: any = {
          phone,
          password,
        }
        dispatch(userPersonlInfo({ mobilephone: phone, password: password, navigation }))
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
            borderColor: checkPassword ? COLORS.red : COLORS.borderLight,
          }}
          errorMessage={Trans("passwordRequired")}
          error={checkPassword}
          required
        />
        <View style={styles.forgotContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}>
            <AppText
              title={Trans("forgetPassword")}
              fontSize={calcFont(18)}
              fontFamily={FONTS.medium}
              color={COLORS.primary}
              lineHeight={calcHeight(23)}
              textAlign={"center"}
            />
          </TouchableOpacity>
        </View>

        <AppButtonDefault
          onPress={() => onLogin()}
          width={calcWidth(277)}
          height={calcHeight(45)}
          backgroundColor={COLORS.primary}
          title={Trans("login")}
          fontFamily={FONTS.extra_bold}
          fontSize={calcFont(16)}
          titleColor={COLORS.textDark}
          buttonStyle={styles.buttonContainer}
        />
        <View style={styles.bodyAccount}>
          <AppText
            title={Trans("newUser")}
            fontSize={calcFont(15)}
            fontFamily={FONTS.medium}
            color={COLORS.gray}
            lineHeight={calcHeight(23)}
            textAlign={"right"}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={styles.bodyAccountAction}>
            <AppText
              title={Trans("creatAccount")}
              fontSize={calcFont(16)}
              fontFamily={FONTS.extra_bold}
              color={COLORS.primary}
              lineHeight={calcHeight(23)}
              textAlign={"right"}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const loadingSection = () => {
    return <AppLoading margin_top={calcHeight(400)} size={"large"} visible={loginLoader} />
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
export default Login
