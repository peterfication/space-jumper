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
        closeDie: PT.func.isRequired,
        closeLevelAccomplished: PT.func.isRequired,
        die: PT.func.isRequired,
        move: PT.func.isRequired,
        setLevel: PT.func.isRequired,
        setMode: PT.func.isRequired,
        showLevelAccomplished: PT.func.isRequired,
      }).isRequired,
      bigJump: PT.bool.isRequired,
      board: PT.arrayOf(PT.array).isRequired,
      helptext: PT.string.isRequired,
      level: PT.number.isRequired,
      position: PT.array.isRequired,
      showDie: PT.bool.isRequired,
      showLevelAccomplished: PT.bool.isRequired,
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
        </div>
        {helptext !== '' &&
          // eslint-disable-next-line react/no-danger
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
    level: state.level,
    position: state.position,
    showDie: state.showDie,
    showLevelAccomplished: state.showLevelAccomplished,
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch),
  }),
)(Game)

