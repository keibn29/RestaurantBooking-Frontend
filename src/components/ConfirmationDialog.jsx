import React from "react";
import { Dialog, Button, Grid } from "@mui/material";
import "./ConfirmationDialog.scss";

function ConfirmationDialog(props) {
  const {
    isOpen,
    title,
    text,
    onCancelClick,
    onConfirmClick,
    confirm,
    cancel,
    color,
  } = props;

  return (
    <>
      <Dialog open={isOpen} maxWidth="xs" fullWidth={true}>
        <Grid className="confirmation-dialog-container">
          <Grid className="confirmation-dialog-header">{title}</Grid>
          <Grid className="confirmation-dialog-body">{text}</Grid>
          <Grid
            className="confirmation-dialog-footer"
            container
            justifyContent="flex-end"
          >
            <Grid>
              <Button
                className="dialog-button"
                variant="contained"
                color="secondary"
                onClick={onCancelClick}
              >
                {cancel}
              </Button>
            </Grid>
            <Grid>
              <Button
                className="dialog-button"
                variant="contained"
                color={color || "primary"}
                onClick={onConfirmClick}
              >
                {confirm}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}

export default ConfirmationDialog;
