// components/Header.jsx
import React from "react";
import Image from "next/image"; // Make sure to install 'next/image'

const Header = () => {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-gray-300 bg-white">
      <div className="flex items-center">
        <Image
          src="/images/characters/welcome-character.png"
          alt="Logo"
          width={40}
          height={40}
        />
      </div>
      <button className="px-4 py-2 text-sm bg-primary text-white rounded-full">
        Connect
      </button>
    </header>
  );
};

export default Header;
