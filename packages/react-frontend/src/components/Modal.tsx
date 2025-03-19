import React, { useRef, ReactNode, MouseEvent, JSX } from "react";

// Define the props for Modal
interface ModalProps {
  isOpen: boolean;
  onCloseRequested: () => void;
  headerLabel: string;
  children: ReactNode;
}

function Modal({ isOpen, onCloseRequested, headerLabel, children }: ModalProps): JSX.Element | null {
  // Reference for the modal container; using HTMLDivElement
  const modalRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null; // Don't render if modal is closed

  // Handle clicks on the overlay. If the click target is not inside the modal, close the modal.
  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>): void => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onCloseRequested(); // Close modal if clicked outside
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-transparent backdrop-blur-lg"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="p-6 rounded-lg shadow-lg w-[90%] sm:w-[60%] md:w-[40%] lg:w-[30%] max-w-lg 
                   bg-white dark:bg-gray-900 dark:text-white bg-opacity-50 backdrop-blur-lg border border-gray-300"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold">{headerLabel}</h2>
          <button
            onClick={onCloseRequested}
            aria-label="Close"
            className="text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>
        </div>

        {/* Modal Content */}
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

export default Modal;