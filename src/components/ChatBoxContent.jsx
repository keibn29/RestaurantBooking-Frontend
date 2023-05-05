import React, { Component } from "react";
import { connect } from "react-redux";
import "./ChatBoxContent.scss";
import { Grid } from "@material-ui/core";
import { Remove, Send } from "@material-ui/icons";
import {
  LANGUAGES,
  PAGE_LOGIN,
  USER_ROLE,
  isExistArrayAndNotEmpty,
} from "../utils";
import _ from "lodash";
import { FormattedMessage } from "react-intl";
import { format } from "date-fns";

class ChatBoxContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.chatRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    this.chatRef.current.scrollTop = this.chatRef.current.scrollHeight;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.listMessageSystem !== this.props.listMessageSystem ||
      prevProps.listMessageCustomer !== this.props.listMessageCustomer
    ) {
      this.chatRef.current.scrollTop = this.chatRef.current.scrollHeight;
    }
  }

  handleChangeInput = (event) => {
    this.props.handleChangeMessage(event.target.value);
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      this.props.sendMessage();
    }
  };

  handleFormatDate = (seconds) => {
    const { language } = this.props;
    if (!seconds) {
      return "";
    }

    const date = new Date(seconds * 1000);
    if (format(new Date(), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")) {
      const timeFormated =
        language === LANGUAGES.VI
          ? format(date, "HH:mm")
          : format(date, "h:mm a");

      return timeFormated;
    }

    const dateFormated =
      language === LANGUAGES.VI
        ? format(date, "HH:mm, dd/MM/yyyy")
        : format(date, "h:mm a, MM/dd/yyyy");

    return dateFormated;
  };

  render() {
    const {
      language,
      listMessageCustomer,
      listMessageSystem,
      closeChatBox,
      pageChat,
      sendMessage,
      customerSelected,
      newMessage,
      inputPlaceholder,
    } = this.props;

    return (
      <>
        <Grid className="chat-box-content">
          <Grid className="chat-box-header" container alignItems="center">
            {pageChat === PAGE_LOGIN.CUSTOMER ? (
              <>
                <Grid className="header-avatar background-image-center-cover"></Grid>
                <Grid className="text">
                  <Grid className="name">
                    <FormattedMessage id="customer.homepage.chat-real-time.chope-table-booking" />
                  </Grid>
                  <Grid className="status">
                    <FormattedMessage id="customer.homepage.chat-real-time.reply-after-min" />
                  </Grid>
                </Grid>
                <Remove className="close-icon" onClick={closeChatBox} />
              </>
            ) : (
              <>
                <Grid
                  className="header-avatar background-image-center-cover"
                  style={
                    customerSelected.avatar
                      ? {
                          backgroundImage: `url(${
                            process.env.REACT_APP_BACKEND_URL +
                            customerSelected.avatar
                          })`,
                        }
                      : {}
                  }
                ></Grid>
                <Grid className="text">
                  {!_.isEmpty(customerSelected) ? (
                    <>
                      <Grid className="name">
                        {language === LANGUAGES.VI ? (
                          <>
                            {customerSelected.lastName}{" "}
                            {customerSelected.firstName}
                          </>
                        ) : (
                          <>
                            {customerSelected.firstName}{" "}
                            {customerSelected.lastName}
                          </>
                        )}
                      </Grid>
                      <Grid className="status">
                        <FormattedMessage id="customer.homepage.chat-real-time.reply-after-min" />
                      </Grid>
                    </>
                  ) : (
                    <Grid className="name">
                      <FormattedMessage id="customer.homepage.chat-real-time.no-customer-need-support" />
                    </Grid>
                  )}
                </Grid>
              </>
            )}
          </Grid>
          <Grid
            className="chat-box-body"
            container
            direction="column"
            justify="flex-end"
          >
            <Grid ref={this.chatRef} className="body-top" id="bottom-chat-box">
              <Grid
                className="message-container"
                container
                alignItems="flex-end"
              >
                {pageChat === PAGE_LOGIN.CUSTOMER && (
                  <Grid className="chat-avatar chope background-image-center-cover"></Grid>
                )}
                {pageChat === PAGE_LOGIN.SYSTEM && !customerSelected ? (
                  ""
                ) : (
                  <Grid
                    className={
                      pageChat === PAGE_LOGIN.CUSTOMER
                        ? "list-message"
                        : "list-message sender"
                    }
                    container
                    direction="column"
                  >
                    <Grid className="message-content-outer multi">
                      <Grid className="message-content">
                        <FormattedMessage id="customer.homepage.chat-real-time.hello" />
                      </Grid>
                    </Grid>
                    <Grid className="message-content-outer multi">
                      <Grid className="message-content">
                        <FormattedMessage id="customer.homepage.chat-real-time.we-can-help-you" />
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Grid>
              {pageChat === PAGE_LOGIN.CUSTOMER ? (
                <>
                  {isExistArrayAndNotEmpty(listMessageCustomer) &&
                    listMessageCustomer.map((item) => {
                      const timeSendMessage = this.handleFormatDate(
                        item.createdAt?.seconds
                      );
                      return (
                        <Grid
                          key={item.id}
                          className="message-container"
                          container
                          alignItems="flex-end"
                        >
                          {item.roleId === USER_ROLE.ADMIN && (
                            <Grid className="chat-avatar chope background-image-center-cover"></Grid>
                          )}
                          {isExistArrayAndNotEmpty(item.message) && (
                            <Grid
                              className={
                                item.roleId === USER_ROLE.CUSTOMER
                                  ? "list-message sender"
                                  : "list-message"
                              }
                              container
                              direction="column"
                            >
                              {item.message.map((messageItem, index) => {
                                return (
                                  <Grid
                                    key={index}
                                    className={
                                      item.message.length === 1
                                        ? "message-content-outer"
                                        : "message-content-outer multi"
                                    }
                                  >
                                    <Grid className="time">
                                      {timeSendMessage}
                                    </Grid>
                                    <Grid className="message-content">
                                      {messageItem}
                                    </Grid>
                                  </Grid>
                                );
                              })}
                            </Grid>
                          )}
                        </Grid>
                      );
                    })}
                </>
              ) : (
                <>
                  {isExistArrayAndNotEmpty(listMessageSystem) &&
                    listMessageSystem.map((item) => {
                      const timeSendMessage = this.handleFormatDate(
                        item.createdAt?.seconds
                      );
                      return (
                        <Grid
                          key={item.id}
                          className="message-container"
                          container
                          alignItems="flex-end"
                        >
                          {item.roleId === USER_ROLE.CUSTOMER && (
                            <Grid
                              className="chat-avatar customer background-image-center-cover"
                              style={
                                customerSelected.avatar
                                  ? {
                                      backgroundImage: `url(${
                                        process.env.REACT_APP_BACKEND_URL +
                                        customerSelected.avatar
                                      })`,
                                    }
                                  : {}
                              }
                            ></Grid>
                          )}
                          {isExistArrayAndNotEmpty(item.message) && (
                            <Grid
                              className={
                                item.roleId === USER_ROLE.ADMIN
                                  ? "list-message sender"
                                  : "list-message"
                              }
                              container
                              direction="column"
                            >
                              {item.message.map((messageItem, index) => {
                                return (
                                  <Grid
                                    key={index}
                                    className={
                                      item.message.length === 1
                                        ? "message-content-outer"
                                        : "message-content-outer multi"
                                    }
                                  >
                                    <Grid className="time">
                                      {timeSendMessage}
                                    </Grid>
                                    <Grid className="message-content system">
                                      {messageItem}
                                    </Grid>
                                  </Grid>
                                );
                              })}
                            </Grid>
                          )}
                        </Grid>
                      );
                    })}
                </>
              )}
            </Grid>
            <Grid className="body-bottom" container alignItems="center">
              <input
                type="text"
                value={newMessage}
                placeholder={inputPlaceholder}
                onChange={(event) => {
                  this.handleChangeInput(event);
                }}
                onKeyDown={(event) => {
                  this.handleKeyDown(event);
                }}
                disabled={
                  pageChat === PAGE_LOGIN.SYSTEM && !customerSelected
                    ? true
                    : false
                }
              />
              <Send
                className={
                  pageChat === PAGE_LOGIN.SYSTEM && !customerSelected
                    ? "send-icon disable"
                    : "send-icon"
                }
                onClick={sendMessage}
              />
            </Grid>
          </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatBoxContent);
