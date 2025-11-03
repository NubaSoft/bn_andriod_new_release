import React, { useEffect, useState } from "react"
import { StatusBar, View } from "react-native"
import styles from "./styles"
import { useNavigation } from "@react-navigation/native"
import { RootState, useAppDispatch } from "../../../redux/store/store"
import AppHeaderDefault from "../../../components/AppHeaderDefault"
import { Trans } from "../../../translation"
import { calcFont, calcHeight, calcWidth } from "../../../utils/sizes"
import endpoints from "../../../network/endpoints"
import AppLoading from "../../../components/AppLoading"
import { useSelector } from "react-redux"
import { paymentStatus } from "../../../middleware/subscriptions/paymentStatus"
import { WebView } from "react-native-webview"
import AppEmptyScreen from "../../../components/AppEmptyScreen"
import { IMAGES } from "../../../assets/Images"
import { COLORS, FONTS } from "../../../utils/theme"

const CheckOut: React.FC = (params: any) => {
  const Data: any = params?.route?.params?.data
  console.log("data------ReviewAndPayment---------", Data)

  const navigation = useNavigation<any>()
  const dispatch = useAppDispatch()
  const {
    subscriptionLoader,
    customerPackageData,
    paymentStatusData,
  }: {
    subscriptionLoader: boolean
    customerPackageData: any
    paymentStatusData: any
  } = useSelector((store: RootState) => store?.subscriptions)
  console.log("paymentStatusData------------------", paymentStatusData)

  const [newURL, setNewURL] = useState("")

  useEffect(() => {
    console.log("newURL--------------", newURL)
    if (newURL.includes(endpoints.baseUrl)) {
      setTimeout(() => {
        console.log(
          'newURL.split("paymentId=")[1].split("&")[0]---------',
          newURL.split("paymentId=")[1].split("&")[0],
        )
        const data = {
          paymentId: newURL.split("paymentId=")[1].split("&")[0],
          centerId: endpoints.branch_code,
        }
        dispatch(paymentStatus(data))
      }, 3000)
    }
  }, [newURL])

  const headerSection = () => {
    return <AppHeaderDefault back title={Trans("pay")} onPressBack={() => navigation.goBack()} />
  }

  const webViewSection = () => {
    return (
      <View style={styles.webViewContainer}>
        <WebView
          onNavigationStateChange={link => {
            setNewURL(link.url)
          }}
          style={styles.webView}
          source={{
            uri: Data?.PaymentURL,
          }}
        />
      </View>
    )
  }
  const paymentSuccessSection = () => {
    return (
      <View>
        <AppEmptyScreen
          containerStyle={{ marginTop: calcHeight(120) }}
          image={IMAGES.paymentSuccess}
          imageStyle={{
            width: calcWidth(240),
            height: calcHeight(240),
            marginBottom: calcHeight(32),
          }}
          title={Trans("paymentCompletedSuccessfully")}
          fontSize={calcFont(18)}
          fontFamily={FONTS.bold}
          textColor={COLORS.textDark}
          textAlign={"center"}
          textWidth={calcWidth(343)}
          buttonTitle={Trans("letsChooseMeals")}
          onPress={() => navigation.navigate("SubscriptionsStack")}
        />
      </View>
    )
  }
  const paymentFailedSection = () => {
    return (
      <View>
        <View>
          <AppEmptyScreen
            containerStyle={{ marginTop: calcHeight(120) }}
            image={IMAGES.paymentFeild}
            imageStyle={{
              width: calcWidth(240),
              height: calcHeight(240),
              marginBottom: calcHeight(32),
            }}
            title={Trans("paymentCompletedFailed")}
            fontSize={calcFont(18)}
            fontFamily={FONTS.bold}
            textColor={COLORS.textDark}
            textAlign={"center"}
            textWidth={calcWidth(343)}
            buttonTitle={Trans("tryAgain")}
            onPress={() => navigation.goBack()}
          />
        </View>
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
      {paymentStatusData == 0 ? webViewSection() : null}
      {paymentStatusData == 1 ? paymentSuccessSection() : null}
      {paymentStatusData == 2 ? paymentFailedSection() : null}
      {/* {0 ? webViewSection() : null}
      {1 ? paymentSuccessSection() : null}
      {0 ? paymentFailedSection() : null} */}
      {loadingSection()}
    </View>
  )
}

export default CheckOut
