import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  allGroupsRequest: [],
  allGroupsSuccess: ['data'],
  allGroupsFailure: ['error']
})

export const GroupTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  allGroups: [],
  allGroupsFetching: false,
  allGroupsError: null
})

/* ------------- Selectors ------------- */

export const publishersSelectors = {
  selectAllGroups: state => state.allGroups
}

/* ------------- Reducers ------------- */

// request the all publishers
export const allGroupsRequest = (state) => {
  return state.merge({ allAreasFetching: true })
}
// successful request all publishers
export const allGroupsSuccess = (state, action) => {
  const { data } = action
  return state.merge({ allGroupsFetching: false, allGroups: data })
}
// failed to get all publishers
export const allGroupsFailure = (state, action) => {
  const { error } = action
  return state.merge({allGroupsFetching: false, allGroupsError: error})
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ALL_GROUPS_REQUEST]: allGroupsRequest,
  [Types.ALL_GROUPS_SUCCESS]: allGroupsSuccess,
  [Types.ALL_GROUPS_FAILURE]: allGroupsFailure
})
