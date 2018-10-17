import { call, select, put } from 'redux-saga/effects'
import { path } from 'ramda'
import PublisherActions, {allPublishersSuccess} from '../Redux/PublisherRedux'

export const publisherSelector = (state) => state.publisher.data

export function * getAllPublishers (api) {

  // make the call to the api
  const response = yield call(api.getAllPublishers)

  if (response.ok) {
    const data = path(['data'], response)
    console.log(data)

    // do data conversion here if needed
    yield put(PublisherActions.allPublishersSuccess(data))
  }
}
