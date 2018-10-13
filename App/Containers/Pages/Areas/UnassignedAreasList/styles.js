import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../../../Themes/index'
import Metrics, { moderateScale, scale, verticalScale } from '../../../../Themes/Metrics'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5
  },
  row: {
    flex: 1,
    backgroundColor: Colors.fire,
    marginVertical: Metrics.smallMargin,
    justifyContent: 'center'
  },
  listContent: {
    marginTop: Metrics.baseMargin
  },

  insideContainer: {
    backgroundColor: 'green',
    marginTop: 5,
    width: scale(364),
    flex: 1,
    flexDirection: 'column'
  }
})
