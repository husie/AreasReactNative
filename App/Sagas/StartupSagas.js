import { put } from 'redux-saga/effects'
import UserActions from '../Redux/UserRedux'

// process STARTUP actions
export function * startup (action) {
  if (__DEV__ && console.tron) {
    // straight-up string logging
    console.tron.log('Hello, I\'m an example of how to log via Reactotron.')

    // logging an object for better clarity
    console.tron.log({
      message: 'pass objects for better logging'
    })

    // fully customized!
    const subObject = { a: 1, b: [1, 2, 3], c: true }
    subObject.circularDependency = subObject // osnap!
    console.tron.display({
      name: '🔥 IGNITE 🔥',
      preview: 'You should totally expand this',
      value: {
        '💃': 'Welcome to the future!',
        subObject,
        someGeneratorFunction: startup
      }
    })
  }
  const DeviceInfo = require('react-native-device-info')
  const currentLocale = DeviceInfo.getDeviceLocale()

  yield put(UserActions.tokenLoad())
}
