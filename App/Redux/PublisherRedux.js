import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  allPublishersRequest: [],
  allPublishersSuccess: ['data'],
  allPublishersFailure: ['error']
})

export const PublisherTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  allPublishers: [],
  allPublishersFetching: false,
  allPublishersError: null
})

/* ------------- Selectors ------------- */

export const publishersSelectors = {
  selectAllPublishers: state => state.allPublishers
}

/* ------------- Reducers ------------- */

// request the all publishers
export const allPublishersRequest = (state) => {
  return state.merge({ allAreasFetching: true })
}
// successful request all publishers
export const allPublishersSuccess = (state, action) => {
  const { data } = action
  return state.merge({ allPublishersFetching: false, allPublishers: data })
}
// failed to get all publishers
export const allPublishersFailure = (state, action) => {
  const { error } = action
  return state.merge({allPublishersFetching: false, allPublishersError: error})
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ALL_PUBLISHERS_REQUEST]: allPublishersRequest,
  [Types.ALL_PUBLISHERS_SUCCESS]: allPublishersSuccess,
  [Types.ALL_PUBLISHERS_FAILURE]: allPublishersFailure
})
