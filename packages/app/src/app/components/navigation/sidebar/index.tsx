"use client";

import React, { useState } from "react";
import Link from "next/link";

const navItems = [
  { label: "Service Domain", icon: "serviceDomain" },
  { label: "Jira", icon: "jira" },
  { label: "Superset", icon: "superset" },
  { label: "Settings", icon: "settings" },
];

type NavItemProps = {
  icon: string;
  label: string;
  key: string;
};

const Sidebar = (): JSX.Element => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div
      className={`bg-[#1C1B1F] min-h-screen transition-all duration-300 ${
        sidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex items-center p-4">
        {sidebarOpen && (
          <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-purple-500"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect height="7" rx="1" width="7" x="3" y="3" />
              <rect height="7" rx="1" width="7" x="14" y="3" />
              <rect height="7" rx="1" width="7" x="14" y="14" />
              <rect height="7" rx="1" width="7" x="3" y="14" />
            </svg>
          </div>
        )}

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`text-gray-400 hover:text-white ${
            !sidebarOpen ? "ml-2" : "ml-auto"
          }`}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      <nav className="mt-8 px-4">
        {navItems.map(({ icon, label }) => (
          <Link
            href="#"
            key={label}
            className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <MenuIcon icon={icon} />
            {sidebarOpen && <span>{label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

const MenuIcon = ({ icon }: Pick<NavItemProps, "icon">) => {
  switch (icon) {
    case "jira":
      return (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="3"
            y="4"
            width="7"
            height="7"
            rx="2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="14"
            y="4"
            width="7"
            height="4"
            rx="2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="14"
            y="12"
            width="7"
            height="7"
            rx="2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="3"
            y="14"
            width="7"
            height="4"
            rx="2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "superset":
      return (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="4"
            y="10"
            width="3"
            height="10"
            rx="1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="10"
            y="6"
            width="3"
            height="14"
            rx="1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="16"
            y="3"
            width="3"
            height="17"
            rx="1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "serviceDomain":
      return (
        <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="3" strokeWidth="2" />
        <circle cx="4" cy="12" r="2" strokeWidth="2" />
        <circle cx="20" cy="12" r="2" strokeWidth="2" />
        <circle cx="12" cy="4" r="2" strokeWidth="2" />
        <circle cx="12" cy="20" r="2" strokeWidth="2" />
        <line x1="12" y1="9" x2="12" y2="4" strokeWidth="2" strokeLinecap="round" />
        <line x1="12" y1="15" x2="12" y2="20" strokeWidth="2" strokeLinecap="round" />
        <line x1="9" y1="12" x2="4" y2="12" strokeWidth="2" strokeLinecap="round" />
        <line x1="15" y1="12" x2="20" y2="12" strokeWidth="2" strokeLinecap="round" />
      </svg>
       
      );
    case "settings":
      return (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      );
    default:
      return null;
  }
};

export default Sidebar;
