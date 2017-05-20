export const actionTypes = {
  SET_MODE: 'SET_MODE',
  SET_LEVEL: 'SET_LEVEL',
}

function setMode(mode) {
  return {
    type: actionTypes.SET_MODE,
    payload: {
      mode,
    },
  }
}

function setLevel(level) {
  return {
    type: actionTypes.SET_LEVEL,
    payload: {
      level,
    },
  }
}

export const actions = {
  setMode,
  setLevel,
}

export default {
  actionTypes,
  actions,
}
