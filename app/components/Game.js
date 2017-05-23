import PT from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions } from '../actions'
import GameBoard from './GameBoard'
import GameDied from './GameDied'
import GameLevelAccomplished from './GameLevelAccomplished'
import styles from './game.scss'

export class Game extends React.Component {

  static get propTypes() {
    return {
      actions: PT.shape({
        closeDie: PT.func,
        closeLevelAccomplished: PT.func,
        die: PT.func,
        setLevel: PT.func,
        setMode: PT.func,
        showLevelAccomplished: PT.func,
      }),
      bigJump: PT.bool,
      board: PT.arrayOf(PT.array),
      helptext: PT.string,
      lives: PT.number,
      level: PT.number,
      position: PT.array,
      showDie: PT.bool,
      showLevelAccomplished: PT.bool,
    }
  }

  constructor() {
    super()

    this.closeDie = this.closeDie.bind(this)
    this.closeLevelAccomplished = this.closeLevelAccomplished.bind(this)
  }

  componentDidUpdate() {
    const {
      level,
      lives,
    } = this.props

    if (lives === 0) {
      this.props.actions.setMode('game-over')
    } else if (!this.positionHasPlatform()) {
      this.props.actions.die()
    } else if (this.platformCount() === 1) {
      this.props.actions.showLevelAccomplished()
      this.setLevel(level + 1)
    } else if (!this.playerCanStillMove()) {
      this.props.actions.die()
    }
  }

  setLevel(level) {
    this.props.actions.setLevel(level)
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

  // Check whether the player has any platform left that is reachable
  // * 1 or 2 above from the player
  // * 1 or 2 below from the player
  // * 1 or 2 left from the player
  // * 1 or 2 right from the player
  playerCanStillMove() {
    const {
      board,
      position,
    } = this.props
    const [x, y] = position

    return (board[y - 1] || [])[x] === 1 ||
      (board[y - 2] || [])[x] === 1 ||
      (board[y - 1] || [])[x] === 1 ||
      (board[y + 1] || [])[x] === 1 ||
      (board[y + 2] || [])[x] === 1 ||
      board[y][x - 2] === 1 ||
      board[y][x - 1] === 1 ||
      board[y][x + 1] === 1 ||
      board[y][x + 2] === 1
  }

  platformCount() {
    const { board } = this.props

    return board.reduce((acc, val) =>
      acc + val.reduce((acc2, val2) => acc2 + val2), 0)
  }

  closeDie() {
    this.props.actions.closeDie()
  }

  closeLevelAccomplished() {
    this.props.actions.closeLevelAccomplished()
  }

  render() {
    const {
      bigJump,
      board,
      helptext,
      lives,
      level,
      position,
      showDie,
      showLevelAccomplished,
    } = this.props

    return (
      <div className={styles['game-container']}>
        <div className={styles['game-header']}>
          <div className={styles.level}>
            Level {level}
          </div>
          <div className={styles['platform-count']}>
            Platforms left: {this.platformCount()}
          </div>
          <div className={styles.lives}>
            Lives {lives}
          </div>
        </div>
        {helptext !== '' &&
          <div dangerouslySetInnerHTML={{ __html: helptext }} className={styles.helptext} />}
        {showDie && <GameDied closeDie={this.closeDie} />}
        {showLevelAccomplished &&
          <GameLevelAccomplished closeLevelAccomplished={this.closeLevelAccomplished} />}
        <GameBoard
          bigJump={bigJump}
          board={board}
          position={position}
        />
      </div>
    )
  }
}

export default connect(
  state => ({
    bigJump: state.bigJump,
    board: state.board,
    helptext: state.helptext,
    lives: state.lives,
    level: state.level,
    position: state.position,
    showDie: state.showDie,
    showLevelAccomplished: state.showLevelAccomplished,
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch),
  }),
)(Game)

