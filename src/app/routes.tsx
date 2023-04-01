import { Routes as ROUTES, Route } from 'react-router-dom';

import LandingPage from '../pages/landing-page/landing-page';
import Login from '../pages/login/login';
import Onboarding from '../pages/onboarding/onboarding';
import { Path } from '@teachme/types/constants';
import SignUp from '../pages/sign-up/sign-up';

export function Routes() {
  return (
    <ROUTES>
      <Route path={Path.LANDING_PAGE} element={<LandingPage />}></Route>
      <Route path={Path.LOGIN} element={<Login />}></Route>
      <Route path={Path.SIGN_UP} element={<SignUp />}></Route>
      <Route path={Path.ONBOARDING} element={<Onboarding />}></Route>
    </ROUTES>
  );
}

export default Routes;
