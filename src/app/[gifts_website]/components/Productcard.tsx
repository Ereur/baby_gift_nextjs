// import { useState } from "react";
import React from "react";

interface ProductCardProps {
  name: string;
  note: string;
  image: string;
}

const Productcard: React.FC<ProductCardProps> = ({ name, note, image }) => {
  console.log(name, note, image);
  return (
    // <>
    <div className="relative bg-white border border-[1px] border-[#FF6F61] w-[250px] rounded-lg oveflow-hiden gap-2">
      <div className="absolute inset-0 w-full flex justify-end p-4">
        <img src="/images/report.svg" alt="" className="h-8 w-8" />
      </div>
      <div className="w-full">
        <img src="/images/product.png" alt="" className="p-8" />
      </div>

      <div className="flex flex-col">
        <h1 className="text-black font-bold">Tapis d&apos;eveil</h1>
        <p className="text-black font-regular">C&apos;est à toi de choisir</p>
      </div>
      <div className="flex mb-4  w-full justify-center gap-2">
        <button className="text-white font-bold px-8 py-2 bg-[#FF9689] rounded-xl">
          Réserve
        </button>
        <button className="text-[#FF9689] ">
          <img src="/images/extern.svg" alt="" className="" />
        </button>
      </div>
    </div>
  );
};

export default Productcard;
