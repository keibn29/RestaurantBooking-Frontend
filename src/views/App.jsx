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
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Homepage from "./Customer/Homepage/Homepage";
import DetailRestaurant from "./Customer/Restaurant/DetailRestaurant";
import EmailVerify from "./Customer/Email/EmailVerify";
import CustomerProfile from "./Customer/Profile/CustomerProfile";

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#7265EB",
    },
    secondary: {
      main: "#617D8A",
    },
  },
});

class App extends Component {
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

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <Fragment>
        <MuiThemeProvider theme={muiTheme}>
          <Router history={history}>
            <div className="main-container">
              <div className="content-container">
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
                  </Switch>
                </CustomScrollbars>
              </div>
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
            </div>
          </Router>
        </MuiThemeProvider>
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
