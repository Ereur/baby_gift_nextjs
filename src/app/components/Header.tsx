"use client";
import React, { useState, useEffect } from "react";
import supabase from "@/utils/supabaseClient";
import { useRouter } from "next/navigation";
// import Button from "@/app/components/Button";
const Header: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
        router.push("/login"); // Redirect to login if no user is found
      } else {
        setUser(data.user.email || null);
      }
    };

    fetchUser();
  }, [router]);

  //   if (!user) {
  //     return <div>Loading...</div>;
  //   }
  return (
    <div className="absolute  w-5/6 flex justify-between right-0 p-4   h-[70px] bg-[#FFF2EE]">
      {/* <input
        type="text"
        placeholder="Search for Product"
        className="w-1/5 p-2 border border-gray-300 rounded-lg"
      /> */}
      <button
        className="flex px-6 py-4 bg-[#FF9689] text-white rounded-full font-bold items-center justify-center "
        onClick={() => {
          router.push("/Anas");
        }}
      >
        Aperçu en direct
      </button>
      <div className="flex items-center space-x-4">
        <span className="text-ms font-bold text-accentOrange">{user}</span>
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="User"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
  );
};

export default Header;
