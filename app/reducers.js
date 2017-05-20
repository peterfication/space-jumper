import update from 'react/lib/update'
import { actionTypes } from './actions'

export default function reducer(
  state = {
    level: 0,
    mode: 'menu',
    lives: 5,
  },
  action = {},
) {
  switch (action.type) {
    case actionTypes.DIE: {
      return update(state, {
        lives: { $set: (state.lives - 1) },
      })
    }
    case actionTypes.PREPARE_GAME: {
      return update(state, {
        level: { $set: 1 },
        lives: { $set: 5 },
      })
    }
    case actionTypes.SET_LEVEL: {
      return update(state, {
        level: { $set: action.payload.level },
      })
    }
    case actionTypes.SET_MODE: {
      return update(state, {
        mode: { $set: action.payload.mode },
      })
    }
    default:
      return state
  }
}
