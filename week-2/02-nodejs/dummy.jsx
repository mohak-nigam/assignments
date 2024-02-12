import React, { Suspense, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import toast, { Toaster, ToastBar } from "react-hot-toast";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import LayoutAnonymous from "./layouts/LayoutAnonymous";
import LayoutAuthenticated from "./layouts/LayoutAuthenticated";
import LayoutProtected from "./layouts/LayoutProtected";
import Spinner from "./components/Spinner";
import PageNotFound from "./pages/ErrorsPages/404";
import InternalServerError from "./pages/ErrorsPages/500";
import CarrierThankYouPage from "./pages/CarrierThankYouPage";

import { AuthContext } from "./contexts/auth.context";

import routes from "./routes";
import getHomePageOfUser from "./utils/routes.util";

import "./styles/output.css";
import "./styles/custom.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
  const existingToken = localStorage.getItem("token");
  const existingUser = JSON.parse(localStorage.getItem("user"));

  // Initialize App state with existing token, if exists.
  const [authUser, setAuthUser] = useState({
    user: existingUser,
    token: existingToken,
  });

  // Extend "setAuthTokens" function to update localstorage when tokens gets changed
  // Pass this function as a context, so that it can be called from anywhere to update the tokens
  const setAuthUserExtended = (user, token) => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("link");
    }
    setAuthUser({ user, token });
  };

  return (
    <>
      <div className="App">
        <AuthContext.Provider
          value={{ authUser, setAuthUser: setAuthUserExtended }}
        >
          <Suspense fallback={<Spinner />}>
            <Router>
              <Switch>
                <Route path="/page-not-found" exact component={PageNotFound} />
                <Route
                  path="/something-went-wrong"
                  exact
                  component={InternalServerError}
                />
                <Route
                  path="/carrier-thank-you"
                  exact
                  component={CarrierThankYouPage}
                />
                <Route
                  exact
                  path={[
                    "/login",
                    "/sign-in",
                    "/sign-up",
                    "/carrier-signup",
                    "/shipper-signup",
                    "/shipper-signup/:customerId",
                    "/reset-password",
                    "/guest-tracking",
                  ]}
                >
                  <LayoutAnonymous>
                    <Switch>
                      {routes.publicRoutes.map(({ path, component, exact }) => {
                        return (
                          <PublicRoute
                            key={path}
                            path={path}
                            component={component}
                            exact={exact}
                          />
                        );
                      })}
                    </Switch>
                  </LayoutAnonymous>
                </Route>
                <Route
                  exact
                  path={[
                    "/new-quote-summary/:quoteId",
                    "/shipper-thank-you",
                    "/thank-you",
                    "/book-now-quote/*",
                    "/shipper-add-signature/*",
                    "/shipper-enroute-load-summary/track-shipment/:quoteId",
                    "/shipper-enroute-load-summary/tracking/:quoteId",
                    "/carrier-add-signature/*",
                    "/salesRep/enroute-quote-details/track-shipment/:quoteId",
                    "/salesRep/enroute-quote-details/tracking/:quoteId",
                    // '/carrier-dot-number',
                  ]}
                >
                  <LayoutProtected>
                    <Switch>
                      {routes.protectedRoutes.map(
                        ({ path, component, exact, rolesAccess }) => (
                          <PrivateRoute
                            key={path}
                            exact={exact}
                            path={path}
                            component={component}
                            rolesAccess={rolesAccess}
                          />
                        )
                      )}
                    </Switch>
                  </LayoutProtected>
                </Route>
                <Route path="*">
                  <LayoutAuthenticated>
                    <Switch>
                      {routes.privateRoutes.map(
                        ({ path, component, exact, rolesAccess }) => (
                          <PrivateRoute
                            key={path}
                            exact={exact}
                            path={path}
                            component={component}
                            rolesAccess={rolesAccess}
                          />
                        )
                      )}
                      <Route exact path="/">
                        <Redirect to={getHomePageOfUser(authUser)} />
                      </Route>
                      <Route exact path="*">
                        <Redirect to="/page-not-found" />
                      </Route>
                    </Switch>
                  </LayoutAuthenticated>
                </Route>
                <Route exact path="*">
                  <Redirect to="/page-not-found" />
                </Route>
              </Switch>
            </Router>
          </Suspense>

          <Spinner />

          <Toaster position="top-right" toastOptions={{ duration: 7000 }}>
            {(t) => (
              <ToastBar toast={t}>
                {({ icon, message }) => (
                  <>
                    {icon}
                    {message}
                    {t.type !== "loading" && (
                      <button
                        type="button"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onClick={() => toast.dismiss(t.id)}
                      >
                        Dismiss
                      </button>
                    )}
                  </>
                )}
              </ToastBar>
            )}
          </Toaster>
        </AuthContext.Provider>
      </div>
    </>
  );
}

export default App;
