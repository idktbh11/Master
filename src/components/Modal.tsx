import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: any;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-black rounded-lg border-2 border-white-900 overflow-hidden shadow-xl transform transition-all max-w-lg w-full p-6">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;