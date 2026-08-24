"use client";
import { FaWhatsapp } from "react-icons/fa";

const WhatsappFloat = () => {
  const handleClick = () => {
    const message = encodeURIComponent(
      "Hi! I'm interested in your herbal products. Can you help me?"
    );
    window.open(`https://wa.me/923156396901?text=${message}`, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={28} />
    </button>
  );
};

export default WhatsappFloat;
