import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import {
  TABLE_ITEM_NAME,
  emitter,
  EMITTER_EVENTS,
  TABLE_SIZE_PAGINATION,
} from "../../../utils";
import { TablePagination } from "@material-ui/core";
import MaterialTable from "material-table";

class MaterialTableData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listItem: [],
      pageSize: TABLE_SIZE_PAGINATION,
      pageIndex: 0,
      totalItem: 0,
    };

    this.listenEmitterEvent();
  }

  listenEmitterEvent = () => {
    emitter.on(EMITTER_EVENTS.UPDATE_TABLE_DATA, () => {
      this.updateTableData();
    });
    emitter.on(EMITTER_EVENTS.FETCH_LIST_DISH_BY_RESTAURANT, () => {
      this.updateTableData();
    });
  };

  componentDidMount() {
    if (this.props.itemName !== TABLE_ITEM_NAME.DISH) {
      this.updateTableData();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      itemName,
      listUser,
      totalUser,
      listRestaurant,
      totalRestaurant,
      listDish,
      totalDish,
      listHandbook,
      totalHandbook,
    } = this.props;
    if (itemName === TABLE_ITEM_NAME.USER && prevProps.listUser !== listUser) {
      this.setState({
        listItem: listUser,
        totalItem: totalUser,
      });
    }
    if (
      itemName === TABLE_ITEM_NAME.RESTAURANT &&
      prevProps.listRestaurant !== listRestaurant
    ) {
      this.setState({
        listItem: listRestaurant,
        totalItem: totalRestaurant,
      });
    }
    if (itemName === TABLE_ITEM_NAME.DISH && prevProps.listDish !== listDish) {
      this.setState({
        listItem: listDish,
        totalItem: totalDish,
      });
    }
    if (
      itemName === TABLE_ITEM_NAME.HANDBOOK &&
      prevProps.listHandbook !== listHandbook
    ) {
      this.setState({
        listItem: listHandbook,
        totalItem: totalHandbook,
      });
    }
    if (prevProps.language !== this.props.language) {
      this.updateTableData();
    }
  }

  updateTableData = () => {
    const { pageSize, pageIndex } = this.state;
    this.props.getListItem({
      pageSize,
      pageOrder: pageIndex + 1,
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

  handleChangePageIndex = (event, newPage) => {
    this.setState(
      {
        pageIndex: newPage,
      },
      () => {
        this.updateTableData();
      }
    );
  };

  render() {
    const { listItem, pageSize, pageIndex, totalItem } = this.state;
    const { columns, localization } = this.props;
    let columnsFromParent = columns.map((item) => {
      return { ...item };
    });
    console.log("listItem", listItem);

    return (
      <>
        <MaterialTable
          columns={columnsFromParent}
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
            rowStyle: (rowData, index) => ({
              fontSize: "15px",
              backgroundColor: index % 2 === 1 ? "#eee" : "#fff",
            }),
          }}
          localization={{
            body: {
              emptyDataSourceMessage: localization || "Không có bản ghi nào",
            },
          }}
        />
        <TablePagination
          component="div"
          labelRowsPerPage={
            <span className="text-15">
              <FormattedMessage id="system.admin.row-per-page" />
            </span>
          }
          labelDisplayedRows={({ from, to, count }) => (
            <span className="text-15">
              {from}-{to} <FormattedMessage id="system.admin.in" /> {count}
            </span>
          )}
          SelectProps={{
            style: {
              fontSize: 15,
            },
          }}
          rowsPerPageOptions={[1, 2, 5, 10, 25, 50]}
          count={totalItem}
          rowsPerPage={pageSize}
          page={pageIndex}
          onChangeRowsPerPage={this.handleChangePageSize}
          onChangePage={this.handleChangePageIndex}
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
    listRestaurant: state.restaurant.listRestaurant,
    totalRestaurant: state.restaurant.totalRestaurant,
    listDish: state.dish.listDish,
    totalDish: state.dish.totalDish,
    listHandbook: state.handbook.listHandbook,
    totalHandbook: state.handbook.totalHandbook,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MaterialTableData);
