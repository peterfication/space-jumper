export const actionTypes = {
  DIE: 'DIE',
  CLOSE_DIE: 'CLOSE_DIE',
  KEY_DOWN: 'KEY_DOWN',
  KEY_UP: 'KEY_UP',
  PREPARE_GAME: 'PREPARE_GAME',
  SET_LEVEL: 'SET_LEVEL',
  SET_MODE: 'SET_MODE',
}

function die() {
  return { type: actionTypes.DIE }
}

function closeDie() {
  return { type: actionTypes.CLOSE_DIE }
}

function keyDown(keyCode) {
  return {
    type: actionTypes.KEY_DOWN,
    payload: { keyCode },
  }
}

function keyUp(keyCode) {
  return {
    type: actionTypes.KEY_UP,
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
  closeDie,
  keyDown,
  keyUp,
  prepareGame,
  setMode,
  setLevel,
}

export default {
  actionTypes,
  actions,
}
