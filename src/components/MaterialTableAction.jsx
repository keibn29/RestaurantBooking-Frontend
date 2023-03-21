import React from "react";
import { IconButton, Icon } from "@material-ui/core";
import { CRUD_ACTIONS } from "../utils";

function MaterialTableAction(props) {
  const item = props.item;
  return (
    <>
      <IconButton
        size="small"
        style={{ padding: "5px" }}
        onClick={() => props.onSelect(item, CRUD_ACTIONS.EDIT)}
      >
        <Icon fontSize="small" color="primary">
          edit
        </Icon>
      </IconButton>
      <IconButton
        size="small"
        style={{ padding: "5px", marginLeft: "3px" }}
        onClick={() => props.onSelect(item, CRUD_ACTIONS.DELETE)}
      >
        <Icon fontSize="small" color="error">
          delete
        </Icon>
      </IconButton>
    </>
  );
}

export default MaterialTableAction;
