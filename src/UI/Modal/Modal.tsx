import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./style.scss";

interface Props {
  buttonTitle: string;
  modalTitle?: string;
  modalContent: string;
  onConfirm: any;
  isOpen: boolean;
  onCloseModal: any;
}

export const AlertDialog: React.FC<Props> = ({
  buttonTitle,
  modalTitle,
  modalContent,
  onConfirm,
  isOpen,
  onCloseModal,
}: Props) => {
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={() => onCloseModal()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{modalTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText
            className="modal-body"
            id="alert-dialog-description"
          >
            {modalContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onCloseModal()}>Cancel</Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => onConfirm()}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
