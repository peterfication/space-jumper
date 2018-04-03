import PT from 'prop-types'
import React from 'react'

import styles from './game-board.scss'

export class GameBoard extends React.Component {
  static get propTypes() {
    return {
      bigJump: PT.bool.isRequired,
      board: PT.arrayOf(PT.array).isRequired,
      move: PT.func.isRequired,
      position: PT.array.isRequired,
    }
  }

  constructor() {
    super()

    this.clickPlatforum = this.clickPlatform.bind(this)
  }

  cellIsPosition(rowIndex, colIndex) {
    return colIndex === this.props.position[0] && rowIndex === this.props.position[1]
  }

  // Handle a click on a platform
  clickPlatform(e, rowIndex, colIndex) {
    const [x, y] = this.props.position
    // Calculate the moveValue via the click on the platform
    const moveValue = {
      x: colIndex - x,
      y: rowIndex - y,
    }
    const validHorizontalMove = moveValue.y === 0 && Math.abs(moveValue.x) <= 2
    const validVerticalMove = moveValue.x === 0 && Math.abs(moveValue.y) <= 2

    if (validHorizontalMove || validVerticalMove) {
      this.props.move(moveValue)
    } else {
      // On an invalid move, shake the clicked platform
      const target = e.target
      target.classList.add('shake-hard')
      setTimeout(() => {
        target.classList.remove('shake-hard')
      }, 200)
    }
  }

  render() {
    const { bigJump, board } = this.props

    return (
      <div className={styles['game-board']}>
        {board.map((row, rowIndex) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={rowIndex}
            className={styles['game-board-row']}
          >
            {row.map((cell, colIndex) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={colIndex}
                className={styles['game-board-cell']}
              >
                {cell === 1 && (
                  <button
                    className={styles.platform}
                    onClick={e => this.clickPlatform(e, rowIndex, colIndex)}
                  >
                    {this.cellIsPosition(rowIndex, colIndex) && (
                      <div className={styles.player}>
                        {bigJump && <div className={styles['big-jump']} />}
                      </div>
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }
}

export default GameBoard
