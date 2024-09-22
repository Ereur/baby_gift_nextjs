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
      <div className="flex items-center justify-between w-screen  z-50 mt-4 px-16">
        <Navbar />
      </div>
      <div>
        <Productcard
          name="Tapis D'evile"
          note="C est a toi de choisir"
          image="/images/product.png"
        />
      </div>
    </div>
  );
}
