import React, { useEffect, useState } from "react"
import { Dimensions, StatusBar, View } from "react-native"
import styles from "./styles"
import { useNavigation } from "@react-navigation/native"
import { RootState, useAppDispatch } from "../../../redux/store/store"
import AppHeaderDefault from "../../../components/AppHeaderDefault"
import { useSelector } from "react-redux"
import AppLoading from "../../../components/AppLoading"
import MySubscriptionItem from "../../../components/MySubscriptionItem"
import { calcFont, calcHeight, calcWidth } from "../../../utils/sizes"
import { FlatList } from "react-native-gesture-handler"
import { Trans } from "../../../translation"
import { subscriptionDetails } from "../../../middleware/subscriptions/subscriptionDetails"
import { calenderDetails } from "../../../middleware/subscriptions/calenderDetails"
import moment from "moment"
import AppButtonDefault from "../../../components/AppButtonDefault"
import { COLORS, FONTS } from "../../../utils/theme"
import Modal from "react-native-modal"
import AppText from "../../../components/AppText"
import AppEmptyScreen from "../../../components/AppEmptyScreen"
import { IMAGES } from "../../../assets/Images"

const MySubscriptions: React.FC = () => {
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

  const [activeSubs, setActiveSubscriptions] = useState<any[]>([])
  const [SubsDataExist, setSubsDataExist] = useState<boolean>(false)
  const [selectSubscription, setSelectSubscription] = useState<any>({})
  const [visible_Subscription, setVisible_Subscription] = useState<boolean>(false)

  console.log("subscriptionDetailsData--------------", subscriptionDetailsData, calenderDetailsData)

  useEffect(() => {
    dispatch(subscriptionDetails({}))
    dispatch(calenderDetails({}))
  }, [])

  useEffect(() => {
    if (subscriptionDetailsData != "") {
      const todayDate = moment()
      let subscriptionNumber = 0
      const activeS = []
      subscriptionNumber = subscriptionDetailsData?.subscriptions.length
      if (subscriptionNumber !== 0) {
        for (const i in subscriptionDetailsData?.subscriptions) {
          if (
            todayDate.diff(
              moment(
                subscriptionDetailsData?.subscriptions[i].subscriptionEndDate,
                "YYYY/MM/DD",
              ).toDate(),
            )
          ) {
            activeS.push(subscriptionDetailsData?.subscriptions[i])
            setSubsDataExist(true)
          }
        }
        setActiveSubscriptions(activeS)
      } else {
        setSubsDataExist(false)
      }
    }
  }, [subscriptionDetailsData])

  const headerSection = () => {
    return (
      <AppHeaderDefault
        back
        title={Trans("mySubscriptions")}
        onPressBack={() => navigation.goBack()}
      />
    )
  }

  const bodySection = () => {
    const renderAddressItem = ({ item, index }: { item: any; index: number }) => {
      return (
        <MySubscriptionItem
          item={item}
          onPress={() => {
            setSelectSubscription(item)
            setVisible_Subscription(true)
          }}
          key={index}
        />
      )
    }

    return (
      <View style={styles.listContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={activeSubs}
          renderItem={renderAddressItem}
          keyExtractor={(item, index) => `${index}`}
        />
      </View>
    )
  }

  const actionSection = () => {
    return (
      <AppButtonDefault
        title={Trans("renewSubscription")}
        onPress={() => navigation.navigate("ChooseRenewalProcess")}
        buttonStyle={styles.buttonContainer}
        backgroundColor={COLORS.primary}
      />
    )
  }

  const modalSubscription = () => {
    const lineItem = (key?: string, value?: string) => {
      return (
        <View style={styles.lineItemContainer}>
          <AppText
            title={key}
            fontSize={calcFont(18)}
            fontFamily={FONTS.medium}
            color={COLORS.textDark}
            textAlign={"left"}
          />
          <AppText
            title={value}
            fontSize={calcFont(18)}
            fontFamily={FONTS.bold}
            color={COLORS.primary}
            textAlign={"left"}
          />
        </View>
      )
    }
    return (
      <Modal
        style={{ margin: 0, justifyContent: "flex-end" }}
        hasBackdrop
        propagateSwipe={true}
        animationIn="slideInUp"
        animationInTiming={800}
        animationOutTiming={800}
        isVisible={visible_Subscription}
        onBackdropPress={() => setVisible_Subscription(false)}
        onBackButtonPress={() => setVisible_Subscription(false)}
        deviceHeight={Dimensions.get("screen").height}
        statusBarTranslucent>
        <View style={styles.modalView}>
          <AppText
            title={selectSubscription?.subscriptionName}
            fontSize={calcFont(24)}
            fontFamily={FONTS.extra_bold}
            color={COLORS.primary}
            textAlign={"center"}
            width={calcWidth(343)}
            numberOfLines={2}
            marginBottom={calcHeight(12)}
          />
          {lineItem(Trans("packageContent"), selectSubscription?.subscriptionDescription)}
          {lineItem(Trans("totalPrice"), `${selectSubscription?.packagePrice} ${Trans("kwd")}`)}
          {lineItem(
            Trans("subscriptionPeriod"),
            `${selectSubscription?.subscriptionDays} ${Trans("day")}`,
          )}
          {lineItem(Trans("remainingDays"), `${selectSubscription?.remainingDays} ${Trans("day")}`)}
          {lineItem(Trans("startDate"), `${selectSubscription?.subscriptionStartDate}`)}
          {lineItem(Trans("endDate"), `${selectSubscription?.subscriptionEndDate}`)}
        </View>
      </Modal>
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
      {subscriptionDetailsData != "" && calenderDetailsData != ""
        ? bodySection()
        : emptySection_Subscription()}
      {subscriptionDetailsData != "" && calenderDetailsData != "" ? actionSection() : null}
      {modalSubscription()}
      {loadingSection()}
    </View>
  )
}

export default MySubscriptions
