import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/5562982330667"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300"
      aria-label="WhatsApp"
    >
      <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
    </a>
  );
};

export default WhatsAppButton;
