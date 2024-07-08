const MenuButtons = (props) => {
  
  const addPlayerClick = () => {
    props.setGameStatus({
      ...props.gameStatus,
      showAddPlayer: true,
    })
  }

  return (
    <div className="button__container">
      <span className="button__main_menu">Button</span>
      <span className="button__main_menu" onClick={addPlayerClick}>
        Add New Player
      </span>
      <span className="button__main_menu">Button</span>
    </div>
  )
}

export default MenuButtons
