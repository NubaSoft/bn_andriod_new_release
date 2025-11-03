import React, { useEffect, useState } from "react"
import { FlatList, I18nManager, StatusBar, View } from "react-native"
import styles from "./styles"
import { useNavigation } from "@react-navigation/native"
import { RootState, useAppDispatch } from "../../../redux/store/store"
import { calcHeight, calcWidth } from "../../../utils/sizes"
import AppHeaderDefault from "../../../components/AppHeaderDefault"
import MealItem from "../../../components/MealItem"
import AppTab from "../../../components/AppTab"
import { Trans } from "../../../translation"
import { useSelector } from "react-redux"
import AppLoading from "../../../components/AppLoading"
import ModalShowMeal from "../../../components/ModalShowMeal"

const OurMealsList: React.FC = () => {
  const navigation = useNavigation<any>()
  const dispatch = useAppDispatch()
  const { topMealsData }: { topMealsData: any } = useSelector((store: RootState) => store?.topMeals)
  const [loading, setLoading] = useState<boolean>(false)
  const [selectCatigory, setSelectCatigory] = useState<any>("")
  const [selectMeal, setSelectMeal] = useState<any>({})
  const [visible_Meal, setVisible_Meal] = useState<boolean>(false)

  const onSelectCatigory = (item: any) => {
    setLoading(true)
    setSelectCatigory(item)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)
  }
  useEffect(() => {
    onSelectCatigory(topMealsData[0])
  }, [])

  const headerSection = () => {
    return (
      <AppHeaderDefault title={Trans("ourList")} back onPressBack={() => navigation.goBack()} />
    )
  }

  const tabsSection = () => {
    const renderTabItem = ({ item, index }: { item: any; index: number }) => {
      return (
        <AppTab
          key={index}
          onPress={() => onSelectCatigory(item)}
          containerStyle={{ marginStart: calcWidth(16) }}
          select={selectCatigory?.mealTypeEn == item?.mealTypeEn}
          title={I18nManager.isRTL ? item?.mealTypeAr : item?.mealTypeEn}
        />
      )
    }
    return (
      <View style={styles.tabsContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={topMealsData}
          renderItem={renderTabItem}
          keyExtractor={(item, index) => `${index}`}
        />
      </View>
    )
  }
  const listSection = () => {
    const renderOurListItem = ({ item, index }: { item: any; index: number }) => {
      return (
        <MealItem
          index={index}
          item={item}
          onPress={() => {
            setSelectMeal(item)
            setVisible_Meal(true)
          }}
          styleContainer={styles.itemContainer}
        />
      )
    }

    return (
      <View style={styles.listContainer}>
        <FlatList
          contentContainerStyle={{ paddingBottom: calcHeight(200) }}
          showsVerticalScrollIndicator={false}
          data={selectCatigory?.items}
          renderItem={renderOurListItem}
          keyExtractor={(item, index) => `${index}`}
          numColumns={2}
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

  const loadingSection = () => {
    return <AppLoading margin_top={calcHeight(400)} size={"large"} visible={loading} />
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      {headerSection()}
      {tabsSection()}
      {listSection()}
      {modalShowMeal()}
      {loadingSection()}
    </View>
  )
}

export default OurMealsList
