import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import Metrics, { scale, verticalScale, moderateScale } from '../../Themes/Metrics'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },

  mainInput: {
    borderColor: 'gray',
    borderWidth: 1
  },

  input1Size: {
    height: verticalScale(40),
    width: scale(230)
  },

  input1Position: {
    flex: 0,
    flexDirection: 'row',
    marginTop: verticalScale(30),
  },

  input2Size: {
    height: verticalScale(40),
    width: scale(230)
  },

  input2Position: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  inputText: {
    color: 'red',
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: moderateScale(20),
    marginBottom: 10,
  },

  inputText2: {
    color: 'rgb(160, 176, 162)',
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: moderateScale(20),
    marginBottom: 10,
  },

  buttonLogin: {
    backgroundColor: 'red',
    width: scale(230),
    height: verticalScale(60),
    alignItems: 'center',
    borderRadius:10,
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 20,
  },

  underInputButton: {
    width: scale(180),
    height: verticalScale(40),
    backgroundColor: 'rgba(130, 119, 130, 0.98)',
    marginTop: 10,
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  logoMain: {
    width: scale(230),
    height: verticalScale(260),
  },

  loginButtonText: {
    fontSize: moderateScale(26),
    fontWeight: 'bold',
  },

  forgetButtonText: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  }
})
