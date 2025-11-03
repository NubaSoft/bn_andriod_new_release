import React, { useState } from "react"
import { Image, ImageBackground, TouchableOpacity, View } from "react-native"
import styles from "./styles"
import { StatusBar } from "react-native"
import { calcFont, calcHeight, calcWidth } from "../../../utils/sizes"
import { COLORS, FONTS } from "../../../utils/theme"
import { Trans } from "../../../translation"
import AppText from "../../../components/AppText"
import AppButtonDefault from "../../../components/AppButtonDefault"
import { useNavigation } from "@react-navigation/native"
import { IMAGES } from "../../../assets/Images"
import AppHeaderDefault from "../../../components/AppHeaderDefault"
import AppLoading from "../../../components/AppLoading"
import PickerSelect from "../../../components/PickerSelect"
import ModalSelectItem from "../../../components/ModalSelectItem"

const SelectGender: React.FC<{}> = (params: any) => {
  const paramsData: any = params?.route?.params
  const navigation = useNavigation<any>()
  const GENDERS: any[] = [
    {
      id: 1,
      title: Trans("male"),
      image_select: IMAGES.men_white,
      image_inSelect: IMAGES.men_primary,
    },
    {
      id: 2,
      title: Trans("female"),
      image_select: IMAGES.woman_white,
      image_inSelect: IMAGES.woman_primary,
    },
  ]
  const [selectGender, setSelectGender] = useState<any>(GENDERS[0])
  const [selectHeight, setSelectHeight] = useState<any>("")
  const [selectWeight, setSelectWeight] = useState<any>("")
  const [checkHeight, setCheckHeight] = useState<boolean>(false)
  const [checkWeight, setCheckWeight] = useState<boolean>(false)
  const [visible_Height, setVisible_Height] = useState<boolean>(false)
  const [visible_Weight, setVisible_Weight] = useState<boolean>(false)

  var HEIGHTS: any[] = []
  var WEIGHTS: any[] = []
  for (let i = 30; i < 250; i++) {
    HEIGHTS.push({ id: i, name: `${i} ${Trans("cmI")}` })
    WEIGHTS.push({ id: i, name: `${i} ${Trans("kgI")}` })
  }
  const headerSection = () => {
    return (
      <AppHeaderDefault
        containerStyle={{ backgroundColor: "rgba(255, 168, 10, 0)" }}
        back
        title={Trans("basicData")}
        onPressBack={() => navigation.goBack()}
        fontSize={calcFont(20)}
      />
    )
  }

  const bodySection = () => {
    const onNext = () => {
      if (!selectGender) {
      } else if (selectHeight == "") {
        setCheckHeight(true)
      } else if (selectWeight == "") {
        setCheckWeight(true)
      } else {
        const data = {
          ...paramsData,
          ...{ gender: selectGender, height: selectHeight, weight: selectWeight },
        }
        navigation.navigate("CompleteAddress", data)
      }
    }
    const genderItem = (item: any) => {
      const select = selectGender?.id == item?.id
      return (
        <TouchableOpacity
          onPress={() => setSelectGender(item)}
          key={item?.id}
          style={[
            styles.genderItemContainer,
            {
              backgroundColor: select ? COLORS.primary : COLORS.white,
              borderColor: select ? COLORS.primary : COLORS.textLight,
            },
          ]}>
          <Image
            source={select ? item?.image_select : item?.image_inSelect}
            style={styles.genderItemImage}
          />
          <AppText
            title={item?.title}
            fontSize={calcFont(16)}
            fontFamily={FONTS.extra_bold}
            color={select ? COLORS.white : COLORS.textLight}
            lineHeight={calcHeight(17)}
            textAlign={"left"}
          />
        </TouchableOpacity>
      )
    }
    return (
      <View style={styles.bodyContainer}>
        <View style={styles.genderContainer}>
          <AppText
            title={Trans("selectGender")}
            fontSize={calcFont(14)}
            fontFamily={FONTS.bold}
            color={COLORS.textDark}
            lineHeight={calcHeight(23)}
            textAlign={"left"}
          />
          <View style={styles.genderView}>
            {GENDERS.map((item: any) => {
              return <>{genderItem(item)}</>
            })}
          </View>
        </View>
        <PickerSelect
          containerStyle={{
            width: calcWidth(277),
            marginTop: calcHeight(12),
          }}
          viewStyle={{ width: calcWidth(277) }}
          title={`${Trans("selectHeight")} ${Trans("cm")}`}
          fontSize={calcFont(14)}
          fontFamily={FONTS.bold}
          value={selectHeight ? selectHeight?.name : Trans("selectHeight")}
          onPress={() => setVisible_Height(true)}
          error={checkHeight}
          errorMessage={Trans("selectHeightRequired")}
          required
        />
        <PickerSelect
          containerStyle={{
            width: calcWidth(277),
            marginTop: calcHeight(12),
          }}
          viewStyle={{ width: calcWidth(277) }}
          title={`${Trans("selectWeight")} ${Trans("kg")}`}
          fontSize={calcFont(14)}
          fontFamily={FONTS.bold}
          value={selectWeight ? selectWeight?.name : Trans("selectWeight")}
          onPress={() => setVisible_Weight(true)}
          error={checkWeight}
          errorMessage={Trans("selectWeightRequired")}
          required
        />
        <AppButtonDefault
          onPress={() => onNext()}
          width={calcWidth(277)}
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

  const modalSelectHeight = () => {
    return (
      <ModalSelectItem
        visible={visible_Height}
        onClose={() => {
          setVisible_Height(false)
        }}
        onSelectItem={(item: any) => {
          setSelectHeight(item)
          setCheckHeight(false)
        }}
        title={Trans("selectHeight")}
        data={HEIGHTS}
        itemSelected={selectHeight}
      />
    )
  }

  const modalSelectWeight = () => {
    return (
      <ModalSelectItem
        visible={visible_Weight}
        onClose={() => {
          setVisible_Weight(false)
        }}
        onSelectItem={(item: any) => {
          setSelectWeight(item)
          setCheckWeight(false)
        }}
        title={Trans("selectWeight")}
        data={WEIGHTS}
        itemSelected={selectWeight}
      />
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
      {modalSelectHeight()}
      {modalSelectWeight()}
      {loadingSection()}
    </ImageBackground>
  )
}
export default SelectGender
