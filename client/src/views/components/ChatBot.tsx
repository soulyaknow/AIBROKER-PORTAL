import React from "react";

function ChatBot() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      <div className="bg-white text-black border border-violet-500 rounded-full px-4 py-2 shadow-lg font-semibold">
        Hi! I am your AI Broker
      </div>
      <img
        src="AI Chat Button  1.svg"
        alt="ai-logo"
        className="w-12 h-12 cursor-pointer"
      />
    </div>
  );
}

export default ChatBot;
