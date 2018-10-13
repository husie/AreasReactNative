import { call, select, put } from 'redux-saga/effects'
import { path } from 'ramda'
import UserActions from '../Redux/UserRedux'
import { NavigationActions } from 'react-navigation'

export const userSelector = (state) => state.user.data

export function * loginUser (api, action) {
  const { email, password } = action
  // make the call to the api
  const response = yield call(api.getUser, email, password)

  if (response.ok) {
    const data = path(['data'], response)
    // do data conversion here if needed
    yield put(UserActions.loginSuccess(data))
    yield call(api.setAuthToken, data.authentication_token)
    yield put(NavigationActions.navigate({ routeName: 'App' }))
  } else {
    response.data ? (yield put(UserActions.loginFailure(response.data.errors.title))) : (yield put(UserActions.loginFailure('Network error')))
  }
}
export function * tokenLoad (api) {
  const user = yield select(userSelector)
  // only set the token if we have it
  if (user) {
    yield call(api.setAuthToken, user.authentication_token)
    yield put(NavigationActions.navigate({ routeName: 'App' }))
  }
}
