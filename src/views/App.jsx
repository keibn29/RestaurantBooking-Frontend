import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/styles.scss";
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";
import { PATH } from "../utils";
import Home from "../routes/Home";
import SystemLogin from "./System/Auth/SystemLogin";
import System from "../routes/System";
import CustomScrollbars from "../components/CustomScrollbars";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { ThemeProvider } from "@mui/material/styles";
import { muiThemeV4, muiThemeV5 } from "../utils";
import Homepage from "./Customer/Homepage/Homepage";
import DetailRestaurant from "./Customer/Restaurant/DetailRestaurant";
import EmailVerify from "./Customer/Email/EmailVerify";
import CustomerProfile from "./Customer/Profile/CustomerProfile";
import Searchpage from "./Customer/Search/Searchpage";
import DetailHandbook from "./Customer/Handbook/DetailHandbook";
import EmailForgotPassword from "./Customer/Email/EmailForgotPassword";

class App extends Component {
  componentDidMount() {
    this.handlePersistorState();
  }

  handlePersistorState = () => {
    const { persistor } = this.props;
    const { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  render() {
    return (
      <Fragment>
        <ThemeProvider theme={muiThemeV5}>
          <MuiThemeProvider theme={muiThemeV4}>
            <Router history={history}>
              <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
                <Switch>
                  <Route path={PATH.HOME} exact component={Home} />
                  <Route path={PATH.HOMEPAGE} component={Homepage} />
                  <Route
                    path={PATH.SYSTEM_LOGIN}
                    component={userIsNotAuthenticated(SystemLogin)}
                  />
                  <Route
                    path={PATH.SYSTEM}
                    component={userIsAuthenticated(System)}
                  />
                  <Route
                    path={PATH.DETAIL_RESTAURANT}
                    component={DetailRestaurant}
                  />
                  <Route
                    path={PATH.VERIFY_BOOKING_TABLE}
                    component={EmailVerify}
                  />
                  <Route
                    path={PATH.BOOKING_HISTORY}
                    component={CustomerProfile}
                  />
                  <Route path={PATH.SEARCHPAGE} component={Searchpage} />
                  <Route
                    path={PATH.DETAIL_HANDBOOK}
                    component={DetailHandbook}
                  />
                  <Route
                    path={PATH.UPDATE_PASSWORD}
                    component={EmailForgotPassword}
                  />
                </Switch>
              </CustomScrollbars>
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
            </Router>
          </MuiThemeProvider>
        </ThemeProvider>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedInSystem: state.user.isLoggedInSystem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
