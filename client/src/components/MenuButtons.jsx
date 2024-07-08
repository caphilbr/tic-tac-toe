const MenuButtons = (props) => {

  const newGameClick = () => {
    props.setShowNewGame(true)
  }

  return (
    <div className="button__container">
      <span className="button__main_menu" onClick={newGameClick}>Start New Game</span>
      <span className="button__main_menu">Button</span>
    </div>
  )
}

export default MenuButtons
