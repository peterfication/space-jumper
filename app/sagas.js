import { put, fork, select, takeEvery } from 'redux-saga/effects'

import { actions, actionTypes } from './actions'
import { playerCannotMoveAnymore, platformCount } from './lib/gameHelpers'
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

export function* ensurePlayerIsOnPlatform() {
  const board = yield select(state => state.board)
  const position = yield select(state => state.position)
  const [x, y] = position
  const row = board[y]

  // Check if player is outside of board
  // Or if player is on a position without a platform
  if (!row || row[x] === 0) {
    yield put(actions.die())
  }
}

// Succeed the level if only one platfrom is left
export function* checkPlatformCount() {
  const board = yield select(state => state.board)
  const position = yield select(state => state.position)

  if (platformCount(board) <= 1) {
    yield put(actions.showLevelAccomplished())
    const level = yield select(state => state.level)
    yield put(actions.setLevel(level + 1))
  } else if (playerCannotMoveAnymore(board, position)) {
    yield put(actions.die())
  }
}

export default function* rootSaga() {
  yield fork(takeEvery, actionTypes.KEY_DOWN, keyDown)
  yield fork(takeEvery, actionTypes.MOVE, ensurePlayerIsOnPlatform)
  yield fork(takeEvery, actionTypes.MOVE, checkPlatformCount)
}

