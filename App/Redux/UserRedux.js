import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  tokenLoad: [],
  loginRequest: ['email', 'password'],
  loginSuccess: ['data'],
  loginFailure: ['error'],
  logoutUser: []
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  error: null,
  email: '',
  password: ''
})

/* ------------- Selectors ------------- */

export const UserSelectors = {
  selectUser: state => state.user
}

/* ------------- Reducers ------------- */

// attempt to load token from startup sagas
export const tokenLoad = (state) => state.merge({ fetching: true })
// request the user
export const loginRequest = (state, action) => {
  const { email, password } = action
  return state.merge({ fetching: true, data: null, password: password, email: email })
}
// successful request the user
export const loginSuccess = (state, action) => {
  const { data } = action
  return state.merge({ fetching: false, error: null, data })
}
// failed to get the user
export const loginFailure = (state, action) => {
  const { error } = action
  return state.merge({fetching: false, data: null, error})
}
// logout user
export const logoutUser = (state) => state.merge({data: null, fetching: null, error: null})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TOKEN_LOAD]: tokenLoad,
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.LOGOUT_USER]: logoutUser
})
