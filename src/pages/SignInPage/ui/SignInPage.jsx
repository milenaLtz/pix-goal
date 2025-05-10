import { Link } from "react-router-dom";
import { SignInForm } from "../../../features/SignIn";
import './_sign-in-page.scss'

const SignInPage = ({onLogin}) => {
  return(
    <>
      <header className="sign-in-page__header">
        <Link className="sign-in-page__link" to='/'>
          <h1>PixGoal</h1>
        </Link>
        <Link className="button" to='/sign-up'>Зарегистироваться</Link>
      </header>
      <div className="sign-in-page__form-wrapper">
        <SignInForm onLogin={onLogin}/>
      </div>
    </>
  )
}
export default SignInPage;
