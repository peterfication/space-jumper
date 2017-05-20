import PT from 'prop-types'
import React from 'react'

import styles from './game-over.scss'

const GameOver = props => (
  <div className={styles['game-over-container']}>
    <h1>Game Over</h1>
    <p>
      You lost. Try again!
    </p>
    <button onClick={() => props.showMenu()}>
      Back to menu
    </button>
  </div>
)

GameOver.propTypes = {
  showMenu: PT.func,
}

export default GameOver
