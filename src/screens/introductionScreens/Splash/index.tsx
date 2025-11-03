import React, { useEffect, useState } from "react"
import { I18nManager, Image, NativeModules, Platform, View } from "react-native"
import styles from "./styles"
import AsyncStorage from "@react-native-async-storage/async-storage"
import I18n from "../../../translation"
import { IMAGES } from "../../../assets/Images"
import { init_lang, init_token } from "../../../network"
import AppButtonDefault from "../../../components/AppButtonDefault"
import { COLORS, FONTS } from "../../../utils/theme"
import { calcFont, calcHeight, calcWidth } from "../../../utils/sizes"
import { useAppDispatch } from "../../../redux/store/store"
import { userData } from "../../../middleware/storage/user"
import LottieView from "lottie-react-native"

const Splash: React.FC<{}> = (params: any) => {
  const dispatch = useAppDispatch()
  const [selectLanguage, setSelectLanguage] = useState<string>("")

  const getSelectLanguage = async () => {
    const select_language: string = await AsyncStorage.getItem("select_language")
    setSelectLanguage(select_language)
    if (select_language == "done") {
      checkLanguage()
    } else {
    }
  }
console.log('==>>>>>>>>>>>>>>>>>>> splash screen');

  useEffect(() => {
    getSelectLanguage()
  }, [])

  const checkLanguage = async (): Promise<void> => {
    const _lang = await AsyncStorage.getItem("user_lang")
    init_lang(_lang)
    I18n.locale = _lang
    I18nManager.allowRTL(_lang === "ar")
    I18nManager.forceRTL(_lang === "ar")
    startup(_lang)
  }

  const startup = async (_lang: string) => {
    setTimeout(() => {
      goToHome(_lang)
    }, 3000)
  }

  const goToHome = async (lang: string) => {
    await AsyncStorage.setItem("select_language", "done")
    await AsyncStorage.setItem("user_lang", lang)
    const user: any = JSON.parse(await AsyncStorage.getItem("user_data"))
    const token: string = await AsyncStorage.getItem("token")
    if (user?.id) {
      init_token(token)
      dispatch(userData(user))
    } else {
      init_token("")
      dispatch(userData({}))
    }
    init_lang(lang)
    I18n.locale = lang
    I18nManager.allowRTL("ar" === lang)
    I18nManager.forceRTL("ar" === lang)
    params.navigation.navigate("Tabs")
  }

  return (
    <View style={[styles.container, { backgroundColor: COLORS.primary }]}>
      <Image
        source={IMAGES.logo2}
        style={{
          width: calcWidth(200),
          height: calcHeight(200),
          resizeMode: "stretch",
          marginBottom: calcHeight(24),
        }}
      />
      {selectLanguage != "done" ? (
        <>
          <AppButtonDefault
            border
            buttonStyle={styles.button}
            width={calcWidth(160)}
            borderColor={COLORS.textDark}
            title={"English"}
            fontSize={calcFont(16)}
            fontFamily={FONTS.bold}
            titleColor={COLORS.white}
            onPress={() => goToHome("en")}
          />
          <AppButtonDefault
            border
            buttonStyle={styles.button}
            width={calcWidth(160)}
            borderColor={COLORS.textDark}
            title={"العربية"}
            fontSize={calcFont(16)}
            fontFamily={FONTS.bold}
            titleColor={COLORS.white}
            onPress={() => goToHome("ar")}
          />
        </>
      ) : null}
    </View>
  )
}
export default Splash
