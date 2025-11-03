import React from "react"
import { View, Image, Dimensions, TouchableOpacity } from "react-native"
import Modal from "react-native-modal"
import styles from "./styles"
import { IMAGES } from "../../assets/Images"
import SubscriptionItem from "../SubscriptionItem"

export interface Props {
  visible?: boolean
  onClose?: () => void
  item?: any
}

const ModalShowSubscription: React.FC<Props> = ({ visible, onClose, item }) => {
  return (
    <Modal
      style={{ margin: 0, justifyContent: "center" }}
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
        <View style={styles.closeContainer}>
          <TouchableOpacity onPress={() => onClose()}>
            <Image source={IMAGES.close} style={styles.closeIcon} />
          </TouchableOpacity>
        </View>
        <SubscriptionItem index={item?.id} item={item} onClose={onClose} from={"modal"} />
      </View>
    </Modal>
  )
}

export default ModalShowSubscription
