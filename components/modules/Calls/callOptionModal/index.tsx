import {
  VChat,
  VPhone,
  VTrash,
  VVideo,
} from "components/modules/_modules/vectors";
import { formateDate } from "lib/helper";
import { TCall } from "lib/types";
import React from "react";

interface IProps {
  call: TCall;
}

const CallOptionsModal = ({ call }: IProps) => {
  return (
    <div className="my-2 gap-5 py-2 border-t">
      <div className="flex justify-around items-center">
        <span>
          <VChat />
        </span>
        <span>
          <VPhone />
        </span>
        <span>
          <VVideo />
        </span>
        <span>
          <VTrash />
        </span>
      </div>
    </div>
  );
};

export default CallOptionsModal;
