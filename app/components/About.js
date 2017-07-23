import PT from 'prop-types'
import React from 'react'

import styles from './about.scss'

const About = props => (
  <div className={styles['about-container']}>
    <h1>About</h1>
    <p>
      A small logical game about finding the right way
      <span role='img' aria-label='game-controller'>🎮</span>
    </p>

    <p>
      It&apos;s open source! You can find the code on&nbsp;
      <a href='https://github.com/peterfication/space-jumper'>
        Github
      </a>.
    </p>

    <h2>Disclaimer</h2>
    <p>
      The idea for SpaceJumper is orignially from an old DOS game. I can&apos;t
      find it anywhere online because I forgot the name. So if somebody knows
      the name or even has a copy of it I would be very happy to hear about it! :)
    </p>

    <h2>Contributors</h2>
    <ul>
      <li><a href='https://github.com/peterfication'>Peter Gundel</a></li>
    </ul>

    <h2>Version</h2>
    <p>
      Commit:&nbsp;
      <a href={`https://github.com/peterfication/space-jumper/tree/${process.env.COMMIT_HASH}`}>
        {process.env.COMMIT_HASH}
      </a>
      <br />
      Date: {process.env.COMMIT_DATE}
    </p>

    <button onClick={props.showMenu}>
      Back to menu
    </button>
  </div>
)

About.propTypes = {
  showMenu: PT.func.isRequired,
}

export default About
