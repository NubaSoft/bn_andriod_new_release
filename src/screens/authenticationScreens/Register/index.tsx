import React, { useState } from "react"
import { Dimensions, ImageBackground, TouchableOpacity, View } from "react-native"
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
import AppHeaderDefault from "../../../components/AppHeaderDefault"
import { IMAGES } from "../../../assets/Images"
import PickerSelect from "../../../components/PickerSelect"
import moment from "moment"
import AppLoading from "../../../components/AppLoading"
import Modal from "react-native-modal"
import CalendarPicker from "react-native-calendar-picker"
import { userPersonlInfo_Register } from "../../../middleware/authentication/register"
import { useSelector } from "react-redux"

const Register: React.FC<{}> = (params: any) => {
  const navigation = useNavigation<any>()
  const dispatch = useAppDispatch()
  const { registerLoader } = useSelector((store: RootState) => store?.register)

  const [fullName, setFullName] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [dob, setDob] = useState<Date>(new Date())
  const [checkFullName, setCheckFullName] = useState<boolean>(false)
  const [checkPhone, setCheckPhone] = useState<boolean>(false)
  const [visible_Calender, setVisible_Calender] = useState<boolean>(false)

  const headerSection = () => {
    return (
      <AppHeaderDefault
        containerStyle={{ backgroundColor: "rgba(255, 168, 10, 0)" }}
        back
        title={Trans("creatAccount")}
        onPressBack={() => navigation.goBack()}
        fontSize={calcFont(20)}
      />
    )
  }

  const bodySection = () => {
    const onChangeFullName = (fullName?: string | any) => {
      setFullName(fullName)
      if (fullName == "") {
        setCheckFullName(true)
      } else {
        setCheckFullName(false)
      }
    }
    const onChangePhone = (phone?: string | any) => {
      setPhone(phone)
      if (phone == "") {
        setCheckPhone(true)
      } else {
        setCheckPhone(false)
      }
    }

    const onChangeEmail = (email?: string | any) => {
      setEmail(email)
    }

    const onRegister = () => {
      if (fullName == "") {
        setCheckFullName(true)
      } else if (phone == "") {
        setCheckPhone(true)
      } else {
        const data = {
          firstName: fullName,
          mobileNumber: phone,
          email,
          dob,
          navigation,
        }
        dispatch(userPersonlInfo_Register(data))
      }
    }

    return (
      <View style={styles.bodyContainer}>
        <AppInput
          containerStyle={{ width: calcWidth(277), marginTop: calcHeight(12) }}
          title={Trans("fullName")}
          fontSize={calcFont(14)}
          fontFamily={FONTS.bold}
          placeholder={Trans("fullName")}
          value={fullName}
          onChangeText={(text: string) => onChangeFullName(text)}
          inputContainer={{
            width: calcWidth(277),
            borderColor: checkFullName ? COLORS.red : COLORS.borderLight,
          }}
          errorMessage={Trans("fullNameRequired")}
          error={checkFullName}
          required
        />
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
          title={`${Trans("email")} ${Trans("option")}`}
          fontSize={calcFont(14)}
          fontFamily={FONTS.bold}
          placeholder={Trans("email")}
          value={email}
          onChangeText={(text: string) => onChangeEmail(text)}
          inputContainer={{
            width: calcWidth(277),
            borderColor: COLORS.borderLight,
          }}
        />
        <PickerSelect
          containerStyle={{
            width: calcWidth(277),
            marginTop: calcHeight(12),
          }}
          viewStyle={{ width: calcWidth(277) }}
          title={`${Trans("dob")} ${Trans("option")}`}
          fontSize={calcFont(14)}
          fontFamily={FONTS.bold}
          value={moment(dob).format("DD/MM/YYYY")}
          onPress={() => setVisible_Calender(true)}
        />
        <AppButtonDefault
          onPress={() => onRegister()}
          width={calcWidth(277)}
          height={calcHeight(45)}
          backgroundColor={COLORS.primary}
          title={Trans("next")}
          fontFamily={FONTS.extra_bold}
          fontSize={calcFont(16)}
          titleColor={COLORS.textDark}
          buttonStyle={styles.buttonContainer}
        />
        <View style={styles.bodyAccount}>
          <AppText
            title={Trans("haveAccount")}
            fontSize={calcFont(15)}
            fontFamily={FONTS.medium}
            color={COLORS.gray}
            lineHeight={calcHeight(23)}
            textAlign={"right"}
          />
          <TouchableOpacity onPress={() => onRegister()} style={styles.bodyAccountAction}>
            <AppText
              title={Trans("login")}
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

  const modalCalender = () => {
    const onChangeDate = (date: any) => {
      setDob(date)
      setVisible_Calender(false)
    }
    return (
      <Modal
        style={{ margin: 0, justifyContent: "center" }}
        hasBackdrop
        propagateSwipe={true}
        animationIn="slideInUp"
        animationInTiming={600}
        animationOutTiming={600}
        isVisible={visible_Calender}
        onBackdropPress={() => setVisible_Calender(false)}
        onBackButtonPress={() => setVisible_Calender(false)}
        deviceHeight={Dimensions.get("screen").height}
        statusBarTranslucent>
        <View style={styles.calenderContainer}>
          <CalendarPicker
            todayBackgroundColor={COLORS.primaryLight}
            todayTextStyle={{ color: COLORS.white }}
            selectedDayColor={COLORS.primary}
            selectedDayTextColor="#FFFFFF"
            maxDate={new Date()}
            previousTitle={Trans("previous")}
            previousTitleStyle={{
              fontFamily: FONTS.bold,
              fontSize: calcFont(14),
              color: COLORS.textDark,
            }}
            nextTitle={Trans("next")}
            nextTitleStyle={{
              fontFamily: FONTS.bold,
              fontSize: calcFont(14),
              color: COLORS.textDark,
            }}
            textStyle={{ fontFamily: FONTS.bold, fontSize: calcFont(14), color: COLORS.textDark }}
            width={calcWidth(343)}
            onDateChange={(date: any) => onChangeDate(date)}
            selectedStartDate={dob}
            months={[
              Trans("january"),
              Trans("february"),
              Trans("march"),
              Trans("april"),
              Trans("may"),
              Trans("june"),
              Trans("july"),
              Trans("august"),
              Trans("september"),
              Trans("october"),
              Trans("november"),
              Trans("december"),
            ]}
            weekdays={[
              Trans("_Sunday"),
              Trans("_Monday"),
              Trans("_Tuesday"),
              Trans("_Wednesday"),
              Trans("_Thursday"),
              Trans("_Friday"),
              Trans("_Saturday"),
            ]}
          />
        </View>
      </Modal>
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
      {modalCalender()}
      {loadingSection()}
    </ImageBackground>
  )
}
export default Register
