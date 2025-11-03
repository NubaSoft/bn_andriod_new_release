import React, { useState } from "react"
import { Alert, Image, StatusBar, TouchableOpacity, View } from "react-native"
import styles from "./styles"
import { useNavigation } from "@react-navigation/native"
import { RootState, useAppDispatch } from "../../../redux/store/store"
import AppHeaderDefault from "../../../components/AppHeaderDefault"
import { calcFont, calcHeight, calcWidth } from "../../../utils/sizes"
import { FlatList } from "react-native-gesture-handler"
import { Trans } from "../../../translation"
import AppButtonDefault from "../../../components/AppButtonDefault"
import { COLORS, FONTS } from "../../../utils/theme"
import AppText from "../../../components/AppText"
import { IMAGES } from "../../../assets/Images"
import { useSelector } from "react-redux"

const ChooseRenewalProcess: React.FC = () => {
  const navigation = useNavigation<any>()
  const dispatch = useAppDispatch()
  const {
    subscriptionDetailsData,
  }: {
    subscriptionDetailsData: any
  } = useSelector((store: RootState) => store?.subscriptions)

  const [selectProcess, setSelectProcess] = useState<any>("")

  const PROCESS: any[] = [
    {
      id: 1,
      title: Trans("fastRenewal"),
      description: Trans("fastRenewalDescription"),
    },
    {
      id: 2,
      title: Trans("newSubscription"),
      description: Trans("newSubscriptionDescription"),
    },
  ]
  const headerSection = () => {
    return (
      <AppHeaderDefault
        back
        title={Trans("chooseRenewalProcess")}
        onPressBack={() => navigation.goBack()}
      />
    )
  }

  const bodySection = () => {
    const renderProcessItem = ({ item, index }: { item: any; index: number }) => {
      const select: Boolean = item?.id == selectProcess?.id
      return (
        <TouchableOpacity
          key={index}
          style={[
            styles.processItemContainer,
            { borderColor: select ? COLORS.primary : COLORS.textLight },
          ]}
          onPress={() => setSelectProcess(item)}>
          <View style={styles.processItemView}>
            <AppText
              title={item?.title}
              fontSize={calcFont(20)}
              fontFamily={FONTS.bold}
              color={COLORS.textDark}
              textAlign={"left"}
              lineHeight={calcHeight(22)}
              width={calcWidth(245)}
              marginBottom={calcHeight(4)}
            />
            <AppText
              title={item?.description}
              fontSize={calcFont(19)}
              fontFamily={FONTS.medium}
              color={COLORS.textLight}
              textAlign={"left"}
              lineHeight={calcHeight(20)}
              width={calcWidth(245)}
              numberOfLines={5}
            />
          </View>
          <Image
            source={select ? IMAGES.select_active : IMAGES.select_inActive}
            style={styles.processItemIcon}
          />
        </TouchableOpacity>
      )
    }

    return (
      <View style={styles.listContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={PROCESS}
          renderItem={renderProcessItem}
          keyExtractor={(item, index) => `${index}`}
        />
      </View>
    )
  }

  const actionSection = () => {
    const onRenewal = () => {
      if (selectProcess == "") {
        Alert.alert(Trans("chooseOnlyOneRenewalProcess"))
      } else if (selectProcess?.id == 1) {
        console.log("subscriptionDetailsData================", subscriptionDetailsData)
        if (subscriptionDetailsData?.subscriptions.length >= 1) {
          for (const i in subscriptionDetailsData.subscriptions) {
            if (
              subscriptionDetailsData.subscriptions[i].subscriptionEndDate ===
              subscriptionDetailsData.subscriptionEndDate
            ) {
              navigation.navigate("SubscriptionsDetailsStack", {
                screen: "PickStartDate",
                subscription: subscriptionDetailsData.subscriptions[i],
              })
            }
          }
        }
      } else if (selectProcess?.id == 2) {
        navigation.navigate("SubscriptionsDetailsStack", { screen: "WeSubscriptionsList" })
      }
    }
    return (
      <AppButtonDefault
        title={Trans("renewal")}
        onPress={() => onRenewal()}
        buttonStyle={styles.buttonContainer}
        backgroundColor={COLORS.primary}
      />
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      {headerSection()}
      {bodySection()}
      {actionSection()}
    </View>
  )
}

export default ChooseRenewalProcess
