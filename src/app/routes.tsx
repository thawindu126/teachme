import { Routes as ROUTES, Route } from 'react-router-dom';

import LandingPage from '../pages/landing-page/landing-page';
import Login from '../pages/login/login';
import Onboarding from '../pages/onboarding/onboarding';
import { Path } from '@teachme/types/constants';
import SignUp from '../pages/sign-up/sign-up';
// import Profile from '../pages/profile/profile';
// import SessionCreate from '../pages/session-create/session-create';
// import Session from '../pages/session/session';
// import SessionRecords from '../pages/session-records/session-records';
import Subscription from '../pages/subscription/subscription';
import Achievements from 'src/pages/achievements/achievements';

export function Routes() {
  return (
    <ROUTES>
      <Route path={Path.LANDING_PAGE} element={<LandingPage />}></Route>
      <Route path={Path.LOGIN} element={<Login />}></Route>
      <Route path={Path.SIGN_UP} element={<SignUp />}></Route>
      <Route path={Path.ONBOARDING} element={<Onboarding />}></Route>
      {/* <Route path={Path.PROFILE} element={<Profile />}></Route>
      <Route path={Path.SESSION_CREATE} element={<SessionCreate />}></Route>
      <Route path={Path.SESSION} element={<Session />}></Route>
      <Route path={Path.SESSION_RECORDS} element={<SessionRecords/>}></Route> */}
      <Route path={Path.SUBSCRIPTION} element={<Subscription />}></Route>
      <Route path={Path.ACHIEVEMENTS} element={<Achievements />}></Route>
    </ROUTES>
  );
}

export default Routes;
