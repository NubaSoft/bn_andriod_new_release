import React, { useEffect, useState } from "react"
import { Alert, FlatList, I18nManager, StatusBar, View } from "react-native"
import styles from "./styles"
import { useNavigation } from "@react-navigation/native"
import { RootState, useAppDispatch } from "../../../redux/store/store"
import AppText from "../../../components/AppText"
import { calcFont, calcHeight, calcWidth } from "../../../utils/sizes"
import { COLORS, FONTS } from "../../../utils/theme"
import AppHeaderDefault from "../../../components/AppHeaderDefault"
import AppButtonDefault from "../../../components/AppButtonDefault"
import { Trans } from "../../../translation"
import { useSelector } from "react-redux"
import AppLoading from "../../../components/AppLoading"
import AppTab from "../../../components/AppTab"
import ManageMealItem from "../../../components/ManageMealItem"
import endpoints from "../../../network/endpoints"
import { setMeals } from "../../../middleware/subscriptions/setMeals"

const ManageMeals: React.FC = (params: any) => {
  const Data: any = params?.route?.params?.data
  const navigation = useNavigation<any>()
  const dispatch = useAppDispatch()
  const {
    subscriptionLoader,
    mealsListByDateData,
  }: {
    subscriptionLoader: boolean
    mealsListByDateData: any
  } = useSelector((store: RootState) => store?.subscriptions)

  const [selectedMeals, setSelectedMeals] = useState({})
  const [selectCatigory, setSelectCatigory] = useState<any>("")
  const [indexSelectCatigory, setIndexSelectCatigory] = useState<any>(0)
  const [totalCarbs, setTotalCarbs] = useState<number>(0)
  const [totalProteins, setTotalProteins] = useState<number>(0)
  const [totalFats, setTotalFats] = useState<number>(0)
  const [totalCalories, setTotalCalories] = useState<number>(0)
  const [currentSelectedMeals, setCurrentSelectedMeals] = useState<any>([])

  console.log("Data-----ManageMeals-------", Data)
  console.log("mealsListByDateData-----ManageMeals-------", mealsListByDateData)

  useEffect(() => {
    if (mealsListByDateData?.length >= 1) {
      setSelectCatigory(mealsListByDateData[0])
      setIndexSelectCatigory(0)
      const selMeals = {}
      for (let a = 0; a < mealsListByDateData?.length; a++) {
        var meals: any[] = mealsListByDateData[a]?.mealListItems
        for (let b = 0; b < meals.length; b++) {
          const meal: any = meals[b]
          if (meal?.mealSelected) {
            selMeals[mealsListByDateData[a].categoryId] = meal["id"]
          }
        }
      }
      console.log("selMeals------------------", selMeals)
      // setSelectedMeal(selMeals["1"])
      setSelectedMeals(selMeals)
      onCalc()
    }
  }, [mealsListByDateData])

  useEffect(() => {
    onCalc()
  }, [selectedMeals, selectCatigory])

  const headerSection = () => {
    return (
      <AppHeaderDefault
        back
        title={`${Trans("manageMeals")} (${Data?.vdate})`}
        onPressBack={() => navigation.goBack()}
      />
    )
  }

  const onCalc = () => {
    let carbs = 0
    let proteins = 0
    let fats = 0
    let calories = 0
    const result: any[] = Object.entries(selectedMeals).map(([key, value]) => ({
      categoryId: Number(key),
      mealId: value,
    }))
    console.log("===onCalc=============>>>>>>>>>>>", selectedMeals, result, mealsListByDateData)
    let mealsList: any[] = []
    for (let c = 0; c < mealsListByDateData?.length; c++) {
      for (let r = 0; r < result?.length; r++) {
        if (result[r]?.categoryId == mealsListByDateData[c]?.categoryId) {
          for (let m = 0; m < mealsListByDateData[c]?.mealListItems?.length; m++) {
            if (result[r]?.mealId == mealsListByDateData[c]?.mealListItems[m]?.id) {
              mealsList.push(mealsListByDateData[c]?.mealListItems[m])
            }
          }
        }
      }
    }
    console.log("===mealsList=============>>>>>>>>>>>", mealsList)
    setCurrentSelectedMeals(mealsList)
    for (let c = 0; c < mealsList?.length; c++) {
      carbs = carbs + mealsList[c].carbs
      proteins = proteins + mealsList[c].proteins
      fats = fats + mealsList[c].fats
      calories = calories + mealsList[c].calories
    }
    setTotalCarbs(carbs)
    setTotalProteins(proteins)
    setTotalFats(fats)
    setTotalCalories(calories)
    console.log("==calculator=========>>>>>>>", carbs, proteins, fats, calories)
  }

  const calculatorSection = () => {
    const calenderItem = (key?: string, value?: number) => {
      return (
        <View style={styles.calculatorItemContainer}>
          <AppText
            title={key}
            fontFamily={FONTS.medium}
            fontSize={calcFont(18)}
            textAlign={"center"}
            color={COLORS.textLight}
            lineHeight={calcHeight(16)}
            marginBottom={calcHeight(10)}
          />
          <AppText
            title={value}
            fontFamily={FONTS.bold}
            fontSize={calcFont(18)}
            textAlign={"center"}
            color={COLORS.textDark}
            lineHeight={calcHeight(16)}
          />
        </View>
      )
    }
    return (
      <View style={styles.calculatorContainer}>
        {calenderItem(Trans("carbs"), totalCarbs)}
        {calenderItem(Trans("proteins"), totalProteins)}
        {calenderItem(Trans("fats"), totalFats)}
        {calenderItem(Trans("calories"), totalCalories)}
      </View>
    )
  }

  const categoriesSection = () => {
    const renderTabItem = ({ item, index }: { item: any; index: number }) => {
      return (
        <AppTab
          key={index}
          onPress={() => {
            setSelectCatigory(item)
            setIndexSelectCatigory(index)
          }}
          containerStyle={{ marginStart: calcWidth(16) }}
          select={selectCatigory?.mealId == item?.mealId}
          title={I18nManager.isRTL ? item?.titleAr : item?.titleEn}
        />
      )
    }
    return (
      <View style={styles.categoriesContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={mealsListByDateData}
          renderItem={renderTabItem}
          keyExtractor={(item, index) => `${index}`}
        />
      </View>
    )
  }

  const listSection = () => {
    const onSelectMeal = (mealId?: number, categoryId?: number) => {
      var _selectedMeals: any = selectedMeals
      _selectedMeals[categoryId] = mealId
      console.log("_selectedMeals=======>>>>>>>>", _selectedMeals)

      setSelectedMeals(_selectedMeals)
      if (mealsListByDateData?.length > indexSelectCatigory + 1) {
        setSelectCatigory(mealsListByDateData[indexSelectCatigory + 1])
        setIndexSelectCatigory(indexSelectCatigory + 1)
      } else {
        setSelectCatigory(mealsListByDateData[0])
        setIndexSelectCatigory(0)
      }
    }
    const renderOurListItem = ({ item, index }: { item: any; index: number }) => {
      const selectMealInCategory: any = selectedMeals[selectCatigory?.categoryId]
      const select: boolean = item?.id == selectMealInCategory
      return (
        <ManageMealItem
          index={index}
          item={item}
          onPress={() => onSelectMeal(item?.id, selectCatigory?.categoryId)}
          select={select}
          disabled={Data?.status === 3}
          styleContainer={styles.mealItemContainer}
        />
      )
    }
    return (
      <View
        style={[
          styles.listContainer,
          { height: Data?.status === 3 ? calcHeight(600) : calcHeight(500) },
        ]}>
        <View style={styles.listContainer}>
          <FlatList
            contentContainerStyle={{ paddingBottom: calcHeight(20) }}
            showsVerticalScrollIndicator={false}
            data={selectCatigory?.mealListItems}
            renderItem={renderOurListItem}
            keyExtractor={(item, index) => `${index}`}
            numColumns={2}
          />
        </View>
      </View>
    )
  }

  const onSave = () => {
    if (currentSelectedMeals?.length < 1) {
      Alert.alert(Trans("chooseMealsTodayFirst"))
    } else {
      var endList: any[] = []
      for (let i = 0; i < currentSelectedMeals?.length; i++) {
        const itemData: any = {
          centerId: endpoints.branch_code,
          oid: parseInt(Data?.oId), //
          date: Data?.vdate,
          subMealId: parseInt(currentSelectedMeals[i]?.categoryId), //
          mealNameAr: currentSelectedMeals[i]?.titleAr,
          mealNameEn: currentSelectedMeals[i]?.titleEn,
          portionValue: currentSelectedMeals[i]?.portionValue,
          snackType: currentSelectedMeals[i]?.snack_typ,
          sid: parseInt(selectCatigory?.snackTypeId), //
          itemId: parseInt(currentSelectedMeals[i]?.itemId), //
          itemCode: currentSelectedMeals[i]?.itemCode,
          weekId: parseInt(currentSelectedMeals[i]?.weekId), //
          dayId: parseInt(currentSelectedMeals[i]?.dayId), //
          menuId: parseInt(currentSelectedMeals[i]?.menuId), //
          mealId: parseInt(currentSelectedMeals[i]?.mealId), //
        }
        endList.push(itemData)
      }
      const data: any = {
        meals: endList,
        centerId: endpoints.branch_code,
      }
      dispatch(setMeals({ data, navigation }))
    }
  }

  const saveSection = () => {
    return (
      <View style={styles.actionContainer}>
        {Data?.status === 3 ? (
          <AppText
            title={Trans("todaysOrdersConfirmedCannotChanged")}
            fontFamily={FONTS.bold}
            fontSize={calcFont(18)}
            textAlign={"center"}
            color={COLORS.textDark}
            lineHeight={calcHeight(24)}
          />
        ) : (
          <AppButtonDefault
            onPress={() => onSave()}
            width={calcWidth(343)}
            backgroundColor={COLORS.primary}
            title={Trans("save")}
          />
        )}
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
      {calculatorSection()}
      {categoriesSection()}
      {listSection()}
      {saveSection()}
      {loadingSection()}
    </View>
  )
}

export default ManageMeals
