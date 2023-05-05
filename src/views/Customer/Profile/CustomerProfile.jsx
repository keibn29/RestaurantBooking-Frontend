import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../Homepage/HomeHeader/HomeHeader";
import HomeFooter from "../Homepage/HomeFooter/HomeFooter";
import { Grid, Container } from "@material-ui/core";
import "./CustomerProfile.scss";
import ChatRealTime from "../Homepage/ChatRealTime/ChatRealTime";
import { NAV_CUSTOMER_PROFILE } from "../../../utils";
import CustomerNav from "./CustomerNav";
import BookingHistory from "./BookingHistory/BookingHistory";
import Account from "./Account/Account";

class CustomerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerNavSelected: NAV_CUSTOMER_PROFILE.RESERVATION,
    };
  }

  componentDidMount() {
    if (this.props.location.hash) {
      this.setState({
        customerNavSelected: this.props.location.hash,
      });
    }
    document.getElementById("customer-profile-top").scrollIntoView();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.location &&
      prevProps.location.hash !== this.props.location.hash
    ) {
      this.setState({
        customerNavSelected: this.props.location.hash,
      });
    }
  }
  render() {
    const { customerNavSelected } = this.state;

    return (
      <>
        <Grid className="customer-profile-container">
          <HomeHeader isShowHeaderSearch={true} />
          <Container className="customer-profile-body">
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <Grid className="customer-profile-content customer-nav mt-4">
                  <CustomerNav navSelected={customerNavSelected} />
                </Grid>
              </Grid>
              <Grid item xs={6} id="customer-profile-top">
                {customerNavSelected === NAV_CUSTOMER_PROFILE.RESERVATION && (
                  <Grid className="customer-profile-content customer-reservation mt-4">
                    <BookingHistory />
                  </Grid>
                )}
                {customerNavSelected === NAV_CUSTOMER_PROFILE.ACCOUNT && (
                  <Grid className="customer-profile-content customer-account mt-4">
                    <Account />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Container>
          <ChatRealTime />
          <HomeFooter />
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerProfile);
