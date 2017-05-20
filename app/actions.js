export const actionTypes = {
  DIE: 'DIE',
  KEY_DOWN: 'KEY_DOWN',
  PREPARE_GAME: 'PREPARE_GAME',
  SET_LEVEL: 'SET_LEVEL',
  SET_MODE: 'SET_MODE',
}

function die() {
  return { type: actionTypes.DIE }
}

function keyDown(keyCode) {
  return {
    type: actionTypes.KEY_DOWN,
    payload: { keyCode },
  }
}

function prepareGame() {
  return { type: actionTypes.PREPARE_GAME }
}

function setLevel(level) {
  return {
    type: actionTypes.SET_LEVEL,
    payload: { level },
  }
}

function setMode(mode) {
  return {
    type: actionTypes.SET_MODE,
    payload: { mode },
  }
}

export const actions = {
  die,
  keyDown,
  prepareGame,
  setMode,
  setLevel,
}

export default {
  actionTypes,
  actions,
}
