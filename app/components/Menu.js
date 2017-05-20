import PT from 'prop-types'
import React from 'react'

const Menu = props => (
  <div>
    <a onClick={() => props.start()}>
      Start
    </a>
  </div>
)

Menu.propTypes = {
  start: PT.func,
}

export default Menu
