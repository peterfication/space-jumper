import PT from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions } from '../actions'
import GameBoard from './GameBoard'
import GameDied from './GameDied'
import GameLevelAccomplished from './GameLevelAccomplished'
import { platformCount } from '../lib/gameHelpers'
import styles from './game.scss'

export class Game extends React.Component {

  static get propTypes() {
    return {
      actions: PT.shape({
        closeDie: PT.func,
        closeLevelAccomplished: PT.func,
        die: PT.func,
        move: PT.func,
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
    this.move = this.move.bind(this)
  }

  closeDie() {
    this.props.actions.closeDie()
  }

  closeLevelAccomplished() {
    this.props.actions.closeLevelAccomplished()
  }

  move(moveValue) {
    this.props.actions.move(moveValue)
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
            Platforms left: {platformCount(board)}
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
          move={this.move}
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

