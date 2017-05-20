import update from 'react/lib/update'
import { actionTypes } from './actions'

export default function reducer(
  state = {
    level: 0,
    mode: 'menu',
  },
  action = {},
) {
  switch (action.type) {
    case actionTypes.SET_MODE: {
      return update(state, {
        mode: { $set: action.payload.mode },
      })
    }
    case actionTypes.SET_LEVEL: {
      return update(state, {
        level: { $set: action.payload.level },
      })
    }
    default:
      return state
  }
}
