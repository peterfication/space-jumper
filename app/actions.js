export const actionTypes = {
  SET_LEVEL: 'SET_LEVEL',
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
  setLevel,
}

export default {
  actionTypes,
  actions,
}
