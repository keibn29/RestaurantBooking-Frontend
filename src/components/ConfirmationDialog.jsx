import React from "react";
import {
  Dialog,
  Button,
  Grid,
  MenuItem,
  DialogActions,
  DialogTitle,
  DialogContent,
  IconButton,
  Icon,
} from "@material-ui/core";
import "./ConfirmationDialog.scss";

function ConfirmationDialog(props) {
  // const [open, setOpen] = React.useState(false)

  // const handleOpenDialog = () => {
  //     setOpen(true)
  // }

  // const handleCloseDialog = () => {
  //     setOpen(false)
  // }
  const {
    isOpen,
    title,
    text,
    onCancelClick,
    onConfirmClick,
    confirm,
    cancel,
  } = props;

  return (
    <>
      <Dialog open={isOpen} maxWidth="xs" fullWidth={true}>
        <DialogTitle className="dialog-title">{title}</DialogTitle>
        <DialogContent dividers>{text}</DialogContent>
        <DialogActions>
          <Grid className="dialog-action" container>
            <Grid>
              <Button
                className="dialog-button"
                variant="contained"
                color="secondary"
                onClick={() => {
                  onCancelClick();
                }}
              >
                {cancel}
              </Button>
            </Grid>
            <Grid>
              <Button
                className="dialog-button"
                variant="contained"
                color="primary"
                onClick={() => {
                  onConfirmClick();
                }}
              >
                {confirm}
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ConfirmationDialog;
