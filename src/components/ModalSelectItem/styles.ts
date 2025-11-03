import {StyleSheet} from 'react-native';
import { calcHeight, calcWidth } from '../../utils/sizes';
import { COLORS } from '../../utils/theme';
const styles = StyleSheet.create({
    modalView: {
        maxHeight: calcHeight(480),
        backgroundColor: COLORS.white,
        borderTopLeftRadius: calcWidth(16),
        borderTopRightRadius: calcWidth(16),
        justifyContent: 'center',
        paddingHorizontal: calcWidth(16),
        paddingVertical: calcHeight(24),
    },
    itemContainer: {
        width: calcWidth(343),
        height: calcHeight(48),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: calcHeight(8),
        borderWidth: 1.4,
        borderRadius: calcWidth(8),
        paddingHorizontal: calcWidth(16),
    },
    itemTitleContainer: {
        width: calcWidth(375),
        borderBottomColor: COLORS.borderLight,
        borderBottomWidth: 1,
        alignSelf: 'center',
        paddingHorizontal: calcWidth(16),
        marginBottom: calcHeight(4),
    },
    itemIcon: {
        width: calcHeight(24),
        height: calcHeight(24),
    },
});
export default styles;