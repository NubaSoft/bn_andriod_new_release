import React, { useEffect, useState } from "react"
import { View, FlatList, TouchableOpacity, Image, Dimensions, I18nManager } from "react-native"
import Modal from "react-native-modal"
import styles from "./styles"
import { Text } from "react-native"
import { IMAGES } from "../../assets/Images"
import { Trans } from "../../translation"
import _ from "lodash"
import AppButtonDefault from "../AppButtonDefault"
import AppText from "../AppText"
import { calcFont, calcHeight } from "../../utils/sizes"
import { COLORS, FONTS } from "../../utils/theme"

export interface Props {
  visible?: boolean
  onClose?: () => void
  onSelectItem?: (array: any) => void
  title?: string
  data?: any[]
  itemSelected?: any
  multiSelect?: boolean
  marital_status?: any[]
}

const ModalMultiSelectItem: React.FC<Props> = (params: any) => {
  const [selectItemMartial, setSelectItemMartial] = useState<any[]>([])
  useEffect(() => {
    let maritalStatus = []
    for (let i = 0; i < params?.data?.length; i++) {
      for (let r = 0; r < params?.marital_status?.length; r++) {
        if (params.data[i].key == params?.marital_status[r]) {
          maritalStatus.push(params.data[i])
        } else if (params.data[i].id == params?.marital_status[r].id) {
          maritalStatus.push(params.data[i])
        }
      }
    }
    setSelectItemMartial([...maritalStatus])
  }, [])

  useEffect(() => {
    onSelect2()
  }, [selectItemMartial])
  const onSelect = () => {
    params.multiSelect ? null : params.onClose()
    params.onSelectItem(selectItemMartial)
  }
  const onSelect2 = () => {
    params.onSelectItem(selectItemMartial)
  }

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    // const selectedItem: boolean = selectItemMartial?.includes(item);
    let selectedItem: boolean = [...selectItemMartial].findIndex((e: any) => e.id === item.id) != -1
    const setArray = (item: any) => {
      var _Array: any = selectItemMartial
      const find = [...selectItemMartial].findIndex((e: any) => e.id === item.id)
      find == -1 ? _Array.push(item) : _Array.splice(find, 1)
      setSelectItemMartial([..._Array])
    }
    return (
      <TouchableOpacity
        key={item?.id}
        onPress={() => setArray(item)}
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
        <View>
          <AppButtonDefault onPress={() => onSelect()} title={Trans("save")} />
        </View>
      </View>
    </Modal>
  )
}

export default ModalMultiSelectItem
