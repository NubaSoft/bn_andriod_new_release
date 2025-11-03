import React, { useEffect, useState } from "react"
import { Alert, StatusBar, View } from "react-native"
import styles from "./styles"
import { useNavigation } from "@react-navigation/native"
import { RootState, useAppDispatch } from "../../../redux/store/store"
import AppText from "../../../components/AppText"
import { calcFont, calcHeight, calcWidth } from "../../../utils/sizes"
import { COLORS, FONTS } from "../../../utils/theme"
import AppHeaderDefault from "../../../components/AppHeaderDefault"
import CalendarPicker from "react-native-calendar-picker"
import AppButtonDefault from "../../../components/AppButtonDefault"
import { Trans } from "../../../translation"
import { useSelector } from "react-redux"
import { subscribtionStartDates } from "../../../middleware/subscriptions/subscribtionStartDates"
import AppLoading from "../../../components/AppLoading"
import { addDietDetails } from "../../../middleware/subscriptions/addDietDetails"
import endpoints from "../../../network/endpoints"
import * as Device from "expo-device"

const PickStartDate: React.FC = (params: any) => {
  console.log("params=============", params?.route?.params?.subscription)
  const subscription: any = params?.route?.params?.subscription
  const navigation = useNavigation<any>()
  const dispatch = useAppDispatch()
  const {
    subscriptionLoader,
    renewSend,
    subscribtionStartDatesData,
  }: {
    subscriptionLoader: boolean
    renewSend: number
    subscribtionStartDatesData: any
  } = useSelector((store: RootState) => store?.subscriptions)
  console.log("subscribtionStartDatesData============", subscribtionStartDatesData)

  const [firstDay, setFirstDay] = useState<any>("")

  useEffect(() => {
    dispatch(
      subscribtionStartDates({
        offDays: params?.route?.params?.subscription?.offDays,
        renew_send: renewSend,
      }),
    )
  }, [])
  const headerSection = () => {
    return (
      <AppHeaderDefault
        back
        title={Trans("pickStartDate")}
        onPressBack={() => navigation.goBack()}
      />
    )
  }

  const onChangeDate = (date: any) => {
    setFirstDay(date)
  }

  const onNext = () => {
    if (firstDay == "") {
      Alert.alert(Trans("chooseFirstDaySubscription"))
    } else {
      const data = {
        dietDetails: {
          renew: renewSend,
          dietGoal: 1, //
          allergieItems: [],
          dislikeItems: [],
          offDays: subscription?.offDays, //
          centerId: endpoints.branch_code,
          // platform: Device.osName,
        },
        subscription,
        firstDay: firstDay.format("YYYY-MM-DD"),
        navigation,
        from: "fastRenewal",
      }
      console.log("data----next---------", data)

      dispatch(addDietDetails(data))
      // navigation.navigate("ReviewAndPayment")
    }
  }

  const calenderSection = () => {
    return (
      <View style={styles.firstDaySubscriptionContainer}>
        <AppText
          title={Trans("chooseFirstDaySubscription")}
          fontSize={calcFont(18)}
          fontFamily={FONTS.bold}
          color={COLORS.textDark}
          lineHeight={calcHeight(23)}
          marginBottom={calcHeight(2)}
          textAlign={"left"}
          required
        />
        <View style={styles.calenderContainer}>
          <CalendarPicker
            todayBackgroundColor={COLORS.primaryLight}
            // todayTextStyle={{ color: COLORS.white }}
            selectedDayColor={COLORS.primary}
            selectedDayTextColor="#FFFFFF"
            minDate={new Date()}
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
            selectedStartDate={firstDay}
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
            disabledDates={(date: any) => {
              if (subscribtionStartDatesData.includes(date.format("YYYY-MM-DD"))) {
                return false
              } else {
                return true
              }
            }}
          />
        </View>
        <AppButtonDefault
          onPress={() => onNext()}
          width={calcWidth(343)}
          height={calcHeight(45)}
          backgroundColor={COLORS.primary}
          title={Trans("next")}
          fontFamily={FONTS.extra_bold}
          fontSize={calcFont(16)}
          titleColor={COLORS.textDark}
          buttonStyle={styles.buttonContainer}
        />
      </View>
    )
  }

  const loadingSection = () => {
    return <AppLoading margin_top={calcHeight(400)} size={"large"} visible={subscriptionLoader} />
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      {headerSection()}
      {calenderSection()}
      {loadingSection()}
    </View>
  )
}

export default PickStartDate
