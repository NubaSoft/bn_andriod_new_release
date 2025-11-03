import React, { useEffect, useState } from "react"
import { I18nManager, ScrollView, View } from "react-native"
import styles from "./styles"
import { StatusBar } from "react-native"
import AppInput from "../../../components/AppInput"
import { calcFont, calcHeight, calcWidth } from "../../../utils/sizes"
import { COLORS, FONTS } from "../../../utils/theme"
import { Trans } from "../../../translation"
import AppButtonDefault from "../../../components/AppButtonDefault"
import { useNavigation } from "@react-navigation/native"
import { RootState, useAppDispatch } from "../../../redux/store/store"
import AppHeaderDefault from "../../../components/AppHeaderDefault"
import AppLoading from "../../../components/AppLoading"
import PickerSelect from "../../../components/PickerSelect"
import { useSelector } from "react-redux"
import ModalSelectItem from "../../../components/ModalSelectItem"
import ModalMultiSelectItem from "../../../components/ModalMultiSelectItem"
import endpoints from "../../../network/endpoints"
import { editAddress } from "../../../middleware/addresses/editAddress"

const EditAddress: React.FC<{}> = (params: any) => {
  const paramsData: any = params?.route?.params
  const navigation = useNavigation<any>()
  const dispatch = useAppDispatch()
  const { addressLoader } = useSelector((store: RootState) => store?.address)
  const [areasList, setAreasList] = useState<any>([])
  const [selectDeliveryDays, setSelectDeliveryDays] = useState<any>([])
  console.log("selectDeliveryDays>>>>>>>>>>>>>>>>", selectDeliveryDays)

  const [selectDeliveryTime, setSelectDeliveryTime] = useState<any>("")
  const [selectGovernment, setSelectGovernment] = useState<any>("")
  const [selectArea, setSelectArea] = useState<any>("")
  const [addressName, setAddressName] = useState<string>("")
  const [block, setBlock] = useState<string>("")
  const [street, setStreet] = useState<string>("")
  const [building, setBuilding] = useState<string>("")
  const [flat, setFlat] = useState<string>("")
  const [jadda, setJadda] = useState<string>("")
  const [floor, setFloor] = useState<string>("")
  const [notes, setNotes] = useState<string>("")
  const [checkDeliveryDays, setCheckDeliveryDays] = useState<boolean>(false)
  const [checkDeliveryTime, setCheckDeliveryTime] = useState<boolean>(false)
  const [checkGovernment, setCheckGovernment] = useState<boolean>(false)
  const [checkArea, setCheckArea] = useState<boolean>(false)
  const [checkAddressName, setCheckAddressName] = useState<boolean>(false)
  const [checkBlock, setCheckBlock] = useState<boolean>(false)
  const [checkStreet, setCheckStreet] = useState<boolean>(false)
  const [checkBuilding, setCheckBuilding] = useState<boolean>(false)
  const [checkFlat, setCheckFlat] = useState<boolean>(false)
  const [checkJadda, setCheckJadda] = useState<boolean>(false)
  const [checkFloor, setCheckFloor] = useState<boolean>(false)
  const [checkNotes, setCheckNotes] = useState<boolean>(false)
  const [visible_DeliveryDays, setVisible_DeliveryDays] = useState<boolean>(false)
  const [visible_DeliveryTime, setVisible_DeliveryTime] = useState<boolean>(false)
  const [visible_Government, setVisible_Government] = useState<boolean>(false)
  const [visible_Area, setVisible_Area] = useState<boolean>(false)

  const DAYES: any[] = [
    { id: 1, key: "Saturday", name: Trans("Saturday") },
    { id: 2, key: "Sunday", name: Trans("Sunday") },
    { id: 3, key: "Monday", name: Trans("Monday") },
    { id: 4, key: "Tuesday", name: Trans("Tuesday") },
    { id: 5, key: "Wednesday", name: Trans("Wednesday") },
    { id: 6, key: "Thursday", name: Trans("Thursday") },
    { id: 7, key: "Friday", name: Trans("Friday") },
  ]
  const setData = () => {
    // timeSlotId:2
    // centerId:16
    // did:7
    // :Home 4
    // area:مبارك الكبير
    // area_id:82
    // :None
    // :7
    // government:مبارك الكبير
    // :42
    // :41
    // :46
    // :44
    // :45
    // :43
    // fromTime:13:00:00 PM
    // toTime:18:00:00 PM
    setAddressName(paramsData?.item?.addressName)
    setBlock(paramsData?.item?.block)
    setStreet(paramsData?.item?.street)
    setBuilding(paramsData?.item?.building)
    setFlat(paramsData?.item?.flat)
    setJadda(paramsData?.item?.jadda)
    setFloor(paramsData?.item?.floor)
    setNotes(paramsData?.item?.notes)
    var SELECTDAYS: any[] = []
    for (let i = 0; i < DAYES.length; i++) {
      for (let d = 0; d < paramsData?.item?.deliveryDays?.length; d++) {
        if (DAYES[i]?.key == paramsData?.item?.deliveryDays[d]) {
          SELECTDAYS.push(DAYES[i])
          // setSelectDeliveryDays((prev: any) => [...prev, DAYES[i]])
        }
      }
    }
    console.log("SELECTDAYS-----------", SELECTDAYS)

    setSelectDeliveryDays(SELECTDAYS)
    for (let i = 0; i < paramsData?.governmentsList?.length; i++) {
      if (paramsData?.item?.government_id == paramsData?.governmentsList[i]?.id) {
        setSelectGovernment(paramsData?.governmentsList[i])
        var AREAS: any[] = []
        for (let a = 0; a < paramsData?.governmentsList[i]?.data?.length; a++) {
          AREAS.push({
            id: paramsData?.governmentsList[i]?.data[a]?.id,
            name: I18nManager.isRTL
              ? paramsData?.governmentsList[i]?.data[a]?.name
              : paramsData?.governmentsList[i]?.data[a]?.nameEn,
          })
        }
        for (let r = 0; r < AREAS.length; r++) {
          if (paramsData?.item?.area_id == AREAS[r]?.id) {
            setSelectArea(AREAS[r])
          }
        }
        setAreasList(AREAS)
      }
    }
    for (let d = 0; d < paramsData?.deliveryTimesList.length; d++) {
      if (paramsData?.item?.timeSlotId == paramsData?.deliveryTimesList[d]?.id) {
        setSelectDeliveryTime(paramsData?.deliveryTimesList[d])
      }
    }
  }
  useEffect(() => {
    setData()
  }, [])

  useEffect(() => {
    if (selectGovernment?.data?.length >= 1) {
      var AREAS: any[] = []
      for (let i = 0; i < selectGovernment?.data?.length; i++) {
        AREAS.push({
          id: selectGovernment?.data[i]?.id,
          name: I18nManager.isRTL
            ? selectGovernment?.data[i]?.name
            : selectGovernment?.data[i]?.nameEn,
        })
      }
      setAreasList(AREAS)
    }
  }, [selectGovernment])

  const headerSection = () => {
    return (
      <AppHeaderDefault
        back
        title={Trans("editAddress")}
        onPressBack={() => navigation.goBack()}
        fontSize={calcFont(20)}
      />
    )
  }

  const bodySection = () => {
    const onChangeAddressName = (addressName?: string | any) => {
      setAddressName(addressName)
      addressName == "" ? setCheckAddressName(true) : setCheckAddressName(false)
    }
    const onChangeBlock = (block?: string | any) => {
      setBlock(block)
      block == "" ? setCheckBlock(true) : setCheckBlock(false)
    }
    const onChangeStreet = (street?: string | any) => {
      setStreet(street)
      street == "" ? setCheckStreet(true) : setCheckStreet(false)
    }
    const onChangeBuilding = (building?: string | any) => {
      setBuilding(building)
      building == "" ? setCheckBuilding(true) : setCheckBuilding(false)
    }
    const onChangeFlat = (flat?: string | any) => {
      setFlat(flat)
      flat == "" ? setCheckFlat(true) : setCheckFlat(false)
    }
    const onChangeJadda = (jadda?: string | any) => {
      setJadda(jadda)
      jadda == "" ? setCheckJadda(true) : setCheckJadda(false)
    }
    const onChangeFloor = (floor?: string | any) => {
      setFloor(floor)
      floor == "" ? setCheckFloor(true) : setCheckFloor(false)
    }
    const onChangeNotes = (notes?: string | any) => {
      setNotes(notes)
      notes == "" ? setCheckNotes(true) : setCheckNotes(false)
    }
    function formatDate(date: any) {
      let d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear()

      if (month.length < 2) month = "0" + month
      if (day.length < 2) day = "0" + day

      return [year, month, day].join("-")
    }
    const onEditAddress = () => {
      if (!selectGovernment) {
        setCheckGovernment(true)
      } else if (!selectArea) {
        setCheckArea(true)
      } else if (!selectDeliveryTime) {
        setCheckDeliveryTime(true)
      } else if (block == "") {
        setCheckBlock(true)
      } else if (street == "") {
        setCheckStreet(true)
      } else if (building == "") {
        setCheckBuilding(true)
      } else {
        var selectDayes: any[] = []
        for (let i = 0; i < selectDeliveryDays?.length; i++) {
          selectDayes.push(selectDeliveryDays[i]?.key)
        }
        const data = {
          centerId: endpoints.branch_code,
          addressId: paramsData?.item?.did,
          deliveryDays: selectDayes,
          timeslot: selectDeliveryTime?.id,
          area: selectArea?.id,
          addressName,
          block,
          street,
          building,
          flat,
          jadda,
          floor,
          notes,
          navigation,
        }
        console.log("data-----onEditAddress-------", data)
        dispatch(editAddress(data))
      }
    }
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.bodyContainer}>
          <PickerSelect
            containerStyle={{
              width: calcWidth(277),
              marginTop: calcHeight(8),
            }}
            viewStyle={{ width: calcWidth(277) }}
            title={Trans("deliveryDays")}
            fontSize={calcFont(14)}
            fontFamily={FONTS.bold}
            value={
              selectDeliveryDays.length >= 1
                ? `${selectDeliveryDays?.length} ${Trans("daysSelected")}`
                : Trans("selectDeliveryDays")
            }
            onPress={() => setVisible_DeliveryDays(true)}
            error={checkDeliveryDays}
            errorMessage={Trans("selectDeliveryDaysRequired")}
            required
          />
          <PickerSelect
            containerStyle={{
              width: calcWidth(277),
              marginTop: calcHeight(8),
            }}
            viewStyle={{ width: calcWidth(277) }}
            title={Trans("deliveryTime")}
            fontSize={calcFont(14)}
            fontFamily={FONTS.bold}
            value={selectDeliveryTime ? selectDeliveryTime?.name : Trans("selectDeliveryTime")}
            onPress={() => setVisible_DeliveryTime(true)}
            error={checkDeliveryTime}
            errorMessage={Trans("selectDeliveryTimeRequired")}
            required
          />
          <PickerSelect
            containerStyle={{
              width: calcWidth(277),
              marginTop: calcHeight(8),
            }}
            viewStyle={{ width: calcWidth(277) }}
            title={Trans("government")}
            fontSize={calcFont(14)}
            fontFamily={FONTS.bold}
            value={selectGovernment ? selectGovernment?.name : Trans("selectGovernment")}
            onPress={() => setVisible_Government(true)}
            error={checkGovernment}
            errorMessage={Trans("selectGovernmentRequired")}
            required
          />
          <PickerSelect
            containerStyle={{
              width: calcWidth(277),
              marginTop: calcHeight(8),
            }}
            viewStyle={{ width: calcWidth(277) }}
            title={Trans("area")}
            fontSize={calcFont(14)}
            fontFamily={FONTS.bold}
            value={selectArea ? selectArea?.name : Trans("selectArea")}
            onPress={() => setVisible_Area(true)}
            error={checkArea}
            errorMessage={Trans("selectAreaRequired")}
            required
          />
          <AppInput
            containerStyle={{ width: calcWidth(277), marginTop: calcHeight(8) }}
            title={Trans("addressName")}
            fontSize={calcFont(14)}
            fontFamily={FONTS.bold}
            placeholder={Trans("addressName")}
            value={addressName}
            onChangeText={(text: string) => onChangeAddressName(text)}
            inputContainer={{
              width: calcWidth(277),
              borderColor: checkAddressName ? COLORS.red : COLORS.borderLight,
            }}
            error={checkAddressName}
            errorMessage={Trans("addressNameRequired")}
            required
          />
          <View style={styles.lineContainer}>
            <AppInput
              containerStyle={{ width: calcWidth(130), marginTop: calcHeight(8) }}
              title={Trans("block")}
              fontSize={calcFont(14)}
              fontFamily={FONTS.bold}
              placeholder={Trans("block")}
              value={block}
              onChangeText={(text: string) => onChangeBlock(text)}
              inputContainer={{
                width: calcWidth(130),
                borderColor: checkBlock ? COLORS.red : COLORS.borderLight,
              }}
              error={checkBlock}
              errorMessage={Trans("blockRequired")}
              required
            />
            <AppInput
              containerStyle={{ width: calcWidth(130), marginTop: calcHeight(8) }}
              title={Trans("street")}
              fontSize={calcFont(14)}
              fontFamily={FONTS.bold}
              placeholder={Trans("street")}
              value={street}
              onChangeText={(text: string) => onChangeStreet(text)}
              inputContainer={{
                width: calcWidth(130),
                borderColor: checkStreet ? COLORS.red : COLORS.borderLight,
              }}
              error={checkStreet}
              errorMessage={Trans("streetRequired")}
              required
            />
          </View>
          <View style={styles.lineContainer}>
            <AppInput
              containerStyle={{ width: calcWidth(130), marginTop: calcHeight(8) }}
              title={Trans("building")}
              fontSize={calcFont(14)}
              fontFamily={FONTS.bold}
              placeholder={Trans("building")}
              value={building}
              onChangeText={(text: string) => onChangeBuilding(text)}
              inputContainer={{
                width: calcWidth(130),
                borderColor: checkBuilding ? COLORS.red : COLORS.borderLight,
              }}
              error={checkBuilding}
              errorMessage={Trans("buildingRequired")}
              required
            />
            <AppInput
              containerStyle={{ width: calcWidth(130), marginTop: calcHeight(8) }}
              title={Trans("flat")}
              fontSize={calcFont(14)}
              fontFamily={FONTS.bold}
              placeholder={Trans("flat")}
              value={flat}
              onChangeText={(text: string) => onChangeFlat(text)}
              inputContainer={{
                width: calcWidth(130),
                borderColor: checkFlat ? COLORS.red : COLORS.borderLight,
              }}
              // error={checkFlat}
              errorMessage={Trans("flatRequired")}
              // required
            />
          </View>
          <View style={styles.lineContainer}>
            <AppInput
              containerStyle={{ width: calcWidth(130), marginTop: calcHeight(8) }}
              title={Trans("jadda")}
              fontSize={calcFont(14)}
              fontFamily={FONTS.bold}
              placeholder={Trans("jadda")}
              value={jadda}
              onChangeText={(text: string) => onChangeJadda(text)}
              inputContainer={{
                width: calcWidth(130),
                borderColor: checkJadda ? COLORS.red : COLORS.borderLight,
              }}
              // error={checkJadda}
              errorMessage={Trans("jaddaRequired")}
              // required
            />
            <AppInput
              containerStyle={{ width: calcWidth(130), marginTop: calcHeight(8) }}
              title={Trans("floor")}
              fontSize={calcFont(14)}
              fontFamily={FONTS.bold}
              placeholder={Trans("floor")}
              value={floor}
              onChangeText={(text: string) => onChangeFloor(text)}
              inputContainer={{
                width: calcWidth(130),
                borderColor: checkFloor ? COLORS.red : COLORS.borderLight,
              }}
              // error={checkFloor}
              errorMessage={Trans("floorRequired")}
              // required
            />
          </View>
          <AppInput
            containerStyle={{ width: calcWidth(277), marginTop: calcHeight(8) }}
            title={Trans("notes")}
            fontSize={calcFont(14)}
            fontFamily={FONTS.bold}
            placeholder={Trans("notes")}
            value={notes}
            onChangeText={(text: string) => onChangeNotes(text)}
            inputContainer={{
              width: calcWidth(277),
              borderColor: checkNotes ? COLORS.red : COLORS.borderLight,
            }}
            // error={checkNotes}
            errorMessage={Trans("notesRequired")}
            // required
          />

          <AppButtonDefault
            onPress={() => onEditAddress()}
            width={calcWidth(277)}
            height={calcHeight(45)}
            backgroundColor={COLORS.primary}
            title={Trans("edit")}
            fontFamily={FONTS.extra_bold}
            fontSize={calcFont(16)}
            titleColor={COLORS.textDark}
            buttonStyle={styles.buttonContainer}
          />
        </View>
      </ScrollView>
    )
  }

  const modalSelectDeliveryDays = () => {
    return (
      <ModalMultiSelectItem
        visible={visible_DeliveryDays}
        onClose={() => {
          setVisible_DeliveryDays(false)
        }}
        onSelectItem={(item: any) => {
          setSelectDeliveryDays(item)
          setCheckDeliveryDays(false)
        }}
        title={Trans("selectDeliveryDays")}
        data={DAYES}
        marital_status={selectDeliveryDays}
        itemSelected={selectDeliveryDays}
      />
    )
  }

  const modalSelectDeliveryTime = () => {
    return (
      <ModalSelectItem
        visible={visible_DeliveryTime}
        onClose={() => {
          setVisible_DeliveryTime(false)
        }}
        onSelectItem={(item: any) => {
          setSelectDeliveryTime(item)
          setCheckDeliveryTime(false)
        }}
        title={Trans("selectDeliveryTime")}
        data={paramsData?.deliveryTimesList}
        itemSelected={selectDeliveryTime}
      />
    )
  }

  const modalSelectGovernment = () => {
    return (
      <ModalSelectItem
        visible={visible_Government}
        onClose={() => {
          setVisible_Government(false)
        }}
        onSelectItem={(item: any) => {
          setSelectGovernment(item)
          setSelectArea("")
          setCheckGovernment(false)
        }}
        title={Trans("selectGovernment")}
        data={paramsData?.governmentsList}
        itemSelected={selectGovernment}
      />
    )
  }

  const modalSelectAreas = () => {
    return (
      <ModalSelectItem
        visible={visible_Area}
        onClose={() => {
          setVisible_Area(false)
        }}
        onSelectItem={(item: any) => {
          setSelectArea(item)
          setCheckArea(false)
        }}
        title={Trans("selectArea")}
        data={areasList}
        itemSelected={selectArea}
      />
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
      {visible_DeliveryDays && modalSelectDeliveryDays()}
      {modalSelectDeliveryTime()}
      {modalSelectGovernment()}
      {modalSelectAreas()}
      {loadingSection()}
    </View>
  )
}
export default EditAddress
