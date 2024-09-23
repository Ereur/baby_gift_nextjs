"use client";
// import { useState } from "react";
// import axiosInstance from "axios";
import Productcard from "@/app/[gifts_website]/components/Productcard";
// import { Category } from "@/app/[gifts_website]/types";
import Navbar from "@/app/[gifts_website]/components/Navbar";
// import QuestionModal from "./components/QuestionModal";
export default function Page({
  params,
}: {
  params: { gifts_website: string };
}) {
  // const user = params.gifts_website;
  // const [isOpen, setIsOpen] = useState(false);
  console.log(params);
  return (
    <div className="bg-[#FBF4EB] w-full h-full ">
      <div className="flex items-center justify-between w-screen  z-10 mt-4 px-16">
        <Navbar />
      </div>
      <div className="relative flex w-full flex-col justify-center mt-24 gap-8 items-center ">
        <img
          src="/images/assets.svg"
          alt=""
          className="absolute top-0 right-0 transform translate-x-[-100px] translate-y-[-80px] "
        />

        <div>
          <h1 className="text-4xl font-bold font-Chelsea text-accentOrange">
            Éveil
          </h1>
        </div>
        <div className="flex px-8 gap-4">
          <Productcard
            name="Tapis D'evile"
            note="C est a toi de choisir"
            image="/images/product.png"
          />
          <Productcard
            name="Tapis D'evile"
            note="C est a toi de choisir"
            image="/images/product.png"
          />
          <Productcard
            name="Tapis D'evile"
            note="C est a toi de choisir"
            image="/images/product.png"
          />
        </div>
      </div>

      <div className="relative flex w-full flex-col justify-center mt-24 gap-8 items-center ">
        <img
          src="/images/assets.svg"
          alt=""
          className="absolute top-0 left-0  transform scale-x-[-1] transform translate-x-[100px] translate-y-[-80px]"
        />
        <div>
          <h1 className="text-4xl font-bold font-Chelsea text-accentOrange">
            Soins
          </h1>
        </div>
        <div className="flex px-8 gap-4">
          <Productcard
            name="Tapis D'evile"
            note="C est a toi de choisir"
            image="/images/product.png"
          />
          <Productcard
            name="Tapis D'evile"
            note="C est a toi de choisir"
            image="/images/product.png"
          />
          <Productcard
            name="Tapis D'evile"
            note="C est a toi de choisir"
            image="/images/product.png"
          />
        </div>
      </div>

      <div className="relative flex w-full flex-col justify-center mt-24 gap-8 items-center ">
        <img
          src="/images/assets.svg"
          alt=""
          className="absolute top-0 right-0 transform translate-x-[-100px] translate-y-[-80px] "
        />

        <div>
          <h1 className="text-4xl font-bold font-Chelsea text-accentOrange">
            Vêtements
          </h1>
        </div>
        <div className="flex px-8 gap-4">
          <Productcard
            name="Tapis D'evile"
            note="C est a toi de choisir"
            image="/images/product.png"
          />
          <Productcard
            name="Tapis D'evile"
            note="C est a toi de choisir"
            image="/images/product.png"
          />
          <Productcard
            name="Tapis D'evile"
            note="C est a toi de choisir"
            image="/images/product.png"
          />
        </div>
      </div>
    </div>
  );
}
