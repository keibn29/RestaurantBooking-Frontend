import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../Homepage/HomeHeader/HomeHeader";
import HomeFooter from "../Homepage/HomeFooter/HomeFooter";
import { Grid } from "@material-ui/core";
import "./EmailVerify.scss";
import {
  checkExistBookByToken,
  verifyBookingTable,
} from "../../../services/customerService";
import { PayPalButton } from "react-paypal-button-v2";
import { getPaypalConfig } from "../../../services/allCodeService";
import { toast } from "react-toastify";
import { Backdrop, CircularProgress } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";

class EmailVerify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNewBooking: false,
      message: "",
      isSdkReady: false,
      isVerifySuccess: false,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.addPaypalScript();
    this.checkExistBookByToken();
  }

  addPaypalScript = async () => {
    const res = await getPaypalConfig();
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${res.clientId}`;
    script.async = true;
    script.onload = () => {
      this.setState({
        isSdkReady: true,
      });
    };
    document.body.appendChild(script);
  };

  checkExistBookByToken = async () => {
    if (this.props.location?.search) {
      const urlParams = new URLSearchParams(this.props.location.search);
      const token = urlParams.get("token");

      const res = await checkExistBookByToken(token);
      if (res && res.errCode === 0) {
        this.setState({
          isNewBooking: true,
          isLoading: false,
        });
      } else {
        this.setState({
          isNewBooking: false,
          messageVi: res.errMessageVi,
          messageEn: res.errMessageEn,
          isLoading: false,
        });
      }
    }
  };

  verifyBookingTable = async () => {
    if (this.props.location && this.props.location.search) {
      const urlParams = new URLSearchParams(this.props.location.search);
      const token = urlParams.get("token");

      const res = await verifyBookingTable(token);
      if (res && res.errCode === 0) {
        toast.success("Thanh toán và xác nhận đơn đặt bàn thành công");
        this.setState({
          isVerifySuccess: true,
        });
      } else {
        toast.error(res.errMessage);
      }
    }
  };

  handlePayPalSuccess = () => {
    this.verifyBookingTable();
  };

  render() {
    const { language } = this.props;
    const {
      isNewBooking,
      messageVi,
      messageEn,
      isSdkReady,
      isVerifySuccess,
      isLoading,
    } = this.state;

    return (
      <>
        <HomeHeader isShowHeaderSearch={true} />
        {isLoading ? (
          <Grid className="email-verify-container">
            <Backdrop open={true} style={{ zIndex: 9999 }}>
              <CircularProgress color="colorhome" size={70} />
            </Backdrop>
          </Grid>
        ) : (
          <Grid className="email-verify-container">
            {isNewBooking ? (
              <>
                {!isVerifySuccess ? (
                  <>
                    <Grid className="text text-center mt-3">
                      <FormattedMessage id="customer.email.continue-note" />
                    </Grid>
                    {isSdkReady && (
                      <Grid className="paypal-container">
                        <PayPalButton
                          style={{
                            layout: "horizontal",
                            tagline: false,
                          }}
                          amount="5"
                          onSuccess={(details, data) => {
                            this.handlePayPalSuccess(details, data);
                          }}
                          onError={() => {
                            toast.error("Có lỗi xảy ra");
                          }}
                        />
                      </Grid>
                    )}
                  </>
                ) : (
                  <>
                    <Grid className="icon icon-success background-image-center-cover mt-5"></Grid>
                    <Grid className="text text-center mt-3">
                      <FormattedMessage id="customer.email.success-note" />
                    </Grid>
                  </>
                )}
              </>
            ) : (
              <>
                <Grid className="icon icon-failed background-image-center-cover mt-5"></Grid>
                <Grid className="text text-center mt-3">
                  {!messageVi && !messageEn ? (
                    <FormattedMessage id="customer.email.failed-note" />
                  ) : (
                    <>{language === LANGUAGES.VI ? messageVi : messageEn}</>
                  )}
                </Grid>
              </>
            )}
          </Grid>
        )}
        <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerify);
