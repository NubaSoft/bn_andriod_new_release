import React from "react"
import { Image, ImageBackground, View } from "react-native"
import styles from "./styles"
import { StatusBar } from "react-native"
import { calcFont, calcHeight, calcWidth } from "../../../utils/sizes"
import { COLORS, FONTS } from "../../../utils/theme"
import { Trans } from "../../../translation"
import AppButtonDefault from "../../../components/AppButtonDefault"
import { useNavigation } from "@react-navigation/native"
import { IMAGES } from "../../../assets/Images"
import AppHeaderDefault from "../../../components/AppHeaderDefault"

const HowItWork: React.FC<{}> = (params: any) => {
  const paramsData: any = params?.route?.params
  const navigation = useNavigation<any>()
  const headerSection = () => {
    return (
      <AppHeaderDefault
        containerStyle={{ backgroundColor: "rgba(255, 168, 10, 0)" }}
        back
        title={Trans("howItWork")}
        onPressBack={() => navigation.goBack()}
        fontSize={calcFont(20)}
      />
    )
  }

  const bodySection = () => {
    return (
      <View style={styles.bodyContainer}>
        <Image source={IMAGES.howItWork} style={styles.image} />
        <AppButtonDefault
          onPress={() => navigation.navigate("SelectGender", paramsData)}
          width={calcWidth(277)}
          height={calcHeight(45)}
          backgroundColor={COLORS.primary}
          title={Trans("letsGo")}
          fontFamily={FONTS.extra_bold}
          fontSize={calcFont(16)}
          titleColor={COLORS.textDark}
          buttonStyle={styles.buttonContainer}
        />
      </View>
    )
  }

  return (
    <ImageBackground source={IMAGES.background} style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      {headerSection()}
      {bodySection()}
    </ImageBackground>
  )
}
export default HowItWork
