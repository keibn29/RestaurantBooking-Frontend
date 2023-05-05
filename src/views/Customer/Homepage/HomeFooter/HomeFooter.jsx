import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeFooter.scss";
import * as actions from "../../../../store/actions";
import { Grid } from "@material-ui/core";
import Fanpage from "../../SocialPlugin/Fanpage";
import {
  ALLCODES,
  isExistArrayAndNotEmpty,
  LANGUAGES,
  SOCIAL_NETWORK,
} from "../../../../utils";
import { FormattedMessage } from "react-intl";

class HomeFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listProvince: [],
      listCountry: [],
    };
  }

  componentDidMount() {
    this.props.getAllProvince(ALLCODES.PROVINCE);
    this.props.getAllCountry(ALLCODES.COUNTRY);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listProvince !== this.props.listProvince) {
      this.setState({
        listProvince: this.props.listProvince,
      });
    }
    if (prevProps.listCountry !== this.props.listCountry) {
      this.setState({
        listCountry: this.props.listCountry,
      });
    }
  }

  handleOpenSocialNetwork = (socialType) => {
    if (socialType === SOCIAL_NETWORK.FACEBOOK) {
      window.open(process.env.REACT_APP_DEVELOPER_FACEBOOK_URL, "_blank");
    } else {
      window.open(process.env.REACT_APP_DEVELOPER_GITHUB_URL, "_blank");
    }
  };

  render() {
    const { language } = this.props;
    const { listProvince, listCountry } = this.state;

    return (
      <>
        <Grid className="home-footer-container">
          <Grid className="home-footer-top" container justify="space-between">
            <Grid className="footer-text">
              <Grid className="footer-text-title">For Developer</Grid>
              <Grid
                className="footer-text-content mt-4"
                container
                direction="column"
              >
                <Grid>
                  <FormattedMessage id="customer.homepage.home-footer.dev-name" />
                </Grid>
                <Grid>
                  <FormattedMessage id="customer.homepage.home-footer.computer-science" />
                </Grid>
                <Grid>
                  <FormattedMessage id="customer.homepage.home-footer.neu" />
                </Grid>
                <Grid className="dev-social-infor mt-3" container>
                  <Grid
                    className="social-icon-svg facebook background-image-center-cover"
                    onClick={() => {
                      this.handleOpenSocialNetwork(SOCIAL_NETWORK.FACEBOOK);
                    }}
                  ></Grid>
                  <Grid
                    className="social-icon-svg github background-image-center-cover"
                    onClick={() => {
                      this.handleOpenSocialNetwork(SOCIAL_NETWORK.GITHUB);
                    }}
                  ></Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid className="footer-text">
              <Grid className="footer-text-title">Provinces</Grid>
              <Grid
                className="footer-text-content mt-4"
                container
                direction="column"
              >
                {isExistArrayAndNotEmpty(listProvince) &&
                  listProvince.map((item) => {
                    return (
                      <Grid key={item.keyMap} className="province">
                        {language === LANGUAGES.VI
                          ? item.valueVi
                          : item.valueEn}
                      </Grid>
                    );
                  })}
              </Grid>
            </Grid>
            <Grid className="footer-text">
              <Grid className="footer-text-title">Originated</Grid>
              <Grid
                className="footer-text-content mt-4"
                container
                direction="column"
              >
                {isExistArrayAndNotEmpty(listCountry) &&
                  listCountry.map((item) => {
                    return (
                      <Grid key={item.keyMap} className="country">
                        {language === LANGUAGES.VI
                          ? item.valueVi
                          : item.valueEn}
                      </Grid>
                    );
                  })}
              </Grid>
            </Grid>
            <Fanpage />
          </Grid>
          <Grid className="home-footer-bottom mt-5">
            &copy;2023 Chope GmbH. All rights reserved
          </Grid>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listProvince: state.allCode.listProvince,
    listCountry: state.allCode.listCountry,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProvince: (code) => dispatch(actions.getAllProvince(code)),
    getAllCountry: (code) => dispatch(actions.getAllCountry(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
