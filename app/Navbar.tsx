"use client";

import React from "react";
import Link from "next/link";
import { FaShapes } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";

import { usePathname } from "next/navigation";

const menu = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Issues", href: "/issues" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between border-b-2 h-[80px] px-7 items-center text-lg">
      <Link href="/">
        <FaShapes className="text-2xl text-pink-600" />
      </Link>
      <ul className="flex space-x-8 ">
        {menu.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={
                pathname === item.href
                  ? "text-pink-600 font-bold"
                  : "text-gray-400 font-bold hover:text-gray-500 transition-colors"
              }
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <IoSettingsOutline className="text-2xl" />
    </nav>
  );
}
