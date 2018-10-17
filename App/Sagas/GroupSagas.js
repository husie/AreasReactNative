import { call, select, put } from 'redux-saga/effects'
import { path } from 'ramda'
import GroupActions, {allGroupsSuccess} from '../Redux/GroupRedux'

export const publisherSelector = (state) => state.publisher.data

export function * getAllGroups (api) {

  // make the call to the api
  const response = yield call(api.getAllGroups)

  if (response.ok) {
    const data = path(['data'], response)
    console.log(data)

    // do data conversion here if needed
    yield put(GroupActions.allGroupsSuccess(data))
  }
}
