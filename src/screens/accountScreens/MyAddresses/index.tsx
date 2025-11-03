import React, { useEffect, useState } from "react"
import { Alert, I18nManager, StatusBar, View } from "react-native"
import styles from "./styles"
import { useNavigation } from "@react-navigation/native"
import { RootState, useAppDispatch } from "../../../redux/store/store"
import AppHeaderDefault from "../../../components/AppHeaderDefault"
import { IMAGES } from "../../../assets/Images"
import { useSelector } from "react-redux"
import { myAddresses } from "../../../middleware/addresses/myAddresses"
import AppLoading from "../../../components/AppLoading"
import AddressItem from "../../../components/AddressItem"
import { calcHeight } from "../../../utils/sizes"
import { FlatList } from "react-native-gesture-handler"
import { Trans } from "../../../translation"
import endpoints from "../../../network/endpoints"
import { deleteAddress } from "../../../middleware/addresses/deleteAddress"
import { governments } from "../../../middleware/general/governments"
import { deliveryTimes } from "../../../middleware/general/deliveryTimes"

const MyAddresses: React.FC = () => {
  const navigation = useNavigation<any>()
  const dispatch = useAppDispatch()
  const { addressLoader, myAddressesData } = useSelector((store: RootState) => store?.address)
  const { governmentsData } = useSelector((store: RootState) => store?.governments)
  const { deliveryTimesData } = useSelector((store: RootState) => store?.deliveryTimes)
  const [governmentsList, setGovernmentsList] = useState<any>([])
  const [deliveryTimesList, setDeliveryTimesList] = useState<any>([])

  useEffect(() => {
    dispatch(myAddresses({}))
    dispatch(governments({}))
    dispatch(deliveryTimes({}))
  }, [])

  useEffect(() => {
    if (governmentsData?.length >= 1) {
      var GOVERNMENTS: any[] = []
      for (let i = 0; i < governmentsData?.length; i++) {
        GOVERNMENTS.push({
          id: governmentsData[i]?.governmentId,
          name: I18nManager.isRTL
            ? governmentsData[i]?.governmentNameAr
            : governmentsData[i]?.governmentNameEn,
          data: governmentsData[i]?.data,
        })
      }
      setGovernmentsList(GOVERNMENTS)
    }
  }, [governmentsData])

  useEffect(() => {
    if (deliveryTimesData?.length >= 1) {
      var DELIVERY_TIMES: any[] = []
      for (let i = 0; i < deliveryTimesData?.length; i++) {
        DELIVERY_TIMES.push({
          id: deliveryTimesData[i]?.id,
          name: `${
            I18nManager.isRTL ? deliveryTimesData[i].nameAr : deliveryTimesData[i].nameEn
          }: ${deliveryTimesData[i].startTime.slice(0, 5)} - ${deliveryTimesData[i].endTime.slice(
            0,
            5,
          )}`,
        })
      }
      setDeliveryTimesList(DELIVERY_TIMES)
    }
  }, [deliveryTimesData])
  const headerSection = () => {
    return (
      <AppHeaderDefault
        back
        title={Trans("myAddress")}
        onPressBack={() => navigation.goBack()}
        icon1={IMAGES.add}
        onPress1={() => navigation.navigate("AddNewAddress")}
      />
    )
  }

  const bodySection = () => {
    const onDeleteAddress = (item: any) => {
      Alert.alert(Trans("areSureDeleteAddress"), "", [
        {
          text: Trans("delete"),
          onPress: () =>
            dispatch(
              deleteAddress({
                addressId: item?.did,
                centerId: endpoints.branch_code,
              }),
            ),
        },
        {
          text: Trans("cancel"),
          onPress: () => {},
          style: "cancel",
        },
      ])
    }
    const renderAddressItem = ({ item, index }: { item: any; index: number }) => {
      return (
        <AddressItem
          item={item}
          index={index}
          onPressEdit={() =>
            navigation.navigate("EditAddress", { item, governmentsList, deliveryTimesList })
          }
          onPressDelete={() => onDeleteAddress(item)}
        />
      )
    }

    return (
      <View style={styles.listContainer}>
        <FlatList
          contentContainerStyle={{ paddingBottom: calcHeight(140) }}
          showsVerticalScrollIndicator={false}
          data={myAddressesData}
          renderItem={renderAddressItem}
          keyExtractor={(item, index) => `${index}`}
        />
      </View>
    )
  }

  const loadingSection = () => {
    return <AppLoading margin_top={calcHeight(400)} size={"large"} visible={addressLoader} />
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      {headerSection()}
      {bodySection()}
      {loadingSection()}
    </View>
  )
}

export default MyAddresses
