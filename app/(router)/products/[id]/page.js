import ProductDetailPage from "@/app/Modules/Shop/detail-products";
import React from "react";

const page = ({ params }) => {
  const { id } = params;
  return (
    <>
      <ProductDetailPage productId={id} />
    </>
  );
};

export default page;
