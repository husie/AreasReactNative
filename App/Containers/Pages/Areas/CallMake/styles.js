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
  firstButton: {
    // width: 200,
    // height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
  },
  checkboxContainer: {
    flexDirection: 'row'
  }
})
