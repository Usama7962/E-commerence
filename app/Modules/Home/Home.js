import Navbar from "@/app/component/Navbar/Navbar";
import React from "react";
import Herosection from "./Herosection.js";
import Footer from "@/app/component/Footer/Footer.js";
import Categories from "./Categories.js";
import FeaturedProducts from "./FeaturedProducts.js";

const Home = () => {
  return (
    <>
      <Navbar />
      <Herosection />
      <Categories />
      <FeaturedProducts />
      <Footer />
    </>
  );
};

export default Home;
