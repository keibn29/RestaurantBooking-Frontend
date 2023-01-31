import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
// import "./MaterialTableData.scss";
import * as actions from "../../../store/actions";
import { LANGUAGES, TABLE_ITEMS } from "../../../utils";
import {
  Grid,
  IconButton,
  Icon,
  Button,
  InputAdornment,
  Input,
  TablePagination,
} from "@material-ui/core";
import MaterialTable from "material-table";
import { searchUser } from "../../../services/userService";
import { toast } from "react-toastify";
import MaterialTableAction from "../../../components/MaterialTableAction";

class MaterialTableData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listItem: [],
      pageSize: 10,
      pageIndex: 0,
      totalUser: "",
    };
  }

  componentDidMount() {
    this.updateTableData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let { itemName, listUser, totalUser } = this.props;
    if (itemName === TABLE_ITEMS.USER && prevProps.listUser !== listUser) {
      this.setState({
        listItem: listUser,
        totalUser: totalUser,
      });
    }
  }

  updateTableData = () => {
    let { pageSize } = this.state;
    let pageOrder = this.state.pageIndex + 1;
    this.props.getListItem({
      pageSize,
      pageOrder,
    });
  };

  handleChangePageSize = (event) => {
    this.setState(
      {
        pageSize: event.target.value,
        pageIndex: 0,
      },
      () => {
        this.updateTableData();
      }
    );
  };

  handleChangePageOrder = (event, newPage) => {
    this.setState(
      {
        pageIndex: newPage,
      },
      () => {
        this.updateTableData();
      }
    );
  };

  handleEditUser = (userData) => {
    console.log(userData);
  };

  handleDeleteUser = (userId) => {
    console.log(userId);
  };

  render() {
    let { listItem, pageSize, pageIndex, totalUser } = this.state;
    let { columns } = this.props;

    return (
      <>
        <MaterialTable
          columns={columns}
          data={listItem}
          options={{
            draggable: false,
            toolbar: false,
            search: false,
            paging: false,
            padding: "dense",
            headerStyle: {
              backgroundColor: "#7265EB",
              color: "#fff",
              height: "45px",
              fontSize: "16px",
            },
            rowStyle: {
              fontSize: "15px",
            },
          }}
          localization={{
            body: {
              emptyDataSourceMessage: "Không có bản ghi nào",
            },
          }}
        />
        <TablePagination
          component="div"
          labelRowsPerPage={<div className="text-15">Số hàng mỗi trang</div>}
          labelDisplayedRows={({ from, to, count }) => (
            <div className="text-15">{`${from}-${to} trong ${count}`}</div>
          )}
          SelectProps={{
            style: {
              fontSize: 15,
            },
          }}
          rowsPerPageOptions={[1, 2, 5, 10, 25, 50]}
          count={totalUser}
          rowsPerPage={pageSize}
          page={pageIndex}
          onChangeRowsPerPage={this.handleChangePageSize}
          onChangePage={this.handleChangePageOrder}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listUser: state.user.listUser,
    totalUser: state.user.totalUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MaterialTableData);
