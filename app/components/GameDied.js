import PT from 'prop-types'
import React from 'react'

import styles from './game-died.scss'

const GameDied = props => (
  <div className={styles['game-died-container']}>
    <h1>You died</h1>
    <button onClick={props.closeDie}>
      Try the level again.
    </button>
  </div>
)

GameDied.propTypes = {
  closeDie: PT.func.isRequired,
}

export default GameDied
