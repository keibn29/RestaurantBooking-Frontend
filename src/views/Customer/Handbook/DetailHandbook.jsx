import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../Homepage/HomeHeader/HomeHeader";
import HomeFooter from "../Homepage/HomeFooter/HomeFooter";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router";
import "./DetailHandbook.scss";
import {
  LANGUAGES,
  PAGE_SIZE_PAGINATION,
  isExistArrayAndNotEmpty,
} from "../../../utils";
import { Grid, Container } from "@material-ui/core";
import ChatRealTime from "../Homepage/ChatRealTime/ChatRealTime";
import { getHandbookById } from "../../../services/handbookService";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";

class DetailHandbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handbookData: {},
      handbookId: "",
      listOtherHandbook: [],
    };
  }

  componentDidMount() {
    this.fetchDetailHandbookById();

    document.getElementById("detail-handbook-top").scrollIntoView({
      block: "end",
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listHandbook !== this.props.listHandbook) {
      this.getListOtherHandbook();
    }
    if (
      prevProps.match.params.handbookId !== this.props.match.params.handbookId
    ) {
      this.fetchDetailHandbookById();
    }
  }

  fetchDetailHandbookById = () => {
    if (this.props.match?.params?.handbookId) {
      const handbookId = this.props.match.params.handbookId;
      this.setState(
        {
          handbookId: +handbookId,
        },
        () => {
          this.props.getListHandbook({
            pageSize: PAGE_SIZE_PAGINATION,
            pageOrder: 1,
          });
        }
      );
      this.callApiFetchDetailHandbookById(+handbookId);
    }
  };

  callApiFetchDetailHandbookById = async (handbookId) => {
    const res = await getHandbookById(handbookId);
    if (res && res.errCode === 0) {
      this.setState({
        handbookData: res.handbook,
      });
    } else {
      toast.error(res.errMessage);
    }
  };

  getListOtherHandbook = () => {
    const { listHandbook } = this.props;
    const { handbookId } = this.state;
    if (handbookId && isExistArrayAndNotEmpty(listHandbook)) {
      let listOtherHandbook = listHandbook.filter(
        (item) => item.id !== handbookId
      );
      this.setState({
        listOtherHandbook: listOtherHandbook,
      });
    }
  };

  handleOpenOtherHandbookPage = async (handbookId) => {
    if (this.props.history) {
      await this.props.history.push(`/handbook/${handbookId}`);
      document.getElementById("detail-handbook-top").scrollIntoView({
        block: "end",
      });
    }
  };

  render() {
    const { language } = this.props;
    const { handbookData, listOtherHandbook } = this.state;

    return (
      <>
        <Grid className="handbook-container">
          <HomeHeader isShowHeaderSearch={true} />
          <Container>
            <Grid container spacing={3} className="handbook-body">
              <Grid item xs={8}>
                <Grid className="handbook-content main-handbook mt-4">
                  <Grid
                    className="handbook-content-title"
                    id="detail-handbook-top"
                  >
                    {language === LANGUAGES.VI
                      ? handbookData?.titleVi
                      : handbookData?.titleEn}
                  </Grid>
                  <Grid
                    className="handbook-image background-image-center-cover mt-4"
                    style={
                      handbookData.image
                        ? {
                            backgroundImage: `url(${
                              process.env.REACT_APP_BACKEND_URL +
                              handbookData.image
                            })`,
                          }
                        : {}
                    }
                  ></Grid>
                  <Grid className="handbook-image-text text-center">
                    <i>
                      <FormattedMessage id="customer.handbook.image-demo" />
                    </i>
                  </Grid>
                  <Grid
                    className="handbook-description mt-4"
                    dangerouslySetInnerHTML={
                      language === LANGUAGES.VI
                        ? {
                            __html: handbookData?.descriptionVi,
                          }
                        : {
                            __html: handbookData?.descriptionEn,
                          }
                    }
                  ></Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid className="other-handbook-title mt-4">
                  <FormattedMessage id="customer.handbook.other-handbook" />
                </Grid>
                {isExistArrayAndNotEmpty(listOtherHandbook) && (
                  <Grid className="list-other-handbook mt-2">
                    {listOtherHandbook.map((item) => {
                      return (
                        <Grid
                          key={item.id}
                          className="handbook-content mb-4"
                          container
                          onClick={() => {
                            this.handleOpenOtherHandbookPage(item.id);
                          }}
                        >
                          <Grid
                            item
                            xs={5}
                            className="other-handbook-content-left background-image-center-cover"
                            style={
                              item.image
                                ? {
                                    backgroundImage: `url(${
                                      process.env.REACT_APP_BACKEND_URL +
                                      item.image
                                    })`,
                                  }
                                : {}
                            }
                          ></Grid>
                          <Grid
                            item
                            xs={7}
                            className="other-handbook-content-right p-2"
                          >
                            <Grid className="other-handbook-content-title">
                              {language === LANGUAGES.VI
                                ? item.titleVi
                                : item.titleEn}
                            </Grid>
                            <Grid
                              className="other-handbook-content-description"
                              dangerouslySetInnerHTML={
                                language === LANGUAGES.VI
                                  ? {
                                      __html: item.descriptionVi,
                                    }
                                  : {
                                      __html: item.descriptionEn,
                                    }
                              }
                            ></Grid>
                          </Grid>
                        </Grid>
                      );
                    })}
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
    listHandbook: state.handbook.listHandbook,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRestaurantById: (handbookId) =>
      dispatch(actions.getRestaurantById(handbookId)),
    getListHandbook: (data) => dispatch(actions.getListHandbook(data)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailHandbook)
);
