import * as keyCodeUtils from './keyCodeUtils'

describe('calculateMovement', () => {
  const state = {
    bigJump: false,
    mode: 'game',
    showDie: false,
    showLevelAccomplished: false,
  }

  describe('returns undefined', () => {
    it('if the mode is not `game`', () => {
      const testState = { ...state, mode: 'menu' }
      const action = { payload: { keyCode: 0 } }
      expect(keyCodeUtils.calculateMovement(testState, action)).toBe(undefined)
    })

    it('if the die-page is shown', () => {
      const testState = { ...state, showDie: false }
      const action = { payload: { keyCode: 0 } }
      expect(keyCodeUtils.calculateMovement(testState, action)).toBe(undefined)
    })

    it('if the level-accomplished-page is shown', () => {
      const testState = { ...state, showLevelAccomplished: false }
      const action = { payload: { keyCode: 0 } }
      expect(keyCodeUtils.calculateMovement(testState, action)).toBe(undefined)
    })

    it('if keyCode is no arrow or vim movement key', () => {
      const action = { payload: { keyCode: 0 } }
      expect(keyCodeUtils.calculateMovement(state, action)).toBe(undefined)
    })
  })

  describe('moves left', () => {
    describe('without bigJump', () => {
      it('on left-key', () => {
        const action = { payload: { keyCode: 37 } }
        expect(keyCodeUtils.calculateMovement(state, action)).toEqual({x: -1, y: 0})
      })

      it('on h-key', () => {
        const action = { payload: { keyCode: 72 } }
        expect(keyCodeUtils.calculateMovement(state, action)).toEqual({x: -1, y: 0})
      })
    })

    describe('with bigJump', () => {
      it('on left-key', () => {
        const testState = { ...state, bigJump: true }
        const action = { payload: { keyCode: 37 } }
        expect(keyCodeUtils.calculateMovement(testState, action)).toEqual({x: -2, y: 0})
      })

      it('on h-key', () => {
        const testState = { ...state, bigJump: true }
        const action = { payload: { keyCode: 72 } }
        expect(keyCodeUtils.calculateMovement(testState, action)).toEqual({x: -2, y: 0})
      })
    })
  })

  describe('moves right', () => {
    describe('without bigJump', () => {
      it('on right-key', () => {
        const action = { payload: { keyCode: 39 } }
        expect(keyCodeUtils.calculateMovement(state, action)).toEqual({x: 1, y: 0})
      })

      it('on l-key', () => {
        const action = { payload: { keyCode: 76 } }
        expect(keyCodeUtils.calculateMovement(state, action)).toEqual({x: 1, y: 0})
      })
    })

    describe('with bigJump', () => {
      const testState = { ...state, bigJump: true }

      it('on right-key', () => {
        const action = { payload: { keyCode: 39 } }
        expect(keyCodeUtils.calculateMovement(testState, action)).toEqual({x: 2, y: 0})
      })

      it('on l-key', () => {
        const action = { payload: { keyCode: 76 } }
        expect(keyCodeUtils.calculateMovement(testState, action)).toEqual({x: 2, y: 0})
      })
    })
  })

  describe('moves up', () => {
    describe('without bigJump', () => {
      it('on up-key', () => {
        const action = { payload: { keyCode: 38 } }
        expect(keyCodeUtils.calculateMovement(state, action)).toEqual({x: 0, y: -1})
      })

      it('on k-key', () => {
        const action = { payload: { keyCode: 75 } }
        expect(keyCodeUtils.calculateMovement(state, action)).toEqual({x: 0, y: -1})
      })
    })

    describe('with bigJump', () => {
      const testState = { ...state, bigJump: true }

      it('on up-key', () => {
        const action = { payload: { keyCode: 38 } }
        expect(keyCodeUtils.calculateMovement(testState, action)).toEqual({x: 0, y: -2})
      })

      it('on k-key', () => {
        const action = { payload: { keyCode: 75 } }
        expect(keyCodeUtils.calculateMovement(testState, action)).toEqual({x: 0, y: -2})
      })
    })
  })

  describe('moves down', () => {
    describe('without bigJump', () => {
      it('on down-key', () => {
        const action = { payload: { keyCode: 40 } }
        expect(keyCodeUtils.calculateMovement(state, action)).toEqual({x: 0, y: 1})
      })

      it('on j-key', () => {
        const action = { payload: { keyCode: 74 } }
        expect(keyCodeUtils.calculateMovement(state, action)).toEqual({x: 0, y: 1})
      })
    })

    describe('with bigJump', () => {
      it('on down-key', () => {
        const testState = { ...state, bigJump: true }
        const action = { payload: { keyCode: 40 } }
        expect(keyCodeUtils.calculateMovement(testState, action)).toEqual({x: 0, y: 2})
      })

      it('on j-key', () => {
        const testState = { ...state, bigJump: true }
        const action = { payload: { keyCode: 74 } }
        expect(keyCodeUtils.calculateMovement(testState, action)).toEqual({x: 0, y: 2})
      })
    })
  })
})
