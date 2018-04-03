export type Row = (number | null)[]
export type Board = Row[]
export type Position = [number, number]

// Check whether the player has any platform left that is reachable
// * 1 or 2 above from the player
// * 1 or 2 below from the player
// * 1 or 2 left from the player
// * 1 or 2 right from the player
export function playerCannotMoveAnymore(board: Board, position: Position): boolean {
  const [x, y] = position

  return !(
    (board[y - 1] || [])[x] === 1 ||
    (board[y - 2] || [])[x] === 1 ||
    (board[y - 1] || [])[x] === 1 ||
    (board[y + 1] || [])[x] === 1 ||
    (board[y + 2] || [])[x] === 1 ||
    board[y][x - 2] === 1 ||
    board[y][x - 1] === 1 ||
    board[y][x + 1] === 1 ||
    board[y][x + 2] === 1
  )
}

// Sum the 1s of the board
export function platformCount(board: Board): number {
  return board.reduce(
    (acc, val) => acc + (val.reduce((acc2, val2) => (acc2 || 0) + (val2 || 0)) || 0),
    0,
  )
}

export default {
  playerCannotMoveAnymore,
  platformCount,
}
