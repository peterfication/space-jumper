import update from 'react/lib/update'
import { actionTypes } from './actions'

import levels from './levels'

export default function reducer(
  state = {
    bigJump: false,
    board: [],
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
        showDie: { $set: false },
      })
    }
    case actionTypes.KEY_DOWN: {
      const { keyCode } = action.payload
      const { position } = state
      let [x, y] = [...position]

      // Movements
      let move = false
      const moveDistance = state.bigJump ? 2 : 1
      if (keyCode === 38 || keyCode === 75) { // up
        y -= moveDistance
        move = true
      } else if (keyCode === 40 || keyCode === 74) { // down
        y += moveDistance
        move = true
      } else if (keyCode === 37 || keyCode === 72) { // left
        x -= moveDistance
        move = true
      } else if (keyCode === 39 || keyCode === 76) { // right
        x += moveDistance
        move = true
      }

      if (move) {
        // Remove previous platform from board
        const board = JSON.parse(JSON.stringify(state.board))
        const [xOld, yOld] = position
        board[yOld][xOld] = 0

        return update(state, {
          board: { $set: board },
          position: { $set: [x, y] },
        })
      }

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
    case actionTypes.SHOW_LEVEL_ACCOMPLISHED: {
      return update(state, {
        showLevelAccomplished: { $set: true },
      })
    }
    default:
      return state
  }
}
