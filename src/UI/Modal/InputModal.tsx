import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useRef, useState } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 200,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
  onInputInserted: (name: string) => void;
}

export const InputModal: React.FC<Props> = ({
  isOpen,
  onCloseModal,
  onInputInserted,
}: Props) => {
  const [isError, setIsError] = useState(false);

  const inputRef: any = useRef(null);

  const onBtnClicked = () => {
    if (inputRef.current.value.trim().length === 0) {
      setIsError(true);
      return;
    }
    onInputInserted(inputRef.current.value);
  };

  return (
    <div>
      <Modal open={isOpen} onClose={() => onCloseModal()}>
        <Box sx={style}>
          <div className="input-modal">
            <input
              className={isError ? "error" : ""}
              placeholder="Enter mekaped name"
              ref={inputRef}
            />
            <Button
              variant="contained"
              className="btn"
              onClick={onBtnClicked}
              autoFocus
            >
              Confirm
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
