import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import React from "react";

const EndCallDialog = ({ open, setOpen }) => {
  return (
    <Dialog size="sm" open={open} className="bg-[#161929]">
      <DialogHeader className="text-xl text-onprimary">
        Do you want to end this call?
      </DialogHeader>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={() => setOpen(false)}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="blue" onClick={() => window.close()}>
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default EndCallDialog;
