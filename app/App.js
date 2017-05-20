import PT from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions } from './actions'
import Game from './components/Game'
import Menu from './components/Menu'

export class App extends React.Component {

  static get propTypes() {
    return {
      actions: PT.shape({
        setMode: PT.func,
        setLevel: PT.func,
      }),
      mode: PT.string,
    }
  }

  constructor(props) {
    super(props)

    this.start = this.start.bind(this)
  }

  start() {
    this.props.actions.setLevel(1)
    this.props.actions.setMode('game')
  }

  render() {
    const { mode } = this.props

    return (
      <div>
        Space Jumper
        {mode === 'menu' && <Menu start={this.start} />}
        {mode === 'game' && <Game />}
      </div>
    )
  }
}

export default connect(
  state => ({
    mode: state.mode,
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch),
  }),
)(App)
