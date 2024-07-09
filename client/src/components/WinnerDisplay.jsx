const WinnerDisplay = (props) => {
  
  const handleContinue = () => {
    props.setRoundStatus(null)
  }
  
  return (
    <div className="winner__container">
      <div className="winner__bounce winner__font">WINNER!</div>
      <div className="button__container">
        <span className="button__winner" onClick={handleContinue}>Continue</span>
      </div>
    </div>
  )
}

export default WinnerDisplay
