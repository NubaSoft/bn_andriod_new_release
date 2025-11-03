import React, { useState } from "react"
import { Image, ImageBackground, TouchableOpacity, View } from "react-native"
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
import AppText from "../../../components/AppText"
import { signupAddPersonalDataInBranch } from "../../../middleware/authentication/register"
import * as Device from "expo-device"
import endpoints from "../../../network/endpoints"
import { useSelector } from "react-redux"

const NewPassword: React.FC<{}> = (params: any) => {
  const navigation = useNavigation<any>()
  const dispatch = useAppDispatch()
  const paramsData: any = params?.route?.params
  const { registerLoader } = useSelector((store: RootState) => store?.register)

  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false)
  const [errorPassword, setErrorPassword] = useState<string>(Trans("passwordRequired"))
  const [errorConfirmPassword, setErrorConfirmPassword] = useState<string>(
    Trans("confirmPasswordRequired"),
  )
  const [checkPassword, setCheckPassword] = useState<boolean>(false)
  const [checkConfirmPassword, setCheckConfirmPassword] = useState<boolean>(false)
  const [checkAgree, setCheckAgree] = useState<boolean>(false)

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

    const onSetPassword = () => {
      if (password == "") {
        setCheckPassword(true)
        setErrorPassword(Trans("passwordRequired"))
      } else if (confirmPassword == "") {
        setCheckConfirmPassword(true)
        setErrorConfirmPassword(Trans("confirmPasswordRequired"))
      } else if (confirmPassword != password) {
        setCheckConfirmPassword(true)
        setErrorConfirmPassword(Trans("twoPasswordsNotMatch"))
      } else if (!agreeTerms) {
        setCheckAgree(true)
      } else {
        if (paramsData?.compleat == "yes") {
          const data = {
            centerId: endpoints?.branch_code,
            firstName: paramsData?.firstName,
            mobileNumber: paramsData?.mobileNumber,
            otpVerified: 1,
            password,
            navigation,
          }
          dispatch(signupAddPersonalDataInBranch(data))
        } else if (paramsData?.compleat == "no") {
          const data: any = { ...paramsData, ...{ password } }
          navigation.navigate("HowItWork", data)
        }
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
        <View
          style={[
            styles.termsContainer,
            { borderWidth: 1, borderColor: checkAgree ? COLORS.red : COLORS.white },
          ]}>
          <TouchableOpacity
            onPress={() => {
              setAgreeTerms(!agreeTerms)
              setCheckAgree(agreeTerms ? true : false)
            }}>
            <Image
              source={agreeTerms ? IMAGES.select_active : IMAGES.select_inActive}
              style={styles.termsCheck}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <AppText
              title={Trans("agreeTerms")}
              fontSize={calcFont(17)}
              color={COLORS.textDark}
              fontFamily={FONTS.medium}
              textTransform
              textAlign={"left"}
              lineHeight={calcHeight(18)}
              width={calcWidth(241)}
              numberOfLines={4}
            />
          </TouchableOpacity>
        </View>
        <AppButtonDefault
          onPress={() => onSetPassword()}
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
    return <AppLoading margin_top={calcHeight(400)} size={"large"} visible={registerLoader} />
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
export default NewPassword
