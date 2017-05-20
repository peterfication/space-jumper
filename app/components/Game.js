import PT from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions } from '../actions'
import styles from './game.scss'

export class Game extends React.Component {

  static get propTypes() {
    return {
      actions: PT.shape({
        setMode: PT.func,
        setLevel: PT.func,
        die: PT.func,
      }),
      lives: PT.number,
      level: PT.number,
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

  render() {
    const {
      lives,
      level,
    } = this.props

    if (lives === 0) {
      this.gameOver()
    }

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
    lives: state.lives,
    level: state.level,
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch),
  }),
)(Game)

