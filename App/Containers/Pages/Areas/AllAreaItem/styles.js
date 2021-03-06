import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../../../Themes/index'
import Metrics, { moderateScale, scale, verticalScale } from '../../../../Themes/Metrics'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  insideContainer: {
    backgroundColor: 'grey',
    marginTop: 5,
    width: scale(364),
    flex: 1,
    flexDirection: 'column'
  },

  topContainer: {
    backgroundColor: 'white',
    marginBottom: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  upTextContainer: {
    flex: 4,
    flexDirection: 'column',
    alignItems: 'flex-start'
  },

  containerText: {
    color: 'black',
    paddingLeft: 5,
    paddingTop: 5
  },

  downButtonsPostion: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },

  smallContainerButton1: {
    marginTop: 2,
    marginBottom: 3,
    marginRight: 2
  },
})
