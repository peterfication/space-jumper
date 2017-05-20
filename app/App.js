import PT from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions } from './actions'

export class App extends React.Component {

  static get propTypes() {
    return {
      actions: PT.shape({
        setLevel: PT.func,
      }),
      level: PT.number,
    }
  }

  constructor(props) {
    super(props)

    this.setLevel = this.setLevel.bind(this)
  }

  setLevel(level) {
    this.props.actions.setLevel(level)
  }

  render() {
    return (
      <div>
        Space Jumper
        <div>
          <button onClick={() => this.setLevel(this.props.level + 1)}>
            Increase Level
          </button>
        </div>
        <div>
          {this.props.level}
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
)(App)
