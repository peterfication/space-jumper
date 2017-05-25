import update from 'react/lib/update'
import { actionTypes } from './actions'

import levels from './levels'

export default function reducer(
  state = {
    bigJump: false,
    board: [],
    helptext: '',
    level: 0,
    lives: 5,
    mode: 'menu',
    position: [0, 0],
    showDie: false,
    showLevelAccomplished: false,
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
        showDie: { $set: true },
      })
    }
    case actionTypes.CLOSE_DIE: {
      return update(state, {
        showDie: { $set: false },
      })
    }
    case actionTypes.CLOSE_LEVEL_ACCOMPLISHED: {
      return update(state, {
        showLevelAccomplished: { $set: false },
      })
    }
    case actionTypes.KEY_DOWN: {
      const { keyCode } = action.payload

      // If shift is pressed, enable the big jump mode
      if (keyCode === 16) {
        return update(state, {
          bigJump: { $set: true },
        })
      }

      return state
    }
    case actionTypes.KEY_UP: {
      const { keyCode } = action.payload

      // If shift is released, disable the big jump mode
      if (keyCode === 16) {
        return update(state, {
          bigJump: { $set: false },
        })
      }

      if (keyCode === 13) {
        if (state.mode === 'game-victory') {
          return update(state, {
            mode: { $set: 'menu' },
          })
        }

        return update(state, {
          showDie: { $set: false },
          showLevelAccomplished: { $set: false },
        })
      }

      return state
    }
    case actionTypes.MOVE: {
      const { moveValue } = action.payload
      const [x, y] = state.position
      // Deep copy board because it needs to be mutated
      const board = JSON.parse(JSON.stringify(state.board))
      // Remove previous platform from board
      board[y][x] = 0

      return update(state, {
        board: { $set: board },
        position: { $set: [
          x + moveValue.x,
          y + moveValue.y,
        ] },
      })
    }
    case actionTypes.PREPARE_GAME: {
      return update(state, {
        board: { $set: levels[1].board },
        helptext: { $set: levels[1].helptext },
        level: { $set: 1 },
        lives: { $set: 5 },
        position: { $set: levels[1].startPosition },
        showDie: { $set: false },
        showLevelAccomplished: { $set: false },
      })
    }
    case actionTypes.SET_LEVEL: {
      const level = action.payload.level
      const levelData = levels[level]

      if (levelData) {
        const { board, helptext, startPosition } = levelData
        return update(state, {
          board: { $set: board },
          helptext: { $set: helptext },
          level: { $set: level },
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
    case actionTypes.SHOW_LEVEL_ACCOMPLISHED: {
      return update(state, {
        showLevelAccomplished: { $set: true },
      })
    }
    default:
      return state
  }
}
