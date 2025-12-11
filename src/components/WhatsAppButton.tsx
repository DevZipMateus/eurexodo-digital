import { Instagram } from "lucide-react";
import whatsappIcon from "@/assets/whatsapp-icon.png";

const WhatsAppButton = () => {
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col gap-3">
      <a
        href="https://www.instagram.com/exodo.gestaocontabil"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300"
        aria-label="Instagram"
      >
        <Instagram className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
      </a>
      <a
        href="https://wa.me/5562982330667"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300"
        aria-label="WhatsApp"
      >
        <img src={whatsappIcon} alt="WhatsApp" className="w-full h-full" />
      </a>
    </div>
  );
};

export default WhatsAppButton;
