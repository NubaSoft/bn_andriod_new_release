import React from "react"
import { Alert, FlatList, StatusBar, View } from "react-native"
import styles from "./styles"
import { useNavigation } from "@react-navigation/native"
import { RootState, useAppDispatch } from "../../../redux/store/store"
import { calcHeight } from "../../../utils/sizes"
import AppHeaderDefault from "../../../components/AppHeaderDefault"
import { Trans } from "../../../translation"
import { useSelector } from "react-redux"
import SubscriptionItem from "../../../components/SubscriptionItem"

const WeSubscriptionsList: React.FC = () => {
  const navigation = useNavigation<any>()
  const dispatch = useAppDispatch()
  const { topSubscriptionsData }: { topSubscriptionsData: any } = useSelector(
    (store: RootState) => store?.topSubscriptions,
  )

  const headerSection = () => {
    return (
      <AppHeaderDefault title={Trans("wePlanned")} back onPressBack={() => navigation.goBack()} />
    )
  }

  const listSection = () => {
    const renderOurListItem = ({ item, index }: { item: any; index: number }) => {
      console.log("item===renderOurListItem======>>>>>>>>>", item)

      return <SubscriptionItem index={index} item={item} from={"item"} />
    }
    return (
      <View style={styles.listContainer}>
        <FlatList
          contentContainerStyle={{ paddingBottom: calcHeight(160) }}
          showsVerticalScrollIndicator={false}
          data={topSubscriptionsData}
          renderItem={renderOurListItem}
          keyExtractor={item => `${item?.id}`}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      {headerSection()}
      {listSection()}
    </View>
  )
}

export default WeSubscriptionsList
