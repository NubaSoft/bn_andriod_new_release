import React, { useState } from "react"
import { ImageBackground, TouchableOpacity, View } from "react-native"
import styles from "./styles"
import { StatusBar } from "react-native"
import { calcFont, calcHeight, calcWidth } from "../../../utils/sizes"
import { COLORS, FONTS } from "../../../utils/theme"
import { Trans } from "../../../translation"
import AppText from "../../../components/AppText"
import AppButtonDefault from "../../../components/AppButtonDefault"
import { useNavigation } from "@react-navigation/native"
import { useAppDispatch } from "../../../redux/store/store"
import OtpInputs from "react-native-otp-inputs"
import { IMAGES } from "../../../assets/Images"
import AppHeaderDefault from "../../../components/AppHeaderDefault"
import AppLoading from "../../../components/AppLoading"

const RegisterCode: React.FC<{}> = (params: any) => {
  const data: any = params?.route?.params
  console.log("data-----------", data)
  const navigation = useNavigation<any>()
  const dispatch = useAppDispatch()

  const [OTPCode, setOTPCode] = useState<string>("")
  const [errors, setErrors] = useState<boolean>()
  const [focused, setFocused] = useState<boolean>(false)

  const headerSection = () => {
    return (
      <AppHeaderDefault
        containerStyle={{ backgroundColor: "rgba(255, 168, 10, 0)" }}
        back
        title={Trans("mobileVerification")}
        onPressBack={() => navigation.goBack()}
        fontSize={calcFont(20)}
      />
    )
  }
  const bodySection = () => {
    const onVerificationCode = () => {
      if (data?.otpCode != OTPCode) {
        setErrors(true)
      } else {
        navigation.navigate("NewPassword", data)
      }
    }

    return (
      <View style={styles.bodyContainer}>
        <AppText
          title={Trans("weSentAccessCode")}
          fontSize={calcFont(16)}
          fontFamily={FONTS.medium}
          color={COLORS.textDark}
          lineHeight={calcHeight(23)}
          textAlign={"center"}
        />
        <AppText
          title={`${Trans("numberVerification")} ${data?.otpCode}`}
          fontSize={calcFont(18)}
          fontFamily={FONTS.bold}
          color={COLORS.textDark}
          lineHeight={calcHeight(23)}
          textAlign={"center"}
        />
        <OtpInputs
          autofillFromClipboard
          // onFocus={() => setFocused(true)}
          // ref={otpRef}
          handleChange={code => {
            setErrors(false)
            setOTPCode(code)
          }}
          style={styles.otpContainer}
          numberOfInputs={6}
          inputStyles={
            errors
              ? [styles.otpInput, { borderColor: "red" }]
              : [styles.otpInput, { borderColor: focused ? COLORS.primary : COLORS.borderLight }]
          }
        />
        {errors && (
          <AppText
            title={Trans("enterCorrectCode")}
            fontSize={calcFont(14)}
            color={COLORS.red}
            fontFamily={FONTS.medium}
            textTransform
            textAlign={"right"}
            lineHeight={calcHeight(16)}
          />
        )}

        <View style={styles.bodyAccount}>
          <AppText
            title={Trans("didntRecieveOTP")}
            fontSize={calcFont(15)}
            fontFamily={FONTS.medium}
            color={COLORS.gray}
            lineHeight={calcHeight(23)}
            textAlign={"right"}
          />
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.bodyAccountAction}>
            <AppText
              title={Trans("changeNumber")}
              fontSize={calcFont(18)}
              fontFamily={FONTS.extra_bold}
              color={COLORS.primary}
              lineHeight={calcHeight(23)}
              textAlign={"right"}
            />
          </TouchableOpacity>
        </View>
        <AppButtonDefault
          onPress={() => onVerificationCode()}
          width={calcWidth(277)}
          height={calcHeight(45)}
          backgroundColor={COLORS.primary}
          title={Trans("Verification")}
          fontFamily={FONTS.extra_bold}
          fontSize={calcFont(16)}
          titleColor={COLORS.textDark}
          buttonStyle={styles.buttonContainer}
        />
      </View>
    )
  }

  const loadingSection = () => {
    return <AppLoading margin_top={calcHeight(400)} size={"large"} visible={false} />
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
export default RegisterCode
