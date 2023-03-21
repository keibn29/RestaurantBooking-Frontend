import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../Homepage/HomeHeader/HomeHeader";
import HomeFooter from "../Homepage/HomeFooter/HomeFooter";
import * as actions from "../../../store/actions";
import {
  Grid,
  IconButton,
  Icon,
  Button,
  InputAdornment,
  Input,
  TablePagination,
  MenuItem,
  TextField,
  InputLabel,
  Box,
  FormControl,
  Container,
} from "@material-ui/core";
import "./EmailVerify.scss";
import { verifyBookingTable } from "../../../services/customerService";

class EmailVerify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errCode: -1,
      errMessage: "",
    };
  }

  componentDidMount() {
    this.handleVarifyEmailBookingTable();
  }

  handleVarifyEmailBookingTable = async () => {
    if (this.props.location && this.props.location.search) {
      const urlParams = new URLSearchParams(this.props.location.search);
      const token = urlParams.get("token");

      const res = await verifyBookingTable(token);
      if (res && res.errCode === 0) {
        this.setState({
          errCode: res.errCode,
        });
      } else {
        this.setState({
          errCode: res.errCode,
          errMessage: res.errMessage,
        });
      }
    }
  };

  render() {
    const { errCode, errMessage } = this.state;

    return (
      <>
        <HomeHeader isShowHeaderSearch={true} />
        <Grid className="email-verify-container">
          {errCode === 0 ? (
            <>
              <Grid className="icon icon-success background-image-center-cover mt-5"></Grid>
              <Grid className="text text-center mt-3">
                Xác nhận lịch đặt bàn thành công!
              </Grid>
            </>
          ) : (
            <>
              <Grid className="icon icon-failed background-image-center-cover mt-5"></Grid>
              <Grid className="text text-center mt-3">
                {errMessage ||
                  "Lịch đặt bàn đã được xác nhận hoặc không tồn tại"}
              </Grid>
            </>
          )}
        </Grid>
        <HomeFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerify);
