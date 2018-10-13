import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { UserTypes } from '../Redux/UserRedux'
import { AreaTypes } from '../Redux/AreaRedux'

/* ------------- Sagas ------------- */
import { startup } from './StartupSagas'
import { loginUser, tokenLoad } from './UserSagas'
import { getAllAreas, getAssignedAreas, getUnassignedAreas, callMake } from './AreaSagas'

/* ------------- API ------------- */
// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(UserTypes.TOKEN_LOAD, tokenLoad, api),

    // some sagas receive extra parameters in addition to an action
    takeLatest(UserTypes.LOGIN_REQUEST, loginUser, api),
    takeLatest(AreaTypes.ALL_AREAS_REQUEST, getAllAreas, api),
    takeLatest(AreaTypes.UNASSIGNED_AREAS_REQUEST, getUnassignedAreas, api),
    takeLatest(AreaTypes.ASSIGNED_AREAS_REQUEST, getAssignedAreas, api),
    takeLatest(AreaTypes.CALL_MAKE, callMake, api),
  ])
}
