import { Trash2 } from "lucide-react";
import React from "react";

const ConformModal = ({ setOpen, handleConfirm }) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed hover:cursor-default inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md"
    >
      <div
        onClick={() => setOpen(false)}
        className="bg-[#181818] border border-zinc-800 clear-start px-4 py-4 md:w-[380px] w-[350px]  rounded-lg shadow-lg flex flex-col items-center relative"
      >
        <div>
          <Trash2 className="text-red-500" />
        </div>
        <div className="mt-4">Do you really want to delete the question?</div>
        <div className="flex items-center justify-between w-full mt-6">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 border rounded-md"
          >
            Cancle
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 border border-[#be123c] bg-[#e11d48] rounded-md"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConformModal;
