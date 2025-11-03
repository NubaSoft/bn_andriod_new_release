import React from "react"
import { ActivityIndicator, Modal } from "react-native"
import { COLORS } from "../../utils/theme"

interface Props {
  margin_top?: number
  size?: "large" | "small"
  visible?: boolean
}
const AppLoading: React.FC<Props> = ({ margin_top, size, visible }) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <ActivityIndicator
        size={size}
        color={COLORS.primary}
        animating
        style={{ marginVertical: margin_top }}
      />
    </Modal>
  )
}
export default AppLoading
