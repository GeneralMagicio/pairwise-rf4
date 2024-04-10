import Image from "next/image";
import React from "react";

const WelcomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        src="/images/characters/welcome-character.png"
        alt="Welcome character"
        width={200}
        height={200}
      />
      <h1 className="text-2xl font-bold mt-4">Welcome to Pairwise</h1>
    </div>
  );
};

export default WelcomePage;
