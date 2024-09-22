"use client";
import { usePathname } from "next/navigation";

import React from "react";
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";

const RootlayoutWrapper: React.FC = () => {
  const pathname = usePathname();

  const adminroutes = [
    "/categories",
    "/reservations",
    "/kolinks",
    "/questions",
  ];
  if (!adminroutes.includes(pathname)) {
    return <></>;
  }
  console.log("PathName", pathname);
  return (
    <>
      <Header />
      <Sidebar />
    </>
  );
};

export default RootlayoutWrapper;

// const UserPanel: React.FC = () => {
