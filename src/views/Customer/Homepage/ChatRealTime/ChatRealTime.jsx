import React, { Component } from "react";
import { connect } from "react-redux";
import "./ChatRealTime.scss";
import { Grid } from "@material-ui/core";
import {
  FIRESTORE_COLLECTION_NAME,
  LANGUAGES,
  PAGE_LOGIN,
  USER_ROLE,
} from "../../../../utils";
import ChatBoxContent from "../../../../components/ChatBoxContent";
import {
  addDocument,
  addDocumentWithDocumentId,
  isExistDocument,
  updateDocumentWithDocumentId,
} from "../../../../firebase/service";
import { toast } from "react-toastify";
import CustomerLogin from "../../Auth/CustomerLogin";
import firebase, { db } from "../../../../firebase/config";

class ChatRealTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenChatBoxContent: false,
      isOpenCustomerLoginDialog: false,
      newMessage: "",
      listMessage: [],
    };
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    if (this.props.customerInfo) {
      this.getMessageInRoomChatByCustomer();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.isOpenCustomerLoginDialog !==
      this.props.isOpenCustomerLoginDialog
    ) {
      this.setState({
        isOpenCustomerLoginDialog: false,
      });
    }
    if (prevProps.customerInfo !== this.props.customerInfo) {
      this.getMessageInRoomChatByCustomer();
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleChangeMessage = (newMessage) => {
    this.setState({
      newMessage: newMessage,
    });
  };

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState({
        isOpenChatBoxContent: false,
      });
    }
  }

  handleOpenCloseChatBoxContent = () => {
    const { customerInfo } = this.props;
    if (!customerInfo) {
      toast.info("Vui lòng đăng nhập để chat");
      this.setState({
        isOpenCustomerLoginDialog: true,
      });
    } else {
      this.setState({
        isOpenChatBoxContent: !this.state.isOpenChatBoxContent,
      });
    }
  };

  handleCloseChatBoxContent = () => {
    this.setState({
      isOpenChatBoxContent: false,
    });
  };

  handleCloseCustomerLoginDialog = () => {
    this.setState({
      isOpenCustomerLoginDialog: false,
    });
  };

  handleSendMessage = async () => {
    const { customerInfo } = this.props;

    const isExistCustomer = await isExistDocument(
      FIRESTORE_COLLECTION_NAME.CUSTOMER,
      customerInfo.id
    );
    if (!isExistCustomer) {
      this.addNewCustomerDocument();
    } else {
      this.updateCustomerDocument();
    }

    this.addNewMessageDocument();
  };

  addNewCustomerDocument = () => {
    const { customerInfo } = this.props;
    const { newMessage } = this.state;
    let data = {
      ...customerInfo,
      newMessage,
      isSeen: false,
    };
    addDocumentWithDocumentId(
      FIRESTORE_COLLECTION_NAME.CUSTOMER,
      customerInfo.id,
      data
    );
  };

  updateCustomerDocument = () => {
    const { customerInfo } = this.props;
    const { newMessage } = this.state;
    let dataUpdate = {
      newMessage,
      isSeen: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    updateDocumentWithDocumentId(
      FIRESTORE_COLLECTION_NAME.CUSTOMER,
      customerInfo.id,
      dataUpdate
    );
  };

  addNewMessageDocument = () => {
    const { customerInfo } = this.props;
    const { newMessage } = this.state;
    let data = {
      message: newMessage,
      roleId: USER_ROLE.CUSTOMER,
      customerId: customerInfo.id,
    };
    addDocument(FIRESTORE_COLLECTION_NAME.MESSAGES, data);
    this.clearMessageInput();
  };

  clearMessageInput = () => {
    this.setState({
      newMessage: "",
    });
  };

  getMessageInRoomChatByCustomer = () => {
    const { customerInfo } = this.props;
    let dataRef = db
      .collection(FIRESTORE_COLLECTION_NAME.MESSAGES)
      .orderBy("createdAt");

    if (customerInfo.id) {
      dataRef = dataRef.where("customerId", "==", customerInfo.id);
    }

    dataRef.onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
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

  render() {
    const { language } = this.props;
    const {
      isOpenChatBoxContent,
      isOpenCustomerLoginDialog,
      newMessage,
      listMessage,
    } = this.state;

    return (
      <Grid ref={this.wrapperRef} className="chat-real-time-container">
        <Grid
          className="chat-box-icon background-image-center-cover"
          onClick={() => {
            this.handleOpenCloseChatBoxContent();
          }}
        ></Grid>
        {isOpenChatBoxContent && (
          <ChatBoxContent
            listMessageCustomer={listMessage}
            closeChatBox={this.handleCloseChatBoxContent}
            pageChat={PAGE_LOGIN.CUSTOMER}
            newMessage={newMessage}
            handleChangeMessage={this.handleChangeMessage}
            sendMessage={this.handleSendMessage}
            inputPlaceholder={
              language === LANGUAGES.VI
                ? "Bạn muốn hỏi gì?"
                : "What do you want to ask?"
            }
          />
        )}
        {isOpenCustomerLoginDialog && (
          <CustomerLogin
            isOpen={isOpenCustomerLoginDialog}
            handleCloseDialog={this.handleCloseCustomerLoginDialog}
          />
        )}
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    customerInfo: state.user.customerInfo,
    isOpenCustomerLoginDialog: state.user.isOpenCustomerLoginDialog,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRealTime);
