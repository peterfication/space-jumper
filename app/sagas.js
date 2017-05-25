import { put, fork, select, takeEvery } from 'redux-saga/effects'

import { actions, actionTypes } from './actions'

import { calculateMovement } from './lib/keyCodeUtils'

export function* keyDown(action) {
  const stateCopy = yield select(state => ({
    bigJump: state.bigJump,
    mode: state.mode,
    showDie: state.showDie,
    showLevelAccomplished: state.showLevelAccomplished,
  }))

  // Movements
  const moveValue = yield calculateMovement(stateCopy, action)
  if (moveValue) {
    yield put(actions.move(moveValue))
  }
}

export default function* rootSaga() {
  yield fork(takeEvery, actionTypes.KEY_DOWN, keyDown)
}

