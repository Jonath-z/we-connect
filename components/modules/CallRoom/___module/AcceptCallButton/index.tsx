import { VPhone } from "components/modules/_modules/vectors";
import React from "react";

interface IProps {
  onClick: () => void;
}

const AcceptCallButton = ({ onClick }: IProps) => {
  return (
    <button
      onClick={onClick}
      className={"bg-green-600 text-light p-5 rounded-full transition-all"}
    >
      <VPhone />
    </button>
  );
};

export default AcceptCallButton;
