import { VPhone } from "components/modules/_modules/vectors";
import React from "react";

interface IProps {
  onClick: () => void;
}

const RejectCallButton = ({ onClick }: IProps) => {
  return (
    <button
      onClick={onClick}
      className={"bg-red-600 text-light p-5 rounded-full transition-all"}
    >
      <VPhone />
    </button>
  );
};

export default RejectCallButton;
