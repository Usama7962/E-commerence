import React from 'react'
import { FaWhatsapp } from 'react-icons/fa';

const WhatsappBtn = () => {
  return (
    <div>
       <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const message = `Hi! I'm interested in this product:\n\nProduct: ${product.name}\nPrice: $${product.price}\nDescription: ${product.description}\n\nI'd like to know more about it.`;
                      const whatsappUrl = `https://wa.me/923156396901?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                    className="text-green-600 hover:text-green-700 transition-colors"
                  >
                    <FaWhatsapp className="w-7 h-7" />        
                  </button>
    </div>
  )
}

export default WhatsappBtn
