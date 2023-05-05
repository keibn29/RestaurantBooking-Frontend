import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./CustomerSupport.scss";
import {
  LANGUAGES,
  isExistArrayAndNotEmpty,
  USER_ROLE,
  PAGE_LOGIN,
  FIRESTORE_COLLECTION_NAME,
} from "../../../utils";
import { Grid, Container } from "@material-ui/core";
import ChatBoxContent from "../../../components/ChatBoxContent";
import firebase, { db } from "../../../firebase/config";
import {
  addDocument,
  updateDocumentWithDocumentId,
} from "../../../firebase/service";
import { format, formatDistanceStrict } from "date-fns";
import { enUS, vi } from "date-fns/locale";

class CustomerSupport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCustomerSupport: [],
      customerSelected: "",
      listMessage: [],
      newMessage: "",
    };
  }

  componentDidMount() {
    this.getListCustomerSupportFirestore();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  getListCustomerSupportFirestore = () => {
    db.collection(FIRESTORE_COLLECTION_NAME.CUSTOMER)
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
        }));

        this.setState({
          listCustomerSupport: data,
        });

        if (!this.state.customerSelected && isExistArrayAndNotEmpty(data)) {
          this.setState(
            {
              customerSelected: data[0],
            },
            () => {
              this.getMessageInRoomChatByCustomer();
            }
          );
        }
      });
  };

  handleChangeCustomerSelected = (customer) => {
    this.setState(
      {
        customerSelected: customer,
      },
      () => {
        this.updateCustomerDocument("isSeen");
        this.getMessageInRoomChatByCustomer();
      }
    );
  };

  getMessageInRoomChatByCustomer = () => {
    const { customerSelected } = this.state;
    db.collection(FIRESTORE_COLLECTION_NAME.MESSAGES)
      .orderBy("createdAt")
      .where("customerId", "==", customerSelected.id)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        this.updateCustomerDocument("isSeen");
        this.mergeConsecutiveMessageSameRole(data);
      });
  };

  mergeConsecutiveMessageSameRole = (listMessage) => {
    const newListMessage = listMessage.reduce((acc, curr) => {
      const lastAcc = acc[acc.length - 1];
      if (lastAcc && lastAcc.roleId === curr.roleId) {
        let obj = {
          ...curr,
          message: [...lastAcc.message, curr.message],
        };
        acc.push(obj);
        acc.splice(acc.indexOf(lastAcc), 1);
      } else {
        let obj = {
          ...curr,
          message: [curr.message],
        };
        acc.push(obj);
      }

      return acc;
    }, []);

    this.setState({
      listMessage: newListMessage,
    });
  };

  handleChangeMessage = (newMessage) => {
    this.setState({
      newMessage: newMessage,
    });
  };

  handleSendMessage = () => {
    const { customerSelected } = this.state;
    if (customerSelected) {
      this.updateCustomerDocument("newMessage");
      this.addNewMessageDocument();
    }
  };

  updateCustomerDocument = (filed) => {
    const { newMessage } = this.state;
    const { customerSelected } = this.state;

    let dataUpdate = {};
    if (filed === "newMessage") {
      dataUpdate = {
        newMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };
    } else {
      dataUpdate = {
        isSeen: true,
      };
    }

    updateDocumentWithDocumentId(
      FIRESTORE_COLLECTION_NAME.CUSTOMER,
      customerSelected.id,
      dataUpdate
    );
  };

  addNewMessageDocument = () => {
    const { customerSelected } = this.state;
    const { newMessage } = this.state;
    let data = {
      message: newMessage,
      roleId: USER_ROLE.ADMIN,
      customerId: customerSelected.id,
    };
    addDocument(FIRESTORE_COLLECTION_NAME.MESSAGES, data);
    this.clearMessageInput();
  };

  clearMessageInput = () => {
    this.setState({
      newMessage: "",
    });
  };

  handleFormatDate = (seconds) => {
    const { language } = this.props;
    if (!seconds) {
      return "";
    }

    const date = new Date(seconds * 1000);
    const timeDistanceVi =
      formatDistanceStrict(date, new Date(), { locale: vi }) + " trước";
    const timeDistanceEn =
      formatDistanceStrict(date, new Date(), { locale: enUS }) + " ago";

    const timeDistance =
      language === LANGUAGES.VI ? timeDistanceVi : timeDistanceEn;

    return timeDistance;
  };

  render() {
    const { language } = this.props;
    const { customerSelected, listCustomerSupport, listMessage, newMessage } =
      this.state;

    return (
      <>
        <Container className="mt-3">
          <Grid className="title mb-3">
            <FormattedMessage id="system.header.customer-support" />
          </Grid>
          <Grid className="system-chat-box-container" container>
            <Grid item xs={4} className="chat-box-content-left">
              <Grid className="content-left-header">
                <FormattedMessage id="system.admin.list-customer" />
              </Grid>
              <Grid className="list-customer">
                {isExistArrayAndNotEmpty(listCustomerSupport) &&
                  listCustomerSupport.map((item) => {
                    const timeDistance = this.handleFormatDate(
                      item.createdAt?.seconds
                    );
                    return (
                      <Grid
                        className={
                          item.id === customerSelected.id
                            ? "customer-content customer-selected"
                            : "customer-content"
                        }
                        container
                        alignItems="center"
                        onClick={() => {
                          this.handleChangeCustomerSelected(item);
                        }}
                      >
                        <Grid
                          item
                          className="customer-content-avatar background-image-center-cover"
                          style={
                            item.avatar
                              ? {
                                  backgroundImage: `url(${
                                    process.env.REACT_APP_BACKEND_URL +
                                    item.avatar
                                  })`,
                                }
                              : {}
                          }
                        ></Grid>
                        <Grid item xs={7} className="customer-content-text">
                          <Grid
                            className={
                              !item.isSeen
                                ? "customer-name no-seen"
                                : "customer-name"
                            }
                          >
                            {language === LANGUAGES.VI ? (
                              <>
                                {item.lastName} {item.firstName}
                              </>
                            ) : (
                              <>
                                {item.firstName} {item.lastName}
                              </>
                            )}
                          </Grid>
                          <Grid
                            className={
                              !item.isSeen
                                ? "customer-message-demo no-seen"
                                : "customer-message-demo"
                            }
                          >
                            {item.newMessage}
                          </Grid>
                        </Grid>
                        <Grid
                          className={
                            !item.isSeen
                              ? "time-distance no-seen"
                              : "time-distance"
                          }
                        >
                          {timeDistance}
                        </Grid>
                      </Grid>
                    );
                  })}
              </Grid>
            </Grid>
            <Grid item xs={8} className="chat-box-content-right">
              <ChatBoxContent
                listMessageSystem={listMessage}
                pageChat={PAGE_LOGIN.SYSTEM}
                customerSelected={customerSelected}
                newMessage={newMessage}
                handleChangeMessage={this.handleChangeMessage}
                sendMessage={this.handleSendMessage}
                inputPlaceholder={
                  language === LANGUAGES.VI
                    ? "Trả lời thắc mắc"
                    : "Answer questions"
                }
              />
            </Grid>
          </Grid>
        </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSupport);
