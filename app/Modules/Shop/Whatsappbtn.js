import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsappBtn = ({ name, price, description }) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();

        // WhatsApp safe message
        const message = `Hi! I'm interested in this product:%0A%0AProduct: ${name}%0APrice: $${price}%0ADescription: ${description}%0A%0AI'd like to know more about it.`;

        const whatsappUrl = `https://wa.me/923156396901?text=${message}`;
        console.log(message)
        window.open(whatsappUrl, "_blank");
      }}
      className="text-green-600 hover:text-green-700 transition-colors"
    >
      <FaWhatsapp className="w-7 h-7" />
    </button>
  );
};

export default WhatsappBtn;

