import React, { useEffect, useState } from "react"
import {
  Alert,
  FlatList,
  I18nManager,
  Image,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native"
import styles from "./styles"
import { useNavigation } from "@react-navigation/native"
import { RootState, useAppDispatch } from "../../../redux/store/store"
import AppHeaderDefault from "../../../components/AppHeaderDefault"
import { Trans } from "../../../translation"
import PickerSelect from "../../../components/PickerSelect"
import { calcFont, calcHeight, calcWidth } from "../../../utils/sizes"
import { COLORS, FONTS } from "../../../utils/theme"
import AppText from "../../../components/AppText"
import ModalSelectItem from "../../../components/ModalSelectItem"
import { IMAGES } from "../../../assets/Images"
import CalendarPicker from "react-native-calendar-picker"
import AppButtonDefault from "../../../components/AppButtonDefault"
import { dietTypes } from "../../../middleware/subscriptions/dietTypes"
import { addDietDetails } from "../../../middleware/subscriptions/addDietDetails"
import { subscribtionStartDates } from "../../../middleware/subscriptions/subscribtionStartDates"
import { useSelector } from "react-redux"
import AppLoading from "../../../components/AppLoading"
import endpoints from "../../../network/endpoints"
import * as Device from "expo-device"

const SubscriptionData: React.FC<{}> = (params: any) => {
  const subscription: any = params?.route?.params
  console.log("subscription----------", subscription)

  const navigation = useNavigation<any>()
  const dispatch = useAppDispatch()
  const {
    subscriptionLoader,
    dietTypesData,
    renewSend,
    subscribtionStartDatesData,
  }: {
    subscriptionLoader: boolean
    dietTypesData: any
    renewSend: number
    subscribtionStartDatesData: any
  } = useSelector((store: RootState) => store?.subscriptions)

  const [dietTypesList, setDietTypesList] = useState<any>([])
  const [selectDietType, setSelectDietType] = useState<any>("")
  const [selectItemDay, setSelectItemDay] = useState<any[]>([])
  const [firstDay, setFirstDay] = useState<any>("")
  const [checkDietType, setCheckDietType] = useState<boolean>(false)
  const [visible_DietType, setVisible_DietType] = useState<boolean>(false)
  const DAYES: any[] = [
    { id: 1, key: "Saturday", name: Trans("Saturday") },
    { id: 2, key: "Sunday", name: Trans("Sunday") },
    { id: 3, key: "Monday", name: Trans("Monday") },
    { id: 4, key: "Tuesday", name: Trans("Tuesday") },
    { id: 5, key: "Wednesday", name: Trans("Wednesday") },
    { id: 6, key: "Thursday", name: Trans("Thursday") },
    { id: 7, key: "Friday", name: Trans("Friday") },
  ]

  useEffect(() => {
    dispatch(dietTypes({ renew_send: renewSend }))
  }, [])

  useEffect(() => {
    if (dietTypesData != "") {
      dietTypesData?.dietGoals
      var list: any[] = []
      for (let i = 0; i < dietTypesData?.dietGoals.length; i++) {
        list.push({
          label: dietTypesData?.dietGoals[i].nameEn,
          name: I18nManager.isRTL
            ? dietTypesData?.dietGoals[i].nameAr
            : dietTypesData?.dietGoals[i].nameEn,
          value: dietTypesData?.dietGoals[i].id,
          id: dietTypesData?.dietGoals[i].id,
        })
      }
      setDietTypesList(list)
    }
  }, [dietTypesData])

  useEffect(() => {
    let offDays: any[] = []
    for (let i = 0; i < selectItemDay.length; i++) {
      offDays.push(selectItemDay[i].key)
    }
    setFirstDay("")
    dispatch(subscribtionStartDates({ offDays, renew_send: renewSend }))
  }, [selectItemDay])

  const headerSection = () => {
    return (
      <AppHeaderDefault
        back
        title={Trans("subscriptionData")}
        onPressBack={() => navigation.goBack()}
      />
    )
  }
  const dietSection = () => {
    const renderDayItem = ({ item, index }: { item: any; index: number }) => {
      const setArray = (item: any) => {
        var _Array: any = selectItemDay
        const find = [...selectItemDay].findIndex((e: any) => e.id === item.id)
        find == -1 ? _Array.push(item) : _Array.splice(find, 1)
        setSelectItemDay([..._Array])
      }
      let selectedItem: boolean = [...selectItemDay].findIndex((e: any) => e.id === item.id) != -1
      return (
        <TouchableOpacity
          onPress={() => setArray(item)}
          style={[
            styles.dietTypeDaysItemContainer,
            { borderColor: selectedItem ? COLORS.primary : COLORS.textLight },
          ]}>
          <AppText
            title={item?.name}
            fontSize={calcFont(13)}
            fontFamily={FONTS.bold}
            color={selectedItem ? COLORS.primary : COLORS.textLight}
            lineHeight={calcHeight(14)}
            textAlign={"left"}
          />
          <Image
            source={selectedItem ? IMAGES.switch_active : IMAGES.switch_inActive}
            style={styles.dietTypeDaysItemIcon}
          />
        </TouchableOpacity>
      )
    }
    return (
      <View style={styles.dietTypeContainer}>
        <PickerSelect
          containerStyle={{
            width: calcWidth(343),
            marginTop: calcHeight(8),
          }}
          viewStyle={{ width: calcWidth(343) }}
          title={Trans("dietType")}
          fontSize={calcFont(18)}
          fontFamily={FONTS.bold}
          value={selectDietType ? selectDietType?.name : Trans("dietType")}
          onPress={() => setVisible_DietType(true)}
          error={checkDietType}
          errorMessage={Trans("dietTypeRequired")}
          required
        />
        <View style={styles.dietTypeDaysContainer}>
          <AppText
            title={Trans("dontWantEatDays")}
            fontSize={calcFont(18)}
            fontFamily={FONTS.bold}
            color={COLORS.textDark}
            lineHeight={calcHeight(23)}
            marginBottom={calcHeight(2)}
            textAlign={"left"}
            required
          />
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={DAYES}
            renderItem={renderDayItem}
            keyExtractor={item => `${item}`}
            numColumns={4}
          />
        </View>
      </View>
    )
  }

  const firstDaySubscriptionSection = () => {
    const onNext = () => {
      if (!selectDietType) {
        setCheckDietType(true)
      } else if (firstDay == "") {
        Alert.alert(Trans("chooseFirstDaySubscription"))
      } else {
        var offDays: any[] = []
        for (let i = 0; i < selectItemDay.length; i++) {
          offDays.push(selectItemDay[i].key)
        }
        // meals: pckg.meals,
        // days: item.days,
        // snacks: pckg.snacks,
        // menuID: pckg.menuID,
        // price: item.price,
        const data = {
          dietDetails: {
            renew: renewSend,
            dietGoal: selectDietType?.id,
            allergieItems: [],
            dislikeItems: [],
            offDays,
            centerId: endpoints.branch_code,
            // platform: Device.osName,
          },
          subscription,
          firstDay: firstDay.format("YYYY-MM-DD"),
          navigation,
          from: "newSubscription",
        }
        console.log("data----next---------", data)

        dispatch(addDietDetails(data))
        // navigation.navigate("ReviewAndPayment")
      }
    }
    const customDatesStylesCallback = () => {
      return {
        style: {
          backgroundColor: COLORS.primary,
        },
      }
    }
    const onChangeDate = (date: any) => {
      setFirstDay(date)
    }
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
  const modalDietType = () => {
    return (
      <ModalSelectItem
        visible={visible_DietType}
        onClose={() => {
          setVisible_DietType(false)
        }}
        onSelectItem={(item: any) => {
          setSelectDietType(item)
          setCheckDietType(false)
        }}
        title={Trans("selectDietType")}
        data={dietTypesList}
        itemSelected={selectDietType}
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
      {dietSection()}
      {firstDaySubscriptionSection()}

      {loadingSection()}
      {modalDietType()}
    </View>
  )
}

export default SubscriptionData
