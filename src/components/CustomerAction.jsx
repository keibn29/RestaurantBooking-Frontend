import React from "react";
import { IconButton, Icon, Button } from "@material-ui/core";
import { CUSTOMER_ACTIONS, LIST_STATUS } from "../utils";

function CustomerAction(props) {
  const item = props.item;
  return (
    <>
      <Button
        onClick={() => props.onSelect(item, CUSTOMER_ACTIONS.DETAIL)}
        style={{
          backgroundColor: "#007AFE",
          color: "white",
          border: "none",
          fontSize: "13px",
        }}
      >
        Chi tiết
      </Button>
      {item.statusId !== LIST_STATUS.DONE && (
        <>
          {item.statusId === LIST_STATUS.VERIFIED ? (
            <Button
              className="mx-2"
              onClick={() => props.onSelect(item, CUSTOMER_ACTIONS.CONFIRM)}
              style={{
                backgroundColor: "#28A745",
                color: "white",
                border: "none",
                fontSize: "13px",
                width: "100px",
              }}
            >
              Xác nhận
            </Button>
          ) : (
            <Button
              className="mx-2"
              onClick={() => props.onSelect(item, CUSTOMER_ACTIONS.DONE)}
              style={{
                backgroundColor: "#28A745",
                color: "white",
                border: "none",
                fontSize: "13px",
                width: "100px",
              }}
            >
              Hoàn thành
            </Button>
          )}
          <Button
            onClick={() => props.onSelect(item, CUSTOMER_ACTIONS.CANCEL)}
            style={{
              backgroundColor: "#DC3444",
              color: "white",
              border: "none",
              fontSize: "13px",
            }}
          >
            Hủy
          </Button>
        </>
      )}
    </>
  );
}

export default CustomerAction;
