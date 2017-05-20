export const actionTypes = {
  DIE: 'DIE',
  PREPARE_GAME: 'PREPARE_GAME',
  SET_LEVEL: 'SET_LEVEL',
  SET_MODE: 'SET_MODE',
}

function die() {
  return { type: actionTypes.DIE }
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
  prepareGame,
  setMode,
  setLevel,
}

export default {
  actionTypes,
  actions,
}
