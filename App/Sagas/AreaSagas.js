import { call, select, put } from 'redux-saga/effects'
import { path } from 'ramda'
import AreaActions  from '../Redux/AreaRedux'
import { NavigationActions } from 'react-navigation'

export function * getAllAreas (api) {
  // make the call to the api
  const response = yield call(api.getAllAreas)

  if (response.ok) {
    const data = path(['data'], response)
    console.log(data)

    // do data conversion here if needed
    yield put(AreaActions.allAreasSuccess(data))
  } else {
    yield put(AreaActions.allAreasFailure())
  }
}

export function * getUnassignedAreas (api) {
  // make the call to the api
  const response = yield call(api.getUnassignedAreas)

  if (response.ok) {
    const data = path(['data'], response)
    console.log(data)
    // do data conversion here if needed
    yield put(AreaActions.unassignedAreasSuccess(data))
  } else {
    yield put(AreaActions.unassignedAreasFailure())
  }
}
export function * getAssignedAreas (api) {
  // make the call to the api
  const response = yield call(api.getAssignedAreas)

  if (response.ok) {
    const data = path(['data'], response)
    console.log(data)
    // do data conversion here if needed
    yield put(AreaActions.assignedAreasSuccess(data))
  } else {
    yield put(AreaActions.assignedAreasFailure())
  }
}
export function * callMake (api, action) {
  const { params } = action
  // make the call to the api
  const response = yield call(api.callMake, params)

  if (response.ok) {
    const data = path(['data'], response)
    console.log(data)
    // do data conversion here if needed
    yield put(NavigationActions.back())
  }
}

