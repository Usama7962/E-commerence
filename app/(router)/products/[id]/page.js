import ProductDetailPage from "@/app/Modules/Shop/detail-products";
import React from "react";

const Page = async ({ params }) => {
  const { id } = await params;
  return <ProductDetailPage productId={id} />;
};

export default Page;
