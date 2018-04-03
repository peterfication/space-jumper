import * as gameHelpers from './gameHelpers'

describe('playerCannotMoveAnymore', () => {
  const board: gameHelpers.Board = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]

  describe('returns false', () => {
    it('if there is a platform above the player', () => {
      const position: gameHelpers.Position = [2, 3]
      expect(gameHelpers.playerCannotMoveAnymore(board, position)).toBe(false)
    })

    it('if there is a platform above the player (2)', () => {
      const position: gameHelpers.Position = [2, 4]
      expect(gameHelpers.playerCannotMoveAnymore(board, position)).toBe(false)
    })

    it('if there is a platform below the player', () => {
      const position: gameHelpers.Position = [2, 1]
      expect(gameHelpers.playerCannotMoveAnymore(board, position)).toBe(false)
    })

    it('if there is a platform below the player (2)', () => {
      const position: gameHelpers.Position = [2, 0]
      expect(gameHelpers.playerCannotMoveAnymore(board, position)).toBe(false)
    })

    it('if there is a platform right from the player', () => {
      const position: gameHelpers.Position = [3, 2]
      expect(gameHelpers.playerCannotMoveAnymore(board, position)).toBe(false)
    })

    it('if there is a platform right from the player (2)', () => {
      const position: gameHelpers.Position = [4, 2]
      expect(gameHelpers.playerCannotMoveAnymore(board, position)).toBe(false)
    })

    it('if there is a platform left from the player', () => {
      const position: gameHelpers.Position = [1, 2]
      expect(gameHelpers.playerCannotMoveAnymore(board, position)).toBe(false)
    })

    it('if there is a platform left from the player (2)', () => {
      const position: gameHelpers.Position = [0, 2]
      expect(gameHelpers.playerCannotMoveAnymore(board, position)).toBe(false)
    })
  })

  describe('returns true', () => {
    it('if there is no platform reachable', () => {
      const position: gameHelpers.Position = [0, 0]
      expect(gameHelpers.playerCannotMoveAnymore(board, position)).toBe(true)
    })

    it('if there is no platform reachable', () => {
      const position: gameHelpers.Position = [1, 1]
      expect(gameHelpers.playerCannotMoveAnymore(board, position)).toBe(true)
    })

    it('if there is no platform reachable', () => {
      const position: gameHelpers.Position = [4, 4]
      expect(gameHelpers.playerCannotMoveAnymore(board, position)).toBe(true)
    })
  })
})

describe('platformCount', () => {
  it('does not fail on an empty board', () => {
    expect(gameHelpers.platformCount([])).toEqual(0)
  })

  it('counts the 1s of the board', () => {
    const board: gameHelpers.Board = [[0, 1, 1], [0, 1, 0], [1, 1, 1]]
    expect(gameHelpers.platformCount(board)).toEqual(6)
  })
})
