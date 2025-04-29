import './_input.scss';

const Input = ({ name, placeholder, type, value, onChange, errorMessage}) => {
  return(
    <>
      <input
        className={errorMessage === true ? "input input--error-message" : "input"}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  )
}
export default Input;
