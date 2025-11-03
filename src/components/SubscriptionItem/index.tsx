import React from "react"
import { View, FlatList, I18nManager, Alert } from "react-native"
import { styles } from "./styles"
import AppText from "../AppText"
import { calcFont, calcHeight, calcWidth } from "../../utils/sizes"
import { COLORS, FONTS } from "../../utils/theme"
import AppButtonDefault from "../AppButtonDefault"
import { Trans } from "../../translation"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store/store"
import { useNavigation } from "@react-navigation/native"

interface SubscriptionItemProps {
  index?: number
  item?: any
  from?: string
  onClose?: () => void
}

const SubscriptionItem: React.FC<SubscriptionItemProps> = ({ index, item, from, onClose }) => {
  const navigation = useNavigation<any>()
  const { userData }: { userData: any } = useSelector((store: RootState) => store?.storage)
  const subscription: any = item
  var DAYS_PRICE: any[] = []
  for (let i = 0; i < subscription?.subscriptionMinDays?.length; i++) {
    DAYS_PRICE.push({
      id: i,
      day: subscription?.subscriptionMinDays[i],
      price: subscription?.subscriptionMinPrice[i],
    })
  }
  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerView}>
          <AppText
            title={Trans("numberOfDays")}
            fontSize={calcFont(17)}
            fontFamily={FONTS.bold}
            color={COLORS.textDark}
            lineHeight={calcHeight(14)}
            textAlign={"center"}
            width={calcWidth(140)}
            numberOfLines={1}
          />
        </View>
        <View style={styles.headerView}>
          <AppText
            title={Trans("priceKWD")}
            fontSize={calcFont(17)}
            fontFamily={FONTS.bold}
            color={COLORS.textDark}
            lineHeight={calcHeight(14)}
            textAlign={"center"}
            width={calcWidth(140)}
            numberOfLines={1}
          />
        </View>
        <View style={styles.headerView2}>
          <AppText
            title={""}
            fontSize={calcFont(17)}
            fontFamily={FONTS.bold}
            color={COLORS.textDark}
            lineHeight={calcHeight(14)}
            textAlign={"center"}
            width={calcWidth(140)}
            numberOfLines={1}
          />
        </View>
      </View>
    )
  }

  const renderDayItem = ({ item, index }: { item: any; index: number }) => {
    const onSubscriptionNow = () => {
      if (userData?.id) {
        from == "modal" ? onClose() : null
        console.log("item==============", item, subscription, navigation)
        navigation.navigate("SubscriptionsDetailsStack", {
          screen: "SubscriptionData",
          subscription,
          item,
        })
      } else {
        from == "modal" ? onClose() : null
        Alert.alert(Trans("notLoggedYet"), "", [
          {
            text: Trans("login"),
            onPress: () => navigation.navigate("AuthenticationStack"),
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
      <View style={styles.itemContainer} key={index}>
        <View style={styles.itemView}>
          <AppText
            title={item?.day}
            fontSize={calcFont(18)}
            fontFamily={FONTS.medium}
            color={COLORS.textDark}
            lineHeight={calcHeight(16)}
            textAlign={"left"}
            width={calcWidth(32)}
            numberOfLines={1}
          />
        </View>
        <View style={styles.itemView}>
          <AppText
            title={item?.price}
            fontSize={calcFont(18)}
            fontFamily={FONTS.medium}
            color={COLORS.textDark}
            lineHeight={calcHeight(16)}
            textAlign={"left"}
            width={calcWidth(32)}
          />
        </View>
        <View style={styles.itemView2}>
          <AppButtonDefault
            buttonStyle={{ marginTop: calcHeight(2) }}
            onPress={() => onSubscriptionNow()}
            width={calcWidth(120)}
            height={calcHeight(26)}
            backgroundColor={COLORS.primary}
            title={Trans("subscribeNow")}
            fontFamily={FONTS.extra_bold}
            fontSize={calcFont(13)}
            titleColor={COLORS.white}
          />
        </View>
      </View>
    )
  }

  return (
    <View key={index} style={styles.container}>
      <AppText
        title={I18nManager.isRTL ? item?.subscriptionNameAr : item?.subscriptionName}
        fontSize={calcFont(18)}
        fontFamily={FONTS.bold}
        color={COLORS.textDark}
        lineHeight={calcHeight(20)}
        textAlign={"left"}
        width={calcWidth(311)}
        numberOfLines={2}
      />
      <AppText
        title={I18nManager.isRTL ? item?.arabic_note : item?.notes}
        fontSize={calcFont(18)}
        fontFamily={FONTS.medium}
        color={COLORS.textDark}
        lineHeight={calcHeight(20)}
        textAlign={"left"}
        width={calcWidth(311)}
        numberOfLines={2}
      />
      <View style={styles.listContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHeader}
          data={DAYS_PRICE}
          renderItem={renderDayItem}
          keyExtractor={item => `${item?.id}`}
        />
      </View>
    </View>
  )
}

export default SubscriptionItem
