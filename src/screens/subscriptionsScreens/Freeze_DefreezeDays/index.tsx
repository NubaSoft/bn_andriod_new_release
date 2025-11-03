import React, { useEffect, useState } from "react"
import { StatusBar, View } from "react-native"
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
import { pauseMeal } from "../../../middleware/subscriptions/pauseMeal"
import { unpauseMeal } from "../../../middleware/subscriptions/unpauseMeal"
import AppLoading from "../../../components/AppLoading"
import endpoints from "../../../network/endpoints"
import moment from "moment"

const Freeze_DefreezeDays: React.FC = (params: any) => {
  const navigation = useNavigation<any>()
  const dispatch = useAppDispatch()
  const {
    subscriptionLoader,
    subscriptionDetailsData,
    calenderDetailsData,
  }: {
    subscriptionLoader: boolean
    subscriptionDetailsData: any
    calenderDetailsData: any
  } = useSelector((store: RootState) => store?.subscriptions)

  const [subscriptionDays, setSubscriptionDays] = useState([])
  const [pausedDays, setPausedDays] = useState([])
  const [pausedDayslength, setPausedDayslength] = useState<number>()

  useEffect(() => {
    if (calenderDetailsData?.packageDates?.length >= 1) {
      const packageDates: any[] = calenderDetailsData?.packageDates
      const sdates = []
      for (let i = 0; i < packageDates.length; i++) {
        sdates.push(packageDates[i].vdate)
      }
      const sdStatus = []
      for (let i = 0; i < packageDates.length; i++) {
        sdStatus.push(packageDates[i].status)
      }
      setSubscriptionDays(sdates)
      const temppause = []
      for (let i = 0; i < sdates.length; i++) {
        if (sdStatus[i] === 2) {
          temppause.push(sdates[i])
        }
        setPausedDays(temppause)
        setPausedDayslength(temppause.length)
      }
    }
  }, [calenderDetailsData])

  const headerSection = () => {
    return (
      <AppHeaderDefault
        back
        title={Trans("freezOrDefreezeDays")}
        onPressBack={() => navigation.goBack()}
      />
    )
  }

  const customDatesStylesCallback = date => {
    const indx = subscriptionDays.indexOf(date.format("YYYY-MM-DD"))
    const pausindx = pausedDays.indexOf(date.format("YYYY-MM-DD"))
    if (pausindx !== -1) {
      return {
        style: {
          backgroundColor: COLORS.red,
        },
      }
    } else if (indx !== -1) {
      return {
        style: {
          backgroundColor: COLORS.primaryGray,
        },
      }
    }
  }
  const onChangeDate = (date: any) => {
    const indx = pausedDays.indexOf(date.format("YYYY-MM-DD"))
    let pausedD = pausedDays
    if (indx === -1) {
      pausedD.push(date.format("YYYY-MM-DD"))
    } else {
      const data = {
        unPauseDates: [date.format("YYYY-MM-DD")],
        centerId: endpoints.branch_code,
      }
      dispatch(unpauseMeal(data))
      pausedD = pausedD.filter(function (value) {
        return value !== date.format("YYYY-MM-DD")
      })
    }
    setPausedDays(pausedD)
    setPausedDayslength(pausedD.length)
  }

  const onSave = () => {
    if (pausedDays.length < 1) {
    } else {
      const filteredDates = []
      for (let i = 0; i < pausedDays.length; i++) {
        const day = moment(pausedDays[i]).format("YYYY-MM-DD")
        if (moment(day).isSameOrAfter(moment().add(2, "days"))) {
          filteredDates.push(pausedDays[i])
        }
      }
      const data = {
        pauseDates: filteredDates,
        centerId: endpoints.branch_code,
      }
      dispatch(pauseMeal({ data, navigation }))
    }
  }

  const calenderSection = () => {
    return (
      <View style={styles.subscriptionContainer}>
        <View style={styles.daysContainer}>
          <AppText
            title={`${Trans(
              "subscriptionPeriod",
            )} ${subscriptionDetailsData?.subscriptionDays} ${Trans("day")}`}
            fontSize={calcFont(18)}
            fontFamily={FONTS.bold}
            color={COLORS.textDark}
            lineHeight={calcHeight(18)}
            textAlign={"center"}
          />
        </View>
        <View style={styles.calenderContainer}>
          <CalendarPicker
            todayBackgroundColor={COLORS.primaryLight}
            // todayTextStyle={{ color: COLORS.white }}
            selectedDayColor={COLORS.primary}
            selectedDayTextColor={COLORS.textDark}
            minDate={moment().add(3, "days").toDate()}
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
            selectedDayStyle={customDatesStylesCallback}
            customDatesStyles={customDatesStylesCallback}
            onDateChange={(date: any) => onChangeDate(date)}
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
              if (subscriptionDays.includes(date.format("YYYY-MM-DD"))) {
                return false
              } else {
                return true
              }
            }}
          />
        </View>
        <View style={styles.freezContainer}>
          <AppText
            title={`${pausedDayslength} ${Trans("freezedDays")}`}
            fontSize={calcFont(18)}
            fontFamily={FONTS.bold}
            color={COLORS.textDark}
            lineHeight={calcHeight(18)}
            textAlign={"center"}
          />
        </View>
        <AppButtonDefault
          onPress={() => onSave()}
          width={calcWidth(343)}
          height={calcHeight(45)}
          backgroundColor={COLORS.primary}
          title={Trans("save")}
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

export default Freeze_DefreezeDays
