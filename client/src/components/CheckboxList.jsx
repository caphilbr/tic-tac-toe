const CheckboxList = (props) => {

  return props.playerList.map((player) => {
    return (
      <label htmlFor={player.name} key={player.name}>
        <input
          className="newgame__input"
          type="checkbox"
          id={player.name}
          name={player.name}
          value={player.name}
          onChange={props.handleSelect}
        />
        {player.name}
      </label>
    )
  })
}

export default CheckboxList