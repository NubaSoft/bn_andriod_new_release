import React, { useEffect, useState } from "react"
import { Alert, FlatList, Image, ScrollView, StatusBar, TouchableOpacity, View } from "react-native"
import styles from "./styles"
import { useNavigation } from "@react-navigation/native"
import { RootState, useAppDispatch } from "../../../redux/store/store"
import AppText from "../../../components/AppText"
import { calcFont, calcHeight, calcWidth } from "../../../utils/sizes"
import { COLORS, FONTS } from "../../../utils/theme"
import AppHeaderDefault from "../../../components/AppHeaderDefault"
import { IMAGES } from "../../../assets/Images"
import Carousel from "react-native-reanimated-carousel"
import AppTextLine from "../../../components/AppTextLine"
import PlanItem from "../../../components/PlanItem"
import MealItem from "../../../components/MealItem"
import ModalShowMeal from "../../../components/ModalShowMeal"
import ModalShowSubscription from "../../../components/ModalShowSubscription"
import { Trans } from "../../../translation"
import { topMeals } from "../../../middleware/general/topMeals"
import { topSubscriptions } from "../../../middleware/general/topSubscriptions"

import { sliderHome } from "../../../middleware/general/sliderHome"
import { useSelector } from "react-redux"
import AppLoading from "../../../components/AppLoading"
import { subscriptionDetails } from "../../../middleware/subscriptions/subscriptionDetails"

const Home: React.FC = () => {
  const navigation = useNavigation<any>()
  const dispatch = useAppDispatch()
  const { userData }: { userData: any } = useSelector((store: RootState) => store?.storage)
  const { sliderHomeData, sliderHomeLoader } = useSelector((store: RootState) => store?.sliderHome)
  const { topMealsData, topMealsLoader }: { topMealsData: any; topMealsLoader: boolean } =
    useSelector((store: RootState) => store?.topMeals)
  const {
    topSubscriptionsData,
    topSubscriptionsLoader,
  }: { topSubscriptionsData: any; topSubscriptionsLoader: boolean } = useSelector(
    (store: RootState) => store?.topSubscriptions,
  )
  const [viewPagerIndex, setViewPagerIndex] = useState<number>(0)
  const [topMealsList, setTopMealsList] = useState<any>("")
  const [selectMeal, setSelectMeal] = useState<any>({})
  const [selectSubscription, setSelectSubscription] = useState<any>({})
  const [visible_Meal, setVisible_Meal] = useState<boolean>(false)
  const [visible_Subscription, setVisible_Subscription] = useState<boolean>(false)
  console.log("sliderHomeData----------", sliderHomeData)
  useEffect(() => {
    dispatch(topMeals({}))
    dispatch(topSubscriptions({}))
    // dispatch(availablePackagesAll({}))
    dispatch(sliderHome({}))
    dispatch(subscriptionDetails({}))
  }, [])

  useEffect(() => {
    if (topMealsData?.length >= 1) {
      var mealsList: any[] = []
      for (let i = 0; i < topMealsData.length; i++) {
        const items = topMealsData[i]?.items
        if (items?.length >= 2) {
          for (let a = 0; a < 2; a++) {
            mealsList.push(items[a])
          }
        } else {
          for (let a = 0; a < items?.length; a++) {
            mealsList.push(topMealsData[i]?.items[a])
          }
        }
      }
      setTopMealsList(mealsList)
    }
  }, [topMealsData])

  const headerSection = () => {
    return <AppHeaderDefault image={IMAGES.logo} />
  }

  const sliderSection = () => {
    const renderItemSlider = ({ item, index }: { item: any; index: number }) => {
      return (
        <View key={index} style={styles.sliderItemContainer}>
          <Image source={{ uri: item?.large_img }} style={styles.sliderImage} />
        </View>
      )
    }

    return (
      <View style={styles.sliderContainer}>
        {/* <Carousel
          loop
          width={calcWidth(375)}
          height={calcWidth(300)}
          autoPlay={true}
          data={sliderHomeData}
          scrollAnimationDuration={3000}
          onSnapToItem={(index: number) => setViewPagerIndex(index)}
          renderItem={renderItemSlider}
        /> */}
        <View style={styles.sliderTopContainer}>
          <View style={styles.sliderTopProfileContainer}>
            <TouchableOpacity style={styles.sliderTopProfileView}>
              <View style={styles.sliderTopProfileIconView}>
                <Image source={IMAGES.user} style={styles.sliderTopProfileIcon} />
              </View>
              <AppText
                title={`${Trans("welcome")} ${userData?.name}`}
                fontSize={calcFont(16)}
                fontFamily={FONTS.bold}
                color={COLORS.textDark}
                lineHeight={calcHeight(18)}
                width={calcWidth(240)}
                textAlign={"left"}
                marginBottom={calcHeight(-8)}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={IMAGES.notification} style={styles.sliderTopProfileNotification} />
            </TouchableOpacity>
          </View>
          <View style={styles.sliderBointsContainer}>
            {sliderHomeData?.length >= 1 &&
              sliderHomeData?.map((item: any, index: number) => {
                return (
                  <View
                    key={index}
                    style={
                      viewPagerIndex == index
                        ? styles.sliderBointSelect
                        : styles.sliderBointUnSelect
                    }
                  />
                )
              })}
          </View>
        </View>
      </View>
    )
  }

  const wePlannedSection = () => {
    const renderPlannedItem = ({ item, index }: { item: any; index: number }) => {
      return (
        <PlanItem
          index={index}
          item={item}
          onPress={() => {
            setSelectSubscription(item)
            setVisible_Subscription(true)
          }}
        />
      )
    }

    return (
      <View style={styles.wePlannedContainer}>
        <AppTextLine
          title={Trans("wePlanned")}
          fontFamily={FONTS.bold}
          more={Trans("viewAll")}
          onPress={() =>
            navigation.navigate("SubscriptionsDetailsStack", { screen: "WeSubscriptionsList" })
          }
        />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={topSubscriptionsData}
          renderItem={renderPlannedItem}
          keyExtractor={item => `${item?.id}`}
        />
      </View>
    )
  }

  const ourMealsListSection = () => {
    const renderOurListItem = ({ item, index }: { item: any; index: number }) => {
      return (
        <MealItem
          index={index}
          item={item}
          onPress={() => {
            setSelectMeal(item)
            setVisible_Meal(true)
          }}
        />
      )
    }

    return (
      <View style={styles.newMenuContainer}>
        <AppTextLine
          title={Trans("ourList")}
          fontFamily={FONTS.bold}
          more={Trans("viewAll")}
          onPress={() =>
            navigation.navigate("HomeDetailsStack", { screen: "OurMealsList", item: {} })
          }
        />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={topMealsList}
          renderItem={renderOurListItem}
          keyExtractor={item => `${item?.id}`}
        />
      </View>
    )
  }

  const modalShowMeal = () => {
    return (
      <ModalShowMeal
        visible={visible_Meal}
        onClose={() => setVisible_Meal(false)}
        item={selectMeal}
      />
    )
  }

  const modalShowSubscription = () => {
    const onSubscriptionNow = () => {
      if (userData?.id) {
        console.log("item==============", selectSubscription)
      } else {
        Alert.alert(Trans("notLoggedYet"), "", [
          {
            text: Trans("login"),
            onPress: () => {
              setVisible_Subscription(false)
              navigation.navigate("AuthenticationStack")
            },
          },
          {
            text: Trans("cancel"),
            onPress: () => {},
            style: "cancel",
          },
        ])
      }
    }
    return (
      <ModalShowSubscription
        visible={visible_Subscription}
        onClose={() => setVisible_Subscription(false)}
        item={selectSubscription}
      />
    )
  }

  const loadingSection = () => {
    return (
      <AppLoading
        margin_top={calcHeight(400)}
        size={"large"}
        visible={sliderHomeLoader || topMealsLoader || topSubscriptionsLoader}
      />
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      {/* {headerSection()} */}
      {sliderSection()}
      <ScrollView>
        {wePlannedSection()}
        {ourMealsListSection()}
      </ScrollView>
      {modalShowMeal()}
      {modalShowSubscription()}
      {loadingSection()}
    </View>
  )
}

export default Home
