const FormError = (props) => {
  return (
    <>
      {props.errorMessage ? (
        <div className="popout__container_errorMessage">
          {props.errorMessage}
        </div>
      ) : null}
    </>
  )
}

export default FormError
