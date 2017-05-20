import PT from 'prop-types'
import React from 'react'

import styles from './game-board.scss'

export class GameBoard extends React.Component {

  static get propTypes() {
    return {
      board: PT.arrayOf(PT.array),
      position: PT.array,
    }
  }

  cellIsPosition(rowIndex, colIndex) {
    return (colIndex === this.props.position[0] &&
      rowIndex === this.props.position[1])
  }

  render() {
    const {
      board,
    } = this.props

    return (
      <div className={styles['game-board']}>
        {board.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={styles['game-board-row']}
          >
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={styles['game-board-cell']}
              >
                {cell === 1 &&
                  <div className={styles.platform}>
                    {this.cellIsPosition(rowIndex, colIndex) &&
                      <div className={styles.player} />
                    }
                  </div>
                }
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }
}

export default GameBoard
