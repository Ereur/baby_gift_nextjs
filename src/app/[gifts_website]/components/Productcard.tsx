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
      <img
        src="/images/report.svg"
        alt=""
        className="absolute right-0 top-0 h-4 w-4 m-2"
      />
      <div className="w-full overflow-hiden">
        <img src="/images/product.png" alt="" className="p-2" />
      </div>

      <div className="px-2 flex flex-col mb-2">
        <h1 className="text-black font-bold">Tapis d&apos;eveil</h1>
        <div className=" flex gap-2 items-center">
          <img src="/images/Note.svg" alt="" className="h-4" />
          <p className="text-black font-regular">C&apos;est à toi de choisir</p>
        </div>
      </div>
      <div className="flex mb-4  w-full justify-center gap-2 px-4">
        <button className="text-white font-bold px-8 w-full py-[1px] bg-[#FF9689] rounded-xl">
          Réserve
        </button>

        <button className="text-[#FF9689] ">
          <img src="/images/extern.svg" alt="" className="h-10" />
        </button>
      </div>
    </div>
  );
};

export default Productcard;
