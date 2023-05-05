import React, { Component } from "react";
import { connect } from "react-redux";
import { CommonUtils } from "../../../utils";
import {
  Grid,
  IconButton,
  Icon,
  Button,
  TextField,
  InputLabel,
  Dialog,
} from "@material-ui/core";
import { toast } from "react-toastify";
import { doneBookingTable } from "../../../services/restaurantService";
import { Backdrop, CircularProgress } from "@mui/material";

class BillEmailDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageBase64: "",
      isLoadingSendEmail: false,
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleChangeImage = async (event) => {
    let image = event.target.files[0];

    if (image) {
      let imageBase64 = await CommonUtils.getBase64(image);
      this.setState({
        imageBase64: imageBase64,
      });
    }
  };

  handleSendBill = async () => {
    const { language, bookingData } = this.props;
    const { imageBase64 } = this.state;

    if (!bookingData) {
      toast.error("Có lỗi xảy ra, vui lòng tải lại trang");
      return;
    }

    if (!imageBase64) {
      toast.error("Bạn chưa đính kèm hóa đớn");
      return;
    }

    this.handleChangeBackdropLoading(true);

    let data = {
      customerId: bookingData.customerId,
      restaurantId: bookingData.restaurantId,
      language,
      imageBase64,
    };

    const res = await doneBookingTable(bookingData.id, data);
    if (res && res.errCode === 0) {
      this.handleChangeBackdropLoading(false);
      this.props.handleCloseDialog();
      toast.success(
        "Xác nhận đã dùng bữa và gửi email cho khách hàng thành công"
      );
    } else {
      this.handleChangeBackdropLoading(false);
      toast.error(res.errMessage);
    }
  };

  handleChangeBackdropLoading = (boolean) => {
    this.setState({
      isLoadingSendEmail: boolean,
    });
  };

  render() {
    const { language, isOpen, handleCloseDialog, bookingData } = this.props;
    const { isLoadingSendEmail } = this.state;

    return (
      <>
        <Dialog open={isOpen} maxWidth="xs" fullWidth={true}>
          <Grid className="dialog-container">
            <Grid className="dialog-header">
              Gửi hóa đơn
              <IconButton
                className="btn-close-dialog"
                onClick={() => {
                  handleCloseDialog();
                }}
              >
                <Icon color="error" title="Đóng">
                  close
                </Icon>
              </IconButton>
            </Grid>
            <Grid className="bill-email-body">
              <Grid container alignItems="center">
                <Grid item xs={3}>
                  <InputLabel htmlFor="email">Email:</InputLabel>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    className="w-100"
                    type="text"
                    id="email"
                    value={bookingData?.customerData?.email}
                    variant="outlined"
                    size="small"
                    disabled
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="center" className="mt-3">
                <Grid item xs={3}>
                  <InputLabel htmlFor="image">Hóa đơn:</InputLabel>
                </Grid>
                <Grid item xs={9}>
                  <input
                    id="image"
                    type="file"
                    onChange={(event) => {
                      this.handleChangeImage(event);
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid className="dialog-footer" container justify="flex-end">
              <Button
                className="dialog-button"
                variant="contained"
                color="primary"
                onClick={() => {
                  this.handleSendBill();
                }}
              >
                Gửi
              </Button>
              <Button
                className="dialog-button"
                color="secondary"
                variant="contained"
                onClick={handleCloseDialog}
              >
                Đóng
              </Button>
            </Grid>
          </Grid>
        </Dialog>
        <Backdrop open={isLoadingSendEmail} style={{ zIndex: 9999 }}>
          <CircularProgress color="primary" size={70} />
        </Backdrop>
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

export default connect(mapStateToProps, mapDispatchToProps)(BillEmailDialog);
