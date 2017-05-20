import PT from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions } from '../actions'
import GameBoard from './GameBoard'
import styles from './game.scss'

export class Game extends React.Component {

  static get propTypes() {
    return {
      actions: PT.shape({
        setMode: PT.func,
        setLevel: PT.func,
        die: PT.func,
      }),
      board: PT.arrayOf(PT.array),
      lives: PT.number,
      level: PT.number,
      position: PT.array,
    }
  }

  componentDidUpdate() {
    const { lives } = this.props

    if (lives === 0) {
      this.gameOver()
    }

    if (!this.positionHasPlatform()) {
      this.die()
    }
  }

  setLevel(level) {
    this.props.actions.setLevel(level)
  }

  die() {
    this.props.actions.die()
  }

  gameOver() {
    this.props.actions.setMode('game-over')
  }

  // Check whether the player is on a platform
  positionHasPlatform() {
    const {
      board,
      position,
    } = this.props
    const [x, y] = position

    const row = board[y]
    // Check if player is outside of board
    if (!row) {
      return false
    }

    const cell = row[x]
    return cell === 1
  }

  render() {
    const {
      board,
      lives,
      level,
      position,
    } = this.props

    return (
      <div className={styles['game-container']}>
        <div className={styles['game-header']}>
          <div className={styles.level}>
            Level {level}
          </div>
          <div className={styles.lives}>
            Lives {lives}
          </div>
        </div>
        <GameBoard
          board={board}
          position={position}
        />
        <button onClick={() => this.setLevel(this.props.level + 1)}>
          Increase Level
        </button>
        <button onClick={() => this.die()}>
          Die
        </button>
      </div>
    )
  }
}

export default connect(
  state => ({
    board: state.board,
    lives: state.lives,
    level: state.level,
    position: state.position,
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch),
  }),
)(Game)

