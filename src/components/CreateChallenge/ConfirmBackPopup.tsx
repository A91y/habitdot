import React from 'react';

const ConfirmBackPopup = ({ message, confirmBack, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-[8px] mx-8">
        <p className="text-[16px] mb-4">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded-[8px]"
          >
            Cancel
          </button>
          <button
            onClick={() => confirmBack(true)}
            className="px-4 py-2 bg-[#fec93d] rounded-[8px]"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBackPopup;
