export const actionTypes = {
  DIE: 'DIE',
  CLOSE_DIE: 'CLOSE_DIE',
  CLOSE_LEVEL_ACCOMPLISHED: 'CLOSE_LEVEL_ACCOMPLISHED',
  KEY_DOWN: 'KEY_DOWN',
  KEY_UP: 'KEY_UP',
  MOVE: 'MOVE',
  PREPARE_GAME: 'PREPARE_GAME',
  SET_LEVEL: 'SET_LEVEL',
  SET_MODE: 'SET_MODE',
  SHOW_LEVEL_ACCOMPLISHED: 'SHOW_LEVEL_ACCOMPLISHED',
}

function die() {
  return { type: actionTypes.DIE }
}

function closeDie() {
  return { type: actionTypes.CLOSE_DIE }
}

function closeLevelAccomplished() {
  return { type: actionTypes.CLOSE_LEVEL_ACCOMPLISHED }
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

function move(moveValue) {
  return {
    type: actionTypes.MOVE,
    payload: { moveValue },
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

function showLevelAccomplished() {
  return { type: actionTypes.SHOW_LEVEL_ACCOMPLISHED }
}

export const actions = {
  die,
  closeDie,
  closeLevelAccomplished,
  keyDown,
  keyUp,
  move,
  prepareGame,
  setMode,
  setLevel,
  showLevelAccomplished,
}

export default {
  actionTypes,
  actions,
}
