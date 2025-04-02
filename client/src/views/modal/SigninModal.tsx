import React from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function Modal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="relative z-50 w-full">
        <div
          className="w-full max-w-[600px] min-h-[400px] sm:min-h-[350px] md:min-h-[420px] mx-auto  relative border-2 border-violet-500/50 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
          id="modal-bg"
        >
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 p-2 cursor-pointer bg-white rounded-full shadow-lg text-gray-400 hover:text-gray-500 focus:outline-none transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex flex-col h-full justify-between">
            <div className="flex items-center justify-center p-4 sm:p-6 md:p-8">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white text-center">
                Welcome, John Smith!
              </h2>
            </div>
            <div className="flex flex-col items-center justify-center px-6 sm:px-8 md:px-12 py-4 sm:py-6 flex-1">
              <p className="text-white text-xl  text-center max-w-md">
                Your AI Broker platform is ready to help you make smarter
                decisions, manage client portfolios with ease, and stay ahead of
                market trends.
              </p>
              <span className="text-white text-xl mt-6">
                — Your AI Broker Team.
              </span>
            </div>
            <div className="flex justify-center p-4 sm:p-6 md:p-8">
              <button
                onClick={onClose}
                className="w-full max-w-md px-8 sm:px-12 py-2 sm:py-2 bg-black hover:bg-stone-100 hover:text-black transition delay-150 duration-300 ease-in-out text-white text-base sm:text-lg font-medium rounded-3xl cursor-pointer border-2 border-violet-500/50 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
              >
                Let's Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
