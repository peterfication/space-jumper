import update from 'react/lib/update'
import { actionTypes } from './actions'

export default function reducer(
  state = {
    level: 1,
  },
  action = {},
) {
  switch (action.type) {
    case actionTypes.SET_LEVEL: {
      return update(state, {
        level: { $set: action.payload.level },
      })
    }
    default:
      return state
  }
}
