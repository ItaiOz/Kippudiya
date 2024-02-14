import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
  errorMessage: string;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const ErrorModal: React.FC<Props> = ({
  isOpen,
  onCloseModal,
  errorMessage,
}: Props) => {
  return (
    <div>
      <Modal open={isOpen} onClose={() => onCloseModal()}>
        <Box sx={style}>
          <div className="error-modal">
            {errorMessage}
            <Button
              variant="contained"
              className="btn"
              onClick={() => onCloseModal()}
            >
              Ok
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
