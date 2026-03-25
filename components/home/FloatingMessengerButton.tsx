import { MessageSquare, X } from "lucide-react";
import { useState } from "react";
import GreenBot from "./GreenBot";

const FloatingMessengerButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[9999] bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-xl border-4 border-white w-16 h-16 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-[1.15] active:scale-100"
      >
        <MessageSquare className="w-7 h-7" />
      </button>

      {/* Popup */}
      {isOpen && (
        <div className="fixed bottom-28 right-6 w-[400px] max-h-[600px] bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-emerald-200 z-[9999] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex-center">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">GreenBot Assistant</h2>
                <p className="text-emerald-100 opacity-90">Your eco-guide</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-xl transition-all ml-auto"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Bot */}
          <div className="p-4 h-[500px]">
            <GreenBot />
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingMessengerButton;

