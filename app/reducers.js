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
      const { board, startPosition } = levels[state.level]

      // Reduce live and reset level
      return update(state, {
        board: { $set: board },
        lives: { $set: (state.lives - 1) },
        position: { $set: startPosition },
      })
    }
    case actionTypes.KEY_DOWN: {
      const { keyCode } = action.payload
      const { position } = state
      let [x, y] = position

      // Movements
      if (keyCode === 38) { // up
        y -= 1
      } else if (keyCode === 40) { // down
        y += 1
      } else if (keyCode === 37) { // left
        x -= 1
      } else if (keyCode === 39) { // right
        x += 1
      }

      return update(state, {
        position: { $set: [x, y] },
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
      const levelData = levels[level]

      if (levelData) {
        const { board, startPosition } = levelData
        return update(state, {
          level: { $set: level },
          board: { $set: board },
          position: { $set: startPosition },
        })
      }

      // No level available anymore => Victory
      return update(state, {
        mode: { $set: 'game-victory' },
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
