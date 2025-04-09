import { MessageSquare } from 'lucide-react';

const FloatingMessengerButton = () => {
  return (
    <a
      href="https://greenbot-iota.vercel.app/" // Replace with your actual link
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all"
    >
      <MessageSquare className="w-5 h-5" />
    </a>
  );
};

export default FloatingMessengerButton;
