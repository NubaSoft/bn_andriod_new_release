import {StyleSheet} from 'react-native';
import { calcHeight, calcWidth } from '../../utils/sizes';

export const styles = StyleSheet.create({
    container: {
        width: calcWidth(375),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: calcWidth(24),
    },
    moreView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: calcWidth(16),
        height: calcWidth(16),
        marginEnd: calcWidth(1),
    },
});
