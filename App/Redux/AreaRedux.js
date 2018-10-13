import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  allAreasRequest: [],
  allAreasSuccess: ['data'],
  allAreasFailure: ['error'],
  unassignedAreasRequest: [],
  unassignedAreasSuccess: ['data'],
  unassignedAreasFailure: ['error'],
  assignedAreasRequest: [],
  assignedAreasSuccess: ['data'],
  assignedAreasFailure: ['error'],
  callMake: ['params'],
})

export const AreaTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  allAreas: {},
  allAreasFetching: false,
  allAreasError: null,
  unassignedAreas: {},
  unassignedAreasFetching: false,
  unassignedAreasError: null,
  assignedAreas: {},
  assignedAreasFetching: false,
  assignedAreasError: null
})

/* ------------- Selectors ------------- */

export const areaSelectors = {
  selectAllArea: state => state.allArea
}

/* ------------- Reducers ------------- */

// request the all areas
export const allAreasRequest = (state) => {
  return state.merge({ allAreasFetching: true })
}
// successful request all areas
export const allAreasSuccess = (state, action) => {
  const { data } = action
  return state.merge({ allAreasFetching: false, allAreas: data })
}
// failed to get all areas
export const allAreasFailure = (state, action) => {
  const { error } = action
  return state.merge({allAreasFetching: false, allAreasError: error})
}
// request the all areas
export const unassignedAreasRequest = (state) => {
  return state.merge({ unassignedAreasFetching: true })
}
// successful request all areas
export const unassignedAreasSuccess = (state, action) => {
  const { data } = action
  return state.merge({ unassignedAreasFetching: false, unassignedAreas: data })
}
// failed to get all areas
export const unassignedAreasFailure = (state, action) => {
  const { error } = action
  return state.merge({unassignedAreasFetching: false, unassignedAreasError: error})
}
// request the all areas
export const assignedAreasRequest = (state) => {
  return state.merge({ assignedAreasFetching: true })
}
// successful request all areas
export const assignedAreasSuccess = (state, action) => {
  const { data } = action
  return state.merge({ assignedAreasFetching: false, assignedAreas: data })
}
// failed to get all areas
export const assignedAreasFailure = (state, action) => {
  const { error } = action
  return state.merge({ assignedAreasFetching: false, aassignedAreasError: error })
}
export const callMake = (state) => state

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ALL_AREAS_REQUEST]: allAreasRequest,
  [Types.ALL_AREAS_SUCCESS]: allAreasSuccess,
  [Types.ALL_AREAS_FAILURE]: allAreasFailure,
  [Types.UNASSIGNED_AREAS_REQUEST]: unassignedAreasRequest,
  [Types.UNASSIGNED_AREAS_SUCCESS]: unassignedAreasSuccess,
  [Types.UNASSIGNED_AREAS_FAILURE]: unassignedAreasFailure,
  [Types.ASSIGNED_AREAS_REQUEST]: assignedAreasRequest,
  [Types.ASSIGNED_AREAS_SUCCESS]: assignedAreasSuccess,
  [Types.ASSIGNED_AREAS_FAILURE]: assignedAreasFailure,
  [Types.CALL_MAKE]: callMake
})
