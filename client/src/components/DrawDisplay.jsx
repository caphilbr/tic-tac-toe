const DrawDisplay = (props) => {
  
  const handleContinue = () => {
    props.setRoundStatus(null)
  }
  
  return (
    <div className="winner__container">
      <div className="winner__draw_font">It's a draw</div>
      <div className="button__container">
        <span className="button__winner" onClick={handleContinue}>Continue</span>
      </div>
    </div>
  )
}

export default DrawDisplay