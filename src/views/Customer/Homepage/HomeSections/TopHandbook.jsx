import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import {
  LANGUAGES,
  OBJECT,
  PATH,
  isExistArrayAndNotEmpty,
} from "../../../../utils";
import { withRouter } from "react-router";
import * as actions from "../../../../store/actions";
import { Grid, Button, Container } from "@material-ui/core";
import Slider from "react-slick";

class TopHandbook extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getListHandbook({
      pageSize: process.env.REACT_APP_NUMBER_ITEM_SLIDE_HOMEPAGE,
      pageOrder: 1,
    });
  }

  handleOpenHandbookPage = (handbookId) => {
    if (this.props.history) {
      this.props.history.push(`/handbook/${handbookId}`);
    }
  };

  handleOpenSearchpage = async () => {
    if (this.props.history) {
      this.props.history.push({
        pathname: PATH.SEARCHPAGE,
        state: {
          object: OBJECT.HANDBOOK,
        },
      });
    }
  };

  render() {
    const { language, listHandbook } = this.props;
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      arrows: true,
    };

    return (
      <>
        <Container className="section-container handbook">
          <Grid className="section-header home-container">
            <Grid className="section-header-title">
              <FormattedMessage id="customer.homepage.home-sections.food-handbook" />
            </Grid>
            <Grid className="section-header-text">
              <FormattedMessage id="customer.homepage.home-sections.new-handbook-text" />
            </Grid>
          </Grid>
          <Grid className="section-body">
            <Slider {...settings}>
              {isExistArrayAndNotEmpty(listHandbook) &&
                listHandbook.map((item) => {
                  return (
                    <Grid key={item.id} className="section-body-outer">
                      <Grid
                        className="content handbook"
                        container
                        onClick={() => {
                          this.handleOpenHandbookPage(item.id);
                        }}
                      >
                        <Grid
                          item
                          xs={5}
                          className="content-left background-image-center-cover"
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
                        <Grid item xs={7} className="content-right">
                          <Grid className="content-right-up">
                            {language === LANGUAGES.VI
                              ? item.titleVi
                              : item.titleEn}
                          </Grid>
                          <Grid
                            className="content-right-down"
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
                    </Grid>
                  );
                })}
            </Slider>
          </Grid>
          <Grid className="section-footer home-container">
            <Button
              className="btn-more"
              variant="outlined"
              onClick={() => {
                this.handleOpenSearchpage();
              }}
            >
              <FormattedMessage id="customer.homepage.home-sections.see-more-handbook" />
            </Button>
          </Grid>
        </Container>
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
    getListHandbook: (data) => dispatch(actions.getListHandbook(data)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TopHandbook)
);
