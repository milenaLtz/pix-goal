import { Link } from "react-router-dom";
import { SignUpForm } from "../../../features/SignUp";
import './_sign-up-page.scss'
const SignUpPage = () => {
  return(
    <>
      <header className="sign-up-page__header">
        <Link className="sign-up-page__link" to='/'>
          <h1>PixGoal</h1>
        </Link>
        <Link className="button" to='/sign-in'>Войти</Link>
      </header>
      <div className="sign-up-page__form-wrapper">
        <SignUpForm/>
      </div>
    </>
  )
}
export default SignUpPage;
