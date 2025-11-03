import React from "react"
import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  I18nManager,
} from "react-native"
import Modal from "react-native-modal"
import styles from "./styles"
import { IMAGES } from "../../assets/Images"
import AppText from "../AppText"
import { calcFont, calcHeight, calcWidth } from "../../utils/sizes"
import { COLORS, FONTS } from "../../utils/theme"
import { Trans } from "../../translation"

export interface Props {
  visible?: boolean
  onClose?: () => void
  item?: any
}

const ModalShowMeal: React.FC<Props> = ({ visible, onClose, item }) => {
  console.log("item======>>>>>>>>>", item)

  const DETAILS: any = [
    {
      id: 1,
      title: Trans("proteins"),
      value: item?.proteins,
      icon: IMAGES.proteins,
      color: "#f44f48",
    },
    {
      id: 2,
      title: Trans("calories"),
      value: item?.calories,
      icon: IMAGES.calories,
      color: "#f88e2f",
    },
    {
      id: 3,
      title: Trans("carbs"),
      value: item?.carbs,
      icon: IMAGES.carbs,
      color: "#38b53e",
    },
    {
      id: 4,
      title: Trans("fats"),
      value: item?.fats,
      icon: IMAGES.fats,
      color: "#4864f4",
    },
  ]
  return (
    <Modal
      style={{ margin: 0, justifyContent: "flex-end" }}
      hasBackdrop
      propagateSwipe={true}
      animationIn="slideInUp"
      animationInTiming={800}
      animationOutTiming={800}
      isVisible={visible}
      onBackdropPress={() => onClose()}
      onBackButtonPress={() => onClose()}
      deviceHeight={Dimensions.get("screen").height}
      statusBarTranslucent>
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: item?.mealImage }}
          defaultSource={IMAGES.logo}
          style={styles.image}
          imageStyle={styles.image}></ImageBackground>
        <View style={styles.dataContainer}>
          <AppText
            title={I18nManager.isRTL ? item?.itemNameAr : item?.itemNameEn}
            fontSize={calcFont(18)}
            fontFamily={FONTS.bold}
            color={COLORS.textDark}
            lineHeight={calcHeight(18)}
            textAlign={"center"}
            width={calcWidth(327)}
            numberOfLines={2}
          />
          <View style={styles.detailsContainer}>
            {DETAILS.map((item: any) => {
              return (
                <View style={styles.detailsItemContainer} key={item?.id}>
                  <View style={[styles.detailsView, { borderColor: item?.color }]}>
                    <Image source={item?.icon} style={styles.detailsIcon} />
                    <AppText
                      title={item?.value}
                      fontSize={calcFont(14)}
                      fontFamily={FONTS.bold}
                      color={COLORS.textDark}
                      lineHeight={calcHeight(15)}
                      textAlign={"center"}
                    />
                  </View>
                  <AppText
                    title={item?.title}
                    fontSize={calcFont(14)}
                    fontFamily={FONTS.bold}
                    color={COLORS.textDark}
                    lineHeight={calcHeight(15)}
                    textAlign={"center"}
                    marginBottom={calcHeight(2)}
                  />
                </View>
              )
            })}
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default ModalShowMeal
