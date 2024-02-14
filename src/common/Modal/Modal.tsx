import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import "./style.scss";

interface Props {
  modalTitle?: string;
  isOpen: boolean;
  isDisabled?: boolean;
  children: any;
  onApprove?: Function;
  onClose?: Function;
}

export const AlertDialog: React.FC<Props> = ({
  children,
  modalTitle,
  isOpen,
  onClose,
  onApprove,
  isDisabled,
}: Props) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => onClose?.()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="alert-dialog-modal"
    >
      <DialogContent>
        <DialogContentText
          className="modal-confirm-body"
          id="alert-dialog-description"
        >
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose?.()}>Cancel</Button>
        <Button
          variant="contained"
          className="btn"
          onClick={() => onApprove?.()}
          autoFocus
          disabled={isDisabled}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
