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
import { IMAGES } from "../../../assets/Images"
import AppText from "../../../components/AppText"
import { calcFont, calcHeight, calcWidth } from "../../../utils/sizes"
import { COLORS, FONTS } from "../../../utils/theme"
import AppInput from "../../../components/AppInput"
import AppButtonDefault from "../../../components/AppButtonDefault"
import endpoints from "../../../network/endpoints"
import { addPromoCode } from "../../../middleware/subscriptions/addPromoCode"
import AppLoading from "../../../components/AppLoading"
import { useSelector } from "react-redux"
import { setPromoCodeData } from "../../../redux/store/subscriptions/subscriptionsSlice"
import { addCustomerPackage } from "../../../middleware/subscriptions/addCustomerPackage"

const ReviewAndPayment: React.FC = (params: any) => {
  const Data: any = params?.route?.params?.data
  const from: string = params?.route?.params?.data?.from
  console.log("data------ReviewAndPayment---------", Data)

  const navigation = useNavigation<any>()
  const dispatch = useAppDispatch()
  const {
    subscriptionLoader,
    promoCodeData,
    dietTypesData,
    renewSend,
    subscribtionStartDatesData,
  }: {
    subscriptionLoader: boolean
    promoCodeData: any
    dietTypesData: any
    renewSend: number
    subscribtionStartDatesData: any
  } = useSelector((store: RootState) => store?.subscriptions)

  const [code, setCode] = useState<string>("")
  const [checkCode, setCheckCode] = useState<boolean>(false)
  const [selectPayment, setSelectPayment] = useState<any>("")

  useEffect(() => {}, [])

  const headerSection = () => {
    return (
      <AppHeaderDefault
        back
        title={Trans("reviewAndPayment")}
        onPressBack={() => {
          navigation.goBack()
          dispatch(setPromoCodeData(""))
        }}
      />
    )
  }

  const subscriptionDetailsSection = () => {
    return (
      <View style={styles.detailsContainer}>
        <AppText
          title={Trans("subscriptionDetails")}
          fontSize={calcFont(18)}
          fontFamily={FONTS.bold}
          color={COLORS.textDark}
          width={calcWidth(343)}
          lineHeight={calcHeight(17)}
          marginBottom={calcHeight(2)}
          textAlign={"left"}
        />
        <View style={styles.detailsView}>
          <View style={styles.detailsDataView}>
            <AppText
              title={
                from == "newSubscription"
                  ? I18nManager.isRTL
                    ? Data?.subscription?.subscription?.arabic_note
                    : Data?.subscription?.subscription?.note
                  : from == "fastRenewal"
                  ? Data?.subscription?.subscriptionDescription
                  : ""
              }
              fontSize={calcFont(16)}
              fontFamily={FONTS.extra_bold}
              color={COLORS.primary}
              lineHeight={calcHeight(16)}
              marginBottom={calcHeight(8)}
              textAlign={"left"}
            />
            <AppText
              title={`${Trans("numberOfDays")}: ${
                from == "newSubscription"
                  ? Data?.subscription?.item?.day
                  : Data?.subscription?.subscriptionDays
              } ${Trans("day")}`}
              fontSize={calcFont(15)}
              fontFamily={FONTS.bold}
              color={COLORS.textDark}
              lineHeight={calcHeight(15)}
              marginBottom={calcHeight(6)}
              textAlign={"left"}
            />
            <AppText
              title={`${Trans("price")}: ${
                promoCodeData?.finalPrice ||
                (from == "newSubscription"
                  ? Data?.subscription?.item?.price
                  : Data?.subscription?.packagePrice)
              } ${Trans("kwd")}`}
              fontSize={calcFont(15)}
              fontFamily={FONTS.bold}
              color={COLORS.textDark}
              lineHeight={calcHeight(15)}
              textAlign={"left"}
            />
          </View>
          <TouchableOpacity>
            <Image source={IMAGES.edit} style={styles.detailsEdit} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const descoundCodeSection = () => {
    const onChangeCode = (code: string) => {
      setCode(code)
      setCheckCode(false)
      dispatch(setPromoCodeData(""))
    }
    const onUseCode = () => {
      if (code == "") {
        setCheckCode(true)
      } else {
        const data = {
          promoCode: code,
          menuId:
            from == "newSubscription"
              ? Data?.subscription?.subscription?.subscriptionId
              : Data?.subscription?.menueId,
          price:
            from == "newSubscription"
              ? Data?.subscription?.item?.price
              : Data?.subscription?.packagePrice,
          days:
            from == "newSubscription"
              ? Data?.subscription?.item?.day
              : Data?.subscription?.subscriptionDays,
          centerId: endpoints.branch_code,
        }
        console.log("data------onUseCode-------", data)
        dispatch(addPromoCode(data))
      }
    }
    return (
      <View style={styles.codeContainer}>
        <AppText
          title={Trans("useDescoundCode")}
          fontSize={calcFont(18)}
          fontFamily={FONTS.bold}
          color={COLORS.textDark}
          width={calcWidth(343)}
          lineHeight={calcHeight(17)}
          marginBottom={calcHeight(2)}
          textAlign={"left"}
        />
        <View style={styles.codeView}>
          <AppInput
            containerStyle={{ width: calcWidth(200), marginTop: calcHeight(8) }}
            fontSize={calcFont(14)}
            fontFamily={FONTS.bold}
            placeholder={Trans("enterDescoundCode")}
            value={code}
            onChangeText={(text: string) => onChangeCode(text)}
            inputContainer={{
              width: calcWidth(200),
              borderColor: checkCode ? COLORS.red : COLORS.borderLight,
            }}
          />
          <AppButtonDefault
            onPress={() => onUseCode()}
            width={calcWidth(120)}
            height={calcHeight(45)}
            backgroundColor={COLORS.primary}
            title={Trans("use")}
            fontFamily={FONTS.extra_bold}
            fontSize={calcFont(16)}
            titleColor={COLORS.textDark}
          />
        </View>
      </View>
    )
  }

  const paymentMethodsSection = () => {
    const onPay = () => {
      if (selectPayment == "") {
        Alert.alert(Trans("selectPaymentMethod"))
      } else {
        const data = {
          days: Data?.subscription?.item?.day, // from Pckg
          meals:
            from == "newSubscription"
              ? Data?.subscription?.subscription?.meals
              : Data?.subscription?.meals, // from Pckg
          snacks:
            from == "newSubscription"
              ? Data?.subscription?.subscription?.snacks
              : Data?.subscription?.snacks, // from Pckg
          menuId: Data?.subscription?.subscription?.subscriptionId, // from Pckg
          price:
            from == "newSubscription"
              ? Data?.subscription?.item?.price
              : Data?.subscription?.packagePrice, // from Pckg
          applyPromoCode: promoCodeData?.finalPrice ? 1 : 0, // from promo code || 0
          noBreakfast: 0, // 0
          finalPrice:
            promoCodeData?.finalPrice ||
            (from == "newSubscription"
              ? Data?.subscription?.item?.price
              : Data?.subscription?.packagePrice), // from promo code ||
          promoCode: promoCodeData?.finalPrice ? promoCodeData?.promoCode : "", // from promo code || ""
          discountPercentage: promoCodeData?.finalPrice ? promoCodeData?.discountPercentage : 0, // from promo code || 0
          discountValue: promoCodeData?.finalPrice ? promoCodeData?.discountValue : 0, // from promo code || 0
          marketingId: promoCodeData?.finalPrice ? promoCodeData?.marketingId : 1, // from promo code || 1
          paymentMethod: selectPayment?.id, // from page
          language: "en", // "en"
          renew: renewSend, // from redux
          platform: "app", // "app"
          startSubscription: Data?.firstDay, // from first day
          centerId: endpoints.branch_code, // from endpoint
          navigation,
        }
        dispatch(addCustomerPackage(data))
      }
    }
    const PAYMENTS: any[] = [
      { id: 1, name: Trans("knetPayment"), image: IMAGES.creditCard },
      { id: 2, name: Trans("creditDebitCard"), image: IMAGES.knet },
    ]
    const renderDayItem = ({ item, index }: { item: any; index: number }) => {
      const select: boolean = item?.id == selectPayment?.id
      return (
        <TouchableOpacity
          onPress={() => setSelectPayment(item)}
          style={[
            styles.paymentItemContainer,
            { borderColor: select ? COLORS.primary : COLORS.textLight },
          ]}>
          <View style={styles.paymentItemView}>
            <Image source={item?.image} style={styles.paymentItemImage} />
            <AppText
              title={item?.name}
              fontSize={calcFont(15)}
              fontFamily={FONTS.bold}
              color={select ? COLORS.primary : COLORS.textLight}
              lineHeight={calcHeight(14)}
              textAlign={"left"}
            />
          </View>
          <Image
            source={select ? IMAGES.switch_active : IMAGES.switch_inActive}
            style={styles.paymentItemIcon}
          />
        </TouchableOpacity>
      )
    }
    return (
      <View style={styles.paymentContainer}>
        <AppText
          title={Trans("selectPaymentMethod")}
          fontSize={calcFont(18)}
          fontFamily={FONTS.bold}
          color={COLORS.textDark}
          width={calcWidth(343)}
          lineHeight={calcHeight(17)}
          marginBottom={calcHeight(8)}
          textAlign={"left"}
          required
        />
        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={PAYMENTS}
            renderItem={renderDayItem}
            keyExtractor={item => `${item}`}
          />
        </View>
        <AppButtonDefault
          onPress={() => onPay()}
          width={calcWidth(343)}
          height={calcHeight(45)}
          backgroundColor={COLORS.primary}
          title={Trans("pay")}
          fontFamily={FONTS.extra_bold}
          fontSize={calcFont(16)}
          titleColor={COLORS.textDark}
          buttonStyle={styles.buttonPay}
        />
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
      {subscriptionDetailsSection()}
      {descoundCodeSection()}
      {paymentMethodsSection()}
      {loadingSection()}
    </View>
  )
}

export default ReviewAndPayment
