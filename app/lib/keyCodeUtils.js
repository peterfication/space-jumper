export function analyzeKeyCodeForMovement(keyCode, bigJump) {
  const moveDistance = bigJump ? 2 : 1
  const moveValue = { x: 0, y: 0 }

  if (keyCode === 38 || keyCode === 75) { // up
    moveValue.y -= moveDistance
  } else if (keyCode === 40 || keyCode === 74) { // down
    moveValue.y += moveDistance
  } else if (keyCode === 37 || keyCode === 72) { // left
    moveValue.x -= moveDistance
  } else if (keyCode === 39 || keyCode === 76) { // right
    moveValue.x += moveDistance
  }

  return (moveValue.x !== 0 || moveValue.y !== 0) ?
    moveValue :
    undefined
}

export function calculateMovement(state, action) {
  const {
    bigJump,
    mode,
    showDie,
    showLevelAccomplished,
  } = state
  const { keyCode } = action.payload

  // Only calculate the movements if the player can move
  return (mode === 'game' && !showDie && !showLevelAccomplished) ?
    analyzeKeyCodeForMovement(keyCode, bigJump) :
    undefined
}

export default {
  calculateMovement,
}
