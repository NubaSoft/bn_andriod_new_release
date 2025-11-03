import React from "react"
import { View, FlatList, I18nManager, TouchableOpacity, Image } from "react-native"
import { styles } from "./styles"
import AppText from "../AppText"
import { calcFont, calcHeight, calcWidth } from "../../utils/sizes"
import { COLORS, FONTS } from "../../utils/theme"
import AppButtonDefault from "../AppButtonDefault"
import { Trans } from "../../translation"
import { IMAGES } from "../../assets/Images"

interface AddressItemProps {
  index?: number
  item?: any
  onPressEdit?: () => void
  onPressDelete?: () => void
}

const AddressItem: React.FC<AddressItemProps> = ({ index, item, onPressEdit, onPressDelete }) => {
  console.log("item-------AddressItem---------", item)

  const headerSection = () => {
    return (
      <View style={styles.headerContainer}>
        <AppText
          title={item?.addressName}
          fontSize={calcFont(16)}
          fontFamily={FONTS.extra_bold}
          color={COLORS.primary}
          lineHeight={calcHeight(20)}
          textAlign={"left"}
        />
        <View style={styles.headerActionContainer}>
          <TouchableOpacity onPress={onPressEdit}>
            <Image source={IMAGES.edit} style={styles.headerActionIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressDelete}>
            <Image source={IMAGES.delete} style={styles.headerActionIcon} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const deliveryDaysSection = () => {
    const renderDayItem = ({ item, index }: { item: any; index: number }) => {
      return (
        <View style={styles.deliveryDaysItemContainer}>
          <AppText
            title={Trans(item)}
            fontSize={calcFont(15)}
            fontFamily={FONTS.bold}
            color={COLORS.textDark}
            lineHeight={calcHeight(20)}
            textAlign={"center"}
          />
        </View>
      )
    }
    return (
      <View style={styles.deliveryDaysContainer}>
        <AppText
          title={Trans("deliveryDays")}
          fontSize={calcFont(16)}
          fontFamily={FONTS.bold}
          color={COLORS.textDark}
          lineHeight={calcHeight(16)}
          textAlign={"left"}
          width={calcWidth(311)}
        />
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={item?.deliveryDays}
          renderItem={renderDayItem}
          keyExtractor={item => `${item}`}
          numColumns={4}
        />
      </View>
    )
  }

  const deliveryTimeSection = () => {
    return (
      <View style={styles.deliveryTimeContainer}>
        <AppText
          title={Trans("deliveryTime")}
          fontSize={calcFont(16)}
          fontFamily={FONTS.bold}
          color={COLORS.textDark}
          lineHeight={calcHeight(16)}
          textAlign={"left"}
          width={calcWidth(311)}
        />
        <View style={styles.deliveryTimeView}>
          <View style={styles.deliveryTimeItemContainer}>
            <AppText
              title={`${Trans("from")}: ${item?.fromTime}`}
              fontSize={calcFont(15)}
              fontFamily={FONTS.bold}
              color={COLORS.textDark}
              lineHeight={calcHeight(16)}
              textAlign={"center"}
            />
          </View>
          <View style={styles.deliveryTimeItemContainer}>
            <AppText
              title={`${Trans("to")}: ${item?.toTime}`}
              fontSize={calcFont(15)}
              fontFamily={FONTS.bold}
              color={COLORS.textDark}
              lineHeight={calcHeight(16)}
              textAlign={"center"}
            />
          </View>
        </View>
      </View>
    )
  }

  const addressDetailsSection = () => {
    const ADDRESS: any = [
      { id: 1, key: Trans("government"), value: item?.government },
      { id: 1, key: Trans("area"), value: item?.area },
      { id: 1, key: Trans("block"), value: item?.block },
      { id: 1, key: Trans("street"), value: item?.street },
      { id: 1, key: Trans("building"), value: item?.building },
      { id: 1, key: Trans("flat"), value: item?.flat },
      { id: 1, key: Trans("jadda"), value: item?.jadda },
      { id: 1, key: Trans("floor"), value: item?.floor },
      { id: 1, key: Trans("notes"), value: item?.notes },
    ]
    const renderAddressItem = ({ item, index }: { item: any; index: number }) => {
      return (
        <View
          style={[
            styles.addressItemContainer,
            { width: index == 8 ? calcWidth(311) : calcWidth(140) },
          ]}>
          <AppText
            title={`${item?.key}: ${item?.value}`}
            fontSize={calcFont(15)}
            fontFamily={FONTS.bold}
            color={COLORS.textDark}
            lineHeight={calcHeight(20)}
            textAlign={"center"}
          />
        </View>
      )
    }
    return (
      <View style={styles.addressDetailsContainer}>
        <AppText
          title={Trans("addressDetails")}
          fontSize={calcFont(16)}
          fontFamily={FONTS.bold}
          color={COLORS.textDark}
          lineHeight={calcHeight(16)}
          textAlign={"left"}
          width={calcWidth(311)}
        />
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={ADDRESS}
          renderItem={renderAddressItem}
          keyExtractor={item => `${item}`}
          numColumns={2}
        />
      </View>
    )
  }

  return (
    <View key={index} style={styles.container}>
      {headerSection()}
      {deliveryDaysSection()}
      {deliveryTimeSection()}
      {addressDetailsSection()}
    </View>
  )
}

export default AddressItem
