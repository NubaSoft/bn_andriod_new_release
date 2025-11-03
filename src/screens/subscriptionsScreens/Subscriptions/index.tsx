import React, { useEffect, useState } from "react"
import { Alert, StatusBar, View } from "react-native"
import styles from "./styles"
import { useNavigation } from "@react-navigation/native"
import { RootState, useAppDispatch } from "../../../redux/store/store"
import AppText from "../../../components/AppText"
import { calcFont, calcHeight, calcWidth } from "../../../utils/sizes"
import { COLORS, FONTS } from "../../../utils/theme"
import AppHeaderDefault from "../../../components/AppHeaderDefault"
import { IMAGES } from "../../../assets/Images"
import { Trans } from "../../../translation"
import AppEmptyScreen from "../../../components/AppEmptyScreen"
import { useSelector } from "react-redux"
import { subscriptionDetails } from "../../../middleware/subscriptions/subscriptionDetails"
import { calenderDetails } from "../../../middleware/subscriptions/calenderDetails"
import { mealsListByDate } from "../../../middleware/subscriptions/mealsListByDate"
import AppLoading from "../../../components/AppLoading"
import CalendarPicker from "react-native-calendar-picker"
import moment from "moment"
import AppButtonDefault from "../../../components/AppButtonDefault"
import endpoints from "../../../network/endpoints"

const subscriptionsScreens: React.FC = () => {
  const navigation = useNavigation<any>()
  const dispatch = useAppDispatch()
  const { userData }: { userData: any } = useSelector((store: RootState) => store?.storage)
  const {
    subscriptionLoader,
    subscriptionDetailsData,
    calenderDetailsData,
  }: {
    subscriptionLoader: boolean
    subscriptionDetailsData: any
    calenderDetailsData: any
  } = useSelector((store: RootState) => store?.subscriptions)

  const [subscriptionStartDate, setSubscriptionStartDate] = useState(null)
  const [subscriptionEndDate, setSubscriptionEndDate] = useState(null)
  const [subscriptionPeriod, setSubscriptionPeriod] = useState(null)
  const [subscriptionDays, setSubscriptionDays] = useState([])
  const [subscriptionDaysStatus, setSubscriptionDaysStatus] = useState([])
  const [subscriptionWeekIds, setSubscriptionWeekIds] = useState([])
  const [subscriptionDayIds, setSubscriptionDayIds] = useState([])
  const [subscriptionOIds, setSubscriptionOIds] = useState([])

  useEffect(() => {
    dispatch(subscriptionDetails({}))
    dispatch(calenderDetails({}))
  }, [])

  useEffect(() => {
    if (subscriptionDetailsData != "") {
      setSubscriptionStartDate(subscriptionDetailsData?.subscriptionStartDate)
      setSubscriptionEndDate(subscriptionDetailsData?.subscriptionEndDate)
      setSubscriptionPeriod(subscriptionDetailsData?.subscriptionDays)
    }
  }, [subscriptionDetailsData])

  useEffect(() => {
    const packageDates: any[] = calenderDetailsData?.packageDates || []

    if (packageDates.length >= 1) {
      const sdates = []
      for (let i = 0; i < packageDates.length; i++) {
        sdates.push(packageDates[i].vdate)
      }
      const sdStatus = []
      for (let i = 0; i < packageDates.length; i++) {
        sdStatus.push(packageDates[i].status)
      }
      const weekIds = []
      for (let i = 0; i < packageDates.length; i++) {
        weekIds.push(packageDates[i].weekId)
      }
      const dayIds = []
      for (let i = 0; i < packageDates.length; i++) {
        dayIds.push(packageDates[i].dayId)
      }
      const oIds = []
      for (let i = 0; i < packageDates.length; i++) {
        oIds.push(packageDates[i].oId)
      }
      setSubscriptionDaysStatus(sdStatus)
      setSubscriptionDays(sdates)
      setSubscriptionWeekIds(weekIds)
      setSubscriptionDayIds(dayIds)
      setSubscriptionOIds(oIds)
    }
  }, [calenderDetailsData])

  const headerSection = () => {
    return (
      <AppHeaderDefault
        back
        title={Trans("subscription")}
        onPressBack={() => navigation.goBack()}
      />
    )
  }

  const subscriptionSection = () => {
    const daysPeriodSection = () => {
      return (
        <View style={styles.daysPeriodContainer}>
          <View>
            <AppText
              title={subscriptionPeriod}
              fontFamily={FONTS.extra_bold}
              fontSize={calcFont(24)}
              textAlign={"center"}
              color={COLORS.primary}
              lineHeight={calcHeight(30)}
              textTransform
            />
            <AppText
              title={Trans("day")}
              fontFamily={FONTS.bold}
              fontSize={calcFont(18)}
              textAlign={"center"}
              color={COLORS.textDark}
              lineHeight={calcHeight(16)}
              marginBottom={calcWidth(8)}
            />
            <View style={styles.daysPeriodView}>
              <AppText
                title={`${subscriptionStartDate} - ${subscriptionEndDate}`}
                fontFamily={FONTS.medium}
                fontSize={calcFont(18)}
                textAlign={"center"}
                color={COLORS.textDark}
              />
            </View>
            <AppButtonDefault
              onPress={() =>
                navigation.navigate("SubscriptionsDetailsStack", { screen: "Freeze_DefreezeDays" })
              }
              width={calcWidth(200)}
              height={calcHeight(36)}
              backgroundColor={COLORS.primary}
              title={Trans("freezeDays")}
              fontFamily={FONTS.extra_bold}
              fontSize={calcFont(16)}
              titleColor={COLORS.textDark}
              buttonStyle={styles.buttonContainer}
            />
          </View>
        </View>
      )
    }

    const calendarSection = () => {
      const bibliography: any[] = [
        {
          id: 1,
          name: Trans("activeWithMeals"),
          color: COLORS.green,
        },
        {
          id: 1,
          name: Trans("activeWithoutMeals"),
          color: COLORS.yellow,
        },
        {
          id: 1,
          name: Trans("paused"),
          color: COLORS.red,
        },
        {
          id: 1,
          name: Trans("posted"),
          color: COLORS.silver,
        },
      ]
      const customDatesStylesCallback = (date: any) => {
        const indx = subscriptionDays?.indexOf(date.format("YYYY-MM-DD"))
        const statusCode = subscriptionDaysStatus[indx]

        switch (statusCode) {
          case 0:
            return {
              style: {
                backgroundColor: COLORS.yellow,
              },
            }

          case 1:
            return {
              style: {
                backgroundColor: COLORS.silver,
              },
            }

          case 2:
            return {
              style: {
                backgroundColor: COLORS.red,
              },
            }
          case 3:
            return {
              style: {
                backgroundColor: COLORS.green,
              },
            }
        }
      }

      const selectedDateChanged = (selDate: any) => {
        const indx = subscriptionDays.indexOf(selDate.format("YYYY-MM-DD"))
        const statusCode = subscriptionDaysStatus[indx]
        const weekId = subscriptionWeekIds[indx]
        const dayId = subscriptionDayIds[indx]
        const centerId = endpoints.branch_code
        const oId = subscriptionOIds[indx]
        console.log("statusCode----------------", statusCode)
        if (statusCode === 2) {
          Alert.alert(Trans("pleaseUnfreezeDayFirst"))
        } else if (statusCode === 3) {
          Alert.alert(Trans("orderConfirmedTodayCannotChanged"))
          const data = {
            vdate: selDate.format("YYYY-MM-DD"),
            weekId: parseInt(weekId),
            dayId: parseInt(dayId),
            centerId: endpoints.branch_code,
            navigation,
            mealsDate: selDate.format("dddd, DD/MM"),
            oId,
            status: statusCode,
          }
          dispatch(mealsListByDate(data))
        } else {
          const data = {
            vdate: selDate.format("YYYY-MM-DD"),
            weekId: parseInt(weekId),
            dayId: parseInt(dayId),
            centerId: endpoints.branch_code,
            navigation,
            mealsDate: selDate.format("dddd, DD/MM"),
            oId,
            status: statusCode,
          }
          dispatch(mealsListByDate(data))
        }
      }

      return (
        <View style={styles.calendarContainer}>
          <AppText
            title={Trans("chooseDayPickMeals")}
            fontFamily={FONTS.bold}
            fontSize={calcFont(18)}
            textAlign={"center"}
            color={COLORS.textDark}
            lineHeight={calcHeight(16)}
            width={calcWidth(343)}
            marginBottom={calcHeight(16)}
          />
          <CalendarPicker
            todayBackgroundColor={COLORS.primary}
            // selectedDayStyle={{ backgroundColor: COLORS.secondary }}
            customDatesStyles={customDatesStylesCallback}
            onDateChange={selectedDateChanged}
            minDate={moment().toDate()}
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
            width={calcWidth(343)}
            disabledDatesTextStyle={{ color: COLORS.black }}
            textStyle={{ fontFamily: FONTS.bold, fontSize: calcFont(14), color: COLORS.textDark }}
            disabledDates={(date: any) => {
              if (subscriptionDays.includes(date.format("YYYY-MM-DD"))) {
                return false
              } else {
                return true
              }
            }}
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
          <View style={styles.bibliographyContainer}>
            {bibliography.map((item: any, index: number) => {
              return (
                <View key={index} style={styles.bibliographyItemContainer}>
                  <View style={[styles.bibliographyItemView, { backgroundColor: item.color }]} />
                  <AppText
                    title={item?.name}
                    fontFamily={FONTS.bold}
                    fontSize={calcFont(14)}
                    textAlign={"left"}
                    color={item?.color}
                    lineHeight={calcHeight(16)}
                    textTransform
                  />
                </View>
              )
            })}
          </View>
        </View>
      )
    }
    return (
      <>
        {daysPeriodSection()}
        {calendarSection()}
      </>
    )
  }

  const emptySection_Login = () => {
    return (
      <AppEmptyScreen
        containerStyle={{ marginTop: calcHeight(120) }}
        image={IMAGES.empty_Login}
        imageStyle={{
          width: calcWidth(240),
          height: calcHeight(240),
          marginBottom: calcHeight(32),
        }}
        title={Trans("notLoggedYet")}
        fontSize={calcFont(18)}
        fontFamily={FONTS.bold}
        textColor={COLORS.textDark}
        textAlign={"center"}
        textWidth={calcWidth(343)}
        buttonTitle={Trans("login")}
        onPress={() => navigation.navigate("AuthenticationStack")}
      />
    )
  }

  const emptySection_Subscription = () => {
    return (
      <AppEmptyScreen
        containerStyle={{ marginTop: calcHeight(120) }}
        image={IMAGES.empty_Package}
        imageStyle={{
          width: calcWidth(240),
          height: calcHeight(240),
          marginBottom: calcHeight(32),
        }}
        title={Trans("noCurrentActivePackages")}
        fontSize={calcFont(18)}
        fontFamily={FONTS.bold}
        textColor={COLORS.textDark}
        textAlign={"center"}
        textWidth={calcWidth(343)}
        buttonTitle={Trans("subscribeNow")}
        onPress={() =>
          navigation.navigate("SubscriptionsDetailsStack", { screen: "WeSubscriptionsList" })
        }
      />
    )
  }

  const loadingSection = () => {
    return <AppLoading margin_top={calcHeight(400)} size={"large"} visible={subscriptionLoader} />
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      {headerSection()}
      {!userData?.id
        ? emptySection_Login()
        : subscriptionDetailsData != "" && calenderDetailsData != ""
        ? subscriptionSection()
        : subscriptionLoader
        ? null
        : emptySection_Subscription()}
      {loadingSection()}
    </View>
  )
}

export default subscriptionsScreens
