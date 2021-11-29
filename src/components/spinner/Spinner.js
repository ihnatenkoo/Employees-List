import spinner from "./spinner.gif";
import "./spinner.css"

const Spinner = () => {
  return (
    <div className="spinner">
    <img src={spinner} alt="spinner image" className="spinner__img"/>
    <h2 className="spinner__ttile"> Loading...</h2>
    </div>
  )
}

export default Spinner;