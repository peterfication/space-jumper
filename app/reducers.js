import update from 'react/lib/update'
import { actionTypes } from './actions'

import levels from './levels'

export default function reducer(
  state = {
    level: 0,
    mode: 'menu',
    lives: 5,
    position: [0, 0],
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
        board: { $set: levels[1].board },
        position: { $set: levels[1].startPosition },
      })
    }
    case actionTypes.SET_LEVEL: {
      const level = action.payload.level
      return update(state, {
        level: { $set: level },
        board: { $set: levels[level].board },
        position: { $set: levels[level].startPosition },
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
