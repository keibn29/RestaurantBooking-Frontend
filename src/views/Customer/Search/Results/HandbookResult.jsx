import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Grid } from "@material-ui/core";
import { Pagination, Skeleton } from "@mui/material";
import {
  isExistArrayAndNotEmpty,
  LANGUAGES,
  PAGE_SIZE_PAGINATION,
} from "../../../../utils";
import "./Result.scss";
import { FormattedMessage } from "react-intl";

class HandbookResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listHandbook: [],
      totalPage: 1,
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listHandbook !== this.props.listHandbook) {
      this.setState({
        listHandbook: this.props.listHandbook,
        totalPage: Math.ceil(this.props.totalHandbook / PAGE_SIZE_PAGINATION),
      });
    }
  }

  handleChangePageOrder = (newPage) => {
    this.props.changePageOrder(newPage);
  };

  handleOpenDetailHandbookPage = (handbookId) => {
    if (this.props.history) {
      this.props.history.push(`/handbook/${handbookId}`);
    }
  };

  render() {
    const { language, pageOrder, totalHandbook, isLoadingHandbook } =
      this.props;
    const { listHandbook, totalPage } = this.state;

    return (
      <>
        {isLoadingHandbook ? (
          <>
            <Grid className="mt-4" container>
              <Grid>
                <Skeleton variant="rounded" width={300} height={175} />
              </Grid>
              <Grid item xs className="mx-3">
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: "40px",
                    marginTop: "-7px",
                  }}
                />
                <Skeleton variant="text" sx={{ fontSize: "20px" }} />
                <Skeleton variant="text" sx={{ fontSize: "20px" }} />
                <Skeleton variant="text" sx={{ fontSize: "20px" }} />
                <Skeleton variant="text" sx={{ fontSize: "20px" }} />
              </Grid>
            </Grid>
            <Grid className="mt-4" container>
              <Grid>
                <Skeleton variant="rounded" width={300} height={175} />
              </Grid>
              <Grid item xs className="mx-3">
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: "40px",
                    marginTop: "-7px",
                  }}
                />
                <Skeleton variant="text" sx={{ fontSize: "20px" }} />
                <Skeleton variant="text" sx={{ fontSize: "20px" }} />
                <Skeleton variant="text" sx={{ fontSize: "20px" }} />
                <Skeleton variant="text" sx={{ fontSize: "20px" }} />
              </Grid>
            </Grid>
            <Grid className="mt-4" container>
              <Grid>
                <Skeleton variant="rounded" width={300} height={175} />
              </Grid>
              <Grid item xs className="mx-3">
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: "40px",
                    marginTop: "-7px",
                  }}
                />
                <Skeleton variant="text" sx={{ fontSize: "20px" }} />
                <Skeleton variant="text" sx={{ fontSize: "20px" }} />
                <Skeleton variant="text" sx={{ fontSize: "20px" }} />
                <Skeleton variant="text" sx={{ fontSize: "20px" }} />
              </Grid>
            </Grid>
          </>
        ) : (
          <Grid className="result-container">
            <Grid className="result-text mt-2">
              <Grid>
                {totalHandbook || 0}{" "}
                {totalHandbook === 1 ? (
                  <FormattedMessage id="customer.search.result.result-one" />
                ) : (
                  <FormattedMessage id="customer.search.result.result-many" />
                )}
              </Grid>
            </Grid>
            <Grid className="list-result mt-3">
              {isExistArrayAndNotEmpty(listHandbook) ? (
                listHandbook.map((item) => {
                  return (
                    <Grid
                      key={item.id}
                      className="result-content handbook"
                      onClick={() => {
                        this.handleOpenDetailHandbookPage(item.id);
                      }}
                    >
                      <Grid
                        className="handbook-image background-image-center-cover"
                        style={
                          item.image
                            ? {
                                backgroundImage: `url(${
                                  process.env.REACT_APP_BACKEND_URL + item.image
                                })`,
                              }
                            : {}
                        }
                      ></Grid>
                      <Grid className="handbook-text">
                        <Grid className="content-name">
                          {language === LANGUAGES.VI
                            ? item.titleVi
                            : item.titleEn}
                        </Grid>
                        <Grid
                          className="handbook-description"
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
                })
              ) : (
                <Grid className="list-result-empty-text">
                  <FormattedMessage id="customer.search.result.no-result" />
                </Grid>
              )}
            </Grid>
            {totalHandbook > PAGE_SIZE_PAGINATION && (
              <Grid
                className="result-pagination mt-5"
                container
                justify="center"
              >
                <Pagination
                  color="colorhome"
                  size="large"
                  count={totalPage}
                  page={pageOrder}
                  onChange={(event, newPage) => {
                    this.handleChangePageOrder(newPage);
                  }}
                />
              </Grid>
            )}
          </Grid>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listHandbook: state.handbook.listHandbook,
    totalHandbook: state.handbook.totalHandbook,
    isLoadingHandbook: state.handbook.isLoadingHandbook,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HandbookResult)
);
