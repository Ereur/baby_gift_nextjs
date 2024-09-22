// components/SidebarLink.tsx
"use client";
import React from "react";
// import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface SidebarLinkProps {
  text: string;
  href: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ text, href }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`text-lg flex items-center  space-x-2 cursor-pointer ${
        isActive
          ? "text-[#FF5E4D] bg-[#FFC7B6] rounded-lg justify-center"
          : "text-[#FF8572] hover:text-[#FF5E4D]"
      }`}
    >
      {/* <span className="bg-[#FF8572] w-8 h-8 rounded-md flex items-center justify-center">
        📦
      </span> */}
      <span>{text}</span>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  //   const router = useRouter();
  //   const isActive = router.pathname === href;

  return (
    <aside className="w-1/6 bg-[#FFE7D8] p-8 h-screen sticky top-0">
      <div className="text-2xl font-bold mb-8">Baby Gift</div>
      <nav className="space-y-6">
        <SidebarLink text="Categories" href="/categories" />
        <SidebarLink text="Reservations" href="/reservations" />
        <SidebarLink text="Ko links" href="/kolinks" />
        <SidebarLink text="Questions" href="/questions" />
        {/* <SidebarLink text="Products" href="/products" /> */}
      </nav>
    </aside>
  );
};

export default Sidebar;
