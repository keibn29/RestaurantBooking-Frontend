import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";

class Fanpage extends Component {
  componentDidMount() {
    this.initFacebookSDK();
  }

  initFacebookSDK() {
    if (window.FB) {
      window.FB.XFBML.parse();
    }

    let { language } = this.props;
    let locale = language === LANGUAGES.VI ? "vi_VN" : "en_US";
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.REACT_APP_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: "v2.5",
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = `//connect.facebook.net/${locale}/sdk.js`;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }

  render() {
    return (
      <>
        <div
          className="fb-page"
          data-tabs="timeline, events"
          data-href={process.env.REACT_APP_NEU_FANPAGE_URL}
          data-width="500"
          data-hide-cover="false"
          data-show-facepile="false"
        ></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Fanpage);
