import React from "react"
import { View, FlatList, TouchableOpacity, Image, Dimensions } from "react-native"
import Modal from "react-native-modal"
import styles from "./styles"
import { IMAGES } from "../../assets/Images"
import AppText from "../AppText"
import { calcFont, calcHeight } from "../../utils/sizes"
import { COLORS, FONTS } from "../../utils/theme"

export interface Props {
  visible?: boolean
  onClose?: () => void
  onSelectItem?: (item: any) => void
  title?: string
  data?: any[]
  itemSelected?: any
  multiSelect?: boolean
}

const ModalSelectItem: React.FC<Props> = (params: any) => {
  console.log("params----------", params)

  const onSelect = (item: any) => {
    params.multiSelect ? null : params.onClose()
    params.onSelectItem(item)
  }

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const selectedItem: boolean = item.id === params.itemSelected.id
    return (
      <TouchableOpacity
        key={item?.id}
        onPress={() => onSelect(item)}
        style={[
          styles.itemContainer,
          { borderColor: selectedItem ? COLORS.primary : COLORS.borderLight },
        ]}>
        <AppText
          title={item.name}
          fontSize={calcFont(14)}
          fontFamily={FONTS.medium}
          color={selectedItem ? COLORS.primary : COLORS.textLight}
          textAlign={"left"}
        />
        <Image
          source={selectedItem ? IMAGES.switch_active : IMAGES.switch_inActive}
          style={styles.itemIcon}
        />
      </TouchableOpacity>
    )
  }

  return (
    <Modal
      style={{ margin: 0, justifyContent: "flex-end" }}
      hasBackdrop
      propagateSwipe={true}
      animationIn="slideInUp"
      animationInTiming={800}
      animationOutTiming={800}
      isVisible={params.visible}
      onBackdropPress={() => {
        params.onClose()
      }}
      onBackButtonPress={() => {
        params.onClose()
      }}
      deviceHeight={Dimensions.get("screen").height}
      statusBarTranslucent>
      <View style={styles.modalView}>
        <View style={styles.itemTitleContainer}>
          <AppText
            title={params.title}
            fontSize={calcFont(18)}
            fontFamily={FONTS.bold}
            color={COLORS.textDark}
            textAlign={"left"}
            marginBottom={calcHeight(8)}
          />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={params.data}
          renderItem={renderItem}
          keyExtractor={item => `${item?.id}`}
        />
      </View>
    </Modal>
  )
}

export default ModalSelectItem
