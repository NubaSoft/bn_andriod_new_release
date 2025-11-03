import React, { useState } from "react"
import { Alert, Image, StatusBar, TouchableOpacity, View } from "react-native"
import styles from "./styles"
import { useNavigation } from "@react-navigation/native"
import { RootState, useAppDispatch } from "../../../redux/store/store"
import { Trans } from "../../../translation"
import AppHeaderDefault from "../../../components/AppHeaderDefault"
import { calcFont, calcHeight, calcWidth } from "../../../utils/sizes"
import AppText from "../../../components/AppText"
import { COLORS, FONTS } from "../../../utils/theme"
import { IMAGES } from "../../../assets/Images"
import SettingItem from "../../../components/SettingItem"
import AppEmptyScreen from "../../../components/AppEmptyScreen"
import AppModalLanguage from "../../../components/AppModalLanguage"
import { useSelector } from "react-redux"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { init_token } from "../../../network"
import RNRestart from "react-native-restart"
import { deleteAccount } from "../../../middleware/authentication/deleteAccount"
import AppLoading from "../../../components/AppLoading"

const MyAccount: React.FC = () => {
  const restart = () => {
    setTimeout(() => {
      RNRestart.Restart()
    }, 500)
  }
  const navigation = useNavigation<any>()
  const dispatch = useAppDispatch()
  const { userData }: { userData: any } = useSelector((store: RootState) => store?.storage)
  const { deleteAccountLoader } = useSelector((store: RootState) => store?.deleteAccount)

  const MEDIA: any[] = [
    {
      id: 1,
      image: IMAGES.facebook,
      onPress: () => {},
    },
    {
      id: 2,
      image: IMAGES.instagram,
      onPress: () => {},
    },
    {
      id: 3,
      image: IMAGES.twitter,
      onPress: () => {},
    },
    {
      id: 4,
      image: IMAGES.whatsapp,
      onPress: () => {},
    },
    {
      id: 5,
      image: IMAGES.snapchat,
      onPress: () => {},
    },
    {
      id: 6,
      image: IMAGES.youtube,
      onPress: () => {},
    },
  ]
  console.log("userData===========", userData)

  const [visible_Language, setVisible_Language] = useState<boolean>(false)

  const headerSection = () => {
    return (
      <AppHeaderDefault
        back
        title={Trans("account")}
        onPressBack={() => navigation.goBack()}
        // language={Trans("language")}
        // onLanguage={() => setVisible_Language(true)}
      />
    )
  }

  const bodySection = () => {
    const logout = async () => {
      await AsyncStorage.setItem("user_data", "")
      init_token("")
      restart()
    }
    const onLogout = () => {
      Alert.alert(Trans("areSureLogout"), "", [
        {
          text: Trans("logout"),
          onPress: () => logout(),
        },
        {
          text: Trans("cancel"),
          onPress: () => {},
          style: "cancel",
        },
      ])
    }

    const onDeleteAccount = () => {
      Alert.alert(Trans("areSureDeleteAccount"), "", [
        {
          text: Trans("delete"),
          onPress: () => dispatch(deleteAccount({})),
        },
        {
          text: Trans("cancel"),
          onPress: () => {},
          style: "cancel",
        },
      ])
    }
    return (
      <View>
        <View style={styles.profileContainer}>
          <AppText
            title={`${Trans("welcome")} ${userData?.name}`}
            fontSize={calcFont(18)}
            fontFamily={FONTS.bold}
            color={COLORS.textDark}
            textAlign={"left"}
            width={calcWidth(311)}
            lineHeight={calcHeight(16)}
          />
        </View>
        <View style={styles.menuContainer}>
          {/* <SettingItem
            onPress={() => navigation.navigate("AccountDetailsStack", { screen: "Profile" })}
            icon={IMAGES.my_address}
            title={Trans("profile")}
          /> */}
          <SettingItem
            onPress={() =>
              navigation.navigate("AccountDetailsStack", { screen: "MySubscriptions" })
            }
            icon={IMAGES.package}
            title={Trans("mySubscription")}
          />
          <SettingItem
            onPress={() => navigation.navigate("AccountDetailsStack", { screen: "MyAddresses" })}
            icon={IMAGES.my_address}
            title={Trans("myAddress")}
          />
          {/* <SettingItem
            onPress={() => navigation.navigate("AccountDetailsStack", { screen: "Notifications" })}
            icon={IMAGES.my_address}
            title={Trans("notifications")}
          /> */}
          <SettingItem
            onPress={() => setVisible_Language(true)}
            icon={IMAGES.logout}
            title={Trans("languageKey")}
            language={Trans("language")}
          />
          {/* <SettingItem
            onPress={() => navigation.navigate("AccountDetailsStack", { screen: "ContactUs" })}
            icon={IMAGES.delete_account}
            title={Trans("contactUs")}
          /> */}
          {/* <SettingItem
            onPress={() => navigation.navigate("AccountDetailsStack", { screen: "PrivacyPolicy" })}
            icon={IMAGES.delete_account}
            title={Trans("privacyPolicy")}
          /> */}
          {/* <SettingItem
            onPress={() =>
              navigation.navigate("AccountDetailsStack", { screen: "TermsConditions" })
            }
            icon={IMAGES.delete_account}
            title={Trans("termsConditions")}
          /> */}
          {/* <View style={styles.mediaContainer}>
            {MEDIA.map((item: any, index: number) => {
              return (
                <TouchableOpacity onPress={item?.onPress}>
                  <Image source={item?.image} style={styles.mediaImage} />
                </TouchableOpacity>
              )
            })}
          </View> */}
          <SettingItem
            onPress={() => onDeleteAccount()}
            icon={IMAGES.delete_account}
            title={Trans("deleteAccount")}
          />
          <SettingItem onPress={() => onLogout()} icon={IMAGES.logout} title={Trans("logout")} />
        </View>
      </View>
    )
  }

  const emptySection = () => {
    return (
      <AppEmptyScreen
        containerStyle={{ marginTop: calcHeight(120) }}
        image={IMAGES.empty_Login}
        imageStyle={{
          width: calcWidth(240),
          height: calcHeight(240),
          marginBottom: calcHeight(32),
        }}
        title={Trans("notLoggedYet")}
        fontSize={calcFont(18)}
        fontFamily={FONTS.bold}
        textColor={COLORS.textDark}
        textAlign={"center"}
        textWidth={calcWidth(343)}
        buttonTitle={Trans("login")}
        onPress={() => navigation.navigate("AuthenticationStack")}
      />
    )
  }

  const modalLanguage = () => {
    return (
      <AppModalLanguage visible={visible_Language} onClose={() => setVisible_Language(false)} />
    )
  }

  const loadingSection = () => {
    return <AppLoading margin_top={calcHeight(400)} size={"large"} visible={deleteAccountLoader} />
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      {headerSection()}
      {userData?.id ? bodySection() : emptySection()}
      {modalLanguage()}
      {loadingSection()}
    </View>
  )
}

export default MyAccount
