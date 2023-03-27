import { Routes as ROUTES, Route } from 'react-router-dom';
import LandingPage from './landing-page/landing-page';
import Login from './login/login';
import SignUp from './sign-up/sign-up';

export function Routes() {
  return (
    <ROUTES>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
    </ROUTES>
  );
}

export default Routes;
