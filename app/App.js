import PT from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions } from './actions'
import About from './components/About'
import Game from './components/Game'
import GameOver from './components/GameOver'
import GameVictory from './components/GameVictory'
import Header from './components/Header'
import Menu from './components/Menu'

import layout from './styles/layout.scss'

export class App extends React.Component {

  static get propTypes() {
    return {
      actions: PT.shape({
        setMode: PT.func,
        prepareGame: PT.func,
      }),
      mode: PT.string,
    }
  }

  constructor(props) {
    super(props)

    this.showAbout = this.showAbout.bind(this)
    this.showMenu = this.showMenu.bind(this)
    this.startGame = this.startGame.bind(this)
  }

  startGame() {
    this.props.actions.prepareGame()
    this.props.actions.setMode('game')
  }

  showAbout() {
    this.props.actions.setMode('about')
  }

  showMenu() {
    this.props.actions.setMode('menu')
  }

  render() {
    const { mode } = this.props

    return (
      <div>
        <Header />
        <div className={layout.container}>
          {mode === 'menu' &&
            <Menu
              showAbout={this.showAbout}
              startGame={this.startGame}
            />
          }
          {mode === 'about' && <About showMenu={this.showMenu} />}
          {mode === 'game' && <Game />}
          {mode === 'game-victory' && <GameVictory showMenu={this.showMenu} />}
          {mode === 'game-over' && <GameOver showMenu={this.showMenu} />}
        </div>
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
