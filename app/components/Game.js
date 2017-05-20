import PT from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions } from '../actions'

export class Game extends React.Component {

  static get propTypes() {
    return {
      actions: PT.shape({
        setMode: PT.func,
        setLevel: PT.func,
      }),
      level: PT.number,
    }
  }

  constructor(props) {
    super(props)

    this.setLevel = this.setLevel.bind(this)
    this.gameOver = this.gameOver.bind(this)
  }

  setLevel(level) {
    this.props.actions.setLevel(level)
  }

  gameOver() {
    this.props.actions.setLevel(0)
    this.props.actions.setMode('menu')
  }

  render() {
    const { level } = this.props

    return (
      <div>
        <button onClick={() => this.setLevel(this.props.level + 1)}>
          Increase Level
        </button>
        <button onClick={() => this.gameOver()}>
          Die
        </button>
        <div>
          {level}
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    level: state.level,
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch),
  }),
)(Game)

