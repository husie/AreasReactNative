import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../../../Themes/index'
import Metrics, { moderateScale, scale, verticalScale } from '../../../../Themes/Metrics'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  listContent: {
  },
  headerContainer: {
    flexDirection: 'row'
  },
  itemContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  areaAddress: {
    flex: 2,
  },
  areaDate: {
    flex: 3
  },
  buttonRemove: {
    flex:1
  }
})
