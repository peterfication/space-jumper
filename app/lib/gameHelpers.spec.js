import * as gameHelpers from './gameHelpers'

describe('playerCannotMoveAnymore', () => {
  const board = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]

  describe('returns false', () => {
    it('if there is a platform above the player', () => {
      const position = [2, 3]
      expect(gameHelpers.playerCannotMoveAnymore(board, position)).toBe(false)
    })

    it('if there is a platform above the player (2)', () => {
      const position = [2, 4]
      expect(gameHelpers.playerCannotMoveAnymore(board, position)).toBe(false)
    })

    it('if there is a platform below the player', () => {
      const position = [2, 1]
      expect(gameHelpers.playerCannotMoveAnymore(board, position)).toBe(false)
    })

    it('if there is a platform below the player (2)', () => {
      const position = [2, 0]
      expect(gameHelpers.playerCannotMoveAnymore(board, position)).toBe(false)
    })

    it('if there is a platform right from the player', () => {
      const position = [3, 2]
      expect(gameHelpers.playerCannotMoveAnymore(board, position)).toBe(false)
    })

    it('if there is a platform right from the player (2)', () => {
      const position = [4, 2]
      expect(gameHelpers.playerCannotMoveAnymore(board, position)).toBe(false)
    })

    it('if there is a platform left from the player', () => {
      const position = [1, 2]
      expect(gameHelpers.playerCannotMoveAnymore(board, position)).toBe(false)
    })

    it('if there is a platform left from the player (2)', () => {
      const position = [0, 2]
      expect(gameHelpers.playerCannotMoveAnymore(board, position)).toBe(false)
    })
  })

  describe('returns true', () => {
    it('if there is no platform reachable', () => {
      const position = [0, 0]
      expect(gameHelpers.playerCannotMoveAnymore(board, position)).toBe(true)
    })

    it('if there is no platform reachable', () => {
      const position = [1, 1]
      expect(gameHelpers.playerCannotMoveAnymore(board, position)).toBe(true)
    })

    it('if there is no platform reachable', () => {
      const position = [4, 4]
      expect(gameHelpers.playerCannotMoveAnymore(board, position)).toBe(true)
    })
  })
})
